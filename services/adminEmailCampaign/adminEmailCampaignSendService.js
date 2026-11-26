import crypto from "crypto";
import { generalPrisma as general } from "../../dbGeneral.js";
import { sendEmail } from "../../emails/core/sendEmail.js";
import {
    MONTHLY_CAMPAIGN_MIN_DAYS,
    PROSPECT_OUTREACH_WEEKDAYS,
    SYSTEM_CAMPAIGN_DEFINITIONS,
} from "./adminEmailCampaignConstants.js";
import { resolveCampaignSenderFrom } from "./adminEmailCampaignSenderService.js";
import { isCampaignRecipientEligible, resolveAudienceRecipients } from "./adminEmailCampaignAudienceService.js";
import { renderCampaignEmail } from "./adminEmailCampaignTemplateService.js";
import { getPlatformEmailCampaignByIdService } from "./adminEmailCampaignService.js";
import {
    buildCampaignSuccessNotification,
    createCampaignNotification,
    createCampaignManualRequiredNotification,
    hasRecentManualRequiredNotification,
} from "../adminNotificationService.js";
import { formatMissedSlotLabel } from "./adminEmailCampaignNotificationHelpers.js";
import { syncRunMetricsFromRecipients, buildDeliveryTotals } from "./adminEmailCampaignMetricsService.js";
import {
    isProspectOutreachCampaign,
    prepareProspectOutreachBatch,
    resolveProspectOutreachSenderFrom,
} from "./adminEmailCampaignProspectSendPolicy.js";
import { trackProspectOutreachSend } from "../emailProspect/emailProspectConversionService.js";
import { evaluateCampaignDue } from "./adminEmailCampaignSchedulerDue.js";
import { getProspectOutreachVariantStats } from "./adminEmailCampaignProspectVariantStats.js";
import { syncCampaignDeliveryFromResend } from "./adminEmailCampaignResendSyncService.js";
import { campaignQueueMessage, campaignQueuePause } from "./adminEmailCampaignQueue.js";
import {
    campaignQuotaPause,
    campaignSendPause,
    readCampaignEmailQuota,
} from "../billing/campaignEmailQuota.js";



const SEND_DELAY_MS = 150;
const MAX_RESEND_ATTEMPT_AGE_MS = 23 * 60 * 60 * 1000;
const NEXT_CYCLE_MS = 15 * 60 * 1000;
const ATTEMPT_PREFIX = "SEND_ATTEMPT:";
const QUEUE_RUNNING_MAX_AGE_MS = 2 * 60 * 1000;

function later(code = "CAMPAIGN_BATCH_QUEUED") {
    return { code, retryAt: new Date(Date.now() + NEXT_CYCLE_MS) };
}

function queueLog(meta, pause) {
    return {
        ...meta,
        deliveryQueue: { code: pause.code, resumeAt: pause.retryAt.toISOString() },
    };
}

function pausedCampaign(campaign, run, pause) {
    return {
        campaign,
        run,
        paused: true,
        code: pause.code,
        resumeAt: pause.resumeAt,
        message: campaignQueueMessage(pause.code),
    };
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function daysSince(date) {
    if (!date) return Infinity;
    return (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
}

export function canRunMonthlyCampaign(campaign, { force = false } = {}) {
    if (campaign.scheduleFrequency !== "MONTHLY") {
        return { allowed: true };
    }
    if (force) return { allowed: true, forced: true };

    const days = daysSince(campaign.lastRunAt);
    if (days < MONTHLY_CAMPAIGN_MIN_DAYS) {
        const waitDays = Math.ceil(MONTHLY_CAMPAIGN_MIN_DAYS - days);
        return {
            allowed: false,
            reason: `Esta campaña es mensual. Último envío hace ${Math.floor(days)} días. Espera ${waitDays} día(s) más o usa envío forzado.`,
            daysSinceLastRun: Math.floor(days),
            nextEligibleInDays: waitDays,
        };
    }
    return { allowed: true };
}

function buildAudienceParamsForDef(def, existingParams = {}) {
    if (def.scheduleFrequency === "MONTHLY") {
        return {
            ...existingParams,
            monthly: true,
            minDaysBetweenRuns: MONTHLY_CAMPAIGN_MIN_DAYS,
            autoRunDay: def.autoRunDay ?? 5,
        };
    }
    if (def.scheduleFrequency === "DAILY") {
        return {
            ...existingParams,
            daily: true,
            daysBeforeExpiry: def.daysBeforeExpiry ?? 0,
        };
    }
    if (def.scheduleFrequency === "WEEKLY") {
        return {
            ...existingParams,
            weekly: true,
            autoRunWeekdays: def.autoRunWeekdays ?? PROSPECT_OUTREACH_WEEKDAYS,
            maxOneEmailPerProspectPerMonth: true,
        };
    }
    return existingParams;
}

export async function ensureSystemEmailCampaigns(createdByUserId) {
    const results = [];

    for (const def of SYSTEM_CAMPAIGN_DEFINITIONS) {
        const existing = await general.platformEmailCampaign.findUnique({
            where: { campaignKey: def.campaignKey },
        });

        if (existing) {
            await general.platformEmailCampaign.update({
                where: { campaignKey: def.campaignKey },
                data: {
                    campaignName: def.campaignName,
                    campaignDescription: def.campaignDescription,
                    scheduleFrequency: def.scheduleFrequency,
                    audienceType: def.audienceType,
                    audienceParams: buildAudienceParamsForDef(def, existing.audienceParams ?? {}),
                    senderEmail: def.senderEmail ?? null,
                    senderName: def.senderName ?? null,
                },
            });
            const refreshed = await general.platformEmailCampaign.findUnique({
                where: { campaignKey: def.campaignKey },
            });
            results.push({ campaignKey: def.campaignKey, created: false, campaign: refreshed });
            continue;
        }

        const campaign = await general.platformEmailCampaign.create({
            data: {
                campaignKey: def.campaignKey,
                campaignName: def.campaignName,
                campaignDescription: def.campaignDescription,
                campaignStatus: "SCHEDULED",
                audienceType: def.audienceType,
                scheduleFrequency: def.scheduleFrequency,
                messageIntent: def.messageIntent,
                emailSubject: def.emailSubject,
                senderEmail: def.senderEmail ?? null,
                senderName: def.senderName ?? null,
                audienceParams: buildAudienceParamsForDef(def, {}),
                createdByUserId,
            },
        });

        results.push({ campaignKey: def.campaignKey, created: true, campaign });
    }

    return results;
}

const STUCK_RUN_MAX_AGE_MS = 2 * 60 * 60 * 1000;

/**
 * Cierra runs/campañas colgadas (p. ej. proceso interrumpido en Vercel).
 */
export async function recoverStuckCampaignRuns({ maxAgeMs = STUCK_RUN_MAX_AGE_MS } = {}) {
    const cutoff = new Date(Date.now() - maxAgeMs);
    const stuckRuns = await general.platformEmailCampaignRun.findMany({
        where: {
            runStatus: "RUNNING",
            startedAt: { lt: cutoff },
        },
    });

    const abandonedQueue = await general.platformEmailCampaignRun.findMany({
        where: {
            runStatus: "RUNNING",
            startedAt: { lt: new Date(Date.now() - QUEUE_RUNNING_MAX_AGE_MS) },
            errorLog: { path: ["managedDelivery"], equals: true },
        },
        select: { runId: true, errorLog: true, startedAt: true },
    });
    for (const { runId, errorLog, startedAt } of abandonedQueue) {
        await general.platformEmailCampaignRun.updateMany({
            where: { runId, runStatus: "RUNNING", startedAt },
            data: { runStatus: "PENDING", errorLog: queueLog(errorLog, {
                code: "CAMPAIGN_BATCH_QUEUED", retryAt: new Date(),
            }) },
        });
    }

    for (const run of stuckRuns) {
        if (run.errorLog?.managedDelivery) continue;
        await syncRunMetricsFromRecipients(run.runId);
        await general.platformEmailCampaignRun.update({
            where: { runId: run.runId },
            data: {
                runStatus: "COMPLETED",
                completedAt: new Date(),
                errorLog: {
                    recovered: true,
                    note: "Run cerrado automáticamente tras quedar colgado (envío interrumpido).",
                },
            },
        });
    }

    const sendingCampaigns = await general.platformEmailCampaign.findMany({
        where: { campaignStatus: "SENDING" },
    });

    let recoveredCampaigns = 0;
    for (const campaign of sendingCampaigns) {
        const stillRunning = await general.platformEmailCampaignRun.count({
            where: { campaignId: campaign.campaignId, runStatus: { in: ["RUNNING", "PENDING"] } },
        });
        if (stillRunning === 0) {
            await general.platformEmailCampaign.update({
                where: { campaignId: campaign.campaignId },
                data: { campaignStatus: "SENT" },
            });
            recoveredCampaigns += 1;
        }
    }

    return { recoveredRuns: stuckRuns.length, recoveredCampaigns };
}

async function claimCampaignRun(campaign, recipients, meta, { resumeOnly, force, source }) {
    return general.$transaction(async (tx) => {
        const [{ locked }] = await tx.$queryRawUnsafe(
            "SELECT pg_try_advisory_xact_lock(110478238, 32) AS locked",
        );
        if (!locked) throw new Error("CAMPAIGN_ALREADY_RUNNING");

        const previousRun = await tx.platformEmailCampaignRun.findFirst({
            where: {
                campaignId: campaign.campaignId,
                runStatus: "PENDING",
                errorLog: { path: ["managedDelivery"], equals: true },
            },
            orderBy: { createdAt: "asc" },
        });
        const pause = campaignQueuePause(previousRun);
        if (pause && Date.parse(pause.resumeAt) > Date.now()) return { run: previousRun, pause };

        if (await tx.platformEmailCampaignRun.count({ where: { runStatus: "RUNNING" } })) {
            throw new Error("CAMPAIGN_ALREADY_RUNNING");
        }
        const current = await tx.platformEmailCampaign.findUnique({ where: { campaignId: campaign.campaignId } });
        if (!current || current.campaignStatus === "ARCHIVED") throw new Error("CAMPAIGN_NOT_FOUND");
        if (previousRun) {
            const run = await tx.platformEmailCampaignRun.update({
                where: { runId: previousRun.runId },
                data: { runStatus: "RUNNING", startedAt: new Date() },
            });
            return { run };
        }
        if (resumeOnly || current.campaignStatus === "SENDING" || +current.updatedAt !== +campaign.updatedAt) {
            throw new Error("CAMPAIGN_ALREADY_RUNNING");
        }
        if (source !== "auto") {
            const monthlyCheck = canRunMonthlyCampaign(current, { force });
            if (!monthlyCheck.allowed) {
                const err = new Error("MONTHLY_COOLDOWN");
                err.details = monthlyCheck;
                throw err;
            }
        }
        if (!recipients.length) throw new Error("NO_RECIPIENTS");

        const run = await tx.platformEmailCampaignRun.create({
            data: {
                campaignId: campaign.campaignId,
                runStatus: "RUNNING",
                startedAt: new Date(),
                recipientCount: recipients.length,
                errorLog: meta,
            },
        });
        await tx.platformEmailCampaignRecipient.createMany({
            data: recipients.map((recipient) => ({
                runId: run.runId,
                userId: recipient.userId,
                businessId: recipient.businessId ?? null,
                recipientEmail: recipient.email,
                recipientName: [recipient.firstName, recipient.lastName].filter(Boolean).join(" "),
                businessName: recipient.businessName ?? null,
            })),
        });
        await tx.platformEmailCampaign.update({
            where: { campaignId: campaign.campaignId },
            data: { campaignStatus: "SENDING" },
        });
        return { run };
    }, { timeout: 10000 });
}

function quotaAfterSends(quota, sent) {
    return {
        ...quota,
        remaining: Math.max(0, quota.remaining - sent),
        daily: { ...quota.daily, remaining: Math.max(0, quota.daily.remaining - sent) },
        monthly: { ...quota.monthly, remaining: Math.max(0, quota.monthly.remaining - sent) },
    };
}

async function updateRecipient(recipientId, data) {
    return general.platformEmailCampaignRecipient.update({ where: { recipientId }, data });
}

function recipientKey(businessId, email) {
    return [businessId ?? "", email].join(":");
}

async function processQueuedRecipients(campaign, run, byRecipient, deadline) {
    if (deadline - Date.now() < 5000) return later();

    let quota;
    try {
        quota = await readCampaignEmailQuota();
    } catch (error) {
        if (error.code === "CAMPAIGN_QUOTA_UNAVAILABLE") return later(error.code);
        throw error;
    }
    const initialPause = campaignQuotaPause(quota);
    if (initialPause) return initialPause;

    const rows = await general.platformEmailCampaignRecipient.findMany({
        where: { runId: run.runId, deliveryStatus: "PENDING" },
        orderBy: [{ createdAt: "asc" }, { recipientId: "asc" }],
        take: 100,
    });
    const prospect = isProspectOutreachCampaign(campaign);
    const variantStats = prospect ? (await getProspectOutreachVariantStats()).variants : null;
    let sent = 0;
    for (const row of rows) {
        const remaining = quotaAfterSends(quota, sent);
        const pause = campaignQuotaPause(remaining);
        if (pause) return pause;
        if (deadline - Date.now() < 5000) return later();

        const recipient = byRecipient.get(recipientKey(row.businessId, row.recipientEmail));
        if (!recipient || !(await isCampaignRecipientEligible(campaign, recipient))) {
            await updateRecipient(row.recipientId, {
                deliveryStatus: "FAILED",
                errorMessage: "El destinatario ya no está habilitado para este envío.",
            });
            continue;
        }

        const previousAttempt = row.errorMessage?.startsWith(ATTEMPT_PREFIX) ? row.errorMessage : null;
        if (previousAttempt && Date.now() - Date.parse(previousAttempt.slice(ATTEMPT_PREFIX.length)) >= MAX_RESEND_ATTEMPT_AGE_MS) {
            await updateRecipient(row.recipientId, {
                deliveryStatus: "FAILED",
                errorMessage: "El proveedor no confirmó el envío a tiempo. Requiere revisión.",
            });
            continue;
        }

        const rendered = renderCampaignEmail(campaign, recipient, {
            sendIndexInBatch: sent,
            forcedVariantId: previousAttempt ? row.messageVariantId : null,
            variantStats,
            campaignRecipientId: prospect ? row.recipientId : null,
        });
        if (!previousAttempt) {
            await updateRecipient(row.recipientId, {
                errorMessage: ATTEMPT_PREFIX + new Date().toISOString(),
                messageVariantId: rendered.variantId ?? null,
            });
        } else if (rendered.variantId && rendered.variantId !== row.messageVariantId) {
            // A changed template would make the original idempotent attempt ambiguous.
            await updateRecipient(row.recipientId, {
                deliveryStatus: "FAILED",
                errorMessage: "Se requiere revisar el envío antes de repetirlo con otro contenido.",
            });
            continue;
        }

        let result;
        try {
            result = await sendEmail({
                to: recipient.email,
                subject: rendered.subject,
                html: rendered.html,
                text: rendered.text,
                headers: rendered.headers,
                from: prospect ? resolveProspectOutreachSenderFrom(0) : resolveCampaignSenderFrom(campaign),
                timeoutMs: 4000,
                idempotencyKey: "campaign/" + row.recipientId,
            });
        } catch (error) {
            const providerPause = campaignSendPause(error, remaining);
            if (providerPause) {
                if (!previousAttempt && providerPause.code !== "CAMPAIGN_DELIVERY_UNCERTAIN") {
                    await updateRecipient(row.recipientId, { errorMessage: null });
                }
                return providerPause;
            }
            await updateRecipient(row.recipientId, {
                deliveryStatus: "FAILED",
                errorMessage: error.statusCode === 409 && previousAttempt
                    ? "Requiere comprobar en Resend el resultado del primer intento."
                    : error.message ?? "Error de envío",
            });
            continue;
        }

        if (!result?.id) {
            if (!result?.skipped) return later("CAMPAIGN_DELIVERY_UNCERTAIN");
            await updateRecipient(row.recipientId, {
                deliveryStatus: "FAILED", errorMessage: "La entrega externa está deshabilitada.",
            });
            continue;
        }
        sent += 1;
        await updateRecipient(row.recipientId, {
            deliveryStatus: "SENT",
            providerMessageId: result.id,
            sentAt: new Date(),
            errorMessage: null,
        });
        if (prospect) await trackProspectOutreachSend(recipient.userId, rendered.variantId);

        await sleep(SEND_DELAY_MS);
    }
    const stillPending = await general.platformEmailCampaignRecipient.count({
        where: { runId: run.runId, deliveryStatus: "PENDING" },
    });
    return stillPending ? campaignQuotaPause(quotaAfterSends(quota, sent)) ?? later() : null;
}

async function finishQueuedRun(campaign, run, pause, { source, dueMeta }) {
    const meta = run.errorLog ?? {};
    const updated = await syncRunMetricsFromRecipients(run.runId);
    if (pause) {
        const queued = await general.platformEmailCampaignRun.update({
            where: { runId: run.runId },
            data: { runStatus: "PENDING", errorLog: queueLog(meta, pause) },
        });
        return pausedCampaign(campaign, queued, campaignQueuePause(queued));
    }

    const completedAt = new Date();
    const runStatus = updated.sentCount === 0 ? "FAILED" : "COMPLETED";
    const completedRun = await general.$transaction(async (tx) => {
        const completed = await tx.platformEmailCampaignRun.update({
            where: { runId: run.runId },
            data: { runStatus, completedAt, errorLog: { ...meta, deliveryQueue: null } },
        });
        await tx.platformEmailCampaign.update({
            where: { campaignId: campaign.campaignId },
            data: {
                campaignStatus: runStatus === "FAILED" ? "FAILED" : "SENT",
                lastRunAt: completedAt,
                ...(updated.sentCount > 0 ? { sentAt: completedAt } : {}),
            },
        });
        return completed;
    });
    const updatedCampaign = await getPlatformEmailCampaignByIdService(campaign.campaignId);
    const notificationData = buildCampaignSuccessNotification(updatedCampaign, completedRun);
    if (source === "auto" && runStatus !== "FAILED") {
        notificationData.notificationType = "CAMPAIGN_AUTO_RUN";
        notificationData.title = "Envío automático: " + updatedCampaign.campaignName;
        if (dueMeta?.reason === "CATCH_UP") {
            notificationData.message = "Recuperación del envío pendiente (" + formatMissedSlotLabel(dueMeta) + "). " + notificationData.message;
        }
    }
    await createCampaignNotification(updatedCampaign, notificationData);
    setImmediate(() => {
        syncCampaignDeliveryFromResend(campaign.campaignId).catch((error) => {
            console.warn("[campaign-send] Sync entregas Resend post-envío:", error.message);
        });
    });
    return { campaign: updatedCampaign, run: completedRun };
}

export async function executePlatformEmailCampaign(
    campaignId,
    { force = false, source = "manual", dueMeta = null, resumeOnly = false, deadline = Date.now() + 40000 } = {},
) {
    await recoverStuckCampaignRuns();
    const campaign = await getPlatformEmailCampaignByIdService(campaignId);
    if (!campaign || campaign.campaignStatus === "ARCHIVED") throw new Error("CAMPAIGN_NOT_FOUND");

    const pending = campaign.runs.find((run) => campaignQueuePause(run));
    const knownPause = campaignQueuePause(pending);
    if (knownPause && Date.parse(knownPause.resumeAt) > Date.now()) {
        return pausedCampaign(campaign, pending, knownPause);
    }
    const allRecipients = await resolveAudienceRecipients(campaign.audienceType, campaign.audienceParams, {
        campaignKey: campaign.campaignKey,
    });
    const byRecipient = new Map(allRecipients.map((recipient) => [
        recipientKey(recipient.businessId, recipient.email), recipient,
    ]));
    const recipients = [...byRecipient.values()];
    const selected = isProspectOutreachCampaign(campaign)
        ? prepareProspectOutreachBatch(recipients, campaign)
        : { recipients, meta: undefined };
    const meta = { managedDelivery: true, source, ...(selected.meta ? { prospectSendPolicy: selected.meta } : {}) };

    let claim;
    try {
        claim = await claimCampaignRun(campaign, selected.recipients, meta, { resumeOnly, force, source });
    } catch (error) {
        if (error.message === "NO_RECIPIENTS" && source === "auto") {
            await general.platformEmailCampaign.update({
                where: { campaignId }, data: { lastRunAt: new Date() },
            });
            await createCampaignNotification(campaign, {
                notificationType: "CAMPAIGN_SKIPPED",
                title: "Campaña sin destinatarios: " + campaign.campaignName,
                message: "No había destinatarios elegibles para esta audiencia.",
                payload: { campaignId, source, dueMeta },
                campaignId,
            });
        }
        throw error;
    }
    if (claim.pause) return pausedCampaign(campaign, claim.run, claim.pause);
    const pause = await processQueuedRecipients(campaign, claim.run, byRecipient, deadline);
    return finishQueuedRun(campaign, claim.run, pause, { source, dueMeta });
}

export async function getCampaignRunStats(campaignId) {
    await syncCampaignDeliveryFromResend(campaignId).catch((error) => {
        console.warn("[campaign-stats] Sync entregas Resend:", error.message);
    });

    const campaign = await general.platformEmailCampaign.findUnique({
        where: { campaignId },
        include: {
            runs: {
                orderBy: { createdAt: "desc" },
                take: 10,
                include: {
                    _count: { select: { recipients: true } },
                },
            },
        },
    });

    if (!campaign) return null;

    const lastRun = campaign.runs[0] ?? null;
    const monthlyCheck = canRunMonthlyCampaign(campaign);
    const scheduleEligibility = evaluateCampaignDue(campaign);
    const delivery = buildDeliveryTotals(campaign);

    return {
        totals: {
            recipients: campaign.totalRecipients,
            sent: delivery.sent,
            delivered: delivery.delivered,
            failed: delivery.failed,
            bounced: delivery.bounced,
            rejected: delivery.rejected,
            opened: delivery.opened,
            clicked: delivery.clicked,
            notOpened: delivery.notOpened,
        },
        lastRun,
        monthlyEligibility: monthlyCheck,
        scheduleEligibility,
        runs: campaign.runs,
        autoSchedule: {
            enabled: process.env.DISABLE_CAMPAIGN_SCHEDULER !== "true",
            day:
                campaign.scheduleFrequency === "MONTHLY"
                    ? Number(campaign.audienceParams?.autoRunDay) ||
                      Number(process.env.AUTO_CAMPAIGN_RUN_DAY) ||
                      5
                    : null,
            hour: Number(process.env.AUTO_CAMPAIGN_RUN_HOUR) || 9,
            timezone: "America/Santiago",
            frequency: campaign.scheduleFrequency,
            daysBeforeExpiry:
                campaign.scheduleFrequency === "DAILY"
                    ? Number(campaign.audienceParams?.daysBeforeExpiry)
                    : null,
            autoRunWeekdays:
                campaign.scheduleFrequency === "WEEKLY"
                    ? campaign.audienceParams?.autoRunWeekdays ?? PROSPECT_OUTREACH_WEEKDAYS
                    : null,
            maxOneEmailPerProspectPerMonth:
                campaign.audienceType === "PLATFORM_PROSPECTS" ? true : null,
        },
    };
}

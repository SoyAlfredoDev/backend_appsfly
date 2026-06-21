import crypto from "crypto";
import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { sendEmail } from "../../emails/core/sendEmail.js";
import {
    MONTHLY_CAMPAIGN_MIN_DAYS,
    PROSPECT_OUTREACH_WEEKDAYS,
    SYSTEM_CAMPAIGN_DEFINITIONS,
} from "./adminEmailCampaignConstants.js";
import { resolveCampaignSenderFrom } from "./adminEmailCampaignSenderService.js";
import { resolveAudienceRecipients } from "./adminEmailCampaignAudienceService.js";
import { renderCampaignEmail } from "./adminEmailCampaignTemplateService.js";
import { getPlatformEmailCampaignByIdService } from "./adminEmailCampaignService.js";
import {
    createAdminNotification,
    buildCampaignSuccessNotification,
} from "../adminNotificationService.js";
import { syncRunMetricsFromRecipients, buildDeliveryTotals } from "./adminEmailCampaignMetricsService.js";
import {
    isProspectOutreachCampaign,
    prepareProspectOutreachBatch,
    resolveProspectOutreachSenderFrom,
} from "./adminEmailCampaignProspectSendPolicy.js";
import { trackProspectOutreachSend } from "../emailProspect/emailProspectConversionService.js";

const general = new PrismaGeneral();

const SEND_DELAY_MS = 120;

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

export async function executePlatformEmailCampaign(
    campaignId,
    { force = false, source = "manual" } = {},
) {
    const campaign = await getPlatformEmailCampaignByIdService(campaignId);
    if (!campaign) {
        throw new Error("CAMPAIGN_NOT_FOUND");
    }

    if (campaign.campaignStatus === "SENDING") {
        throw new Error("CAMPAIGN_ALREADY_RUNNING");
    }

    if (source !== "auto") {
        const monthlyCheck = canRunMonthlyCampaign(campaign, { force });
        if (!monthlyCheck.allowed) {
            const err = new Error("MONTHLY_COOLDOWN");
            err.details = monthlyCheck;
            throw err;
        }
    }

    const allRecipients = await resolveAudienceRecipients(
        campaign.audienceType,
        campaign.audienceParams,
    );

    let recipients = allRecipients;
    let prospectSendMeta = null;
    let prospectLimits = null;

    if (isProspectOutreachCampaign(campaign)) {
        const prepared = prepareProspectOutreachBatch(allRecipients, campaign);
        recipients = prepared.recipients;
        prospectSendMeta = prepared.meta;
        prospectLimits = prepared.limits;
    }

    if (!recipients.length) {
        if (source === "auto") {
            const skipMessage =
                campaign.audienceType === "SUSPENDED_BUSINESS_ADMINS"
                    ? "No había negocios suspendidos para contactar en este ciclo."
                    : campaign.audienceType === "BUSINESS_ADMINS_PLAN_EXPIRING_5D"
                      ? "No había negocios con plan por vencer en 5 días hoy."
                      : campaign.audienceType === "BUSINESS_ADMINS_PLAN_EXPIRING_TODAY"
                        ? "No había negocios con plan por vencer hoy."
                        : campaign.audienceType === "PLATFORM_PROSPECTS"
                          ? "No había prospectos activos elegibles para este envío."
                          : "No había destinatarios para esta audiencia en este ciclo.";
            await createAdminNotification({
                notificationType: "CAMPAIGN_SKIPPED",
                title: `Campaña sin destinatarios: ${campaign.campaignName}`,
                message: skipMessage,
                payload: {
                    campaignId: campaign.campaignId,
                    campaignKey: campaign.campaignKey,
                    source: "auto",
                },
                campaignId: campaign.campaignId,
            });
            // Marcar el ciclo como ejecutado para no reintentar en cada tick del scheduler
            // (diario = 1 vez/día, mensual = 1 vez/mes vía wasRunToday / wasRunThisMonth).
            await general.platformEmailCampaign.update({
                where: { campaignId },
                data: { lastRunAt: new Date() },
            });
        }
        throw new Error("NO_RECIPIENTS");
    }

    const runId = crypto.randomUUID();

    await general.platformEmailCampaign.update({
        where: { campaignId },
        data: { campaignStatus: "SENDING" },
    });

    const run = await general.platformEmailCampaignRun.create({
        data: {
            runId,
            campaignId,
            runStatus: "RUNNING",
            startedAt: new Date(),
            recipientCount: recipients.length,
        },
    });

    let sentCount = 0;
    let deliveredCount = 0;
    let failedCount = 0;
    const errors = [];

    const defaultSenderFrom = resolveCampaignSenderFrom(campaign);
    const sendDelayMs = prospectLimits?.sendDelayMs ?? SEND_DELAY_MS;

    for (let sendIndex = 0; sendIndex < recipients.length; sendIndex += 1) {
        const recipient = recipients[sendIndex];
        const senderFrom = prospectLimits
            ? resolveProspectOutreachSenderFrom(sendIndex, prospectLimits)
            : defaultSenderFrom;

        const recipientId = crypto.randomUUID();
        const { subject, html, text } = renderCampaignEmail(campaign, recipient);

        await general.platformEmailCampaignRecipient.create({
            data: {
                recipientId,
                runId,
                userId: recipient.userId,
                businessId: recipient.businessId,
                recipientEmail: recipient.email,
                recipientName: `${recipient.firstName} ${recipient.lastName}`.trim(),
                businessName: recipient.businessName,
                deliveryStatus: "PENDING",
            },
        });

        try {
            const result = await sendEmail({
                to: recipient.email,
                subject,
                html,
                text,
                from: senderFrom,
            });

            sentCount += 1;

            await general.platformEmailCampaignRecipient.update({
                where: { recipientId },
                data: {
                    deliveryStatus: "SENT",
                    providerMessageId: result?.id ?? null,
                    sentAt: new Date(),
                },
            });

            if (isProspectOutreachCampaign(campaign) && recipient.userId) {
                await trackProspectOutreachSend(recipient.userId);
            }
        } catch (error) {
            failedCount += 1;
            const message = error.message ?? "Error de envío";
            errors.push({ email: recipient.email, message });

            await general.platformEmailCampaignRecipient.update({
                where: { recipientId },
                data: {
                    deliveryStatus: "FAILED",
                    errorMessage: message,
                },
            });
        }

        await sleep(sendDelayMs);
    }

    const completedAt = new Date();
    const runStatus = failedCount === recipients.length ? "FAILED" : "COMPLETED";
    const campaignStatus =
        failedCount === recipients.length ? "FAILED" : "SENT";

    const syncedRun = await syncRunMetricsFromRecipients(runId);
    sentCount = syncedRun.sentCount;
    deliveredCount = syncedRun.deliveredCount;
    failedCount = syncedRun.failedCount;
    const bouncedCount = syncedRun.bouncedCount;
    const openedCount = syncedRun.openedCount;

    const runErrorLog = errors.length ? errors.slice(0, 50) : null;
    const errorLogPayload = prospectSendMeta
        ? { prospectSendPolicy: prospectSendMeta, sendErrors: runErrorLog }
        : runErrorLog;

    await general.platformEmailCampaignRun.update({
        where: { runId },
        data: {
            runStatus,
            completedAt,
            errorLog: errorLogPayload,
        },
    });

    const updatedCampaign = await general.platformEmailCampaign.findUnique({
        where: { campaignId },
        include: {
            createdBy: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                    userEmail: true,
                },
            },
            runs: {
                orderBy: { createdAt: "desc" },
                take: 5,
                include: {
                    recipients: {
                        orderBy: { createdAt: "desc" },
                        take: 20,
                    },
                },
            },
        },
    });

    await general.platformEmailCampaign.update({
        where: { campaignId },
        data: {
            campaignStatus,
            sentAt: completedAt,
            lastRunAt: completedAt,
        },
    });

    const completedRun = {
        ...run,
        runStatus,
        completedAt,
        sentCount,
        deliveredCount,
        failedCount,
        bouncedCount,
        openedCount,
        recipientCount: recipients.length,
        prospectSendMeta,
    };

    const notificationData = buildCampaignSuccessNotification(
        updatedCampaign,
        completedRun,
    );
    if (prospectSendMeta?.deferredCount > 0) {
        notificationData.message += ` ${prospectSendMeta.notice}`;
        notificationData.payload = {
            ...notificationData.payload,
            prospectSendMeta,
        };
    }
    if (source === "auto") {
        notificationData.notificationType = "CAMPAIGN_AUTO_RUN";
        notificationData.title = `Envío automático: ${updatedCampaign.campaignName}`;
    }
    await createAdminNotification(notificationData);

    return {
        campaign: updatedCampaign,
        run: completedRun,
    };
}

export async function getCampaignRunStats(campaignId) {
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
            notOpened: delivery.notOpened,
        },
        lastRun,
        monthlyEligibility: monthlyCheck,
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

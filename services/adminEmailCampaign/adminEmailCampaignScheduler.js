import {
    executePlatformEmailCampaign,
    ensureSystemEmailCampaigns,
    recoverStuckCampaignRuns,
} from "./adminEmailCampaignSendService.js";
import { createCampaignManualRequiredNotification, hasRecentManualRequiredNotification } from "../adminNotificationService.js";
import { generalPrisma as general } from "../../dbGeneral.js";
import userSuperAdmin from "../../superAdmin.js";
import {
    CHILE_TZ,
    getChileDateParts,
    getChileWeekday,
    getDayKey,
    getMonthKey,
} from "./adminEmailCampaignChileDate.js";
import {
    evaluateCampaignDue,
    getAutoRunHour,
} from "./adminEmailCampaignSchedulerDue.js";
import { syncStaleCampaignDeliveriesFromResend } from "./adminEmailCampaignResendSyncService.js";


import { campaignQueuePause } from "./adminEmailCampaignQueue.js";

const CHECK_INTERVAL_MS = 15 * 60 * 1000;
const quotaPauseCodes = new Set(["CAMPAIGN_MONTHLY_QUOTA", "CAMPAIGN_DAILY_QUOTA", "CAMPAIGN_QUOTA_UNAVAILABLE"]);

function isSchedulerEnabled() {
    return process.env.DISABLE_CAMPAIGN_SCHEDULER !== "true";
}

let schedulerRunning = false;
let intervalHandle = null;

async function getSuperAdminUserId() {
    const ids = Array.isArray(userSuperAdmin) ? userSuperAdmin : [];
    if (ids[0]) return ids[0];
    return process.env.SUPER_ADMIN_IDS?.split(",")?.[0]?.trim() ?? null;
}

async function runCampaignBatch(campaigns, { dryRun = false, dueMetaById = {}, deadline } = {}) {
    const results = [];

    for (const campaign of campaigns) {
        if (!dryRun && deadline && Date.now() + 5000 >= deadline) break;
        const dueMeta = dueMetaById[campaign.campaignId] ?? null;

        if (dryRun) {
            results.push({
                campaignId: campaign.campaignId,
                campaignKey: campaign.campaignKey,
                dryRun: true,
                dueMeta,
            });
            continue;
        }

        if (dueMeta?.reason === "CATCH_UP") {
            console.info(
                `[campaign-scheduler] Recuperación ${campaign.campaignKey ?? campaign.campaignId}:`,
                dueMeta.slot?.dayKey ?? dueMeta.lastRunKey ?? "día anterior",
            );
        }

        try {
            const result = await executePlatformEmailCampaign(campaign.campaignId, {
                source: "auto",
                dueMeta,
                deadline,
            });
            results.push({
                campaignId: campaign.campaignId,
                campaignKey: campaign.campaignKey,
                success: !result.paused && result.run.runStatus !== "FAILED",
                paused: result.paused ?? false,
                code: result.code,
                resumeAt: result.resumeAt,
                sent: result.run.sentCount,
                delivered: result.run.deliveredCount,
                failed: result.run.failedCount,
                dueMeta,
            });
            if (result.paused && quotaPauseCodes.has(result.code)) break;
        } catch (error) {
            if (error.message === "CAMPAIGN_ALREADY_RUNNING") break;
            if (error.message === "NO_RECIPIENTS") {
                if (
                    dueMeta?.reason === "CATCH_UP"
                    && !(await hasRecentManualRequiredNotification(campaign.campaignId))
                ) {
                    await createCampaignManualRequiredNotification(campaign, {
                        reason: "CATCH_UP_FAILED",
                        detail: `No se pudo recuperar el envío automático pendiente (${dueMeta.slot?.dayKey ?? "ciclo anterior"}): no había destinatarios elegibles.`,
                        dueMeta,
                    });
                }
                results.push({
                    campaignId: campaign.campaignId,
                    campaignKey: campaign.campaignKey,
                    skipped: true,
                    reason: "NO_RECIPIENTS",
                    dueMeta,
                });
                continue;
            }

            console.error(
                `[campaign-scheduler] Error en ${campaign.campaignKey ?? campaign.campaignId}:`,
                error.message,
            );
            if (!(await hasRecentManualRequiredNotification(campaign.campaignId))) {
                await createCampaignManualRequiredNotification(campaign, {
                    reason: dueMeta?.reason === "CATCH_UP" ? "CATCH_UP_FAILED" : "AUTO_SEND_FAILED",
                    dueMeta,
                    errorMessage: error.message,
                });
            }
            results.push({
                campaignId: campaign.campaignId,
                error: error.message,
                dueMeta,
            });
        }
    }

    return results;
}

async function loadAutomatedCampaigns(frequency) {
    return general.platformEmailCampaign.findMany({
        where: {
            scheduleFrequency: frequency,
            campaignStatus: { in: ["SCHEDULED", "SENT"] },
        },
    });
}

/** Avisa si hay envíos pendientes y el programador está apagado. */
export async function notifyPendingCampaignsWhenSchedulerDisabled() {
    const superAdminId = await getSuperAdminUserId();
    if (!superAdminId) return;

    await ensureSystemEmailCampaigns(superAdminId);

    const now = new Date();
    for (const frequency of ["WEEKLY", "DAILY", "MONTHLY"]) {
        const campaigns = await loadAutomatedCampaigns(frequency);
        for (const campaign of campaigns) {
            const evaluation = evaluateCampaignDue(campaign, now);
            if (!evaluation.due) continue;
            if (await hasRecentManualRequiredNotification(campaign.campaignId)) continue;

            await createCampaignManualRequiredNotification(campaign, {
                reason: "SCHEDULER_DISABLED",
                dueMeta: evaluation,
            });
        }
    }
}

function filterDueCampaigns(campaigns, now = new Date()) {
    const dueCampaigns = [];
    const dueMetaById = {};

    for (const campaign of campaigns) {
        const evaluation = evaluateCampaignDue(campaign, now);
        if (evaluation.due) {
            dueCampaigns.push(campaign);
            dueMetaById[campaign.campaignId] = evaluation;
        }
    }

    return { dueCampaigns, dueMetaById };
}

export async function runScheduledMonthlyCampaigns({ dryRun = false, now = new Date(), deadline } = {}) {
    const superAdminId = await getSuperAdminUserId();
    if (!superAdminId) {
        console.warn("[campaign-scheduler] Sin super admin para asegurar campañas.");
        return { skipped: true, reason: "NO_SUPER_ADMIN" };
    }

    await ensureSystemEmailCampaigns(superAdminId);

    const campaigns = await loadAutomatedCampaigns("MONTHLY");

    const { dueCampaigns, dueMetaById } = filterDueCampaigns(campaigns, now);

    if (!dueCampaigns.length) {
        const nowParts = getChileDateParts(now);
        return {
            skipped: true,
            reason: "NO_MONTHLY_DUE",
            runHour: getAutoRunHour(),
            today: nowParts.day,
            currentHour: nowParts.hour,
        };
    }

    const results = await runCampaignBatch(dueCampaigns, { dryRun, dueMetaById, deadline });

    return {
        skipped: false,
        frequency: "MONTHLY",
        results,
        runHour: getAutoRunHour(),
        monthKey: getMonthKey(now),
    };
}

export async function runScheduledWeeklyCampaigns({ dryRun = false, now = new Date(), deadline } = {}) {
    const superAdminId = await getSuperAdminUserId();
    if (!superAdminId) {
        return { skipped: true, reason: "NO_SUPER_ADMIN" };
    }

    await ensureSystemEmailCampaigns(superAdminId);

    const campaigns = await loadAutomatedCampaigns("WEEKLY");

    const { dueCampaigns, dueMetaById } = filterDueCampaigns(campaigns, now);
    const nowParts = getChileDateParts(now);

    if (!dueCampaigns.length) {
        return {
            skipped: true,
            reason: "NO_WEEKLY_DUE",
            runHour: getAutoRunHour(),
            weekday: getChileWeekday(now),
            dayKey: getDayKey(now),
            currentHour: nowParts.hour,
        };
    }

    const results = await runCampaignBatch(dueCampaigns, { dryRun, dueMetaById, deadline });

    return {
        skipped: false,
        frequency: "WEEKLY",
        results,
        runHour: getAutoRunHour(),
        weekday: getChileWeekday(now),
        dayKey: getDayKey(now),
    };
}

export async function runScheduledDailyCampaigns({ dryRun = false, now = new Date(), deadline } = {}) {
    const superAdminId = await getSuperAdminUserId();
    if (!superAdminId) {
        return { skipped: true, reason: "NO_SUPER_ADMIN" };
    }

    await ensureSystemEmailCampaigns(superAdminId);

    const campaigns = await loadAutomatedCampaigns("DAILY");

    const { dueCampaigns, dueMetaById } = filterDueCampaigns(campaigns, now);

    if (!dueCampaigns.length) {
        return {
            skipped: true,
            reason: "NO_DAILY_DUE",
            runHour: getAutoRunHour(),
            dayKey: getDayKey(now),
            currentHour: getChileDateParts(now).hour,
        };
    }

    const results = await runCampaignBatch(dueCampaigns, { dryRun, dueMetaById, deadline });

    return {
        skipped: false,
        frequency: "DAILY",
        results,
        runHour: getAutoRunHour(),
        dayKey: getDayKey(now),
    };
}

async function tick() {
    if (schedulerRunning) return;
    schedulerRunning = true;
    try {
        await syncStaleCampaignDeliveriesFromResend({ limit: 5 }).catch((error) => {
            console.warn("[campaign-scheduler] Sync entregas Resend:", error.message);
        });

        const { monthly, weekly, daily } = await runAllDueEmailCampaigns();

        const monthlyRan = !monthly.skipped && monthly.results?.length;
        const weeklyRan = !weekly.skipped && weekly.results?.length;
        const dailyRan = !daily.skipped && daily.results?.length;

        if (monthlyRan || weeklyRan || dailyRan) {
            console.info(
                "[campaign-scheduler] Ejecución:",
                JSON.stringify({ monthly, weekly, daily }),
            );
        }
    } catch (error) {
        console.error("[campaign-scheduler] tick error:", error);
    } finally {
        schedulerRunning = false;
    }
}

export function startEmailCampaignScheduler() {
    if (!isSchedulerEnabled()) {
        console.info("[campaign-scheduler] Desactivado. Usa DISABLE_CAMPAIGN_SCHEDULER=false.");
        setTimeout(() => {
            notifyPendingCampaignsWhenSchedulerDisabled().catch((error) => {
                console.error("[campaign-scheduler] notify disabled:", error);
            });
        }, 3000);
        return;
    }

    const runDay = Number(process.env.AUTO_CAMPAIGN_RUN_DAY) || 5;
    const runHour = getAutoRunHour();
    console.info(
        `[campaign-scheduler] Activo — mensual día ${runDay}, semanal lun/mié/vie (prospectos) con recuperación, diario con recuperación, hora objetivo ${runHour}:00 (${CHILE_TZ})`,
    );

    setTimeout(tick, 5000);
    intervalHandle = setInterval(tick, CHECK_INTERVAL_MS);
}

export function stopEmailCampaignScheduler() {
    if (intervalHandle) clearInterval(intervalHandle);
}

async function resumeQueuedCampaign(now, deadline) {
    await recoverStuckCampaignRuns();
    const queued = await general.platformEmailCampaignRun.findMany({
        where: {
            runStatus: "PENDING",
            errorLog: { path: ["managedDelivery"], equals: true },
            campaign: { campaignStatus: "SENDING" },
        },
        orderBy: { createdAt: "asc" },
    });
    for (const run of queued) {
        const pause = campaignQueuePause(run);
        if (!pause) continue;
        if (Date.parse(pause.resumeAt) > now.getTime()) {
            if (quotaPauseCodes.has(pause.code)) {
                return { paused: true, ...pause };
            }
            continue;
        }
        try {
            const result = await executePlatformEmailCampaign(run.campaignId, {
                source: run.errorLog.source ?? "auto",
                resumeOnly: true,
                deadline,
            });
            return {
                paused: result.paused ?? false,
                code: result.code,
                resumeAt: result.resumeAt,
                processed: true,
            };
        } catch (error) {
            if (error.message === "CAMPAIGN_ALREADY_RUNNING") return null;
            throw error;
        }
    }
    return null;
}

/** Reanuda primero el trabajo existente y respeta el tiempo máximo del cron. */
export async function runAllDueEmailCampaigns({ dryRun = false, now = new Date() } = {}) {
    const deadline = Date.now() + 42000;
    const resumed = dryRun ? null : await resumeQueuedCampaign(now, deadline);
    const empty = { skipped: true, results: [] };
    const canSchedule = (...completed) => (
        !resumed?.paused
        && !completed.some(({ results }) => results?.some((result) => result.paused && quotaPauseCodes.has(result.code)))
        && Date.now() + 5000 < deadline
    );
    const monthly = canSchedule() ? await runScheduledMonthlyCampaigns({ dryRun, now, deadline }) : empty;
    const weekly = canSchedule(monthly) ? await runScheduledWeeklyCampaigns({ dryRun, now, deadline }) : empty;
    const daily = canSchedule(monthly, weekly) ? await runScheduledDailyCampaigns({ dryRun, now, deadline }) : empty;
    const batches = [monthly, weekly, daily];
    return {
        ran: Boolean(resumed?.processed || batches.some((batch) => batch.results?.length)),
        paused: Boolean(resumed?.paused || batches.some((batch) => batch.results?.some((r) => r.paused))),
        resumed,
        monthly,
        weekly,
        daily,
        checkedAt: now.toISOString(),
    };
}

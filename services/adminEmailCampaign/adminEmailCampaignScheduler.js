import {
    executePlatformEmailCampaign,
    ensureSystemEmailCampaigns,
} from "./adminEmailCampaignSendService.js";
import { createAdminNotification } from "../adminNotificationService.js";
import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import userSuperAdmin from "../../superAdmin.js";
import { PROSPECT_OUTREACH_WEEKDAYS } from "./adminEmailCampaignConstants.js";
import {
    CHILE_TZ,
    getChileDateParts,
    getChileWeekday,
    getDayKey,
    getMonthKey,
} from "./adminEmailCampaignChileDate.js";

const general = new PrismaGeneral();
const CHECK_INTERVAL_MS = 15 * 60 * 1000;

function wasRunThisMonth(lastRunAt) {
    if (!lastRunAt) return false;
    return getMonthKey(new Date(lastRunAt)) === getMonthKey();
}

function wasRunToday(lastRunAt) {
    if (!lastRunAt) return false;
    return getDayKey(new Date(lastRunAt)) === getDayKey();
}

function getAutoRunDay(campaign) {
    const params = campaign.audienceParams ?? {};
    const fromCampaign = Number(params.autoRunDay);
    if (fromCampaign >= 1 && fromCampaign <= 28) return fromCampaign;
    const fromEnv = Number(process.env.AUTO_CAMPAIGN_RUN_DAY);
    if (fromEnv >= 1 && fromEnv <= 28) return fromEnv;
    return 5;
}

function getAutoRunWeekdays(campaign) {
    const fromParams = campaign.audienceParams?.autoRunWeekdays;
    if (Array.isArray(fromParams) && fromParams.length) {
        return fromParams.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);
    }
    return PROSPECT_OUTREACH_WEEKDAYS;
}

function getAutoRunHour() {
    const h = Number(process.env.AUTO_CAMPAIGN_RUN_HOUR);
    return Number.isFinite(h) && h >= 0 && h <= 23 ? h : 9;
}

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

async function runCampaignBatch(campaigns, { dryRun = false } = {}) {
    const results = [];

    for (const campaign of campaigns) {
        if (dryRun) {
            results.push({
                campaignId: campaign.campaignId,
                campaignKey: campaign.campaignKey,
                dryRun: true,
            });
            continue;
        }

        try {
            const result = await executePlatformEmailCampaign(campaign.campaignId, {
                source: "auto",
            });
            results.push({
                campaignId: campaign.campaignId,
                campaignKey: campaign.campaignKey,
                success: true,
                sent: result.run.sentCount,
                delivered: result.run.deliveredCount,
                failed: result.run.failedCount,
            });
        } catch (error) {
            if (error.message === "NO_RECIPIENTS") {
                results.push({
                    campaignId: campaign.campaignId,
                    campaignKey: campaign.campaignKey,
                    skipped: true,
                    reason: "NO_RECIPIENTS",
                });
                continue;
            }

            console.error(
                `[campaign-scheduler] Error en ${campaign.campaignKey ?? campaign.campaignId}:`,
                error.message,
            );
            await createAdminNotification({
                notificationType: "CAMPAIGN_FAILED",
                title: `Error automático: ${campaign.campaignName}`,
                message: error.message ?? "No se pudo ejecutar la campaña programada.",
                payload: {
                    campaignId: campaign.campaignId,
                    campaignKey: campaign.campaignKey,
                    source: "auto",
                },
                campaignId: campaign.campaignId,
            });
            results.push({
                campaignId: campaign.campaignId,
                error: error.message,
            });
        }
    }

    return results;
}

function isRunHour(nowParts) {
    return nowParts.hour === getAutoRunHour();
}

export async function runScheduledMonthlyCampaigns({ dryRun = false } = {}) {
    const superAdminId = await getSuperAdminUserId();
    if (!superAdminId) {
        console.warn("[campaign-scheduler] Sin super admin para asegurar campañas.");
        return { skipped: true, reason: "NO_SUPER_ADMIN" };
    }

    await ensureSystemEmailCampaigns(superAdminId);

    const campaigns = await general.platformEmailCampaign.findMany({
        where: {
            scheduleFrequency: "MONTHLY",
            campaignStatus: { in: ["DRAFT", "SCHEDULED", "SENT"] },
        },
    });

    const nowParts = getChileDateParts();
    const runHour = getAutoRunHour();

    if (!isRunHour(nowParts)) {
        return { skipped: true, reason: "NOT_RUN_HOUR", runHour, currentHour: nowParts.hour };
    }

    const dueCampaigns = campaigns.filter((campaign) => {
        const runDay = getAutoRunDay(campaign);
        if (nowParts.day !== runDay) return false;
        if (wasRunThisMonth(campaign.lastRunAt)) return false;
        return true;
    });

    if (!dueCampaigns.length) {
        return {
            skipped: true,
            reason: "NO_MONTHLY_DUE",
            runHour,
            today: nowParts.day,
        };
    }

    const results = await runCampaignBatch(dueCampaigns, { dryRun });

    return {
        skipped: false,
        frequency: "MONTHLY",
        results,
        runHour,
        monthKey: getMonthKey(),
    };
}

export async function runScheduledWeeklyCampaigns({ dryRun = false } = {}) {
    const superAdminId = await getSuperAdminUserId();
    if (!superAdminId) {
        return { skipped: true, reason: "NO_SUPER_ADMIN" };
    }

    await ensureSystemEmailCampaigns(superAdminId);

    const campaigns = await general.platformEmailCampaign.findMany({
        where: {
            scheduleFrequency: "WEEKLY",
            campaignStatus: { in: ["DRAFT", "SCHEDULED", "SENT"] },
        },
    });

    const nowParts = getChileDateParts();
    const runHour = getAutoRunHour();
    const weekday = getChileWeekday();

    if (!isRunHour(nowParts)) {
        return { skipped: true, reason: "NOT_RUN_HOUR", runHour, currentHour: nowParts.hour };
    }

    const dueCampaigns = campaigns.filter((campaign) => {
        const runDays = getAutoRunWeekdays(campaign);
        if (!runDays.includes(weekday)) return false;
        if (wasRunToday(campaign.lastRunAt)) return false;
        return true;
    });

    if (!dueCampaigns.length) {
        return {
            skipped: true,
            reason: "NO_WEEKLY_DUE",
            runHour,
            weekday,
            dayKey: getDayKey(),
        };
    }

    const results = await runCampaignBatch(dueCampaigns, { dryRun });

    return {
        skipped: false,
        frequency: "WEEKLY",
        results,
        runHour,
        weekday,
        dayKey: getDayKey(),
    };
}

export async function runScheduledDailyCampaigns({ dryRun = false } = {}) {
    const superAdminId = await getSuperAdminUserId();
    if (!superAdminId) {
        return { skipped: true, reason: "NO_SUPER_ADMIN" };
    }

    await ensureSystemEmailCampaigns(superAdminId);

    const campaigns = await general.platformEmailCampaign.findMany({
        where: {
            scheduleFrequency: "DAILY",
            campaignStatus: { in: ["DRAFT", "SCHEDULED", "SENT"] },
        },
    });

    const nowParts = getChileDateParts();
    const runHour = getAutoRunHour();

    if (!isRunHour(nowParts)) {
        return { skipped: true, reason: "NOT_RUN_HOUR", runHour, currentHour: nowParts.hour };
    }

    const dueCampaigns = campaigns.filter((campaign) => !wasRunToday(campaign.lastRunAt));

    if (!dueCampaigns.length) {
        return {
            skipped: true,
            reason: "NO_DAILY_DUE",
            runHour,
            dayKey: getDayKey(),
        };
    }

    const results = await runCampaignBatch(dueCampaigns, { dryRun });

    return {
        skipped: false,
        frequency: "DAILY",
        results,
        runHour,
        dayKey: getDayKey(),
    };
}

async function tick() {
    if (schedulerRunning) return;
    schedulerRunning = true;
    try {
        const monthly = await runScheduledMonthlyCampaigns();
        const weekly = await runScheduledWeeklyCampaigns();
        const daily = await runScheduledDailyCampaigns();

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
        return;
    }

    const runDay = Number(process.env.AUTO_CAMPAIGN_RUN_DAY) || 5;
    const runHour = getAutoRunHour();
    console.info(
        `[campaign-scheduler] Activo — mensual día ${runDay}, semanal lun/mié/dom, diario todos los días a las ${runHour}:00 (${CHILE_TZ})`,
    );

    setTimeout(tick, 5000);
    intervalHandle = setInterval(tick, CHECK_INTERVAL_MS);
}

export function stopEmailCampaignScheduler() {
    if (intervalHandle) clearInterval(intervalHandle);
}

import { PROSPECT_OUTREACH_WEEKDAYS } from "./adminEmailCampaignConstants.js";
import {
    getChileDateParts,
    getChileWeekday,
    getDayKey,
    getMonthKey,
} from "./adminEmailCampaignChileDate.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function getAutoRunHour() {
    const h = Number(process.env.AUTO_CAMPAIGN_RUN_HOUR);
    return Number.isFinite(h) && h >= 0 && h <= 23 ? h : 9;
}

export function wasRunToday(lastRunAt, now = new Date()) {
    if (!lastRunAt) return false;
    return getDayKey(new Date(lastRunAt)) === getDayKey(now);
}

export function wasRunThisMonth(lastRunAt, now = new Date()) {
    if (!lastRunAt) return false;
    return getMonthKey(new Date(lastRunAt)) === getMonthKey(now);
}

export function getAutoRunDay(campaign) {
    const params = campaign.audienceParams ?? {};
    const fromCampaign = Number(params.autoRunDay);
    if (fromCampaign >= 1 && fromCampaign <= 28) return fromCampaign;
    const fromEnv = Number(process.env.AUTO_CAMPAIGN_RUN_DAY);
    if (fromEnv >= 1 && fromEnv <= 28) return fromEnv;
    return 5;
}

export function getAutoRunWeekdays(campaign) {
    const fromParams = campaign.audienceParams?.autoRunWeekdays;
    if (Array.isArray(fromParams) && fromParams.length) {
        return fromParams.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);
    }
    return PROSPECT_OUTREACH_WEEKDAYS;
}

/**
 * Último día programado (lun/mié/vie, etc.) que debió ejecutarse y aún no tiene envío.
 */
export function getLatestDueWeeklySlot(runDays, lastRunAt, now = new Date()) {
    const lastRunKey = lastRunAt ? getDayKey(new Date(lastRunAt)) : null;

    for (let offset = 0; offset <= 7; offset += 1) {
        const date = new Date(now.getTime() - offset * MS_PER_DAY);
        const weekday = getChileWeekday(date);
        if (!runDays.includes(weekday)) continue;

        const dayKey = getDayKey(date);
        if (!lastRunKey || lastRunKey < dayKey) {
            return {
                dayKey,
                weekday,
                daysAgo: offset,
                isCatchUp: offset > 0,
            };
        }
        return null;
    }

    return null;
}

export function evaluateWeeklyCampaignDue(campaign, now = new Date()) {
    if (wasRunToday(campaign.lastRunAt, now)) {
        return { due: false, reason: "ALREADY_RAN_TODAY" };
    }

    const runDays = getAutoRunWeekdays(campaign);
    const slot = getLatestDueWeeklySlot(runDays, campaign.lastRunAt, now);
    if (!slot) {
        return { due: false, reason: "NO_WEEKLY_DUE" };
    }

    const runHour = getAutoRunHour();
    const nowParts = getChileDateParts(now);
    const todayKey = getDayKey(now);

    if (slot.dayKey < todayKey) {
        return { due: true, reason: "CATCH_UP", slot, runHour };
    }

    if (nowParts.hour >= runHour) {
        return { due: true, reason: "SCHEDULED_TODAY", slot, runHour };
    }

    return {
        due: false,
        reason: "NOT_RUN_HOUR",
        runHour,
        currentHour: nowParts.hour,
        slot,
    };
}

export function evaluateDailyCampaignDue(campaign, now = new Date()) {
    if (wasRunToday(campaign.lastRunAt, now)) {
        return { due: false, reason: "ALREADY_RAN_TODAY" };
    }

    const runHour = getAutoRunHour();
    const nowParts = getChileDateParts(now);
    const todayKey = getDayKey(now);
    const lastRunKey = campaign.lastRunAt ? getDayKey(new Date(campaign.lastRunAt)) : null;
    const missedPriorDay = Boolean(lastRunKey && lastRunKey < todayKey);

    if (missedPriorDay || nowParts.hour >= runHour) {
        return {
            due: true,
            reason: missedPriorDay && nowParts.hour < runHour ? "CATCH_UP" : "DAILY_DUE",
            runHour,
            lastRunKey,
        };
    }

    return {
        due: false,
        reason: "NOT_RUN_HOUR",
        runHour,
        currentHour: nowParts.hour,
    };
}

export function evaluateMonthlyCampaignDue(campaign, now = new Date()) {
    if (wasRunThisMonth(campaign.lastRunAt, now)) {
        return { due: false, reason: "ALREADY_RAN_THIS_MONTH" };
    }

    const runDay = getAutoRunDay(campaign);
    const nowParts = getChileDateParts(now);
    const runHour = getAutoRunHour();

    if (nowParts.day < runDay) {
        return { due: false, reason: "BEFORE_RUN_DAY", runDay };
    }

    const missedRunDay = nowParts.day > runDay;

    if (missedRunDay || nowParts.hour >= runHour) {
        return {
            due: true,
            reason: missedRunDay && nowParts.hour < runHour ? "CATCH_UP" : "MONTHLY_DUE",
            runDay,
            runHour,
        };
    }

    return {
        due: false,
        reason: "NOT_RUN_HOUR",
        runHour,
        currentHour: nowParts.hour,
        runDay,
    };
}

export function evaluateCampaignDue(campaign, now = new Date()) {
    switch (campaign.scheduleFrequency) {
        case "WEEKLY":
            return evaluateWeeklyCampaignDue(campaign, now);
        case "DAILY":
            return evaluateDailyCampaignDue(campaign, now);
        case "MONTHLY":
            return evaluateMonthlyCampaignDue(campaign, now);
        default:
            return { due: false, reason: "UNSUPPORTED_FREQUENCY" };
    }
}

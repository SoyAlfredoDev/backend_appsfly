import { evaluateCampaignDue } from "./adminEmailCampaignSchedulerDue.js";
import { PROSPECT_OUTREACH_WEEKDAYS } from "./adminEmailCampaignConstants.js";

export function isProductionServerless() {
    return process.env.VERCEL === "1";
}

export function isLocalSchedulerActive() {
    return !isProductionServerless() && process.env.DISABLE_CAMPAIGN_SCHEDULER !== "true";
}

export function buildAutoScheduleMeta(campaign) {
    return {
        localSchedulerActive: isLocalSchedulerActive(),
        productionUsesCron: isProductionServerless(),
        cronConfigured: Boolean(process.env.CRON_SECRET),
        hour: Number(process.env.AUTO_CAMPAIGN_RUN_HOUR) || 9,
        timezone: "America/Santiago",
        frequency: campaign.scheduleFrequency,
        autoRunWeekdays:
            campaign.scheduleFrequency === "WEEKLY"
                ? campaign.audienceParams?.autoRunWeekdays ?? PROSPECT_OUTREACH_WEEKDAYS
                : null,
    };
}

export function enrichCampaignScheduleMeta(campaign, now = new Date()) {
    const scheduleEligibility = evaluateCampaignDue(campaign, now);
    const autoSchedule = buildAutoScheduleMeta(campaign);

    return {
        ...campaign,
        scheduleEligibility,
        autoSchedule,
        needsManualSend:
            scheduleEligibility.due
            && !isLocalSchedulerActive(),
    };
}

export function enrichCampaignsScheduleMeta(campaigns, now = new Date()) {
    return campaigns.map((campaign) => enrichCampaignScheduleMeta(campaign, now));
}

export function summarizeDueCampaigns(campaigns) {
    const due = campaigns.filter((c) => c.scheduleEligibility?.due);
    return {
        dueCount: due.length,
        dueCampaigns: due.map((c) => ({
            campaignId: c.campaignId,
            campaignKey: c.campaignKey,
            campaignName: c.campaignName,
            audienceType: c.audienceType,
            scheduleEligibility: c.scheduleEligibility,
            needsManualSend: c.needsManualSend,
            lastRunAt: c.lastRunAt,
        })),
        localSchedulerActive: isLocalSchedulerActive(),
        productionUsesCron: isProductionServerless(),
    };
}

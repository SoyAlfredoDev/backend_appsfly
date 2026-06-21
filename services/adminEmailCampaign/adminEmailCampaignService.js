import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import {
    PLATFORM_EMAIL_AUDIENCE_TYPES,
    PLATFORM_EMAIL_CAMPAIGN_STATUSES,
    PLATFORM_EMAIL_AUDIENCE_LABELS,
} from "./adminEmailCampaignConstants.js";
import { countAudienceByType } from "./adminEmailCampaignAudienceService.js";
import { getSenderMetadata } from "./adminEmailCampaignSenderService.js";

const general = new PrismaGeneral();

const campaignInclude = {
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
        take: 10,
        include: {
            _count: { select: { recipients: true } },
        },
    },
};

function normalizeCampaign(row) {
    if (!row) return null;
    return {
        ...row,
        audienceParams: row.audienceParams ?? null,
    };
}

export async function listPlatformEmailCampaignsService() {
    const rows = await general.platformEmailCampaign.findMany({
        include: campaignInclude,
        orderBy: { updatedAt: "desc" },
    });
    return rows.map(normalizeCampaign);
}

export async function getPlatformEmailCampaignByIdService(campaignId) {
    const row = await general.platformEmailCampaign.findUnique({
        where: { campaignId },
        include: campaignInclude,
    });
    return normalizeCampaign(row);
}

export async function getPlatformEmailCampaignByKeyService(campaignKey) {
    const row = await general.platformEmailCampaign.findUnique({
        where: { campaignKey },
        include: campaignInclude,
    });
    return normalizeCampaign(row);
}

export async function createPlatformEmailCampaignService(data) {
    const row = await general.platformEmailCampaign.create({
        data,
        include: campaignInclude,
    });
    return normalizeCampaign(row);
}

export async function updatePlatformEmailCampaignService(campaignId, data) {
    const row = await general.platformEmailCampaign.update({
        where: { campaignId },
        data,
        include: campaignInclude,
    });
    return normalizeCampaign(row);
}

export async function deletePlatformEmailCampaignService(campaignId) {
    return general.platformEmailCampaign.delete({
        where: { campaignId },
    });
}

export async function countAudiencePreviewService(audienceType) {
    return countAudienceByType(audienceType);
}

export function getCampaignMetadata() {
    return {
        statuses: PLATFORM_EMAIL_CAMPAIGN_STATUSES,
        audienceTypes: PLATFORM_EMAIL_AUDIENCE_TYPES.map((value) => ({
            value,
            label: PLATFORM_EMAIL_AUDIENCE_LABELS[value] ?? value,
        })),
        sender: getSenderMetadata(),
    };
}

export async function getCampaignRunDetailService(runId) {
    return general.platformEmailCampaignRun.findUnique({
        where: { runId },
        include: {
            campaign: { select: { campaignId: true, campaignName: true, campaignKey: true } },
            recipients: {
                orderBy: { createdAt: "desc" },
                take: 100,
            },
        },
    });
}

import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { SYSTEM_CAMPAIGN_WEEKLY_PROSPECTS } from "./adminEmailCampaignConstants.js";
import { PROSPECT_OUTREACH_VARIANTS } from "./adminEmailCampaignProspectTemplate.js";

const general = new PrismaGeneral();

async function getProspectCampaignId() {
    const campaign = await general.platformEmailCampaign.findUnique({
        where: { campaignKey: SYSTEM_CAMPAIGN_WEEKLY_PROSPECTS.campaignKey },
        select: { campaignId: true },
    });
    return campaign?.campaignId ?? null;
}

export async function getProspectOutreachVariantStats() {
    const campaignId = await getProspectCampaignId();
    const empty = Object.fromEntries(
        PROSPECT_OUTREACH_VARIANTS.map((variant) => [
            variant.id,
            { sent: 0, delivered: 0, opened: 0, failed: 0, openRate: 0 },
        ]),
    );

    if (!campaignId) {
        return { campaignId: null, variants: empty, totals: { sent: 0, opened: 0, openRate: 0 } };
    }

    const recipients = await general.platformEmailCampaignRecipient.findMany({
        where: {
            messageVariantId: { not: null },
            run: { campaignId },
        },
        select: {
            messageVariantId: true,
            deliveryStatus: true,
            openedAt: true,
        },
    });

    const stats = { ...empty };

    for (const row of recipients) {
        const id = row.messageVariantId;
        if (!stats[id]) continue;

        if (row.deliveryStatus === "FAILED" || row.deliveryStatus === "BOUNCED") {
            stats[id].failed += 1;
            continue;
        }

        if (row.deliveryStatus === "SENT" || row.deliveryStatus === "DELIVERED" || row.openedAt) {
            stats[id].sent += 1;
        }
        if (row.deliveryStatus === "DELIVERED" || row.openedAt) {
            stats[id].delivered += 1;
        }
        if (row.openedAt) {
            stats[id].opened += 1;
        }
    }

    let totalSent = 0;
    let totalOpened = 0;

    for (const variant of PROSPECT_OUTREACH_VARIANTS) {
        const row = stats[variant.id];
        row.openRate = row.sent > 0 ? Math.round((row.opened / row.sent) * 1000) / 10 : 0;
        totalSent += row.sent;
        totalOpened += row.opened;
    }

    return {
        campaignId,
        variants: stats,
        totals: {
            sent: totalSent,
            opened: totalOpened,
            openRate: totalSent > 0 ? Math.round((totalOpened / totalSent) * 1000) / 10 : 0,
        },
    };
}

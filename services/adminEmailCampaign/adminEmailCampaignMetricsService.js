import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";

const general = new PrismaGeneral();

const SENT_STATUSES = ["SENT", "DELIVERED", "BOUNCED"];

/**
 * Recalcula contadores de un run desde sus recipients (fuente de verdad tras webhooks).
 */
export async function syncRunMetricsFromRecipients(runId) {
    const recipients = await general.platformEmailCampaignRecipient.findMany({
        where: { runId },
        select: {
            deliveryStatus: true,
            openedAt: true,
        },
    });

    let sentCount = 0;
    let deliveredCount = 0;
    let failedCount = 0;
    let bouncedCount = 0;
    let openedCount = 0;

    for (const r of recipients) {
        if (SENT_STATUSES.includes(r.deliveryStatus)) sentCount += 1;
        if (r.deliveryStatus === "DELIVERED") deliveredCount += 1;
        if (r.deliveryStatus === "FAILED") failedCount += 1;
        if (r.deliveryStatus === "BOUNCED") bouncedCount += 1;
        if (r.openedAt) openedCount += 1;
    }

    const run = await general.platformEmailCampaignRun.update({
        where: { runId },
        data: {
            sentCount,
            deliveredCount,
            failedCount,
            bouncedCount,
            openedCount,
        },
    });

    await syncCampaignMetricsFromRuns(run.campaignId);

    return run;
}

/**
 * Recalcula totales de campaña sumando todos los runs.
 */
export async function syncCampaignMetricsFromRuns(campaignId) {
    const agg = await general.platformEmailCampaignRun.aggregate({
        where: { campaignId },
        _sum: {
            sentCount: true,
            deliveredCount: true,
            failedCount: true,
            bouncedCount: true,
            openedCount: true,
            recipientCount: true,
        },
    });

    return general.platformEmailCampaign.update({
        where: { campaignId },
        data: {
            totalRecipients: agg._sum.recipientCount ?? 0,
            totalSent: agg._sum.sentCount ?? 0,
            totalDelivered: agg._sum.deliveredCount ?? 0,
            totalFailed: agg._sum.failedCount ?? 0,
            totalBounced: agg._sum.bouncedCount ?? 0,
            totalOpened: agg._sum.openedCount ?? 0,
        },
    });
}

export function buildDeliveryTotals(campaignOrTotals) {
    const sent = campaignOrTotals.totalSent ?? campaignOrTotals.sent ?? 0;
    const delivered = campaignOrTotals.totalDelivered ?? campaignOrTotals.delivered ?? 0;
    const failed = campaignOrTotals.totalFailed ?? campaignOrTotals.failed ?? 0;
    const bounced = campaignOrTotals.totalBounced ?? campaignOrTotals.bounced ?? 0;
    const opened = campaignOrTotals.totalOpened ?? campaignOrTotals.opened ?? 0;
    const rejected = failed + bounced;
    const notOpened = Math.max(0, delivered - opened);

    return {
        sent,
        delivered,
        failed,
        bounced,
        rejected,
        opened,
        notOpened,
    };
}

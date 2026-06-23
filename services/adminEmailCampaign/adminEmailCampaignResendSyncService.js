import { Resend } from "resend";
import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { syncRunMetricsFromRecipients } from "./adminEmailCampaignMetricsService.js";

const general = new PrismaGeneral();
const resend = new Resend(process.env.RESEND_API_KEY);

const SYNC_BATCH_SIZE = 100;
const SYNC_CONCURRENCY = 8;
const STALE_MINUTES = 1;

function mapLastEventToDeliveryStatus(lastEvent) {
    switch (lastEvent) {
        case "delivered":
        case "opened":
        case "clicked":
            return "DELIVERED";
        case "bounced":
        case "complained":
        case "suppressed":
            return "BOUNCED";
        case "failed":
            return "FAILED";
        case "sent":
        case "queued":
        case "scheduled":
        case "delivery_delayed":
            return "SENT";
        default:
            return null;
    }
}

async function applyResendEmailStatus(recipient, emailData) {
    const lastEvent = emailData?.last_event;
    const mappedStatus = mapLastEventToDeliveryStatus(lastEvent);
    if (!mappedStatus) return false;

    const updates = {};
    let changed = false;

    if (
        mappedStatus === "DELIVERED"
        && recipient.deliveryStatus !== "DELIVERED"
        && recipient.deliveryStatus !== "BOUNCED"
        && recipient.deliveryStatus !== "FAILED"
    ) {
        updates.deliveryStatus = "DELIVERED";
        updates.deliveredAt = recipient.deliveredAt ?? new Date();
        changed = true;
    }

    if (mappedStatus === "BOUNCED" && recipient.deliveryStatus !== "BOUNCED") {
        updates.deliveryStatus = "BOUNCED";
        updates.bouncedAt = new Date();
        updates.errorMessage = updates.errorMessage ?? "Rechazado por el proveedor";
        changed = true;
    }

    if (
        mappedStatus === "FAILED"
        && recipient.deliveryStatus !== "FAILED"
        && recipient.deliveryStatus !== "BOUNCED"
    ) {
        updates.deliveryStatus = "FAILED";
        updates.errorMessage = updates.errorMessage ?? "Error de envío en Resend";
        changed = true;
    }

    if (
        (lastEvent === "opened" || lastEvent === "clicked")
        && !recipient.openedAt
    ) {
        updates.openedAt = new Date();
        updates.openCount = { increment: 1 };
        changed = true;
    }

    if (!changed) return false;

    await general.platformEmailCampaignRecipient.update({
        where: { recipientId: recipient.recipientId },
        data: updates,
    });
    return true;
}

async function fetchAndApplyRecipientStatus(recipient) {
    const { data, error } = await resend.emails.get(recipient.providerMessageId);
    if (error || !data) {
        return false;
    }
    return applyResendEmailStatus(recipient, data);
}

/**
 * Consulta Resend por correos aún en SENT/PENDING y actualiza entrega/apertura en BD.
 * Cubre el caso en que los webhooks no llegaron al servidor.
 */
export async function syncPendingRecipientsFromResend({
    campaignId = null,
    runId = null,
    maxAgeDays = 30,
} = {}) {
    if (!process.env.RESEND_API_KEY?.trim()) {
        return { synced: 0, checked: 0, runsUpdated: 0, reason: "no_api_key" };
    }

    const cutoff = new Date(Date.now() - maxAgeDays * 24 * 60 * 60 * 1000);
    const recentCutoff = new Date(Date.now() - STALE_MINUTES * 60 * 1000);

    const where = {
        providerMessageId: { not: null },
        deliveryStatus: { in: ["SENT", "PENDING"] },
        sentAt: { gte: cutoff, lte: recentCutoff },
    };

    if (runId) {
        where.runId = runId;
    }
    if (campaignId) {
        where.run = { campaignId };
    }

    const recipients = await general.platformEmailCampaignRecipient.findMany({
        where,
        select: {
            recipientId: true,
            runId: true,
            providerMessageId: true,
            deliveryStatus: true,
            deliveredAt: true,
            openedAt: true,
            openCount: true,
        },
        take: SYNC_BATCH_SIZE,
        orderBy: { sentAt: "desc" },
    });

    const touchedRuns = new Set();
    let synced = 0;

    for (let index = 0; index < recipients.length; index += SYNC_CONCURRENCY) {
        const chunk = recipients.slice(index, index + SYNC_CONCURRENCY);
        const results = await Promise.all(
            chunk.map(async (recipient) => {
                try {
                    return await fetchAndApplyRecipientStatus(recipient);
                } catch (error) {
                    console.warn(
                        "[resend-sync] Error consultando email:",
                        recipient.providerMessageId,
                        error.message,
                    );
                    return false;
                }
            }),
        );

        results.forEach((changed, chunkIndex) => {
            if (!changed) return;
            synced += 1;
            touchedRuns.add(chunk[chunkIndex].runId);
        });
    }

    for (const touchedRunId of touchedRuns) {
        await syncRunMetricsFromRecipients(touchedRunId);
    }

    return {
        synced,
        checked: recipients.length,
        runsUpdated: touchedRuns.size,
        hasMore: recipients.length === SYNC_BATCH_SIZE,
    };
}

export async function syncCampaignDeliveryFromResend(campaignId, options = {}) {
    let totalSynced = 0;
    let totalChecked = 0;
    let iterations = 0;
    const maxIterations = options.maxIterations ?? 5;

    while (iterations < maxIterations) {
        const result = await syncPendingRecipientsFromResend({ campaignId, ...options });
        totalSynced += result.synced ?? 0;
        totalChecked += result.checked ?? 0;
        iterations += 1;
        if (!result.hasMore || result.synced === 0) break;
    }

    return { synced: totalSynced, checked: totalChecked, iterations };
}

/**
 * Sincroniza campañas recientes con enviados > entregados (totales desactualizados).
 */
export async function syncStaleCampaignDeliveriesFromResend({ limit = 3 } = {}) {
    const campaigns = await general.platformEmailCampaign.findMany({
        where: {
            totalSent: { gt: 0 },
            lastRunAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
        select: {
            campaignId: true,
            totalSent: true,
            totalDelivered: true,
        },
        orderBy: { lastRunAt: "desc" },
        take: 20,
    });

    const stale = campaigns.filter(
        (campaign) => (campaign.totalDelivered ?? 0) < (campaign.totalSent ?? 0),
    );

    let campaignsSynced = 0;
    for (const campaign of stale.slice(0, limit)) {
        const result = await syncCampaignDeliveryFromResend(campaign.campaignId, {
            maxIterations: 3,
        });
        if (result.synced > 0) {
            campaignsSynced += 1;
        }
    }

    return { campaignsChecked: stale.length, campaignsSynced };
}

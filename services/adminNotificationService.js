import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";

const general = new PrismaGeneral();

export async function createAdminNotification({
    notificationType,
    title,
    message,
    payload = null,
    campaignId = null,
}) {
    return general.platformAdminNotification.create({
        data: {
            notificationType,
            title,
            message,
            payload,
            campaignId,
        },
    });
}

export async function listAdminNotifications({ limit = 50, unreadOnly = false } = {}) {
    return general.platformAdminNotification.findMany({
        where: unreadOnly ? { isRead: false } : undefined,
        orderBy: { createdAt: "desc" },
        take: limit,
    });
}

export async function countUnreadAdminNotifications() {
    return general.platformAdminNotification.count({ where: { isRead: false } });
}

export async function markNotificationRead(notificationId) {
    return general.platformAdminNotification.update({
        where: { notificationId },
        data: { isRead: true },
    });
}

export async function markAllNotificationsRead() {
    return general.platformAdminNotification.updateMany({
        where: { isRead: false },
        data: { isRead: true },
    });
}

export async function clearReadNotifications() {
    return general.platformAdminNotification.deleteMany({
        where: { isRead: true },
    });
}

export async function clearAllNotifications() {
    return general.platformAdminNotification.deleteMany();
}

export function buildCampaignSuccessNotification(campaign, run) {
    const name = campaign.campaignName ?? "Campaña";
    const sent = run.sentCount ?? 0;
    const delivered = run.deliveredCount ?? 0;
    const failed = run.failedCount ?? 0;
    const bounced = run.bouncedCount ?? 0;
    const opened = run.openedCount ?? 0;
    const rejected = failed + bounced;
    const notOpened = Math.max(0, delivered - opened);
    const total = run.recipientCount ?? 0;

    return {
        notificationType: failed === total && total > 0 ? "CAMPAIGN_FAILED" : "CAMPAIGN_SUCCESS",
        title:
            failed === total && total > 0
                ? `Campaña fallida: ${name}`
                : `Campaña enviada: ${name}`,
        message: `Procesados ${total} destinatarios. Enviados: ${sent}. Entregados: ${delivered}. Rechazados: ${rejected}. Leídos: ${opened}. Sin leer (entregados): ${notOpened}.`,
        payload: {
            campaignId: campaign.campaignId,
            campaignKey: campaign.campaignKey,
            campaignName: name,
            runId: run.runId,
            recipientCount: total,
            sentCount: sent,
            deliveredCount: delivered,
            failedCount: failed,
            bouncedCount: bounced,
            openedCount: opened,
            notOpenedCount: notOpened,
            runStatus: run.runStatus,
            completedAt: run.completedAt,
        },
        campaignId: campaign.campaignId,
    };
}

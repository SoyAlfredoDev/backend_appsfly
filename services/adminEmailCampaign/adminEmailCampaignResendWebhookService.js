import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { syncRunMetricsFromRecipients } from "./adminEmailCampaignMetricsService.js";

const general = new PrismaGeneral();

function parseBounceMessage(data) {
    const bounce = data?.bounce;
    if (!bounce) return data?.error ?? "Rechazado por el proveedor";
    const parts = [bounce.type, bounce.message].filter(Boolean);
    return parts.join(": ") || "Rechazado por el proveedor";
}

async function findRecipientByProviderMessageId(emailId) {
    if (!emailId) return null;
    return general.platformEmailCampaignRecipient.findFirst({
        where: { providerMessageId: emailId },
        select: {
            recipientId: true,
            runId: true,
            deliveryStatus: true,
            openedAt: true,
            openCount: true,
            deliveredAt: true,
        },
    });
}

async function findRecipientForWebhookEvent(data) {
    const emailId = data?.email_id;
    if (emailId) {
        const byId = await findRecipientByProviderMessageId(emailId);
        if (byId) return byId;
    }

    const toList = Array.isArray(data?.to) ? data.to : data?.to ? [data.to] : [];
    const normalizedEmail = String(toList[0] ?? "").trim().toLowerCase();
    if (!normalizedEmail) return null;

    return general.platformEmailCampaignRecipient.findFirst({
        where: {
            recipientEmail: normalizedEmail,
            providerMessageId: { not: null },
            deliveryStatus: { in: ["PENDING", "SENT", "DELIVERED"] },
            sentAt: { gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
        },
        orderBy: { sentAt: "desc" },
        select: {
            recipientId: true,
            runId: true,
            deliveryStatus: true,
            openedAt: true,
            openCount: true,
            deliveredAt: true,
        },
    });
}

async function handleEmailSent(recipient, data) {
    if (recipient.deliveryStatus === "PENDING" || recipient.deliveryStatus === "FAILED") {
        await general.platformEmailCampaignRecipient.update({
            where: { recipientId: recipient.recipientId },
            data: {
                deliveryStatus: "SENT",
                providerMessageId: data?.email_id ?? undefined,
                sentAt: recipient.sentAt ?? new Date(),
            },
        });
        await syncRunMetricsFromRecipients(recipient.runId);
    }
}

async function handleEmailDelivered(recipient) {
    if (recipient.deliveryStatus === "BOUNCED" || recipient.deliveryStatus === "FAILED") {
        return;
    }
    await general.platformEmailCampaignRecipient.update({
        where: { recipientId: recipient.recipientId },
        data: {
            deliveryStatus: "DELIVERED",
            deliveredAt: new Date(),
        },
    });
    await syncRunMetricsFromRecipients(recipient.runId);
}

async function handleEmailBounced(recipient, data) {
    await general.platformEmailCampaignRecipient.update({
        where: { recipientId: recipient.recipientId },
        data: {
            deliveryStatus: "BOUNCED",
            bouncedAt: new Date(),
            errorMessage: parseBounceMessage(data),
        },
    });
    await syncRunMetricsFromRecipients(recipient.runId);
}

async function handleEmailOpened(recipient) {
    const now = new Date();
    const data = {
        openedAt: recipient.openedAt ?? now,
        openCount: { increment: 1 },
    };

    if (
        recipient.deliveryStatus === "PENDING"
        || recipient.deliveryStatus === "SENT"
    ) {
        data.deliveryStatus = "DELIVERED";
        data.deliveredAt = recipient.deliveredAt ?? now;
    }

    await general.platformEmailCampaignRecipient.update({
        where: { recipientId: recipient.recipientId },
        data,
    });
    await syncRunMetricsFromRecipients(recipient.runId);
}

async function handleEmailComplained(recipient, data) {
    await general.platformEmailCampaignRecipient.update({
        where: { recipientId: recipient.recipientId },
        data: {
            deliveryStatus: "BOUNCED",
            bouncedAt: new Date(),
            errorMessage: data?.complaint?.type
                ? `Queja: ${data.complaint.type}`
                : "Marcado como spam por el destinatario",
        },
    });
    await syncRunMetricsFromRecipients(recipient.runId);
}

/**
 * Procesa un evento de webhook Resend (email.sent, delivered, bounced, opened, etc.).
 */
export async function processResendEmailWebhookEvent(event) {
    const type = event?.type;
    const data = event?.data ?? {};
    const emailId = data.email_id;

    if (!type || !emailId) {
        return { handled: false, reason: "missing_type_or_email_id" };
    }

    const recipient = await findRecipientForWebhookEvent(data);
    if (!recipient) {
        return { handled: false, reason: "recipient_not_found", emailId, type };
    }

    switch (type) {
        case "email.sent":
            await handleEmailSent(recipient, data);
            break;
        case "email.delivered":
            await handleEmailDelivered(recipient);
            break;
        case "email.bounced":
            await handleEmailBounced(recipient, data);
            break;
        case "email.opened":
            await handleEmailOpened(recipient);
            break;
        case "email.complained":
            await handleEmailComplained(recipient, data);
            break;
        case "email.failed":
            await general.platformEmailCampaignRecipient.update({
                where: { recipientId: recipient.recipientId },
                data: {
                    deliveryStatus: "FAILED",
                    errorMessage: data?.error ?? "Error de envío en Resend",
                },
            });
            await syncRunMetricsFromRecipients(recipient.runId);
            break;
        case "email.delivery_delayed":
            // Sin cambio de estado; el correo sigue en tránsito.
            break;
        default:
            return { handled: false, reason: "unsupported_type", type, emailId };
    }

    return { handled: true, type, emailId, recipientId: recipient.recipientId };
}

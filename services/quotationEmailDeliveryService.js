import { Resend } from "resend";
import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";
import { getPrismaForBusinessId } from "../db.js";
import {
    mapLastEventToDeliveryStatus,
    parseResendBounceMessage,
} from "./emailDelivery/resendDeliveryMapping.js";

const general = new PrismaGeneral();
const resend = process.env.RESEND_API_KEY?.trim()
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const STALE_MINUTES = 1;

export async function registerQuotationEmailDispatch({
    businessId,
    quotationId,
    providerMessageId,
    recipientEmail,
}) {
    if (!providerMessageId) return;

    await general.quotationEmailDispatchIndex.upsert({
        where: { providerMessageId },
        create: {
            businessId,
            quotationId,
            providerMessageId,
            recipientEmail: recipientEmail.trim().toLowerCase(),
        },
        update: {
            businessId,
            quotationId,
            recipientEmail: recipientEmail.trim().toLowerCase(),
        },
    });
}

export async function markQuotationEmailSent({
    quotationId,
    businessId,
    providerMessageId,
    recipientEmail,
    prisma,
}) {
    const now = new Date();
    await prisma.quotation.update({
        where: { quotationId },
        data: {
            quotationEmailDeliveryStatus: "SENT",
            quotationEmailProviderMessageId: providerMessageId ?? null,
            quotationEmailSentTo: recipientEmail.trim().toLowerCase(),
            quotationEmailSentAt: now,
            quotationEmailDeliveredAt: null,
            quotationEmailOpenedAt: null,
            quotationEmailErrorMessage: null,
        },
    });

    if (providerMessageId) {
        await registerQuotationEmailDispatch({
            businessId,
            quotationId,
            providerMessageId,
            recipientEmail,
        });
    }
}

export async function markQuotationEmailFailed({
    quotationId,
    recipientEmail,
    errorMessage,
    prisma,
}) {
    await prisma.quotation.update({
        where: { quotationId },
        data: {
            quotationEmailDeliveryStatus: "FAILED",
            quotationEmailSentTo: recipientEmail?.trim().toLowerCase() ?? null,
            quotationEmailSentAt: new Date(),
            quotationEmailErrorMessage: errorMessage ?? "Error al enviar el correo",
        },
    });
}

async function findDispatchIndexByProviderMessageId(providerMessageId) {
    if (!providerMessageId) return null;
    return general.quotationEmailDispatchIndex.findUnique({
        where: { providerMessageId },
    });
}

async function getQuotationEmailTracking(quotationId, prisma) {
    return prisma.quotation.findUnique({
        where: { quotationId },
        select: {
            quotationEmailDeliveryStatus: true,
            quotationEmailProviderMessageId: true,
            quotationEmailSentTo: true,
            quotationEmailSentAt: true,
            quotationEmailDeliveredAt: true,
            quotationEmailOpenedAt: true,
            quotationEmailErrorMessage: true,
        },
    });
}

async function applyDeliveryUpdates(quotationId, prisma, updates) {
    if (!updates || Object.keys(updates).length === 0) return false;

    await prisma.quotation.update({
        where: { quotationId },
        data: updates,
    });
    return true;
}

export async function applyResendStatusToQuotation(quotation, emailData, prisma) {
    const lastEvent = emailData?.last_event;
    const mappedStatus = mapLastEventToDeliveryStatus(lastEvent);
    if (!mappedStatus || !quotation) return false;

    const currentStatus = quotation.quotationEmailDeliveryStatus;
    const updates = {};
    let changed = false;

    if (
        mappedStatus === "DELIVERED"
        && currentStatus !== "DELIVERED"
        && currentStatus !== "BOUNCED"
        && currentStatus !== "FAILED"
    ) {
        updates.quotationEmailDeliveryStatus = "DELIVERED";
        updates.quotationEmailDeliveredAt = quotation.quotationEmailDeliveredAt ?? new Date();
        changed = true;
    }

    if (mappedStatus === "BOUNCED" && currentStatus !== "BOUNCED") {
        updates.quotationEmailDeliveryStatus = "BOUNCED";
        updates.quotationEmailErrorMessage =
            quotation.quotationEmailErrorMessage ?? "Rechazado por el proveedor";
        changed = true;
    }

    if (
        mappedStatus === "FAILED"
        && currentStatus !== "FAILED"
        && currentStatus !== "BOUNCED"
    ) {
        updates.quotationEmailDeliveryStatus = "FAILED";
        updates.quotationEmailErrorMessage =
            quotation.quotationEmailErrorMessage ?? "Error de envío en Resend";
        changed = true;
    }

    if (
        (lastEvent === "opened" || lastEvent === "clicked")
        && !quotation.quotationEmailOpenedAt
    ) {
        updates.quotationEmailOpenedAt = new Date();
        changed = true;
    }

    if (!changed) return false;
    return applyDeliveryUpdates(quotation.quotationId ?? quotation.id, prisma, updates);
}

export async function syncQuotationEmailDeliveryFromResend(quotationId, businessId, prisma) {
    if (!resend) {
        return { synced: false, reason: "no_api_key" };
    }

    const quotation = await getQuotationEmailTracking(quotationId, prisma);
    if (!quotation?.quotationEmailProviderMessageId) {
        return { synced: false, reason: "no_provider_message_id" };
    }

    if (!["SENT", "PENDING"].includes(quotation.quotationEmailDeliveryStatus ?? "")) {
        return { synced: false, reason: "already_final" };
    }

    const sentAt = quotation.quotationEmailSentAt;
    if (sentAt) {
        const recentCutoff = new Date(Date.now() - STALE_MINUTES * 60 * 1000);
        if (sentAt > recentCutoff) {
            return { synced: false, reason: "too_recent" };
        }
    }

    const { data, error } = await resend.emails.get(
        quotation.quotationEmailProviderMessageId,
    );
    if (error || !data) {
        return { synced: false, reason: "resend_lookup_failed" };
    }

    const changed = await applyResendStatusToQuotation(
        { ...quotation, quotationId },
        data,
        prisma,
    );

    return { synced: changed, checked: true, businessId };
}

export async function processQuotationResendWebhookEvent(event) {
    const type = event?.type;
    const data = event?.data ?? {};
    const emailId = data.email_id;

    if (!type || !emailId) {
        return { handled: false, reason: "missing_type_or_email_id" };
    }

    const dispatch = await findDispatchIndexByProviderMessageId(emailId);
    if (!dispatch) {
        return { handled: false, reason: "quotation_dispatch_not_found", emailId, type };
    }

    const prisma = await getPrismaForBusinessId(dispatch.businessId);
    if (!prisma) {
        return { handled: false, reason: "tenant_prisma_unavailable", emailId, type };
    }

    const quotation = await prisma.quotation.findUnique({
        where: { quotationId: dispatch.quotationId },
        select: {
            quotationId: true,
            quotationEmailDeliveryStatus: true,
            quotationEmailDeliveredAt: true,
            quotationEmailOpenedAt: true,
            quotationEmailErrorMessage: true,
            quotationEmailProviderMessageId: true,
            quotationEmailSentAt: true,
        },
    });

    if (!quotation) {
        return { handled: false, reason: "quotation_not_found", emailId, type };
    }

    const now = new Date();

    switch (type) {
        case "email.sent":
            if (
                quotation.quotationEmailDeliveryStatus === "PENDING"
                || quotation.quotationEmailDeliveryStatus === "FAILED"
                || !quotation.quotationEmailDeliveryStatus
            ) {
                await prisma.quotation.update({
                    where: { quotationId: quotation.quotationId },
                    data: {
                        quotationEmailDeliveryStatus: "SENT",
                        quotationEmailProviderMessageId: emailId,
                        quotationEmailSentAt: quotation.quotationEmailSentAt ?? now,
                    },
                });
            }
            break;
        case "email.delivered":
            if (
                quotation.quotationEmailDeliveryStatus !== "BOUNCED"
                && quotation.quotationEmailDeliveryStatus !== "FAILED"
            ) {
                await prisma.quotation.update({
                    where: { quotationId: quotation.quotationId },
                    data: {
                        quotationEmailDeliveryStatus: "DELIVERED",
                        quotationEmailDeliveredAt: now,
                    },
                });
            }
            break;
        case "email.bounced":
            await prisma.quotation.update({
                where: { quotationId: quotation.quotationId },
                data: {
                    quotationEmailDeliveryStatus: "BOUNCED",
                    quotationEmailErrorMessage: parseResendBounceMessage(data),
                },
            });
            break;
        case "email.opened":
        case "email.clicked": {
            const openUpdates = {
                quotationEmailOpenedAt: quotation.quotationEmailOpenedAt ?? now,
            };
            if (
                quotation.quotationEmailDeliveryStatus === "PENDING"
                || quotation.quotationEmailDeliveryStatus === "SENT"
            ) {
                openUpdates.quotationEmailDeliveryStatus = "DELIVERED";
                openUpdates.quotationEmailDeliveredAt =
                    quotation.quotationEmailDeliveredAt ?? now;
            }
            await prisma.quotation.update({
                where: { quotationId: quotation.quotationId },
                data: openUpdates,
            });
            break;
        }
        case "email.complained":
            await prisma.quotation.update({
                where: { quotationId: quotation.quotationId },
                data: {
                    quotationEmailDeliveryStatus: "BOUNCED",
                    quotationEmailErrorMessage: data?.complaint?.type
                        ? `Queja: ${data.complaint.type}`
                        : "Marcado como spam por el destinatario",
                },
            });
            break;
        case "email.failed":
            await prisma.quotation.update({
                where: { quotationId: quotation.quotationId },
                data: {
                    quotationEmailDeliveryStatus: "FAILED",
                    quotationEmailErrorMessage: data?.error ?? "Error de envío en Resend",
                },
            });
            break;
        case "email.delivery_delayed":
            break;
        default:
            return { handled: false, reason: "unsupported_type", type, emailId };
    }

    return {
        handled: true,
        type,
        emailId,
        quotationId: quotation.quotationId,
        businessId: dispatch.businessId,
    };
}

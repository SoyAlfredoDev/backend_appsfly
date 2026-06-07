import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import {
    getMercadoPagoPayment,
    getMercadoPagoPreapproval,
    getMercadoPagoAuthorizedPayment,
    mapMercadoPagoStatus,
} from "./mpApiClient.js";
import {
    finalizeMercadoPagoPayment,
    finalizeMercadoPagoPreapproval,
    PAYMENT_METHOD_LABELS,
} from "../subscriptionPaymentService.js";
import {
    recordRecurringPayment,
    findSubscriptionByPreapprovalId,
} from "./mpSubscriptionBillingService.js";
import { sendDualSubscriptionPaymentEmails } from "../../emails/dispatchers/subscriptionPayment.dispatcher.js";

const general = new PrismaGeneral();

/** Días que se extiende la suscripción en cada cobro recurrente aprobado vía webhook */
export const SUBSCRIPTION_RENEWAL_EXTENSION_DAYS = 30;

const PAYMENT_TOPICS = new Set(["payment", "merchant_order"]);
const SUBSCRIPTION_SUCCESS_TOPICS = new Set([
    "subscription_authorized_payment",
    "subscription_preapproval",
]);
const SUBSCRIPTION_FAILURE_ACTIONS = new Set([
    "payment.failed",
    "subscription_paused",
    "subscription_cancelled",
]);

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function isSubscriptionActive(sub) {
    if (!sub || !["ACTIVE", "CANCELLED"].includes(sub.subscriptionStatus)) return false;
    return new Date(sub.subscriptionEndDate) > new Date();
}

function hasPaidPeriodRemaining(subscription) {
    return subscription && new Date(subscription.subscriptionEndDate) > new Date();
}

async function loadPaymentContext(subscriptionPaymentId) {
    const paymentRecord = await general.subscriptionPayment.findUnique({
        where: { subscriptionPaymentId },
        include: {
            business: true,
            plan: true,
            subscription: true,
            createdBy: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                    userEmail: true,
                },
            },
        },
    });
    return paymentRecord;
}

async function getLatestBusinessSubscription(businessId) {
    return general.subscription.findFirst({
        where: { subscriptionBusinessId: businessId },
        orderBy: { subscriptionEndDate: "desc" },
    });
}

/**
 * Extiende subscriptionEndDate +30 días y mantiene ACTIVE (GeneralDB).
 */
export async function extendSubscriptionRenewal(businessId, days = SUBSCRIPTION_RENEWAL_EXTENSION_DAYS) {
    const subscription = await getLatestBusinessSubscription(businessId);
    if (!subscription) {
        return null;
    }

    if (!subscription.autoRenewEnabled) {
        return subscription;
    }

    const baseDate =
        subscription.subscriptionEndDate && new Date(subscription.subscriptionEndDate) > new Date()
            ? new Date(subscription.subscriptionEndDate)
            : new Date();

    const subscriptionEndDate = addDays(baseDate, days);

    return general.subscription.update({
        where: { subscriptionId: subscription.subscriptionId },
        data: {
            subscriptionStatus: "ACTIVE",
            subscriptionEndDate,
        },
    });
}

/**
 * Marca la suscripción vigente del negocio como EXPIRED (dispara bloqueo frontend).
 */
export async function expireBusinessSubscription(businessId) {
    const subscription = await getLatestBusinessSubscription(businessId);
    if (!subscription) {
        return null;
    }

    if (subscription.subscriptionStatus === "EXPIRED") {
        return subscription;
    }

    return general.subscription.update({
        where: { subscriptionId: subscription.subscriptionId },
        data: { subscriptionStatus: "EXPIRED" },
    });
}

async function markPaymentRecordStatus(subscriptionPaymentId, status, extra = {}) {
    const existing = await general.subscriptionPayment.findUnique({
        where: { subscriptionPaymentId },
    });
    if (!existing) return null;

    return general.subscriptionPayment.update({
        where: { subscriptionPaymentId },
        data: {
            status,
            ...extra,
            metadata: {
                ...(existing.metadata ?? {}),
                ...(extra.metadata ?? {}),
                webhookUpdatedAt: new Date().toISOString(),
            },
        },
    });
}

async function shouldSendPaymentEmails(paymentRecord) {
    if (paymentRecord.metadata?.emailsSentAt) {
        return false;
    }
    const amount = Number(paymentRecord.amount ?? 0);
    const isPromo = paymentRecord.paymentMethod === "PROMO_FREE_TRIAL";
    return amount > 0 || isPromo;
}

async function dispatchSuccessEmails({
    paymentRecord,
    subscription,
    transactionId,
    eventType,
}) {
    const eligible = await shouldSendPaymentEmails(paymentRecord);
    if (!eligible) return;

    try {
        await sendDualSubscriptionPaymentEmails({
            user: paymentRecord.createdBy,
            business: paymentRecord.business,
            plan: paymentRecord.plan,
            amount: paymentRecord.amount,
            currency: paymentRecord.currency,
            paymentMethod: paymentRecord.paymentMethod,
            transactionId,
            subscriptionEndDate: subscription?.subscriptionEndDate ?? new Date(),
            eventType,
        });

        await general.subscriptionPayment.update({
            where: { subscriptionPaymentId: paymentRecord.subscriptionPaymentId },
            data: {
                metadata: {
                    ...(paymentRecord.metadata ?? {}),
                    emailsSentAt: new Date().toISOString(),
                },
            },
        });
    } catch (error) {
        console.error("[mpWebhookProcessor] Error en envío dual de correos:", error.message);
    }
}

async function processApprovedPaymentWebhook({
    subscriptionPaymentId,
    mpPaymentId,
    eventType,
    isRenewal = false,
}) {
    let paymentRecord = await loadPaymentContext(subscriptionPaymentId);
    if (!paymentRecord) {
        console.warn(`[mpWebhook] Pago local no encontrado: ${subscriptionPaymentId}`);
        return { processed: false, reason: "PAYMENT_RECORD_NOT_FOUND" };
    }

    let subscription = paymentRecord.subscription;

    if (paymentRecord.status === "APPROVED" && subscription) {
        await dispatchSuccessEmails({
            paymentRecord,
            subscription,
            transactionId: mpPaymentId || paymentRecord.mpPaymentId || subscriptionPaymentId,
            eventType,
        });
        return { processed: true, reason: "ALREADY_APPROVED", subscription };
    }

    const activeSub = await getLatestBusinessSubscription(paymentRecord.subscriptionBusinessId);
    const shouldRenew = isRenewal || (isSubscriptionActive(activeSub) && paymentRecord.status !== "APPROVED");

    if (shouldRenew && activeSub) {
        subscription = await extendSubscriptionRenewal(paymentRecord.subscriptionBusinessId);
        const updatedPayment = await markPaymentRecordStatus(subscriptionPaymentId, "APPROVED", {
            mpPaymentId: mpPaymentId ? String(mpPaymentId) : undefined,
            metadata: {
                renewalViaWebhook: true,
                mpPaymentId: mpPaymentId ? String(mpPaymentId) : undefined,
            },
        });
        paymentRecord = { ...paymentRecord, ...updatedPayment };
    } else {
        const result = await finalizeMercadoPagoPayment({
            subscriptionPaymentId,
            mpPaymentId: String(mpPaymentId),
        });
        subscription = result.subscription;
        paymentRecord = await loadPaymentContext(subscriptionPaymentId);
    }

    if (subscription) {
        await dispatchSuccessEmails({
            paymentRecord,
            subscription,
            transactionId: mpPaymentId || paymentRecord?.mpPaymentId || subscriptionPaymentId,
            eventType,
        });
    }

    return { processed: true, reason: "APPROVED", subscription };
}

async function processFailedPaymentWebhook({ subscriptionPaymentId, mpPaymentId, eventType }) {
    const paymentRecord = await loadPaymentContext(subscriptionPaymentId);
    if (!paymentRecord) {
        return { processed: false, reason: "PAYMENT_RECORD_NOT_FOUND" };
    }

    await markPaymentRecordStatus(subscriptionPaymentId, "REJECTED", {
        mpPaymentId: mpPaymentId ? String(mpPaymentId) : undefined,
        metadata: {
            failureEventType: eventType,
            mpPaymentId: mpPaymentId ? String(mpPaymentId) : undefined,
        },
    });

    const expired = await expireBusinessSubscription(paymentRecord.subscriptionBusinessId);
    return { processed: true, reason: "PAYMENT_FAILED", subscription: expired };
}

async function handlePaymentTopic(resourceId, action) {
    const mpPayment = await getMercadoPagoPayment(resourceId);
    const externalReference = mpPayment.external_reference;
    if (!externalReference) {
        return { processed: false, reason: "NO_EXTERNAL_REFERENCE" };
    }

    const subscriptionPaymentId = String(externalReference);
    const mappedStatus = mapMercadoPagoStatus(mpPayment.status);
    const eventType = action || `payment.${mpPayment.status}`;

    const paymentRecord = await loadPaymentContext(subscriptionPaymentId);
    const activeSub = paymentRecord
        ? await getLatestBusinessSubscription(paymentRecord.subscriptionBusinessId)
        : null;
    const isRenewal = Boolean(
        paymentRecord
        && isSubscriptionActive(activeSub)
        && paymentRecord.status !== "APPROVED",
    );

    if (mappedStatus === "APPROVED") {
        return processApprovedPaymentWebhook({
            subscriptionPaymentId,
            mpPaymentId: resourceId,
            eventType,
            isRenewal,
        });
    }

    if (mappedStatus === "REJECTED") {
        return processFailedPaymentWebhook({
            subscriptionPaymentId,
            mpPaymentId: resourceId,
            eventType,
        });
    }

    await markPaymentRecordStatus(subscriptionPaymentId, "PENDING", {
        mpPaymentId: String(resourceId),
    });
    return { processed: true, reason: "PENDING" };
}

async function handleSubscriptionAuthorizedPayment(resourceId, action) {
    const authorized = await getMercadoPagoAuthorizedPayment(resourceId);
    const preapprovalId = authorized.preapproval_id;
    const paymentId = authorized.payment?.id || authorized.payment_id;
    const eventType = action || "subscription_authorized_payment";

    let subscription = preapprovalId
        ? await findSubscriptionByPreapprovalId(preapprovalId)
        : null;

    const status = String(authorized.status || authorized.payment?.status || "").toLowerCase();

    if (status === "approved" || status === "authorized") {
        if (!subscription && preapprovalId) {
            const preapproval = await getMercadoPagoPreapproval(preapprovalId);
            if (preapproval.external_reference) {
                await finalizeMercadoPagoPreapproval({
                    subscriptionPaymentId: String(preapproval.external_reference),
                    mpPreapprovalId: String(preapprovalId),
                    mpPreapprovalData: preapproval,
                });
                subscription = await findSubscriptionByPreapprovalId(preapprovalId);
            }
        }

        if (subscription) {
            if (!subscription.autoRenewEnabled) {
                return { processed: true, reason: "RECURRING_PAYMENT_IGNORED_CANCELLED", subscription };
            }

            const extended = await extendSubscriptionRenewal(subscription.subscriptionBusinessId);
            const amount = Number(
                authorized.transaction_amount
                ?? authorized.payment?.transaction_amount
                ?? subscription.subscriptionAmount,
            );

            const paymentRecord = await recordRecurringPayment({
                subscription: extended ?? subscription,
                amount,
                currency: authorized.currency_id || "CLP",
                mpPaymentId: paymentId ? String(paymentId) : String(resourceId),
                mpPreapprovalId: preapprovalId ? String(preapprovalId) : null,
                metadata: { source: "webhook_renewal", eventType },
            });

            const context = await loadPaymentContext(paymentRecord.subscriptionPaymentId);
            await dispatchSuccessEmails({
                paymentRecord: context ?? paymentRecord,
                subscription: extended ?? subscription,
                transactionId: paymentId ? String(paymentId) : String(resourceId),
                eventType,
            });

            return { processed: true, reason: "RECURRING_PAYMENT_APPROVED", subscription: extended };
        }

        if (paymentId) {
            return handlePaymentTopic(String(paymentId), eventType);
        }

        return { processed: false, reason: "SUBSCRIPTION_NOT_FOUND" };
    }

    if (["rejected", "cancelled", "canceled", "refunded"].includes(status)) {
        if (subscription) {
            await expireBusinessSubscription(subscription.subscriptionBusinessId);
            await general.subscription.update({
                where: { subscriptionId: subscription.subscriptionId },
                data: { autoRenewEnabled: false, mpPreapprovalStatus: "paused" },
            });
            return { processed: true, reason: "RECURRING_PAYMENT_FAILED", subscription };
        }
    }

    return { processed: true, reason: "SUBSCRIPTION_PAYMENT_PENDING" };
}

async function handleSubscriptionPreapproval(resourceId, action) {
    const preapproval = await getMercadoPagoPreapproval(resourceId);
    const externalReference = preapproval.external_reference;
    const status = String(preapproval.status || "").toLowerCase();
    const eventType = action || "subscription_preapproval";

    if (!externalReference) {
        return { processed: false, reason: "NO_EXTERNAL_REFERENCE" };
    }

    const subscriptionPaymentId = String(externalReference);

    if (["authorized"].includes(status)) {
        const result = await finalizeMercadoPagoPreapproval({
            subscriptionPaymentId,
            mpPreapprovalId: String(resourceId),
            mpPreapprovalData: preapproval,
        });

        if (result.subscription) {
            const paymentRecord = await loadPaymentContext(subscriptionPaymentId);
            if (paymentRecord) {
                await dispatchSuccessEmails({
                    paymentRecord,
                    subscription: result.subscription,
                    transactionId: String(resourceId),
                    eventType,
                });
            }
        }

        return { processed: true, reason: "SUBSCRIPTION_AUTHORIZED", subscription: result.subscription };
    }

    const paymentRecord = await loadPaymentContext(subscriptionPaymentId);
    if (!paymentRecord) {
        return { processed: false, reason: "PAYMENT_RECORD_NOT_FOUND" };
    }

    if (["paused", "cancelled", "canceled"].includes(status) || SUBSCRIPTION_FAILURE_ACTIONS.has(action)) {
        const preapprovalId = String(resourceId);
        const subscription =
            (await findSubscriptionByPreapprovalId(preapprovalId))
            ?? (paymentRecord
                ? await getLatestBusinessSubscription(paymentRecord.subscriptionBusinessId)
                : null);

        // cancel_at_period_end: acceso hasta subscriptionEndDate, sin cobros futuros
        if (subscription && hasPaidPeriodRemaining(subscription)) {
            await general.subscription.update({
                where: { subscriptionId: subscription.subscriptionId },
                data: {
                    autoRenewEnabled: false,
                    mpPreapprovalStatus: status,
                    subscriptionCancelledAt: subscription.subscriptionCancelledAt ?? new Date(),
                    subscriptionStatus: "ACTIVE",
                },
            });
            return { processed: true, reason: "SUBSCRIPTION_CANCELLED_AT_PERIOD_END", subscription };
        }

        await expireBusinessSubscription(paymentRecord.subscriptionBusinessId);
        await general.subscription.updateMany({
            where: { subscriptionBusinessId: paymentRecord.subscriptionBusinessId },
            data: {
                autoRenewEnabled: false,
                mpPreapprovalStatus: status,
            },
        });
        return { processed: true, reason: "SUBSCRIPTION_PAUSED_OR_CANCELLED" };
    }

    return { processed: true, reason: "SUBSCRIPTION_PREAPPROVAL_IGNORED" };
}

/**
 * Procesamiento principal del webhook (ejecutar de forma asíncrona tras HTTP 200).
 */
export async function processMercadoPagoWebhookNotification({
    topic,
    action,
    resourceId,
}) {
    if (!resourceId) {
        return { processed: false, reason: "MISSING_RESOURCE_ID" };
    }

    const normalizedTopic = String(topic || "").toLowerCase();

    try {
        if (PAYMENT_TOPICS.has(normalizedTopic) || normalizedTopic === "payment") {
            return await handlePaymentTopic(resourceId, action);
        }

        if (normalizedTopic === "subscription_authorized_payment") {
            return await handleSubscriptionAuthorizedPayment(resourceId, action);
        }

        if (
            SUBSCRIPTION_SUCCESS_TOPICS.has(normalizedTopic)
            || normalizedTopic === "subscription_preapproval_plan"
        ) {
            return await handleSubscriptionPreapproval(resourceId, action);
        }

        if (SUBSCRIPTION_FAILURE_ACTIONS.has(action)) {
            const paymentRecord = await general.subscriptionPayment.findFirst({
                where: { mpPaymentId: String(resourceId) },
            });
            if (paymentRecord) {
                return processFailedPaymentWebhook({
                    subscriptionPaymentId: paymentRecord.subscriptionPaymentId,
                    mpPaymentId: resourceId,
                    eventType: action,
                });
            }
        }

        console.info(`[mpWebhook] Evento ignorado — topic: ${topic}, action: ${action}`);
        return { processed: false, reason: "TOPIC_IGNORED" };
    } catch (error) {
        console.error("[mpWebhookProcessor] Error procesando notificación:", error);
        throw error;
    }
}

export { PAYMENT_METHOD_LABELS };

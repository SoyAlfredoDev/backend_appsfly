import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { searchMercadoPagoAuthorizedPaymentsByPreapproval } from "./mpApiClient.js";
import { processMercadoPagoWebhookNotification } from "./mpWebhookProcessor.js";

const general = new PrismaGeneral();

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

function authorizedPaymentDate(item) {
    const raw = item?.debit_date || item?.date_created || item?.last_modified;
    const date = raw ? new Date(raw) : null;
    return date && !Number.isNaN(date.getTime()) ? date : null;
}

function isLikelyInitialCharge(subscription, item) {
    const authDate = authorizedPaymentDate(item);
    if (!authDate) return false;
    const start = new Date(subscription.subscriptionStartDate);
    if (Number.isNaN(start.getTime())) return false;
    return Math.abs(authDate.getTime() - start.getTime()) <= FORTY_EIGHT_HOURS_MS;
}

/**
 * Reconciliación de cobros recurrentes MP → AppsFly.
 * Cubre webhooks perdidos. No re-aplica el cobro inicial del alta (ya facturado al crear la suscripción).
 */
export async function reconcileMercadoPagoSubscriptionRenewals({
    limitSubscriptions = 100,
} = {}) {
    const subscriptions = await general.subscription.findMany({
        where: {
            mpPreapprovalId: { not: null },
            autoRenewEnabled: true,
            subscriptionStatus: { in: ["ACTIVE", "CANCELLED", "EXPIRED"] },
        },
        orderBy: { subscriptionEndDate: "asc" },
        take: limitSubscriptions,
        select: {
            subscriptionId: true,
            subscriptionBusinessId: true,
            subscriptionStartDate: true,
            subscriptionEndDate: true,
            subscriptionStatus: true,
            mpPreapprovalId: true,
            createdByUserId: true,
        },
    });

    const summary = {
        scannedSubscriptions: subscriptions.length,
        scannedAuthorizedPayments: 0,
        applied: 0,
        alreadyRecorded: 0,
        skippedInitial: 0,
        pending: 0,
        failed: 0,
        errors: [],
        details: [],
    };

    for (const sub of subscriptions) {
        try {
            const results = await searchMercadoPagoAuthorizedPaymentsByPreapproval(
                sub.mpPreapprovalId,
                { limit: 10 },
            );
            summary.scannedAuthorizedPayments += results.length;

            for (const item of results) {
                const authorizedPaymentId = String(item.id);
                const paymentId = item.payment?.id ? String(item.payment.id) : null;

                const already = await general.subscriptionPayment.findFirst({
                    where: {
                        subscriptionBusinessId: sub.subscriptionBusinessId,
                        status: "APPROVED",
                        OR: [
                            ...(paymentId ? [{ mpPaymentId: paymentId }] : []),
                            { mpPaymentId: authorizedPaymentId },
                            {
                                metadata: {
                                    path: ["authorizedPaymentId"],
                                    equals: authorizedPaymentId,
                                },
                            },
                        ],
                    },
                });

                if (already) {
                    summary.alreadyRecorded += 1;
                    continue;
                }

                // Cobro del alta: ya existe el SubscriptionPayment del checkout sin mpPaymentId.
                if (isLikelyInitialCharge(sub, item)) {
                    const initialPayment = await general.subscriptionPayment.findFirst({
                        where: {
                            subscriptionId: sub.subscriptionId,
                            status: "APPROVED",
                            paymentMethod: "MERCADO_PAGO",
                        },
                        orderBy: { createdAt: "asc" },
                    });

                    if (initialPayment) {
                        if (!initialPayment.mpPaymentId && paymentId) {
                            await general.subscriptionPayment.update({
                                where: { subscriptionPaymentId: initialPayment.subscriptionPaymentId },
                                data: {
                                    mpPaymentId: paymentId,
                                    metadata: {
                                        ...(initialPayment.metadata && typeof initialPayment.metadata === "object"
                                            ? initialPayment.metadata
                                            : {}),
                                        authorizedPaymentId,
                                        backfilledFromReconcile: true,
                                    },
                                },
                            });
                        }
                        summary.skippedInitial += 1;
                        summary.details.push({
                            businessId: sub.subscriptionBusinessId,
                            subscriptionId: sub.subscriptionId,
                            authorizedPaymentId,
                            reason: "SKIPPED_INITIAL_CHARGE",
                        });
                        continue;
                    }
                }

                const result = await processMercadoPagoWebhookNotification({
                    topic: "subscription_authorized_payment",
                    action: "subscription_authorized_payment.reconcile",
                    resourceId: authorizedPaymentId,
                });

                const detail = {
                    businessId: sub.subscriptionBusinessId,
                    subscriptionId: sub.subscriptionId,
                    authorizedPaymentId,
                    reason: result?.reason ?? null,
                };
                summary.details.push(detail);

                if (result?.reason === "RECURRING_PAYMENT_APPROVED") {
                    summary.applied += 1;
                } else if (result?.reason === "RECURRING_PAYMENT_ALREADY_RECORDED") {
                    summary.alreadyRecorded += 1;
                } else if (result?.reason === "SUBSCRIPTION_PAYMENT_PENDING") {
                    summary.pending += 1;
                } else if (result?.processed === false) {
                    summary.failed += 1;
                }
            }
        } catch (error) {
            summary.failed += 1;
            summary.errors.push({
                subscriptionId: sub.subscriptionId,
                preapprovalId: sub.mpPreapprovalId,
                message: error.message,
            });
            console.error(
                "[reconcileMercadoPagoSubscriptionRenewals]",
                sub.subscriptionId,
                error,
            );
        }
    }

    return summary;
}

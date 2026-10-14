import { processRecurringAuthorization } from "../billing/recurringWebhook.js";
import { deliverBillingNotice } from "../billing/billingNotifications.js";
import { generalPrisma as general } from "../../dbGeneral.js";
import { searchMercadoPagoAuthorizedPaymentsByPreapproval } from "./mpApiClient.js";
import { processMercadoPagoWebhookNotification } from "./mpWebhookProcessor.js";



export async function reconcileMercadoPagoSubscriptionRenewals({

} = {}) {
    const pending = await general.subscriptionPayment.findMany({where:{status:"PENDING",paymentMethod:"MERCADO_PAGO"}});
    let authorizationFailures = 0;
    for(const payment of pending) {
        if (!payment.metadata?.mpPreapprovalId) continue;
        try { await processRecurringAuthorization(String(payment.metadata.mpPreapprovalId)); }
        catch { authorizationFailures++; }
    }
    const trials = await general.subscriptionPayment.findMany({where:{paymentMethod:"PROMO_FREE_TRIAL",metadata:{path:["trialWelcomePending"],equals:true}},include:{subscription:true}});
    for(const payment of trials) {
        if(!payment.subscription) continue;
        try { await deliverBillingNotice(payment.subscriptionPaymentId,"trial_started",payment.subscription.subscriptionEndDate); }
        catch { authorizationFailures++; }
    }
    const subscriptions = await general.subscription.findMany({
        where: {
            mpPreapprovalId: { not: null },

            subscriptionStatus: { in: ["ACTIVE", "CANCELLED", "EXPIRED", "PENDIENT"] },
        },
        orderBy: { subscriptionEndDate: "asc" },

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
        failed: authorizationFailures,
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

                if (already) summary.alreadyRecorded += 1;
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

import crypto from "crypto";
import { generalPrisma as general } from "../../dbGeneral.js";
import {
    updateMercadoPagoPreapproval,
} from "./mpApiClient.js";
import { FREE_TRIAL_PLAN_ID } from "../subscriptionPaymentService.js";
import {
    isValidCancellationConfirmation,
    SUBSCRIPTION_CANCEL_CONFIRMATION_PHRASE,
} from "../../config/subscriptionCancel.js";



function isSubscriptionCurrentlyActive(sub) {
    if (!sub) return false;
    if (!["ACTIVE", "CANCELLED"].includes(sub.subscriptionStatus)) return false;
    return new Date(sub.subscriptionEndDate) > new Date();
}

function hasPaidPeriodRemaining(subscription) {
    return new Date(subscription.subscriptionEndDate) > new Date();
}

function isCommercialPaidPlan(subscription) {
    return subscription.subscriptionPlanId !== FREE_TRIAL_PLAN_ID
        && Number(subscription.subscriptionAmount) > 0;
}

function isMpPreapprovalCancelled(status) {
    return ["cancelled", "canceled", "paused"].includes(String(status || "").toLowerCase());
}

export async function assertUserCanManageBusinessBilling(userId, businessId) {
    const link = await general.userBusiness.findFirst({
        where: {
            userBusinessUserId: userId,
            userBusinessBusinessId: businessId,
            userBusinessRole: "ADMIN",
        },
    });
    if (!link) {
        const err = new Error("No tienes permisos para gestionar la suscripción de este negocio.");
        err.statusCode = 403;
        throw err;
    }
}

export async function getBusinessBillingStatus(businessId) {
    const subscriptions = await general.subscription.findMany({
        where: { subscriptionBusinessId: businessId },
        include: {
            plan: {
                select: {
                    planId: true,
                    planName: true,
                    planPrice: true,
                    planCurrency: true,
                },
            },
        },
        orderBy: { subscriptionEndDate: "desc" },
    });

    const pending = await general.subscriptionPayment.findFirst({
        where: { subscriptionBusinessId: businessId, paymentMethod: "MERCADO_PAGO", status: "PENDING" },
        include: { plan: true }, orderBy: { createdAt: "desc" },
    });
    const pendingCheckout = pending ? {
        paymentId: pending.subscriptionPaymentId, planName: pending.plan.planName,
        firstChargeAt: pending.metadata?.firstChargeAt || null,
        authorized: pending.metadata?.mpPreapprovalStatus === "authorized",
        checkoutUrl: pending.metadata?.checkoutUrl || null,
        amount: pending.amount, currency: pending.currency,
        canCancel: Boolean(pending.metadata?.mpPreapprovalId),
    } : null;
    const current = subscriptions.find(isSubscriptionCurrentlyActive) ?? subscriptions[0] ?? null;

    if (!current) {
        return {
            pendingCheckout,
            hasSubscription: false,
            businessId,
            subscription: null,
        };
    }

    const isPromoFreeTrial = current.subscriptionPlanId === FREE_TRIAL_PLAN_ID;
    const isPaidCommercial = isCommercialPaidPlan(current);
    const isPaidRecurring = isPaidCommercial && Boolean(current.mpPreapprovalId);
    const accessStillValid = isSubscriptionCurrentlyActive(current);
    const mpAlreadyCancelled = isMpPreapprovalCancelled(current.mpPreapprovalStatus);

    return {
        pendingCheckout,
        hasSubscription: true,
        businessId,
        subscription: {
            subscriptionId: current.subscriptionId,
            subscriptionStatus: current.subscriptionStatus,
            subscriptionStartDate: current.subscriptionStartDate,
            subscriptionEndDate: current.subscriptionEndDate,
            subscriptionAmount: current.subscriptionAmount,
            subscriptionCancelledAt: current.subscriptionCancelledAt,
            mpPreapprovalId: current.mpPreapprovalId,
            mpPreapprovalStatus: current.mpPreapprovalStatus,
            autoRenewEnabled: current.autoRenewEnabled && current.mpPreapprovalStatus === "authorized" && Boolean(current.mpPreapprovalId),
            isPaidRecurring,
            isPaidCommercial,
            isPromoFreeTrial,
            accessStillValid,
            cancelConfirmationPhrase: SUBSCRIPTION_CANCEL_CONFIRMATION_PHRASE,
            canCancel:
                isPaidCommercial
                && current.autoRenewEnabled
                && !current.subscriptionCancelledAt
                && (!current.mpPreapprovalId || !mpAlreadyCancelled),
            plan: current.plan,
        },
    };
}

async function recordSubscriptionCancellationAudit({
    subscription,
    plan,
    cancelledByUserId,
    confirmationPhrase,
    cancelReason,
    auditContext = {},
    mpResponseSnapshot = null,
}) {
    return general.subscriptionCancellation.create({
        data: {
            subscriptionCancellationId: crypto.randomUUID(),
            subscriptionId: subscription.subscriptionId,
            subscriptionBusinessId: subscription.subscriptionBusinessId,
            subscriptionPlanId: subscription.subscriptionPlanId,
            cancelledByUserId,
            mpPreapprovalId: subscription.mpPreapprovalId,
            planName: plan?.planName ?? "Plan AppsFly",
            planAmount: Number(subscription.subscriptionAmount ?? plan?.planPrice ?? 0),
            planCurrency: plan?.planCurrency ?? "CLP",
            accessValidUntil: subscription.subscriptionEndDate,
            confirmationPhrase,
            cancelReason: cancelReason?.trim() || null,
            source: "PROFILE_SELF_SERVICE",
            requestIp: auditContext.ip ?? null,
            requestUserAgent: auditContext.userAgent ?? null,
            mpResponseSnapshot,
        },
    });
}

/**
 * Cancela cobros futuros en Mercado Pago (cancel_at_period_end).
 * El acceso permanece hasta subscriptionEndDate del periodo ya pagado.
 */
export async function cancelBusinessSubscriptionRenewal({
    businessId,
    userId,
    confirmationPhrase,
    cancelReason,
    auditContext = {},
}) {
    if (!isValidCancellationConfirmation(confirmationPhrase)) {
        const err = new Error(
            `Debes escribir exactamente "${SUBSCRIPTION_CANCEL_CONFIRMATION_PHRASE}" para confirmar la baja.`,
        );
        err.statusCode = 400;
        throw err;
    }

    await assertUserCanManageBusinessBilling(userId, businessId);

    const pending = await general.subscriptionPayment.findFirst({ where: {
        subscriptionBusinessId: businessId, status: "PENDING", paymentMethod: "MERCADO_PAGO",
    } });
    if (pending?.metadata?.mpPreapprovalId) {
        // The existing trial/paid access remains unchanged when cancelling a future mandate.
        await updateMercadoPagoPreapproval(String(pending.metadata.mpPreapprovalId), {status: "cancelled"});
        await general.$transaction(async tx => {
            if (pending.subscriptionId) await tx.$queryRaw`SELECT "subscriptionId" FROM "Subscription" WHERE "subscriptionId" = ${pending.subscriptionId} FOR UPDATE`;
            await tx.$queryRaw`SELECT "subscriptionPaymentId" FROM "SubscriptionPayment" WHERE "subscriptionPaymentId" = ${pending.subscriptionPaymentId} FOR UPDATE`;
            const latest = await tx.subscriptionPayment.findUniqueOrThrow({where:{subscriptionPaymentId:pending.subscriptionPaymentId}});
            await tx.subscriptionPayment.update({ where: { subscriptionPaymentId: pending.subscriptionPaymentId }, data: {
                status: latest.status === "APPROVED" ? "APPROVED" : "REJECTED",
                metadata: {...latest.metadata, mpPreapprovalStatus: "cancelled", cancelledAt: new Date().toISOString(), cancelledByUserId: userId},
            } });
            if (latest.subscriptionId) {
                const current = await tx.subscription.findUniqueOrThrow({where:{subscriptionId:latest.subscriptionId}});
                await tx.subscription.update({ where: {subscriptionId: current.subscriptionId}, data: {
                    autoRenewEnabled: false, mpPreapprovalStatus: "cancelled", subscriptionCancelledAt: new Date(),
                    subscriptionStatus: current.subscriptionStatus === "PENDIENT" ? "INACTIVE" : current.subscriptionEndDate > new Date() ? "CANCELLED" : "EXPIRED",
                } });
            }
        });
        return {subscription: null, cancellationRecord: null, alreadyCancelled: false};
    }

    const candidates = await general.subscription.findMany({
        where: {
            subscriptionBusinessId: businessId,
            subscriptionPlanId: { not: FREE_TRIAL_PLAN_ID },
            subscriptionStatus: { in: ["ACTIVE", "CANCELLED", "EXPIRED", "PENDIENT"] },
        },
        include: { plan: true },
        orderBy: { subscriptionEndDate: "desc" },
    });

    const subscription = candidates.find(isCommercialPaidPlan) ?? null;

    if (!subscription) {
        const err = new Error("Este negocio no tiene una suscripción de pago activa para cancelar.");
        err.statusCode = 404;
        throw err;
    }

    if (!subscription.autoRenewEnabled && subscription.subscriptionCancelledAt) {
        return {
            subscription,
            cancellationRecord: null,
            alreadyCancelled: true,
        };
    }

    let mpResponseSnapshot = null;

    if (subscription.mpPreapprovalId) {
        const mpStatus = String(subscription.mpPreapprovalStatus || "").toLowerCase();
        if (!isMpPreapprovalCancelled(mpStatus)) {
            mpResponseSnapshot = await updateMercadoPagoPreapproval(
                subscription.mpPreapprovalId,
                { status: "cancelled" },
            );
        }
    }

    const now = new Date();
    const updated = await general.$transaction(async tx => {
        await tx.$queryRaw`SELECT "subscriptionId" FROM "Subscription" WHERE "subscriptionId" = ${subscription.subscriptionId} FOR UPDATE`;
        const current = await tx.subscription.findUniqueOrThrow({where: {subscriptionId: subscription.subscriptionId}});
        return tx.subscription.update({
        where: { subscriptionId: subscription.subscriptionId },
        data: {
            autoRenewEnabled: false,
            mpPreapprovalStatus: subscription.mpPreapprovalId ? "cancelled" : subscription.mpPreapprovalStatus,
            subscriptionCancelledAt: now,
            subscriptionStatus: hasPaidPeriodRemaining(current) ? "CANCELLED" : "EXPIRED",
        },
        });
    });

    const cancellationRecord = await recordSubscriptionCancellationAudit({
        subscription: updated,
        plan: subscription.plan,
        cancelledByUserId: userId,
        confirmationPhrase: String(confirmationPhrase).trim(),
        cancelReason,
        auditContext,
        mpResponseSnapshot,
    });

    return {
        subscription: updated,
        cancellationRecord,
        alreadyCancelled: false,
    };
}

export async function getAdminSubscriptionCancellations({ limit = 100 } = {}) {
    return general.subscriptionCancellation.findMany({
        take: Math.min(Number(limit) || 100, 500),
        orderBy: { createdAt: "desc" },
        include: {
            business: {
                select: { businessId: true, businessName: true },
            },
            cancelledBy: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                    userEmail: true,
                },
            },
            subscription: {
                select: {
                    subscriptionId: true,
                    subscriptionStatus: true,
                    subscriptionEndDate: true,
                    mpPreapprovalId: true,
                },
            },
        },
    });
}

/** Registra un cobro mensual recurrente (auditoría GeneralDB). */
export async function recordRecurringPayment({
    subscription,
    amount,
    currency,
    mpPaymentId,
    mpPreapprovalId,
    createdByUserId,
    metadata = {},
}) {
    return general.subscriptionPayment.create({
        data: {
            subscriptionPaymentId: crypto.randomUUID(),
            subscriptionId: subscription.subscriptionId,
            subscriptionBusinessId: subscription.subscriptionBusinessId,
            subscriptionPlanId: subscription.subscriptionPlanId,
            amount: Number(amount),
            currency: currency || "CLP",
            paymentMethod: "MERCADO_PAGO",
            status: "APPROVED",
            mpPaymentId: mpPaymentId ? String(mpPaymentId) : null,
            externalReference: subscription.subscriptionId,
            metadata: {
                ...metadata,
                mpPreapprovalId,
                billingCycle: "MONTHLY",
                recordedAt: new Date().toISOString(),
            },
            createdByUserId: createdByUserId || subscription.createdByUserId,
        },
    });
}

export async function findSubscriptionByPreapprovalId(preapprovalId) {
    return general.subscription.findFirst({
        where: { mpPreapprovalId: String(preapprovalId) },
        include: { plan: true, business: true, createdBy: true },
    });
}

export { SUBSCRIPTION_CANCEL_CONFIRMATION_PHRASE, isValidCancellationConfirmation };

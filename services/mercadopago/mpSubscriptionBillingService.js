import crypto from "crypto";
import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import {
    updateMercadoPagoPreapproval,
} from "./mpApiClient.js";
import { FREE_TRIAL_PLAN_ID } from "../subscriptionPaymentService.js";
import {
    isValidCancellationConfirmation,
    SUBSCRIPTION_CANCEL_CONFIRMATION_PHRASE,
} from "../../config/subscriptionCancel.js";

const general = new PrismaGeneral();

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

    const current = subscriptions.find(isSubscriptionCurrentlyActive) ?? subscriptions[0] ?? null;

    if (!current) {
        return {
            hasSubscription: false,
            businessId,
            subscription: null,
        };
    }

    const isPromoFreeTrial = current.subscriptionPlanId === FREE_TRIAL_PLAN_ID;
    const isPaidCommercial = isCommercialPaidPlan(current);
    const isPaidRecurring = isPaidCommercial && Boolean(current.mpPreapprovalId);
    const accessStillValid = hasPaidPeriodRemaining(current);
    const mpAlreadyCancelled = isMpPreapprovalCancelled(current.mpPreapprovalStatus);

    return {
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
            autoRenewEnabled: current.autoRenewEnabled,
            isPaidRecurring,
            isPaidCommercial,
            isPromoFreeTrial,
            accessStillValid,
            cancelConfirmationPhrase: SUBSCRIPTION_CANCEL_CONFIRMATION_PHRASE,
            canCancel:
                isPaidCommercial
                && current.autoRenewEnabled
                && accessStillValid
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

    const candidates = await general.subscription.findMany({
        where: {
            subscriptionBusinessId: businessId,
            subscriptionPlanId: { not: FREE_TRIAL_PLAN_ID },
            subscriptionEndDate: { gt: new Date() },
            subscriptionStatus: { in: ["ACTIVE", "CANCELLED"] },
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
    const keepAccessActive = hasPaidPeriodRemaining(subscription);

    const updated = await general.subscription.update({
        where: { subscriptionId: subscription.subscriptionId },
        data: {
            autoRenewEnabled: false,
            mpPreapprovalStatus: subscription.mpPreapprovalId ? "cancelled" : subscription.mpPreapprovalStatus,
            subscriptionCancelledAt: now,
            subscriptionStatus: keepAccessActive ? "ACTIVE" : "EXPIRED",
        },
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

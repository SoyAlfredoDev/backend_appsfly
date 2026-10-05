import crypto from "crypto";
import { generalPrisma as general } from "../../dbGeneral.js";
import { getPlanById } from "../planService.js";
import { getPlanPricing } from "../../libs/planPricing.js";
import { publicFeatureLabels, findOpticsPlan, PLAN_IDS } from "./opticsPlanCatalog.js";
import {
    canAdminAssignPlan,
    describeSubscriptionBilling,
} from "./subscriptionBillingChannel.js";

const LINK_PAYMENT_SOURCE = "MERCADO_PAGO_LINK";

function httpError(message, statusCode, code) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    return error;
}

function pickCurrentSubscription(subscriptions) {
    const list = Array.isArray(subscriptions) ? subscriptions : [];
    const now = new Date();
    const open = list.filter(
        (item) =>
            ["ACTIVE", "CANCELLED"].includes(item.subscriptionStatus) &&
            new Date(item.subscriptionEndDate) > now,
    );
    const pool = open.length ? open : list;
    return [...pool].sort(
        (a, b) => new Date(b.subscriptionEndDate) - new Date(a.subscriptionEndDate),
    )[0] ?? null;
}

function isLinkPayment(payment) {
    const source = payment?.metadata && typeof payment.metadata === "object"
        ? payment.metadata.source
        : null;
    return payment?.status === "APPROVED"
        && payment?.paymentMethod === "MERCADO_PAGO"
        && source === LINK_PAYMENT_SOURCE;
}

async function loadBillingContext(businessId) {
    const [subscriptions, payments, plans] = await Promise.all([
        general.subscription.findMany({
            where: { subscriptionBusinessId: businessId },
            include: {
                plan: {
                    select: {
                        planId: true,
                        planName: true,
                        planPrice: true,
                        planDuration: true,
                        planCurrency: true,
                    },
                },
            },
            orderBy: { subscriptionEndDate: "desc" },
        }),
        general.subscriptionPayment.findMany({
            where: { subscriptionBusinessId: businessId },
            select: {
                subscriptionPlanId: true,
                status: true,
                paymentMethod: true,
                metadata: true,
            },
        }),
        general.plan.findMany({
            where: { planId: { in: [PLAN_IDS.trial, PLAN_IDS.start, PLAN_IDS.pro] } },
            select: {
                planId: true,
                planName: true,
                planPrice: true,
                planCurrency: true,
            },
            orderBy: { planPrice: "asc" },
        }),
    ]);

    const current = pickCurrentSubscription(subscriptions);
    const linkPaymentPlanIds = payments.filter(isLinkPayment).map((item) => item.subscriptionPlanId);
    const billing = describeSubscriptionBilling({
        subscription: current
            ? {
                subscriptionPlanId: current.subscriptionPlanId,
                subscriptionPaymentMethod: current.subscriptionPaymentMethod,
                mpPreapprovalId: current.mpPreapprovalId,
                mpPreapprovalStatus: current.mpPreapprovalStatus,
                subscriptionStatus: current.subscriptionStatus,
                subscriptionEndDate: current.subscriptionEndDate,
            }
            : null,
        linkPaymentPlanIds,
    });

    return {
        subscription: current,
        billing,
        assignablePlans: plans.map((plan) => ({
            planId: plan.planId,
            planName: plan.planName,
            planPrice: plan.planPrice,
            planCurrency: plan.planCurrency,
            checkoutUrl: billing && plan.planId === current?.subscriptionPlanId
                ? billing.checkoutUrl
                : null,
        })),
    };
}

function checkoutForAssignable(planId) {
    const catalog = findOpticsPlan(planId);
    return catalog?.forSale ? catalog.checkoutUrl : null;
}

export async function getBusinessSubscriptionAdminView(businessId) {
    const context = await loadBillingContext(businessId);
    return {
        subscription: context.subscription,
        billing: context.billing,
        assignablePlans: context.assignablePlans.map((plan) => ({
            ...plan,
            checkoutUrl: checkoutForAssignable(plan.planId),
        })),
    };
}

function chargedAmount(plan) {
    if (Number(plan.planPrice) <= 0) return 0;
    return getPlanPricing(plan.planPrice).total;
}

function addMonths(date, months) {
    const next = new Date(date);
    next.setMonth(next.getMonth() + months);
    return next;
}

export async function assignBusinessPlan({ businessId, planId, adminUserId }) {
    const business = await general.business.findUnique({
        where: { businessId },
        select: { businessId: true },
    });
    if (!business) {
        throw httpError("Negocio no encontrado.", 404, "BUSINESS_NOT_FOUND");
    }

    const plan = await getPlanById(planId);
    if (!plan) {
        throw httpError("Plan no encontrado.", 404, "PLAN_NOT_FOUND");
    }

    const existing = await general.subscription.findMany({
        where: { subscriptionBusinessId: businessId },
    });
    const current = pickCurrentSubscription(existing);
    if (!canAdminAssignPlan(planId, current?.subscriptionPlanId ?? null)) {
        throw httpError("Este plan no se puede asignar desde el panel.", 403, "PLAN_NOT_ASSIGNABLE");
    }

    const catalog = findOpticsPlan(planId);
    const features = catalog ? publicFeatureLabels(catalog) : plan.planFeatures;
    const amount = chargedAmount(plan);
    const paymentMethod = amount === 0 ? "PROMO_FREE_TRIAL" : "MERCADO_PAGO";
    const keepsPreapproval = Boolean(current?.mpPreapprovalId);

    if (!current) {
        const start = new Date();
        await general.subscription.create({
            data: {
                subscriptionId: crypto.randomUUID(),
                subscriptionBusinessId: businessId,
                subscriptionPlanId: plan.planId,
                subscriptionStartDate: start,
                subscriptionEndDate: addMonths(start, plan.planDuration),
                subscriptionDuration: plan.planDuration,
                subscriptionStatus: "ACTIVE",
                subscriptionAmount: amount,
                subscriptionPlanFeatures: features,
                subscriptionPaymentMethod: paymentMethod,
                createdByUserId: adminUserId,
                autoRenewEnabled: false,
            },
        });
        return getBusinessSubscriptionAdminView(businessId);
    }

    await general.subscription.update({
        where: { subscriptionId: current.subscriptionId },
        data: {
            subscriptionPlanId: plan.planId,
            subscriptionAmount: amount,
            subscriptionDuration: plan.planDuration,
            subscriptionPlanFeatures: features,
            subscriptionPaymentMethod: paymentMethod,
            subscriptionStatus: "ACTIVE",
            autoRenewEnabled: keepsPreapproval ? current.autoRenewEnabled : false,
        },
    });

    return getBusinessSubscriptionAdminView(businessId);
}

export async function recordBusinessLinkPayment({ businessId, adminUserId }) {
    const view = await getBusinessSubscriptionAdminView(businessId);
    const subscription = view.subscription;
    if (!subscription) {
        throw httpError("El negocio no tiene una suscripción para registrar el link.", 404, "SUBSCRIPTION_NOT_FOUND");
    }
    if (!view.billing.checkoutUrl) {
        throw httpError("Este plan no se cobra con un link de Mercado Pago.", 409, "PAYMENT_LINK_NOT_AVAILABLE");
    }

    const plan = await getPlanById(subscription.subscriptionPlanId);
    const amount = chargedAmount(plan);

    await general.subscriptionPayment.create({
        data: {
            subscriptionPaymentId: crypto.randomUUID(),
            subscriptionId: subscription.subscriptionId,
            subscriptionBusinessId: businessId,
            subscriptionPlanId: subscription.subscriptionPlanId,
            amount,
            currency: plan?.planCurrency || "CLP",
            paymentMethod: "MERCADO_PAGO",
            status: "APPROVED",
            externalReference: `admin-link-${subscription.subscriptionId}`,
            metadata: {
                source: LINK_PAYMENT_SOURCE,
                checkoutUrl: view.billing.checkoutUrl,
                recordedAt: new Date().toISOString(),
            },
            createdByUserId: adminUserId,
        },
    });

    return getBusinessSubscriptionAdminView(businessId);
}

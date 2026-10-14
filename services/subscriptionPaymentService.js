import { checkoutStartDate, addCalendarMonths, assertDeferredStart } from "./billing/subscriptionLifecycle.js";
import { registerRecurringAuthorization } from "./billing/recurringSettlement.js";
import { generalPrisma as general } from "../dbGeneral.js";
import { getPlanById } from "./planService.js";
import { createSubscriptionService, getSubscriptionsByBusinessIdService } from "./subscriptionService.js";
import {
    getMercadoPagoPayment,
    mapMercadoPagoStatus,
    isMercadoPagoConfigured,
    updateMercadoPagoPreapproval,
    createMercadoPagoPendingPreapproval,
    getMercadoPagoPreapproval,
} from "./mercadopago/index.js";
import { getPlanPricing } from "../libs/planPricing.js";
import {
    assertApprovedCheckoutPrice,
    findOpticsPlan,
} from "./billing/opticsPlanCatalog.js";



const FREE_TRIAL_PLAN_ID = "P001";

export const PAYMENT_METHOD_LABELS = {
    MERCADO_PAGO: "Mercado Pago",
    PROMO_FREE_TRIAL: "Promo prueba gratis",
};

function buildSubscriptionDates(planDuration) {
    const subscriptionStartDate = new Date();
    const subscriptionEndDate = addCalendarMonths(subscriptionStartDate, planDuration);
    return { subscriptionStartDate, subscriptionEndDate };
}

async function createSubscriptionRecord({
    subscriptionId,
    subscriptionBusinessId,
    subscriptionPlanId,
    planSelected,
    subscriptionAmount,
    subscriptionPaymentMethod,
    createdByUserId,
    mpPreapprovalId = null,
    mpPreapprovalStatus = null,
    autoRenewEnabled = true,
}) {
    const { subscriptionStartDate, subscriptionEndDate } = buildSubscriptionDates(
        planSelected.planDuration,
    );

    return createSubscriptionService({
        subscriptionId,
        subscriptionBusinessId,
        subscriptionPlanId,
        subscriptionStartDate,
        subscriptionEndDate,
        subscriptionDuration: planSelected.planDuration,
        subscriptionStatus: "ACTIVE",
        subscriptionAmount,
        subscriptionPlanFeatures: planSelected.planFeatures,
        subscriptionPaymentMethod,
        createdByUserId,
        mpPreapprovalId,
        mpPreapprovalStatus,
        autoRenewEnabled,
    });
}

export async function recordPromoFreeTrialPayment({
    subscriptionPaymentId,
    subscriptionId,
    subscriptionBusinessId,
    subscriptionPlanId,
    createdByUserId,
}) {
    return general.subscriptionPayment.create({
        data: {
            subscriptionPaymentId,
            subscriptionId,
            subscriptionBusinessId,
            subscriptionPlanId,
            amount: 0,
            currency: "CLP",
            paymentMethod: "PROMO_FREE_TRIAL",
            status: "APPROVED",
            externalReference: subscriptionPaymentId,
            metadata: {
                source: "P001_FREE_TRIAL",
                recordedAt: new Date().toISOString(),
            },
            createdByUserId,
        },
    });
}

/**
 * Alta de suscripción. Crea el pago local y un preapproval pendiente en
 * Mercado Pago con external_reference = subscriptionPaymentId. Devuelve el
 * init_point de esa adhesión. No usar el link compartido del catálogo.
 */
export async function createMercadoPagoCheckout({
    subscriptionPaymentId,
    pendingSubscriptionId,
    subscriptionBusinessId,
    subscriptionPlanId,
    createdByUserId,
    payerEmail,
}) {
    const catalogPlan = findOpticsPlan(subscriptionPlanId);
    if (catalogPlan && !catalogPlan.forSale) {
        const error = new Error("Este plan no está disponible para nuevas contrataciones.");
        error.code = "PLAN_NOT_FOR_SALE";
        error.statusCode = 403;
        throw error;
    }

    if (!isMercadoPagoConfigured()) {
        const error = new Error("Mercado Pago no está configurado en el servidor.");
        error.code = "MERCADO_PAGO_NOT_CONFIGURED";
        error.statusCode = 503;
        throw error;
    }

    const planSelected = await getPlanById(subscriptionPlanId);
    if (!planSelected) {
        throw new Error("Plan no encontrado.");
    }
    if (planSelected.planActive === false) {
        throw new Error("Este plan no está disponible para nuevas contrataciones.");
    }
    if (Number(planSelected.planPrice) <= 0) {
        throw new Error("Este plan no requiere checkout de Mercado Pago.");
    }
    if (catalogPlan) {
        assertApprovedCheckoutPrice(catalogPlan);
    }
    if (!payerEmail) {
        const error = new Error("Se requiere el correo de la cuenta para crear la suscripción.");
        error.code = "PAYER_EMAIL_REQUIRED";
        error.statusCode = 400;
        throw error;
    }

    const existingSubscriptions = await getSubscriptionsByBusinessIdService(subscriptionBusinessId);
    let firstChargeAt = checkoutStartDate(existingSubscriptions)?.toISOString() || null;

    const pricing = getPlanPricing(planSelected.planPrice);

    const paymentRecord = await general.$transaction(async tx => {
        await tx.$queryRaw`SELECT "businessId" FROM "Business" WHERE "businessId" = ${subscriptionBusinessId} FOR UPDATE`;
        firstChargeAt = checkoutStartDate(await tx.subscription.findMany({ where: { subscriptionBusinessId } }))?.toISOString() || null;
        const pending = await tx.subscriptionPayment.findFirst({ where: { subscriptionBusinessId, paymentMethod: "MERCADO_PAGO", status: "PENDING" } });
        if (pending?.metadata?.checkoutUrl && pending.subscriptionPlanId === subscriptionPlanId) return pending;
        if (pending) throw Object.assign(new Error("Ya existe una contratación pendiente. Retoma o cancela esa solicitud antes de iniciar otra."), { code: "CHECKOUT_ALREADY_PENDING", statusCode: 409 });
        return tx.subscriptionPayment.create({
        data: {
            subscriptionPaymentId,
            subscriptionId: null,
            subscriptionBusinessId,
            subscriptionPlanId,
            amount: pricing.total,
            currency: planSelected.planCurrency || "CLP",
            paymentMethod: "MERCADO_PAGO",
            status: "PENDING",
            externalReference: subscriptionPaymentId,
            metadata: {
                pendingSubscriptionId,
                checkoutStartedAt: new Date().toISOString(),
                firstChargeAt,
                billingVersion: 2,
                billingType: "MONTHLY_RECURRING",
                netAmount: pricing.net,
                ivaAmount: pricing.iva,
                ivaRate: pricing.ivaRate,
            },
            createdByUserId,
        },
    });

    });

    if (paymentRecord.subscriptionPaymentId !== subscriptionPaymentId) {
        return { mode: "SUBSCRIPTION_CHECKOUT", checkoutUrl: paymentRecord.metadata.checkoutUrl,
            paymentId: paymentRecord.subscriptionPaymentId, firstChargeAt: paymentRecord.metadata.firstChargeAt,
            amount: paymentRecord.amount, currency: paymentRecord.currency };
    }
    let preapproval;
    try {
        preapproval = await createMercadoPagoPendingPreapproval({
            reason: `AppsFly — ${planSelected.planName}`,
            externalReference: paymentRecord.subscriptionPaymentId,
            payerEmail,
            amount: pricing.total,
            currency: planSelected.planCurrency || "CLP",
            firstChargeAt,
        });
    } catch (error) {
        await general.subscriptionPayment.update({
            where: { subscriptionPaymentId },
            data: {
                status: "PENDING",
                metadata: {
                    ...(paymentRecord.metadata ?? {}),
                    checkoutNeedsReview: true,
                },
            },
        });
        throw error;
    }

    try {
        assertDeferredStart(firstChargeAt, preapproval.auto_recurring?.start_date);
    } catch (error) {
        if (preapproval.id) {
            await general.subscriptionPayment.update({where:{subscriptionPaymentId},data:{metadata:{...paymentRecord.metadata,mpPreapprovalId:String(preapproval.id),checkoutNeedsReview:true}}});
            await updateMercadoPagoPreapproval(String(preapproval.id), {status:"cancelled"});
            await general.subscriptionPayment.update({where:{subscriptionPaymentId},data:{status:"REJECTED"}});
        }
        throw error;
    }
    const checkoutUrl = preapproval.init_point || preapproval.sandbox_init_point;
    if (!checkoutUrl || !preapproval.id) {
        await general.subscriptionPayment.update({
            where: { subscriptionPaymentId },
            data: { status: "PENDING", metadata: { ...paymentRecord.metadata, checkoutNeedsReview: true, mpPreapprovalId: preapproval.id || null } },
        });
        const error = new Error("Mercado Pago no devolvió el link de suscripción.");
        error.code = "PREAPPROVAL_LINK_MISSING";
        error.statusCode = 502;
        throw error;
    }

    await general.$transaction(async tx => {
        await tx.$queryRaw`SELECT "subscriptionPaymentId" FROM "SubscriptionPayment" WHERE "subscriptionPaymentId" = ${subscriptionPaymentId} FOR UPDATE`;
        const latest = await tx.subscriptionPayment.findUniqueOrThrow({where:{subscriptionPaymentId}});
        await tx.subscriptionPayment.update({ where: {subscriptionPaymentId}, data: {metadata: {
            ...latest.metadata, mpPreapprovalId: String(preapproval.id), checkoutUrl,
            mpPreapprovalStatus: latest.metadata?.mpPreapprovalStatus || preapproval.status,
        }} });
    });

    return {
        mode: "SUBSCRIPTION_CHECKOUT",
        firstChargeAt,
        checkoutUrl,
        paymentId: paymentRecord.subscriptionPaymentId,
        mpPreapprovalId: String(preapproval.id),
        amount: pricing.total,
        netAmount: pricing.net,
        ivaAmount: pricing.iva,
        ivaRate: pricing.ivaRate,
        currency: planSelected.planCurrency || "CLP",
        planName: planSelected.planName,
        billingType: "MONTHLY_RECURRING",
        billingLabel: "Suscripción mensual recurrente (neto + IVA)",
    };
}

export async function syncMercadoPagoPreapprovalPayment({ subscriptionPaymentId, userId }) {
    const paymentRecord = await general.subscriptionPayment.findUnique({
        where: { subscriptionPaymentId },
    });
    if (!paymentRecord) {
        const error = new Error("Pago no encontrado.");
        error.code = "PAYMENT_NOT_FOUND";
        error.statusCode = 404;
        throw error;
    }
    if (paymentRecord.createdByUserId !== userId) {
        const error = new Error("No puedes confirmar este pago.");
        error.code = "PAYMENT_FORBIDDEN";
        error.statusCode = 403;
        throw error;
    }
    if (paymentRecord.status === "APPROVED" && paymentRecord.subscriptionId) {
        const subscription = await general.subscription.findUnique({
            where: { subscriptionId: paymentRecord.subscriptionId },
        });
        return { payment: paymentRecord, subscription, alreadyProcessed: true };
    }

    const mpPreapprovalId = paymentRecord.metadata?.mpPreapprovalId;
    if (!mpPreapprovalId) {
        const error = new Error("Esta suscripción todavía no tiene un identificador de Mercado Pago.");
        error.code = "PREAPPROVAL_NOT_STARTED";
        error.statusCode = 409;
        throw error;
    }

    return finalizeMercadoPagoPreapproval({
        subscriptionPaymentId,
        mpPreapprovalId: String(mpPreapprovalId),
    });
}

/**
 * Procesa el Brick: crea suscripción recurrente mensual (preapproval) en Mercado Pago.
 */
export async function processPaymentBrickSubmission() {
    throw Object.assign(new Error("Continúa en el checkout seguro de Mercado Pago para autorizar la suscripción."), { code: "USE_HOSTED_CHECKOUT", statusCode: 409 });
}

/**
 * Activa suscripción en GeneralDB tras preapproval autorizado (cobro mensual recurrente).
 */
export async function finalizeMercadoPagoPreapproval({
    subscriptionPaymentId,
    mpPreapprovalId,
    mpPreapprovalData = null,
}) {
    const preapproval = mpPreapprovalData || await getMercadoPagoPreapproval(mpPreapprovalId);
    if (String(preapproval.id) !== String(mpPreapprovalId)) throw new Error("PREAPPROVAL_ID_MISMATCH");
    return registerRecurringAuthorization(subscriptionPaymentId, preapproval);
}

/**
 * @deprecated Flujo puntual — conservado para webhooks legacy de pagos únicos.
 */
export async function finalizeMercadoPagoPayment({ subscriptionPaymentId, mpPaymentId }) {
    const paymentRecord = await general.subscriptionPayment.findUnique({
        where: { subscriptionPaymentId },
    });

    if (!paymentRecord) {
        throw new Error("Registro de pago no encontrado.");
    }

    if (paymentRecord.status === "APPROVED" && paymentRecord.subscriptionId) {
        const subscription = await general.subscription.findUnique({
            where: { subscriptionId: paymentRecord.subscriptionId },
        });
        return { payment: paymentRecord, subscription, alreadyProcessed: true };
    }

    if (paymentRecord.metadata?.mpPreapprovalId) {
        return syncMercadoPagoPreapprovalPayment({ subscriptionPaymentId, userId: paymentRecord.createdByUserId });
    }
    const mpPayment = await getMercadoPagoPayment(mpPaymentId);
    const mappedStatus = mapMercadoPagoStatus(mpPayment.status);

    if (mappedStatus === "REJECTED") {
        const rejected = await general.subscriptionPayment.update({
            where: { subscriptionPaymentId },
            data: {
                status: "REJECTED",
                mpPaymentId: String(mpPaymentId),
                metadata: {
                    ...(paymentRecord.metadata ?? {}),
                    mpStatus: mpPayment.status,
                    mpStatusDetail: mpPayment.status_detail,
                },
            },
        });
        return { payment: rejected, subscription: null, alreadyProcessed: false };
    }

    if (mappedStatus !== "APPROVED") {
        const pending = await general.subscriptionPayment.update({
            where: { subscriptionPaymentId },
            data: {
                status: "PENDING",
                mpPaymentId: String(mpPaymentId),
                metadata: {
                    ...(paymentRecord.metadata ?? {}),
                    mpStatus: mpPayment.status,
                    mpStatusDetail: mpPayment.status_detail,
                },
            },
        });
        return { payment: pending, subscription: null, alreadyProcessed: false };
    }

    const expectedReference = paymentRecord.externalReference || paymentRecord.subscriptionPaymentId;
    if (
        String(mpPayment.external_reference || "") !== String(expectedReference)
    ) {
        throw new Error("La referencia externa del pago no coincide.");
    }

    const paidAmount = Number(mpPayment.transaction_amount ?? 0);
    if (!Number.isFinite(paidAmount) || paidAmount <= 0 || mpPayment.currency_id !== paymentRecord.currency || Math.abs(paidAmount - paymentRecord.amount) > 0.01) {
        throw new Error("El monto pagado no coincide con el monto esperado.");
    }

    const planSelected = await getPlanById(paymentRecord.subscriptionPlanId);
    if (!planSelected) {
        throw new Error("Plan asociado al pago no encontrado.");
    }

    const pendingSubscriptionId =
        paymentRecord.subscriptionId
        || paymentRecord.metadata?.pendingSubscriptionId;

    if (!pendingSubscriptionId) {
        throw new Error("No hay suscripción pendiente asociada al pago.");
    }

    const existingSubscription = await general.subscription.findUnique({
        where: { subscriptionId: pendingSubscriptionId },
    });

    let subscription = existingSubscription;
    if (!subscription) {
        subscription = await createSubscriptionRecord({
            subscriptionId: pendingSubscriptionId,
            subscriptionBusinessId: paymentRecord.subscriptionBusinessId,
            subscriptionPlanId: paymentRecord.subscriptionPlanId,
            planSelected,
            subscriptionAmount: paymentRecord.amount,
            subscriptionPaymentMethod: "MercadoPago",
            createdByUserId: paymentRecord.createdByUserId,
        });
    }

    const approvedPayment = await general.subscriptionPayment.update({
        where: { subscriptionPaymentId },
        data: {
            status: "APPROVED",
            subscriptionId: subscription.subscriptionId,
            mpPaymentId: String(mpPaymentId),
            metadata: {
                ...(paymentRecord.metadata ?? {}),
                mpStatus: mpPayment.status,
                mpStatusDetail: mpPayment.status_detail,
                approvedAt: new Date().toISOString(),
            },
        },
    });

    return { payment: approvedPayment, subscription, alreadyProcessed: false };
}

export async function getAdminSubscriptionPayments() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const payments = await general.subscriptionPayment.findMany({
        include: {
            business: {
                select: {
                    businessId: true,
                    businessName: true,
                },
            },
            plan: {
                select: {
                    planId: true,
                    planName: true,
                },
            },
            subscription: {
                select: {
                    subscriptionId: true,
                    subscriptionStatus: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const monthlyMercadoPagoRevenue = payments
        .filter(
            (p) =>
                p.paymentMethod === "MERCADO_PAGO"
                && p.status === "APPROVED"
                && new Date(p.createdAt) >= startOfMonth,
        )
        .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const processedCount = payments.filter((p) => p.status === "APPROVED").length;
    const activeFreeTrials = payments.filter(
        (p) => p.paymentMethod === "PROMO_FREE_TRIAL" && p.status === "APPROVED",
    ).length;

    return {
        payments,
        metrics: {
            monthlyMercadoPagoRevenue,
            processedCount,
            activeFreeTrials,
            totalRecords: payments.length,
        },
    };
}

export { FREE_TRIAL_PLAN_ID };

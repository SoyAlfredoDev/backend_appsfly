import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";
import { getPlanById } from "./planService.js";
import { createSubscriptionService, getSubscriptionsByBusinessIdService } from "./subscriptionService.js";
import {
    createMercadoPagoPreference,
    getMercadoPagoPayment,
    mapMercadoPagoStatus,
    isMercadoPagoConfigured,
    createMercadoPagoPaymentFromBrick,
} from "./mercadopago/index.js";

const general = new PrismaGeneral();

const FREE_TRIAL_PLAN_ID = "P001";

export const PAYMENT_METHOD_LABELS = {
    MERCADO_PAGO: "Mercado Pago",
    PROMO_FREE_TRIAL: "Promo prueba gratis",
};

function buildSubscriptionDates(planDuration) {
    const subscriptionStartDate = new Date();
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + planDuration);
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

export async function createMercadoPagoCheckout({
    subscriptionPaymentId,
    pendingSubscriptionId,
    subscriptionBusinessId,
    subscriptionPlanId,
    createdByUserId,
    payerEmail,
}) {
    if (!isMercadoPagoConfigured()) {
        throw new Error("Mercado Pago no está configurado en el servidor.");
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

    const existingSubscriptions = await getSubscriptionsByBusinessIdService(subscriptionBusinessId);
    const hasActive = Array.isArray(existingSubscriptions)
        && existingSubscriptions.some(
            (sub) => sub.subscriptionStatus === "ACTIVE" && new Date(sub.subscriptionEndDate) > new Date(),
        );
    if (hasActive) {
        throw new Error("El negocio ya tiene una suscripción activa.");
    }

    const paymentRecord = await general.subscriptionPayment.create({
        data: {
            subscriptionPaymentId,
            subscriptionId: null,
            subscriptionBusinessId,
            subscriptionPlanId,
            amount: planSelected.planPrice,
            currency: planSelected.planCurrency || "CLP",
            paymentMethod: "MERCADO_PAGO",
            status: "PENDING",
            externalReference: subscriptionPaymentId,
            metadata: {
                pendingSubscriptionId,
                checkoutStartedAt: new Date().toISOString(),
            },
            createdByUserId,
        },
    });

    const preference = await createMercadoPagoPreference({
        title: `AppsFly — ${planSelected.planName}`,
        amount: planSelected.planPrice,
        currency: planSelected.planCurrency || "CLP",
        externalReference: subscriptionPaymentId,
        payerEmail,
    });

    await general.subscriptionPayment.update({
        where: { subscriptionPaymentId: paymentRecord.subscriptionPaymentId },
        data: {
            mpPreferenceId: preference.preferenceId,
            metadata: {
                ...(paymentRecord.metadata ?? {}),
                mpPreferenceId: preference.preferenceId,
            },
        },
    });

    return {
        paymentId: paymentRecord.subscriptionPaymentId,
        preferenceId: preference.preferenceId,
        amount: Math.round(Number(planSelected.planPrice)),
        currency: planSelected.planCurrency || "CLP",
        planName: planSelected.planName,
        initPoint: preference.initPoint,
        sandboxInitPoint: preference.sandboxInitPoint,
    };
}

/**
 * Procesa el onSubmit del Payment Brick y finaliza suscripción si status === approved.
 */
export async function processPaymentBrickSubmission({
    subscriptionPaymentId,
    formData,
    selectedPaymentMethod,
}) {
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

    const planSelected = await getPlanById(paymentRecord.subscriptionPlanId);
    const description = `AppsFly — ${planSelected?.planName ?? "Suscripción"}`;

    const mpPayment = await createMercadoPagoPaymentFromBrick({
        formData: {
            ...formData,
            transaction_amount: Number(paymentRecord.amount),
        },
        externalReference: paymentRecord.subscriptionPaymentId,
        description,
        idempotencyKey: `${subscriptionPaymentId}-${Date.now()}`,
    });

    const mappedStatus = mapMercadoPagoStatus(mpPayment.status);

    if (mappedStatus !== "APPROVED") {
        const updated = await general.subscriptionPayment.update({
            where: { subscriptionPaymentId },
            data: {
                status: mappedStatus,
                mpPaymentId: String(mpPayment.id),
                metadata: {
                    ...(paymentRecord.metadata ?? {}),
                    mpStatus: mpPayment.status,
                    mpStatusDetail: mpPayment.status_detail,
                    selectedPaymentMethod,
                    brickSubmittedAt: new Date().toISOString(),
                },
            },
        });
        return { payment: updated, subscription: null, alreadyProcessed: false, mpPayment };
    }

    return finalizeMercadoPagoPayment({
        subscriptionPaymentId,
        mpPaymentId: String(mpPayment.id),
    });
}

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
        mpPayment.external_reference
        && String(mpPayment.external_reference) !== String(expectedReference)
    ) {
        throw new Error("La referencia externa del pago no coincide.");
    }

    const paidAmount = Number(mpPayment.transaction_amount ?? 0);
    if (Math.abs(paidAmount - paymentRecord.amount) > 0.01) {
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

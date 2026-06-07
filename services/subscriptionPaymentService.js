import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";
import { getPlanById } from "./planService.js";
import { createSubscriptionService, getSubscriptionsByBusinessIdService } from "./subscriptionService.js";
import {
    getMercadoPagoPayment,
    mapMercadoPagoStatus,
    isMercadoPagoConfigured,
    createMercadoPagoPreapproval,
    mapMercadoPagoPreapprovalStatus,
    getMercadoPagoPreapproval,
} from "./mercadopago/index.js";
import { sendDualSubscriptionPaymentEmails } from "../emails/dispatchers/subscriptionPayment.dispatcher.js";

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
                billingType: "MONTHLY_RECURRING",
            },
            createdByUserId,
        },
    });

    return {
        paymentId: paymentRecord.subscriptionPaymentId,
        amount: Math.round(Number(planSelected.planPrice)),
        currency: planSelected.planCurrency || "CLP",
        planName: planSelected.planName,
        billingType: "MONTHLY_RECURRING",
        billingLabel: "Suscripción mensual recurrente",
    };
}

/**
 * Procesa el Brick: crea suscripción recurrente mensual (preapproval) en Mercado Pago.
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

    if (!formData?.token) {
        throw new Error("Falta el token de tarjeta para la suscripción recurrente.");
    }

    const planSelected = await getPlanById(paymentRecord.subscriptionPlanId);
    const payerEmail =
        formData.payer?.email
        || (await general.user.findUnique({
            where: { userId: paymentRecord.createdByUserId },
            select: { userEmail: true },
        }))?.userEmail;

    if (!payerEmail) {
        throw new Error("Se requiere un correo para activar la suscripción recurrente.");
    }

    const preapproval = await createMercadoPagoPreapproval({
        reason: `AppsFly — ${planSelected?.planName ?? "Suscripción mensual"}`,
        externalReference: paymentRecord.subscriptionPaymentId,
        payerEmail,
        cardTokenId: formData.token,
        amount: paymentRecord.amount,
        currency: paymentRecord.currency || "CLP",
    });

    const mappedPreapproval = mapMercadoPagoPreapprovalStatus(preapproval.status);

    if (mappedPreapproval !== "AUTHORIZED") {
        const updated = await general.subscriptionPayment.update({
            where: { subscriptionPaymentId },
            data: {
                status: "PENDING",
                metadata: {
                    ...(paymentRecord.metadata ?? {}),
                    mpPreapprovalId: preapproval.id,
                    mpPreapprovalStatus: preapproval.status,
                    selectedPaymentMethod,
                    brickSubmittedAt: new Date().toISOString(),
                },
            },
        });
        return {
            payment: updated,
            subscription: null,
            alreadyProcessed: false,
            mpPreapproval: preapproval,
        };
    }

    return finalizeMercadoPagoPreapproval({
        subscriptionPaymentId,
        mpPreapprovalId: String(preapproval.id),
        mpPreapprovalData: preapproval,
    });
}

/**
 * Activa suscripción en GeneralDB tras preapproval autorizado (cobro mensual recurrente).
 */
export async function finalizeMercadoPagoPreapproval({
    subscriptionPaymentId,
    mpPreapprovalId,
    mpPreapprovalData = null,
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

    const preapproval = mpPreapprovalData || await getMercadoPagoPreapproval(mpPreapprovalId);
    const mappedPreapproval = mapMercadoPagoPreapprovalStatus(preapproval.status);

    if (mappedPreapproval !== "AUTHORIZED") {
        const pending = await general.subscriptionPayment.update({
            where: { subscriptionPaymentId },
            data: {
                status: "PENDING",
                metadata: {
                    ...(paymentRecord.metadata ?? {}),
                    mpPreapprovalId: String(mpPreapprovalId),
                    mpPreapprovalStatus: preapproval.status,
                },
            },
        });
        return { payment: pending, subscription: null, alreadyProcessed: false, mpPreapproval: preapproval };
    }

    const expectedReference = paymentRecord.externalReference || paymentRecord.subscriptionPaymentId;
    if (
        preapproval.external_reference
        && String(preapproval.external_reference) !== String(expectedReference)
    ) {
        throw new Error("La referencia externa de la suscripción no coincide.");
    }

    const recurringAmount = Number(preapproval.auto_recurring?.transaction_amount ?? paymentRecord.amount);
    if (Math.abs(recurringAmount - paymentRecord.amount) > 0.01) {
        throw new Error("El monto de la suscripción recurrente no coincide con el plan.");
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

    let subscription = await general.subscription.findUnique({
        where: { subscriptionId: pendingSubscriptionId },
    });

    if (!subscription) {
        subscription = await createSubscriptionRecord({
            subscriptionId: pendingSubscriptionId,
            subscriptionBusinessId: paymentRecord.subscriptionBusinessId,
            subscriptionPlanId: paymentRecord.subscriptionPlanId,
            planSelected,
            subscriptionAmount: paymentRecord.amount,
            subscriptionPaymentMethod: "MercadoPago",
            createdByUserId: paymentRecord.createdByUserId,
            mpPreapprovalId: String(mpPreapprovalId),
            mpPreapprovalStatus: preapproval.status,
            autoRenewEnabled: true,
        });
    } else {
        subscription = await general.subscription.update({
            where: { subscriptionId: pendingSubscriptionId },
            data: {
                mpPreapprovalId: String(mpPreapprovalId),
                mpPreapprovalStatus: preapproval.status,
                autoRenewEnabled: true,
                subscriptionStatus: "ACTIVE",
            },
        });
    }

    const approvedPayment = await general.subscriptionPayment.update({
        where: { subscriptionPaymentId },
        data: {
            status: "APPROVED",
            subscriptionId: subscription.subscriptionId,
            metadata: {
                ...(paymentRecord.metadata ?? {}),
                mpPreapprovalId: String(mpPreapprovalId),
                mpPreapprovalStatus: preapproval.status,
                billingType: "MONTHLY_RECURRING",
                approvedAt: new Date().toISOString(),
            },
        },
    });

    setImmediate(async () => {
        try {
            const [business, plan, user] = await Promise.all([
                general.business.findUnique({ where: { businessId: paymentRecord.subscriptionBusinessId } }),
                general.plan.findUnique({ where: { planId: paymentRecord.subscriptionPlanId } }),
                general.user.findUnique({
                    where: { userId: paymentRecord.createdByUserId },
                    select: { userFirstName: true, userLastName: true, userEmail: true },
                }),
            ]);
            await sendDualSubscriptionPaymentEmails({
                user,
                business,
                plan,
                amount: paymentRecord.amount,
                currency: paymentRecord.currency,
                paymentMethod: "MERCADO_PAGO",
                transactionId: String(mpPreapprovalId),
                subscriptionEndDate: subscription.subscriptionEndDate,
                eventType: "subscription.preapproval.authorized",
            });
        } catch (err) {
            console.error("[subscriptionPayment] Error enviando correos preapproval:", err.message);
        }
    });

    return {
        payment: approvedPayment,
        subscription,
        alreadyProcessed: false,
        mpPreapproval: preapproval,
    };
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

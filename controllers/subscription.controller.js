import crypto from "crypto";
import { getSubscriptionsByBusinessIdService } from "../services/subscriptionService.js";
import { getPlanById } from "../services/planService.js";
import {
    createMercadoPagoCheckout,
    finalizeMercadoPagoPayment,
    recordPromoFreeTrialPayment,
    processPaymentBrickSubmission,
    FREE_TRIAL_PLAN_ID,
} from "../services/subscriptionPaymentService.js";
import { createSubscriptionService } from "../services/subscriptionService.js";
import { getMercadoPagoPayment, mapMercadoPagoStatus } from "../services/mercadopago/index.js";
import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";

const general = new PrismaGeneral();

export const checkActiveSubscription = async (req, res) => {
    const businessId = req.params.businessId;
    try {
        const subscription = await getSubscriptionsByBusinessIdService(businessId);
        if (!subscription) {
            return res.status(404).json({ message: "No subscription found for this business." });
        }
        return res.status(200).json(subscription);
    } catch (error) {
        console.error("Error checking active subscription:", error);
        return res.status(500).json({ message: "Server error checking subscription" });
    }
};

function buildSubscriptionPayload({
    subscriptionId,
    subscriptionBusinessId,
    subscriptionPlanId,
    planSelected,
    subscriptionAmount,
    subscriptionPaymentMethod,
    userId,
}) {
    const subscriptionStartDate = new Date();
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + planSelected.planDuration);

    return {
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
        createdByUserId: userId,
    };
}

export const createSubscriptionController = async (req, res) => {
    try {
        const {
            subscriptionId,
            subscriptionBusinessId,
            subscriptionPlanId,
        } = req.body;
        const userId = req.user.payload.id;

        const planSelected = await getPlanById(subscriptionPlanId);
        if (!planSelected) {
            return res.status(404).json({ message: "Plan not found." });
        }

        if (planSelected.planActive === false) {
            return res.status(403).json({
                message: "Este plan no está disponible para nuevas contrataciones.",
            });
        }

        const existingSubscriptions = await getSubscriptionsByBusinessIdService(subscriptionBusinessId);
        const hasHistory = Array.isArray(existingSubscriptions) && existingSubscriptions.length > 0;

        if (subscriptionPlanId === FREE_TRIAL_PLAN_ID && hasHistory) {
            return res.status(403).json({
                message: "La promoción de prueba gratuita no está disponible para negocios con historial de suscripción.",
            });
        }

        if (subscriptionPlanId !== FREE_TRIAL_PLAN_ID) {
            return res.status(400).json({
                message: "Los planes de pago deben procesarse mediante Mercado Pago.",
                code: "REQUIRES_MERCADO_PAGO_CHECKOUT",
            });
        }

        const subscriptionPaymentId = crypto.randomUUID();
        const data = buildSubscriptionPayload({
            subscriptionId,
            subscriptionBusinessId,
            subscriptionPlanId,
            planSelected,
            subscriptionAmount: 0,
            subscriptionPaymentMethod: "PROMO_FREE_TRIAL",
            userId,
        });

        const subscription = await createSubscriptionService(data);

        await recordPromoFreeTrialPayment({
            subscriptionPaymentId,
            subscriptionId: subscription.subscriptionId,
            subscriptionBusinessId,
            subscriptionPlanId,
            createdByUserId: userId,
        });

        return res.status(201).json({
            subscription,
            payment: {
                subscriptionPaymentId,
                amount: 0,
                paymentMethod: "PROMO_FREE_TRIAL",
                status: "APPROVED",
            },
        });
    } catch (error) {
        console.error("Error creating subscription:", error);
        return res.status(500).json({ message: error.message || "Server error creating subscription" });
    }
};

export const createSubscriptionCheckoutController = async (req, res) => {
    try {
        const {
            subscriptionPaymentId = crypto.randomUUID(),
            subscriptionId,
            subscriptionBusinessId,
            subscriptionPlanId,
        } = req.body;
        const userId = req.user.payload.id;

        if (!subscriptionId || !subscriptionBusinessId || !subscriptionPlanId) {
            return res.status(400).json({ message: "Faltan datos para iniciar el checkout." });
        }

        if (subscriptionPlanId === FREE_TRIAL_PLAN_ID) {
            return res.status(400).json({
                message: "El plan promocional gratuito no usa checkout de Mercado Pago.",
            });
        }

        const user = await general.user.findUnique({
            where: { userId },
            select: { userEmail: true },
        });

        const checkout = await createMercadoPagoCheckout({
            subscriptionPaymentId,
            pendingSubscriptionId: subscriptionId,
            subscriptionBusinessId,
            subscriptionPlanId,
            createdByUserId: userId,
            payerEmail: user?.userEmail,
        });

        return res.status(201).json(checkout);
    } catch (error) {
        console.error("Error creating subscription checkout:", error);
        return res.status(500).json({ message: error.message || "Error al iniciar checkout." });
    }
};

export const processSubscriptionPaymentBrickController = async (req, res) => {
    try {
        const { subscriptionPaymentId, formData, selectedPaymentMethod } = req.body;

        if (!subscriptionPaymentId || !formData) {
            return res.status(400).json({ message: "Faltan datos del Payment Brick." });
        }

        const result = await processPaymentBrickSubmission({
            subscriptionPaymentId,
            formData,
            selectedPaymentMethod,
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error processing Payment Brick:", error);
        return res.status(500).json({ message: error.message || "Error al procesar el pago." });
    }
};

export const confirmSubscriptionPaymentController = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { mpPaymentId } = req.query;

        if (!mpPaymentId) {
            return res.status(400).json({ message: "Falta mpPaymentId para confirmar el pago." });
        }

        const result = await finalizeMercadoPagoPayment({
            subscriptionPaymentId: paymentId,
            mpPaymentId,
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error confirming subscription payment:", error);
        return res.status(500).json({ message: error.message || "Error al confirmar el pago." });
    }
};

export const mercadoPagoWebhookController = async (req, res) => {
    try {
        const topic = req.query.topic || req.query.type || req.body?.type;
        const paymentId =
            req.query["data.id"]
            || req.body?.data?.id
            || req.body?.id;

        if (!paymentId) {
            return res.status(200).json({ received: true, ignored: true });
        }

        if (topic && !["payment", "merchant_order"].includes(String(topic))) {
            return res.status(200).json({ received: true, ignored: true });
        }

        const mpPayment = await getMercadoPagoPayment(paymentId);
        const externalReference = mpPayment.external_reference;

        if (!externalReference) {
            return res.status(200).json({ received: true, ignored: true });
        }

        if (mapMercadoPagoStatus(mpPayment.status) === "APPROVED") {
            await finalizeMercadoPagoPayment({
                subscriptionPaymentId: String(externalReference),
                mpPaymentId: String(paymentId),
            });
        } else {
            await general.subscriptionPayment.updateMany({
                where: { subscriptionPaymentId: String(externalReference) },
                data: {
                    status: mapMercadoPagoStatus(mpPayment.status),
                    mpPaymentId: String(paymentId),
                },
            });
        }

        return res.status(200).json({ received: true });
    } catch (error) {
        console.error("Mercado Pago webhook error:", error);
        return res.status(500).json({ message: error.message || "Webhook error" });
    }
};

export const getSubscriptionPaymentStatusController = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await general.subscriptionPayment.findUnique({
            where: { subscriptionPaymentId: paymentId },
            include: {
                subscription: true,
                business: { select: { businessName: true } },
                plan: { select: { planName: true } },
            },
        });

        if (!payment) {
            return res.status(404).json({ message: "Pago no encontrado." });
        }

        return res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment status:", error);
        return res.status(500).json({ message: error.message || "Error al consultar pago." });
    }
};

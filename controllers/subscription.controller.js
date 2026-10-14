import { deliverBillingNotice } from "../services/billing/billingNotifications.js";
import { addCalendarMonths } from "../services/billing/subscriptionLifecycle.js";
import crypto from "crypto";
import { getSubscriptionsByBusinessIdService } from "../services/subscriptionService.js";
import { getPlanById } from "../services/planService.js";
import {
    createMercadoPagoCheckout,
    finalizeMercadoPagoPayment,
    processPaymentBrickSubmission,
    syncMercadoPagoPreapprovalPayment,
    FREE_TRIAL_PLAN_ID,
} from "../services/subscriptionPaymentService.js";
import {
    getBusinessBillingStatus,
    cancelBusinessSubscriptionRenewal,
} from "../services/mercadopago/mpSubscriptionBillingService.js";
import { generalPrisma as general } from "../dbGeneral.js";
import { canClaimOpticsTrial } from "../services/billing/opticsPlanCatalog.js";



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
    const subscriptionEndDate = addCalendarMonths(subscriptionStartDate, planSelected.planDuration);

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
        autoRenewEnabled: false,
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

        if (!subscriptionId || !subscriptionBusinessId || !subscriptionPlanId) {
            return res.status(400).json({
                message: "Faltan datos para activar la suscripción. Vuelve a iniciar sesión e intenta de nuevo.",
            });
        }

        if (req.tenantBusinessId && subscriptionBusinessId !== req.tenantBusinessId) {
            return res.status(403).json({
                message: "No puedes activar una suscripción para otro negocio.",
                code: "TENANT_FORBIDDEN",
            });
        }

        const businessReady = await general.business.findUnique({
            where: { businessId: subscriptionBusinessId },
            select: { businessStatus: true },
        });
        if (!businessReady || businessReady.businessStatus !== "ACTIVE") {
            return res.status(409).json({
                message: "El negocio aún no termina de configurarse. Activa el plan cuando el espacio de trabajo esté listo.",
                code: "TENANT_PROVISIONING_INCOMPLETE",
            });
        }

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
        const priorSubscriptionCount = Array.isArray(existingSubscriptions) ? existingSubscriptions.length : 0;

        if (subscriptionPlanId === FREE_TRIAL_PLAN_ID && !canClaimOpticsTrial(priorSubscriptionCount)) {
            return res.status(403).json({
                message: "La promoción de prueba gratuita no está disponible para negocios con historial de suscripción.",
                code: "TRIAL_ALREADY_USED",
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

        const subscription = await general.$transaction(async tx => {
            await tx.$queryRaw`SELECT "businessId" FROM "Business" WHERE "businessId" = ${subscriptionBusinessId} FOR UPDATE`;
            if (await tx.subscription.count({where:{subscriptionBusinessId}}) || await tx.subscriptionPayment.count({where:{subscriptionBusinessId}})) {
                throw Object.assign(new Error("Este negocio ya utilizó o contrató una suscripción."), {statusCode:403,code:"TRIAL_ALREADY_USED"});
            }
            const sub = await tx.subscription.create({data});
            await tx.subscriptionPayment.create({data:{subscriptionPaymentId,subscriptionId:sub.subscriptionId,
                subscriptionBusinessId,subscriptionPlanId,amount:0,currency:"CLP",paymentMethod:"PROMO_FREE_TRIAL",
                status:"APPROVED",externalReference:subscriptionPaymentId,createdByUserId:userId,
                metadata:{source:"P001_FREE_TRIAL",billingVersion:2,trialWelcomePending:true}}});
            return sub;
        });
        await deliverBillingNotice(subscriptionPaymentId,"trial_started",subscription.subscriptionEndDate)
            .catch(() => console.error("[billing] Trial welcome pending retry", subscriptionPaymentId));

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
        return res.status(error.statusCode || 500).json({ message: error.message || "Server error creating subscription", code: error.code || "SUBSCRIPTION_CREATE_FAILED" });
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
        const status = Number.isInteger(error.statusCode) ? error.statusCode : 500;
        return res.status(status).json({
            message: error.message || "Error al iniciar checkout.",
            ...(error.code ? { code: error.code } : {}),
        });
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
        return res.status(error.statusCode || 500).json({ message: error.message || "Error al procesar el pago.", code: error.code || "PAYMENT_PROCESSING_FAILED" });
    }
};

export const syncSubscriptionPreapprovalController = async (req, res) => {
    try {
        const result = await syncMercadoPagoPreapprovalPayment({
            subscriptionPaymentId: req.params.paymentId,
            userId: req.user.payload.id,
        });
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error syncing subscription preapproval:", error);
        const status = Number.isInteger(error.statusCode) ? error.statusCode : 500;
        return res.status(status).json({
            message: error.message || "Error al confirmar la suscripción.",
            ...(error.code ? { code: error.code } : {}),
        });
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

export const getBusinessBillingController = async (req, res) => {
    try {
        const { businessId } = req.params;
        const userId = req.user.payload.id;

        const link = await general.userBusiness.findFirst({
            where: { userBusinessUserId: userId, userBusinessBusinessId: businessId },
        });
        if (!link) {
            return res.status(403).json({ message: "No tienes acceso a este negocio." });
        }

        const billing = await getBusinessBillingStatus(businessId);
        return res.status(200).json(billing);
    } catch (error) {
        console.error("Error fetching billing status:", error);
        return res.status(500).json({ message: error.message || "Error al consultar facturación." });
    }
};

export const cancelBusinessSubscriptionController = async (req, res) => {
    try {
        const { businessId } = req.params;
        const userId = req.user.payload.id;
        const { confirmationPhrase, cancelReason } = req.body ?? {};

        const result = await cancelBusinessSubscriptionRenewal({
            businessId,
            userId,
            confirmationPhrase,
            cancelReason,
            auditContext: {
                ip: req.ip || req.headers["x-forwarded-for"]?.split(",")[0]?.trim(),
                userAgent: req.headers["user-agent"],
            },
        });
        const billing = await getBusinessBillingStatus(businessId);

        return res.status(200).json({
            message: result.alreadyCancelled
                ? "La suscripción recurrente ya estaba cancelada."
                : "Suscripción cancelada. Mantendrás acceso hasta la fecha de vencimiento. No habrá más cobros mensuales.",
            ...result,
            billing,
        });
    } catch (error) {
        console.error("Error cancelling subscription:", error);
        const status = error.statusCode || 500;
        return res.status(status).json({ message: error.message || "Error al cancelar suscripción." });
    }
};

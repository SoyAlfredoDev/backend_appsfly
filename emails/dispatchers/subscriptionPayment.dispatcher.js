import { sendEmail } from "../core/sendEmail.js";
import {
    subscriptionPaymentCustomerTemplate,
    subscriptionPaymentCustomerText,
} from "../users/subscriptions/paymentReceipt.template.js";
import {
    subscriptionWelcomeTemplate,
    subscriptionWelcomeText,
    subscriptionWelcomeSubject,
} from "../users/subscriptions/subscriptionWelcome.template.js";
import {
    subscriptionPaymentAdminTemplate,
    subscriptionPaymentAdminText,
} from "../admin/subscriptions/paymentAlert.template.js";
import { PAYMENT_METHOD_LABELS } from "../../services/subscriptionPaymentService.js";

const APPSFLY_ADMIN_EMAIL = process.env.APPSFLY_ADMIN_EMAIL?.trim() || "appsfly.cl@gmail.com";

const WELCOME_EVENT_TYPES = new Set([
    "promo_free_trial.created",
    "subscription.preapproval.authorized",
    "subscription_preapproval",
    "SUBSCRIPTION_AUTHORIZED",
    "payment.approved",
]);

const RENEWAL_EVENT_TYPES = new Set([
    "subscription_authorized_payment",
    "RECURRING_PAYMENT_APPROVED",
    "webhook_renewal",
]);

function resolveGatewayLabel(paymentMethod) {
    if (paymentMethod === "PROMO_FREE_TRIAL") return PAYMENT_METHOD_LABELS.PROMO_FREE_TRIAL;
    if (paymentMethod === "MERCADO_PAGO") return PAYMENT_METHOD_LABELS.MERCADO_PAGO;
    return paymentMethod || "Mercado Pago";
}

function isWelcomeSubscriptionEmail({ eventType, paymentMethod }) {
    if (paymentMethod === "PROMO_FREE_TRIAL") return true;
    const normalized = String(eventType || "").toLowerCase();
    if (RENEWAL_EVENT_TYPES.has(eventType) || normalized.includes("renewal")) return false;
    if (WELCOME_EVENT_TYPES.has(eventType)) return true;
    return false;
}

/**
 * Envía correo al cliente (tenant) y alerta interna a AppsFly Admin.
 * Alta nueva → bienvenida; renovación → comprobante de pago.
 */
export async function sendDualSubscriptionPaymentEmails({
    user,
    business,
    plan,
    amount,
    currency,
    paymentMethod,
    transactionId,
    subscriptionEndDate,
    eventType,
}) {
    if (!user?.userEmail) {
        console.warn("[emails/subscriptionPayment] Sin userEmail; se omite correo al cliente.");
        return;
    }

    const paymentGatewayLabel = resolveGatewayLabel(paymentMethod);
    const userFirstName = user.userFirstName || "";
    const userFullName = [user.userFirstName, user.userLastName].filter(Boolean).join(" ") || user.userEmail;
    const useWelcome = isWelcomeSubscriptionEmail({ eventType, paymentMethod });

    const customerHtml = useWelcome
        ? subscriptionWelcomeTemplate({
            userFirstName,
            businessName: business.businessName,
            planName: plan.planName,
            planId: plan.planId,
            planDuration: plan.planDuration,
            amount,
            currency,
            subscriptionEndDate,
            paymentGatewayLabel,
            transactionId,
            paymentMethod,
        })
        : subscriptionPaymentCustomerTemplate({
            userFirstName,
            businessName: business.businessName,
            planName: plan.planName,
            amount,
            currency,
            subscriptionEndDate,
            paymentGatewayLabel,
            transactionId,
        });

    const customerText = useWelcome
        ? subscriptionWelcomeText({
            userFirstName,
            businessName: business.businessName,
            planName: plan.planName,
            planId: plan.planId,
            planDuration: plan.planDuration,
            amount,
            currency,
            subscriptionEndDate,
            paymentGatewayLabel,
            transactionId,
            paymentMethod,
        })
        : subscriptionPaymentCustomerText({
            userFirstName,
            businessName: business.businessName,
            planName: plan.planName,
            amount,
            currency,
            subscriptionEndDate,
            paymentGatewayLabel,
            transactionId,
        });

    const customerSubject = useWelcome
        ? subscriptionWelcomeSubject({ paymentMethod, planId: plan.planId, amount })
        : "¡Tu pago de suscripción en AppsFly ha sido procesado con éxito!";

    const adminHtml = subscriptionPaymentAdminTemplate({
        businessId: business.businessId,
        businessName: business.businessName,
        userFullName,
        userEmail: user.userEmail,
        planName: plan.planName,
        planId: plan.planId,
        amount,
        currency,
        paymentGatewayLabel,
        transactionId,
        subscriptionEndDate,
        eventType,
    });

    const adminText = subscriptionPaymentAdminText({
        businessId: business.businessId,
        businessName: business.businessName,
        userFullName,
        userEmail: user.userEmail,
        planName: plan.planName,
        planId: plan.planId,
        amount,
        currency,
        paymentGatewayLabel,
        transactionId,
        subscriptionEndDate,
        eventType,
    });

    try {
        await sendEmail({
            to: user.userEmail,
            subject: customerSubject,
            html: customerHtml,
            text: customerText,
        });
        console.info(
            `[emails/subscriptionPayment] Correo ${useWelcome ? "bienvenida" : "comprobante"} enviado al cliente:`,
            user.userEmail,
        );
    } catch (error) {
        console.error("[emails/subscriptionPayment] Error enviando correo al cliente:", error.message);
    }

    try {
        await sendEmail({
            to: APPSFLY_ADMIN_EMAIL,
            subject: "[ALERTA DE PAGO] Nueva Suscripción / Renovación Procesada",
            html: adminHtml,
            text: adminText,
        });
        console.info("[emails/subscriptionPayment] Alerta admin enviada a:", APPSFLY_ADMIN_EMAIL);
    } catch (error) {
        console.error("[emails/subscriptionPayment] Error enviando alerta admin:", error.message);
    }
}

/**
 * Módulo central de correos — AppsFly Backend
 *
 * Estructura:
 *   admin/   → Correos internos (AppsFly staff / alertas de plataforma)
 *   users/   → Correos a usuarios e inquilinos (tenants)
 *   shared/  → Layout y utilidades compartidas
 *   core/    → Transporte (Resend)
 *   dispatchers/ → Orquestación multi-destinatario
 */

export { sendEmail } from "./core/sendEmail.js";
export { sendDualSubscriptionPaymentEmails } from "./dispatchers/subscriptionPayment.dispatcher.js";

export {
    subscriptionPaymentAdminTemplate,
    subscriptionPaymentAdminText,
} from "./admin/subscriptions/paymentAlert.template.js";

export {
    subscriptionPaymentCustomerTemplate,
    subscriptionPaymentCustomerText,
} from "./users/subscriptions/paymentReceipt.template.js";

export {
    subscriptionWelcomeTemplate,
    subscriptionWelcomeText,
    subscriptionWelcomeSubject,
} from "./users/subscriptions/subscriptionWelcome.template.js";

export { passwordResetTemplate } from "./users/auth/passwordReset.template.js";

export {
    buildConfirmEmailUrl,
    confirmEmailTemplate,
    confirmEmailText,
    confirmEmailSubject,
} from "./users/auth/confirmEmail.template.js";

export { sendConfirmEmail } from "./dispatchers/confirmEmail.dispatcher.js";

export {
    invitationEmailTemplate,
    invitationEmailText,
    invitationEmailSubject,
} from "./users/invitations/invitation.template.js";

export { sendUserInvitationEmail } from "./dispatchers/invitation.dispatcher.js";

export {
    getAppsFlyEmailLogoUrl,
    formatCurrency,
    formatDateLong,
    formatDateTime,
    escapeHtml,
    wrapEmailLayout,
    receiptRow,
    primaryButton,
} from "./shared/layout.js";

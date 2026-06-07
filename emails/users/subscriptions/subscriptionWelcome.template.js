import {
    escapeHtml,
    formatCurrency,
    formatDateLong,
    primaryButton,
    receiptRow,
    wrapEmailLayout,
    getFrontendBaseUrl,
} from "../../shared/layout.js";

const FREE_TRIAL_PLAN_ID = "P001";

function getDashboardUrl() {
    return `${getFrontendBaseUrl()}/dashboard`;
}

function formatTrialDuration(planDuration, planId) {
    const months = Number(planDuration) || 2;
    if (planId === FREE_TRIAL_PLAN_ID || months === 2) {
        return "2 meses";
    }
    return months === 1 ? "1 mes" : `${months} meses`;
}

function isFreeTrialContext({ paymentMethod, planId, amount }) {
    return paymentMethod === "PROMO_FREE_TRIAL"
        || planId === FREE_TRIAL_PLAN_ID
        || Number(amount) <= 0;
}

export function subscriptionWelcomeTemplate({
    userFirstName,
    businessName,
    planName,
    planId,
    planDuration,
    amount,
    currency,
    subscriptionEndDate,
    paymentGatewayLabel,
    transactionId,
    paymentMethod,
}) {
    const greeting = userFirstName
        ? `Hola ${escapeHtml(userFirstName)},`
        : "Hola,";
    const freeTrial = isFreeTrialContext({ paymentMethod, planId, amount });
    const trialDuration = formatTrialDuration(planDuration, planId);
    const endDateLabel = escapeHtml(formatDateLong(subscriptionEndDate));

    const heroTitle = freeTrial
        ? "¡Bienvenido a AppsFly!"
        : "¡Bienvenido a AppsFly!";

    const heroBadge = freeTrial
        ? "Prueba gratuita activa"
        : "Suscripción activa";

    const introParagraph = freeTrial
        ? `Nos alegra tenerte con nosotros. Tu negocio <strong class="email-heading" style="color:#021f41;">${escapeHtml(businessName)}</strong> ya tiene acceso completo a AppsFly con nuestra promoción de bienvenida: <strong class="email-heading" style="color:#021f41;">${trialDuration} gratis</strong>, sin costo alguno.`
        : `Nos alegra darte la bienvenida como cliente de AppsFly. Tu pago se procesó correctamente y tu negocio <strong class="email-heading" style="color:#021f41;">${escapeHtml(businessName)}</strong> ya puede disfrutar de todas las herramientas de la plataforma.`;

    const highlightText = freeTrial
        ? `Disfruta de <strong class="email-heading" style="color:#021f41;">${trialDuration} de acceso gratuito</strong> al plan <strong class="email-heading" style="color:#021f41;">${escapeHtml(planName)}</strong>. Tu prueba está vigente hasta el <strong class="email-heading" style="color:#021f41;">${endDateLabel}</strong>.`
        : `Tu plan <strong class="email-heading" style="color:#021f41;">${escapeHtml(planName)}</strong> está activo hasta el <strong class="email-heading" style="color:#021f41;">${endDateLabel}</strong>. Gracias por confiar en nosotros para gestionar tu negocio.`;

    const amountLabel = freeTrial
        ? `$0 — ${trialDuration} gratis`
        : escapeHtml(formatCurrency(amount, currency));

    const bodyHtml = `
      <p class="email-body-text" style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">${greeting}</p>
      <p class="email-body-text" style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        ${introParagraph}
      </p>

      <table role="presentation" class="box-success" width="100%" cellspacing="0" cellpadding="0" border="0"
             bgcolor="#ecfdf5" style="margin-bottom:28px;background-color:#ecfdf5;border-radius:10px;border:1px solid #a7f3d0;">
        <tr>
          <td style="padding:22px 24px;">
            <p class="box-success-title" style="margin:0 0 8px;font-size:11px;font-weight:700;color:#047857;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;">
              ✓ ${escapeHtml(heroBadge)}
            </p>
            <p class="email-heading" style="margin:0 0 10px;font-size:22px;font-weight:700;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
              ${escapeHtml(heroTitle)}
            </p>
            <p class="email-body-text" style="margin:0;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
              ${highlightText}
            </p>
          </td>
        </tr>
      </table>

      <p class="email-heading" style="margin:0 0 12px;font-size:12px;font-weight:700;color:#021f41;text-transform:uppercase;letter-spacing:0.4px;font-family:Arial,Helvetica,sans-serif;">Resumen de tu suscripción</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:8px;">
        ${receiptRow("Negocio", escapeHtml(businessName))}
        ${receiptRow("Plan", escapeHtml(planName))}
        ${receiptRow(freeTrial ? "Promoción" : "Monto pagado", amountLabel)}
        ${!freeTrial ? receiptRow("Medio de pago", escapeHtml(paymentGatewayLabel)) : ""}
        ${receiptRow("Acceso hasta", endDateLabel, !transactionId)}
        ${transactionId ? receiptRow("Referencia", `<span style="font-family:Consolas,Monaco,monospace;font-size:12px;word-break:break-all;">${escapeHtml(transactionId)}</span>`, true) : ""}
      </table>

      ${primaryButton(getDashboardUrl(), "Ir a mi panel en AppsFly")}

      <p class="email-muted" style="margin:0;font-size:14px;line-height:1.65;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
        ${freeTrial
            ? "Al finalizar tu periodo gratuito podrás elegir un plan comercial para seguir disfrutando de AppsFly. Si tienes dudas, escríbenos a "
            : "Estamos aquí para ayudarte a sacar el máximo provecho de la plataforma. Si necesitas asistencia, contáctanos en "}
        <a href="mailto:soporte@appsfly.app" style="color:#094fd1;text-decoration:underline;">soporte@appsfly.app</a>.
        ${freeTrial ? "" : " ¡Gracias por ser parte de AppsFly!"}
      </p>`;

    const preheader = freeTrial
        ? `Tu prueba de ${trialDuration} gratis en AppsFly está activa para ${businessName}.`
        : `Bienvenido a AppsFly. Tu suscripción ${planName} para ${businessName} está activa.`;

    return wrapEmailLayout({
        title: freeTrial
            ? "¡Bienvenido a AppsFly! — Prueba gratuita activa"
            : "¡Bienvenido a AppsFly! — Suscripción activa",
        preheader,
        bodyHtml,
    });
}

export function subscriptionWelcomeText({
    userFirstName,
    businessName,
    planName,
    planId,
    planDuration,
    amount,
    currency,
    subscriptionEndDate,
    paymentGatewayLabel,
    transactionId,
    paymentMethod,
}) {
    const freeTrial = isFreeTrialContext({ paymentMethod, planId, amount });
    const trialDuration = formatTrialDuration(planDuration, planId);
    const endDate = formatDateLong(subscriptionEndDate);
    const greeting = userFirstName ? `Hola ${userFirstName},` : "Hola,";

    if (freeTrial) {
        return `${greeting}

¡Bienvenido a AppsFly!

Tu negocio "${businessName}" ya tiene acceso completo con nuestra promoción de bienvenida: ${trialDuration} gratis.

Plan: ${planName}
Promoción: ${trialDuration} de acceso gratuito ($0)
Vigente hasta: ${endDate}
${transactionId ? `Referencia: ${transactionId}` : ""}

Ingresa a tu panel: ${getDashboardUrl()}

Al finalizar la prueba podrás contratar un plan comercial. ¿Dudas? soporte@appsfly.app

— AppsFly`;
    }

    const amountLabel = formatCurrency(amount, currency);

    return `${greeting}

¡Bienvenido a AppsFly!

Tu pago se procesó correctamente. Tu negocio "${businessName}" ya puede disfrutar de todas las herramientas de la plataforma.

Plan: ${planName}
Monto pagado: ${amountLabel}
Medio de pago: ${paymentGatewayLabel}
Acceso hasta: ${endDate}
${transactionId ? `Referencia: ${transactionId}` : ""}

Ingresa a tu panel: ${getDashboardUrl()}

Gracias por confiar en nosotros. ¿Necesitas ayuda? soporte@appsfly.app

— AppsFly`;
}

export function subscriptionWelcomeSubject({ paymentMethod, planId, amount }) {
    const freeTrial = isFreeTrialContext({ paymentMethod, planId, amount });
    return freeTrial
        ? "¡Bienvenido a AppsFly! — Tu prueba gratuita de 2 meses está activa"
        : "¡Bienvenido a AppsFly! — Tu suscripción está activa y tu pago fue confirmado";
}

import {
    escapeHtml,
    formatCurrency,
    formatDateLong,
    primaryButton,
    receiptRow,
    wrapEmailLayout,
} from "../../shared/layout.js";

export function subscriptionPaymentCustomerTemplate({
    userFirstName,
    businessName,
    planName,
    amount,
    currency,
    subscriptionEndDate,
    paymentGatewayLabel,
    transactionId,
}) {
    const greeting = userFirstName
        ? `Hola ${escapeHtml(userFirstName)},`
        : "Hola,";
    const amountLabel = Number(amount) <= 0
        ? "Gratis — promoción de bienvenida"
        : escapeHtml(formatCurrency(amount, currency));
    const dashboardUrl = "https://appsfly.app/dashboard";

    const bodyHtml = `
      <p class="email-body-text" style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">${greeting}</p>
      <p class="email-body-text" style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Nos complace confirmarte que tu <strong class="email-heading" style="color:#021f41;">pago de suscripción</strong> fue procesado correctamente.
        Tu negocio ya cuenta con acceso completo a AppsFly.
      </p>

      <table role="presentation" class="box-success" width="100%" cellspacing="0" cellpadding="0" border="0"
             bgcolor="#ecfdf5" style="margin-bottom:28px;background-color:#ecfdf5;border-radius:10px;border:1px solid #a7f3d0;">
        <tr>
          <td style="padding:20px 22px;">
            <p class="box-success-title" style="margin:0 0 6px;font-size:11px;font-weight:700;color:#047857;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;">✓ Pago confirmado</p>
            <p class="email-heading" style="margin:0 0 8px;font-size:20px;font-weight:700;color:#021f41;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(businessName)}</p>
            <p class="email-body-text" style="margin:0;font-size:15px;color:#374151;line-height:1.55;font-family:Arial,Helvetica,sans-serif;">
              Plan <strong class="email-heading" style="color:#021f41;">${escapeHtml(planName)}</strong> activo hasta el
              <strong class="email-heading" style="color:#021f41;">${escapeHtml(formatDateLong(subscriptionEndDate))}</strong>.
            </p>
          </td>
        </tr>
      </table>

      <p class="email-heading" style="margin:0 0 12px;font-size:12px;font-weight:700;color:#021f41;text-transform:uppercase;letter-spacing:0.4px;font-family:Arial,Helvetica,sans-serif;">Detalle del comprobante</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:8px;">
        ${receiptRow("Negocio", escapeHtml(businessName))}
        ${receiptRow("Plan contratado", escapeHtml(planName))}
        ${receiptRow("Monto pagado", amountLabel)}
        ${receiptRow("Medio de pago", escapeHtml(paymentGatewayLabel))}
        ${receiptRow("ID de transacción", `<span style="font-family:Consolas,Monaco,monospace;font-size:12px;word-break:break-all;">${escapeHtml(transactionId)}</span>`, true)}
      </table>

      ${primaryButton(dashboardUrl, "Ir a mi panel en AppsFly")}

      <p class="email-muted" style="margin:0;font-size:14px;line-height:1.6;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
        Si tienes alguna consulta sobre tu facturación o tu plan, escríbenos a
        <a href="mailto:soporte@appsfly.app" style="color:#094fd1;text-decoration:underline;">soporte@appsfly.app</a>.
        Gracias por confiar en nosotros.
      </p>`;

    return wrapEmailLayout({
        title: "Pago de suscripción confirmado — AppsFly",
        preheader: `Tu suscripción ${planName} para ${businessName} está activa.`,
        bodyHtml,
    });
}

export function subscriptionPaymentCustomerText({
    userFirstName,
    businessName,
    planName,
    amount,
    currency,
    subscriptionEndDate,
    paymentGatewayLabel,
    transactionId,
}) {
    const amountLabel = Number(amount) <= 0
        ? "Gratis (promoción)"
        : formatCurrency(amount, currency);

    return `${userFirstName ? `Hola ${userFirstName},` : "Hola,"}

Tu pago de suscripción en AppsFly fue procesado con éxito.

Negocio: ${businessName}
Plan: ${planName}
Monto: ${amountLabel}
Medio de pago: ${paymentGatewayLabel}
Vigente hasta: ${formatDateLong(subscriptionEndDate)}
ID transacción: ${transactionId}

Ingresa a tu panel: https://appsfly.app/dashboard

— AppsFly`;
}

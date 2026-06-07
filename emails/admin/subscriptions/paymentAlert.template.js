import {
    escapeHtml,
    formatCurrency,
    formatDateTime,
    receiptRow,
    wrapEmailLayout,
} from "../../shared/layout.js";

export function subscriptionPaymentAdminTemplate({
    businessId,
    businessName,
    userFullName,
    userEmail,
    planName,
    planId,
    amount,
    currency,
    paymentGatewayLabel,
    transactionId,
    subscriptionEndDate,
    eventType,
}) {
    const amountLabel = Number(amount) <= 0
        ? "$0 CLP — Promo Free Trial (P001)"
        : escapeHtml(formatCurrency(amount, currency));

    const bodyHtml = `
      <table role="presentation" class="box-alert" width="100%" cellspacing="0" cellpadding="0" border="0"
             bgcolor="#fff7ed" style="margin-bottom:24px;background-color:#fff7ed;border-radius:10px;border:1px solid #fdba74;">
        <tr>
          <td style="padding:18px 22px;">
            <p class="box-alert-title" style="margin:0 0 6px;font-size:11px;font-weight:700;color:#c2410c;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;">
              Alerta interna — AppsFly Admin
            </p>
            <p class="email-heading" style="margin:0;font-size:18px;font-weight:700;color:#021f41;line-height:1.35;font-family:Arial,Helvetica,sans-serif;">
              Nueva suscripción / renovación procesada
            </p>
          </td>
        </tr>
      </table>

      <p class="email-body-text" style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Se registró un cobro exitoso en GeneralDB. Resumen de auditoría:
      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:20px;">
        ${receiptRow("Evento webhook", `<span style="word-break:break-all;font-size:13px;">${escapeHtml(eventType || "payment.approved")}</span>`)}
        ${receiptRow("Negocio (Tenant)", escapeHtml(businessName))}
        ${receiptRow("Business ID", `<span style="font-family:Consolas,Monaco,monospace;font-size:12px;word-break:break-all;">${escapeHtml(businessId)}</span>`)}
        ${receiptRow("Usuario", `${escapeHtml(userFullName)}<br><span class="email-muted" style="font-size:12px;color:#6b7280;font-weight:400;">${escapeHtml(userEmail)}</span>`)}
        ${receiptRow("Plan", `${escapeHtml(planName)} <span class="email-muted" style="color:#6b7280;font-weight:400;">(${escapeHtml(planId)})</span>`)}
        ${receiptRow("Monto cobrado", amountLabel)}
        ${receiptRow("Pasarela", escapeHtml(paymentGatewayLabel))}
        ${receiptRow("ID transacción MP", `<span style="font-family:Consolas,Monaco,monospace;font-size:12px;word-break:break-all;">${escapeHtml(transactionId)}</span>`)}
        ${receiptRow("Vencimiento suscripción", escapeHtml(formatDateTime(subscriptionEndDate)))}
        ${receiptRow("Registrado", escapeHtml(formatDateTime(new Date())), true)}
      </table>

      <p class="email-muted" style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
        Notificación automática — Webhooks Mercado Pago · GeneralDB Master
      </p>`;

    return wrapEmailLayout({
        title: "[AppsFly Admin] Alerta de pago",
        preheader: `${businessName} — ${planName} — ${amountLabel.replace(/<[^>]+>/g, "")}`,
        bodyHtml,
    });
}

export function subscriptionPaymentAdminText({
    businessId,
    businessName,
    userFullName,
    userEmail,
    planName,
    planId,
    amount,
    currency,
    paymentGatewayLabel,
    transactionId,
    subscriptionEndDate,
    eventType,
}) {
    const amountLabel = Number(amount) <= 0
        ? "$0 (Promo Free Trial)"
        : formatCurrency(amount, currency);

    return `[ALERTA DE PAGO] AppsFly Admin

Evento: ${eventType || "payment.approved"}
Negocio: ${businessName} (${businessId})
Usuario: ${userFullName} <${userEmail}>
Plan: ${planName} (${planId})
Monto: ${amountLabel}
Pasarela: ${paymentGatewayLabel}
ID Transacción: ${transactionId}
Vencimiento: ${formatDateTime(subscriptionEndDate)}
Registrado: ${formatDateTime(new Date())}`;
}

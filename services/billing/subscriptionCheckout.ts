/**
 * Contrato del cobro de suscripción AppsFly.
 *
 * El acceso operativo no consulta Mercado Pago. Solo cuenta una suscripción en
 * GeneralDB con estado ACTIVE o CANCELLED y subscriptionEndDate en el futuro.
 *
 * El checkout crea un subscriptionPayment PENDING y un preapproval con
 * external_reference igual a ese id. El cliente entra al init_point de esa
 * adhesión. Los links fijos mpago.la del catálogo no identifican al negocio.
 *
 * El webhook POST /api/webhooks/mercadopago activa el periodo:
 * - subscription_preapproval authorized abre un mes.
 * - El primer subscription_authorized_payment se registra como activación.
 * - Los cobros siguientes extienden 30 días.
 *
 * Si el cliente vuelve, /subscription/payment/return sincroniza por
 * external_reference. Si cierra la pestaña, el webhook igual activa la cuenta.
 */
export type PendingPreapprovalInput = {
  reason: string;
  externalReference: string;
  payerEmail: string;
  amount: number;
  currency: string;
  backUrl: string;
  notificationUrl: string;
};

export function buildPendingPreapprovalBody(input: PendingPreapprovalInput) {
  return {
    reason: input.reason,
    external_reference: input.externalReference,
    payer_email: input.payerEmail,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months" as const,
      transaction_amount: input.amount,
      currency_id: input.currency,
    },
    back_url: input.backUrl,
    notification_url: input.notificationUrl,
    status: "pending" as const,
  };
}

/** El primer cobro ya dejó el mes vigente. Solo los siguientes suman 30 días. */
export function shouldExtendPaidPeriod(input: {
  justActivated: boolean;
  hasPriorRecurringCharge: boolean;
}): boolean {
  return !input.justActivated && input.hasPriorRecurringCharge;
}

export function isRecurringChargeSource(source: unknown): boolean {
  return source === "webhook_renewal" || source === "webhook_activation";
}

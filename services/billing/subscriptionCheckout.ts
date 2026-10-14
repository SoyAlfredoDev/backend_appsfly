/** Checkout is a mandate. A trial defers start_date; only a verified approved invoice grants paid access. */
export type PendingPreapprovalInput = {
  reason: string;
  externalReference: string;
  payerEmail: string;
  amount: number;
  currency: string;
  backUrl: string;
  notificationUrl: string;
  firstChargeAt?: string | null;
};

export function buildPendingPreapprovalBody(input: PendingPreapprovalInput) {
  return {
    reason: input.reason,
    external_reference: input.externalReference,
    payer_email: input.payerEmail,
    auto_recurring: {
      ...(input.firstChargeAt ? { start_date: input.firstChargeAt } : {}),
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

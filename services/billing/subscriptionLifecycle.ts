/** Billing dates are instants in UTC; monthly periods clamp at month end. */
export function addCalendarMonths(date: Date, months: number): Date {
  if (!Number.isFinite(date.getTime()) || !Number.isInteger(months) || months < 1) {
    throw new Error("Invalid billing period");
  }
  const result = new Date(date);
  const day = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  const last = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0),
  ).getUTCDate();
  result.setUTCDate(Math.min(day, last));
  return result;
}

export type AccessPeriod = {
  subscriptionStatus: string;
  subscriptionEndDate: Date | string;
  subscriptionPlanId: string;
  mpPreapprovalId?: string | null;
  autoRenewEnabled?: boolean;
};

export function assertDeferredStart(agreed: string | null, actual: string | undefined) {
  if (!agreed) return;
  const expected = new Date(agreed).getTime();
  const returned = actual ? new Date(actual).getTime() : NaN;
  if (!Number.isFinite(expected) || !Number.isFinite(returned) || returned < expected) {
    throw Object.assign(
      new Error(
        "Mercado Pago no confirmó la fecha de primer cobro acordada. No se habilitó el checkout.",
      ),
      {
        code: "BILLING_START_NOT_CONFIRMED",
        statusCode: 502,
      },
    );
  }
}

export function checkoutStartDate(periods: AccessPeriod[], now = new Date()): Date | null {
  const active = periods.filter(
    (p) =>
      ["ACTIVE", "CANCELLED"].includes(p.subscriptionStatus) &&
      new Date(p.subscriptionEndDate) > now,
  );
  if (
    active.some((p) => p.subscriptionPlanId !== "P001" && p.mpPreapprovalId && p.autoRenewEnabled)
  ) {
    throw Object.assign(
      new Error(
        "El negocio ya tiene una renovación automática. Gestiona la suscripción existente antes de contratar otra.",
      ),
      {
        code: "RECURRING_SUBSCRIPTION_EXISTS",
        statusCode: 409,
      },
    );
  }
  const end = active.reduce(
    (latest, p) => Math.max(latest, new Date(p.subscriptionEndDate).getTime()),
    0,
  );
  return end > now.getTime() ? new Date(end) : null;
}

export function assertChargeMatches(input: {
  status: string;
  amount: number;
  currency: string;
  expectedAmount: number;
  expectedCurrency: string;
}) {
  if (input.status !== "approved") throw new Error("PAYMENT_NOT_APPROVED");
  if (
    !Number.isFinite(input.amount) ||
    input.amount <= 0 ||
    Math.abs(input.amount - input.expectedAmount) > 0.01 ||
    input.currency !== input.expectedCurrency
  ) {
    throw new Error("PAYMENT_AMOUNT_OR_CURRENCY_MISMATCH");
  }
}

/** A late or repeated invoice must not stack periods on the current wall clock. */
export function paidPeriodEnd(input: {
  dueDate: Date;
  currentEnd: Date;
  months: number;
  firstChargeAt?: Date | null;
}): Date {
  if (input.firstChargeAt && input.dueDate < input.firstChargeAt) {
    throw new Error("PAYMENT_BEFORE_AGREED_START");
  }
  const end = addCalendarMonths(input.dueDate, input.months);
  return end > input.currentEnd ? end : new Date(input.currentEnd);
}

export type SubscriptionNoticeKind = "due_7" | "due_1" | "expired";
export function subscriptionNoticeKind(end: Date, now = new Date()): SubscriptionNoticeKind | null {
  const days = (end.getTime() - now.getTime()) / 86_400_000;
  if (days <= 0 && days > -30) return "expired";
  if (days > 0 && days <= 1) return "due_1";
  if (days > 1 && days <= 7) return "due_7";
  return null;
}

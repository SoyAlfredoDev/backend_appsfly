import { checkoutUrlForPlan, findOpticsPlan, PLAN_IDS } from "./opticsPlanCatalog.ts";

export type BillingChannel = "NONE" | "TRIAL" | "PAYMENT_LINK" | "PREAPPROVAL";

export type SubscriptionBillingSnapshot = {
  subscriptionPlanId: string;
  subscriptionPaymentMethod: string | null;
  mpPreapprovalId: string | null;
  mpPreapprovalStatus: string | null;
  subscriptionStatus: string;
  subscriptionEndDate: Date | string;
};

export type SubscriptionBillingView = {
  channel: BillingChannel;
  needsLink: boolean;
  checkoutUrl: string | null;
  label: string;
  detail: string;
};

function accessStillValid(subscription: SubscriptionBillingSnapshot): boolean {
  if (!["ACTIVE", "CANCELLED"].includes(subscription.subscriptionStatus)) return false;
  return new Date(subscription.subscriptionEndDate) > new Date();
}

function isTrial(subscription: SubscriptionBillingSnapshot): boolean {
  return (
    subscription.subscriptionPlanId === PLAN_IDS.trial ||
    subscription.subscriptionPaymentMethod === "PROMO_FREE_TRIAL"
  );
}

export function canAdminAssignPlan(
  planId: string,
  currentPlanId: string | null | undefined,
): boolean {
  if (currentPlanId && planId === currentPlanId) return true;
  if (planId === PLAN_IDS.trial) return true;
  return findOpticsPlan(planId)?.forSale === true;
}

export function describeSubscriptionBilling(input: {
  subscription: SubscriptionBillingSnapshot | null;
  linkPaymentPlanIds: string[];
}): SubscriptionBillingView {
  const subscription = input.subscription;
  if (!subscription) {
    return {
      channel: "NONE",
      needsLink: true,
      checkoutUrl: null,
      label: "Sin suscripción",
      detail: "Hay que elegir un plan y enviar su link de Mercado Pago.",
    };
  }

  const checkoutUrl = checkoutUrlForPlan(subscription.subscriptionPlanId);
  const paidByLink = input.linkPaymentPlanIds.includes(subscription.subscriptionPlanId);
  const preapprovalStatus = subscription.mpPreapprovalStatus
    ? ` Estado en Mercado Pago: ${subscription.mpPreapprovalStatus}.`
    : "";

  if (subscription.mpPreapprovalId && !checkoutUrl) {
    return {
      channel: "PREAPPROVAL",
      needsLink: false,
      checkoutUrl: null,
      label: "Cobro recurrente de Mercado Pago",
      detail: `El cobro sale de una suscripción recurrente autorizada, no de un link.${preapprovalStatus}`,
    };
  }

  if (subscription.mpPreapprovalId && checkoutUrl) {
    return {
      channel: "PREAPPROVAL",
      needsLink: !paidByLink,
      checkoutUrl,
      label: paidByLink
        ? "Link registrado, con cobro recurrente anterior"
        : "Hay que enviar el link",
      detail: paidByLink
        ? `Este plan tiene un pago de link registrado. También queda una suscripción recurrente anterior.${preapprovalStatus}`
        : `Mercado Pago todavía tiene un cobro recurrente autorizado.${preapprovalStatus} El plan actual se cobra con link y hay que enviarlo.`,
    };
  }

  if (isTrial(subscription) && accessStillValid(subscription)) {
    return {
      channel: "TRIAL",
      needsLink: false,
      checkoutUrl: null,
      label: "Prueba vigente",
      detail: "No hay cobro. Al pasar a Start o Pro hay que enviar el link de ese plan.",
    };
  }

  if (checkoutUrl && paidByLink) {
    return {
      channel: "PAYMENT_LINK",
      needsLink: false,
      checkoutUrl,
      label: "Suscrito con link de Mercado Pago",
      detail: "El pago de este plan quedó registrado como link de Mercado Pago.",
    };
  }

  if (checkoutUrl) {
    return {
      channel: "PAYMENT_LINK",
      needsLink: true,
      checkoutUrl,
      label: "Hay que enviar el link",
      detail:
        "Este plan se cobra con el link de Mercado Pago y todavía no tiene ese pago registrado.",
    };
  }

  if (isTrial(subscription)) {
    return {
      channel: "TRIAL",
      needsLink: true,
      checkoutUrl: null,
      label: "Prueba terminada",
      detail: "Hay que elegir Start o Pro y enviar su link.",
    };
  }

  return {
    channel: "NONE",
    needsLink: false,
    checkoutUrl: null,
    label: "Plan sin link de cobro",
    detail: "Este plan no tiene un link de Mercado Pago vigente.",
  };
}

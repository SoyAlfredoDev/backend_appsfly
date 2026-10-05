import { describe, expect, it } from "vitest";
import {
  canAdminAssignPlan,
  describeSubscriptionBilling,
} from "../services/billing/subscriptionBillingChannel.ts";

const future = "2026-12-05T00:00:00.000Z";
const past = "2026-01-01T00:00:00.000Z";

describe("admin subscription billing channel", () => {
  it("asks for a plan when the business has no subscription", () => {
    const view = describeSubscriptionBilling({
      subscription: null,
      linkPaymentPlanIds: [],
    });
    expect(view.channel).toBe("NONE");
    expect(view.needsLink).toBe(true);
    expect(view.checkoutUrl).toBeNull();
  });

  it("keeps an active trial free of a payment link", () => {
    const view = describeSubscriptionBilling({
      subscription: {
        subscriptionPlanId: "P001",
        subscriptionPaymentMethod: "PROMO_FREE_TRIAL",
        mpPreapprovalId: null,
        mpPreapprovalStatus: null,
        subscriptionStatus: "ACTIVE",
        subscriptionEndDate: future,
      },
      linkPaymentPlanIds: [],
    });
    expect(view.channel).toBe("TRIAL");
    expect(view.needsLink).toBe(false);
  });

  it("marks Start as subscribed when the link payment is recorded", () => {
    const view = describeSubscriptionBilling({
      subscription: {
        subscriptionPlanId: "P005",
        subscriptionPaymentMethod: "MERCADO_PAGO",
        mpPreapprovalId: null,
        mpPreapprovalStatus: null,
        subscriptionStatus: "ACTIVE",
        subscriptionEndDate: future,
      },
      linkPaymentPlanIds: ["P005"],
    });
    expect(view.channel).toBe("PAYMENT_LINK");
    expect(view.needsLink).toBe(false);
    expect(view.checkoutUrl).toBe("https://mpago.la/1AFYzNQ");
    expect(view.label).toBe("Suscrito con link de Mercado Pago");
  });

  it("asks to send the Pro link when that payment is missing", () => {
    const view = describeSubscriptionBilling({
      subscription: {
        subscriptionPlanId: "P006",
        subscriptionPaymentMethod: "MERCADO_PAGO",
        mpPreapprovalId: null,
        mpPreapprovalStatus: null,
        subscriptionStatus: "ACTIVE",
        subscriptionEndDate: future,
      },
      linkPaymentPlanIds: [],
    });
    expect(view.needsLink).toBe(true);
    expect(view.checkoutUrl).toBe("https://mpago.la/2Zet5b1");
    expect(view.label).toBe("Hay que enviar el link");
  });

  it("keeps a recurring Mercado Pago charge apart from the payment link", () => {
    const view = describeSubscriptionBilling({
      subscription: {
        subscriptionPlanId: "P002",
        subscriptionPaymentMethod: "MERCADO_PAGO",
        mpPreapprovalId: "pre-1",
        mpPreapprovalStatus: "authorized",
        subscriptionStatus: "ACTIVE",
        subscriptionEndDate: future,
      },
      linkPaymentPlanIds: [],
    });
    expect(view.channel).toBe("PREAPPROVAL");
    expect(view.needsLink).toBe(false);
    expect(view.checkoutUrl).toBeNull();
  });

  it("asks for the new link when a recurring customer moves to Pro", () => {
    const view = describeSubscriptionBilling({
      subscription: {
        subscriptionPlanId: "P006",
        subscriptionPaymentMethod: "MERCADO_PAGO",
        mpPreapprovalId: "pre-1",
        mpPreapprovalStatus: "authorized",
        subscriptionStatus: "ACTIVE",
        subscriptionEndDate: future,
      },
      linkPaymentPlanIds: [],
    });
    expect(view.needsLink).toBe(true);
    expect(view.checkoutUrl).toBe("https://mpago.la/2Zet5b1");
  });

  it("lets an admin assign the trial and the plans on sale", () => {
    expect(canAdminAssignPlan("P001", "P006")).toBe(true);
    expect(canAdminAssignPlan("P005", "P006")).toBe(true);
    expect(canAdminAssignPlan("P007", "P006")).toBe(false);
    expect(canAdminAssignPlan("P002", "P002")).toBe(true);
    expect(canAdminAssignPlan("P002", null)).toBe(false);
    expect(
      describeSubscriptionBilling({
        subscription: {
          subscriptionPlanId: "P001",
          subscriptionPaymentMethod: "PROMO_FREE_TRIAL",
          mpPreapprovalId: null,
          mpPreapprovalStatus: null,
          subscriptionStatus: "EXPIRED",
          subscriptionEndDate: past,
        },
        linkPaymentPlanIds: [],
      }).needsLink,
    ).toBe(true);
  });
});

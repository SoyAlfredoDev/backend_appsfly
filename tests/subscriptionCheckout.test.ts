import { describe, expect, it } from "vitest";
import { buildPendingPreapprovalBody } from "../services/billing/subscriptionCheckout.js";

describe("pending Mercado Pago subscription", () => {
  it("builds a pending preapproval tied to the local payment", () => {
    expect(
      buildPendingPreapprovalBody({
        reason: "AppsFly — Start",
        externalReference: "pay-1",
        payerEmail: "optica@example.com",
        amount: 29738,
        currency: "CLP",
        backUrl: "https://appsfly.cl/subscription/payment/return?external_reference=pay-1",
        notificationUrl: "https://api.appsfly.cl/api/webhooks/mercadopago",
      }),
    ).toEqual({
      reason: "AppsFly — Start",
      external_reference: "pay-1",
      payer_email: "optica@example.com",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 29738,
        currency_id: "CLP",
      },
      back_url: "https://appsfly.cl/subscription/payment/return?external_reference=pay-1",
      notification_url: "https://api.appsfly.cl/api/webhooks/mercadopago",
      status: "pending",
    });
  });
});

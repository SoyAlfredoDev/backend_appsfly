import { describe, expect, it } from "vitest";
import {
  addCalendarMonths,
  checkoutStartDate,
  assertChargeMatches,
  paidPeriodEnd,
  subscriptionNoticeKind,
} from "../services/billing/subscriptionLifecycle.js";
import { buildPendingPreapprovalBody } from "../services/billing/subscriptionCheckout.js";
import { billingNoticeContent } from "../services/billing/billingNotifications.js";

describe("subscription billing scenarios", () => {
  const now = new Date("2026-10-14T15:00:00Z");
  const end = new Date("2026-12-14T15:00:00Z");
  it("preserves the full two-month trial when a card is added early", () => {
    expect(addCalendarMonths(now, 2)).toEqual(end);
    expect(
      checkoutStartDate(
        [{ subscriptionPlanId: "P001", subscriptionStatus: "ACTIVE", subscriptionEndDate: end }],
        now,
      ),
    ).toEqual(end);
    expect(
      buildPendingPreapprovalBody({
        reason: "Pro",
        externalReference: "p",
        payerEmail: "qa@example.com",
        amount: 47588,
        currency: "CLP",
        backUrl: "https://appsfly.cl",
        notificationUrl: "https://api.appsfly.cl",
        firstChargeAt: end.toISOString(),
      }).auto_recurring.start_date,
    ).toBe(end.toISOString());
  });
  it("keeps a cancelled but paid period and schedules reactivation at its end", () => {
    expect(
      checkoutStartDate(
        [
          {
            subscriptionPlanId: "P005",
            subscriptionStatus: "CANCELLED",
            subscriptionEndDate: end,
            autoRenewEnabled: false,
          },
        ],
        now,
      ),
    ).toEqual(end);
  });
  it("does not grant another free period to an expired customer", () => {
    expect(
      checkoutStartDate(
        [{ subscriptionPlanId: "P001", subscriptionStatus: "ACTIVE", subscriptionEndDate: now }],
        now,
      ),
    ).toBeNull();
    expect(checkoutStartDate([], now)).toBeNull();
  });
  it("blocks two live recurring mandates", () => {
    expect(() =>
      checkoutStartDate(
        [
          {
            subscriptionPlanId: "P006",
            subscriptionStatus: "ACTIVE",
            subscriptionEndDate: end,
            mpPreapprovalId: "mp1",
            autoRenewEnabled: true,
          },
        ],
        now,
      ),
    ).toThrow(/renovación automática/);
  });
  it.each([
    ["2027-01-31T15:00:00Z", 1, "2027-02-28T15:00:00Z"],
    ["2028-01-31T15:00:00Z", 1, "2028-02-29T15:00:00Z"],
    ["2026-12-31T15:00:00Z", 2, "2027-02-28T15:00:00Z"],
  ])("clamps calendar months: %s", (start, months, result) =>
    expect(addCalendarMonths(new Date(start), Number(months))).toEqual(new Date(result)),
  );
  it("uses the invoice due date for delayed and out-of-order notifications", () => {
    expect(paidPeriodEnd({ dueDate: now, currentEnd: end, months: 1 })).toEqual(end);
    expect(paidPeriodEnd({ dueDate: end, currentEnd: end, months: 1 })).toEqual(
      new Date("2027-01-14T15:00:00Z"),
    );
    expect(() =>
      paidPeriodEnd({ dueDate: now, currentEnd: end, months: 1, firstChargeAt: end }),
    ).toThrow("PAYMENT_BEFORE_AGREED_START");
  });
  it.each(["pending", "authorized", "processed", "rejected", "refunded", "charged_back"])(
    "does not treat %s as a settled payment",
    (status) => {
      expect(() =>
        assertChargeMatches({
          status,
          amount: 29738,
          currency: "CLP",
          expectedAmount: 29738,
          expectedCurrency: "CLP",
        }),
      ).toThrow();
    },
  );
  it.each([950, 0, NaN, 1, 29737])(
    "rejects a validation hold or mismatched amount: %s",
    (amount) => {
      expect(() =>
        assertChargeMatches({
          status: "approved",
          amount,
          currency: "CLP",
          expectedAmount: 29738,
          expectedCurrency: "CLP",
        }),
      ).toThrow();
    },
  );
  it("requires the contracted currency", () =>
    expect(() =>
      assertChargeMatches({
        status: "approved",
        amount: 29738,
        currency: "USD",
        expectedAmount: 29738,
        expectedCurrency: "CLP",
      }),
    ).toThrow());
  it("selects reminder windows, expiry and avoids ancient subscriptions", () => {
    expect(subscriptionNoticeKind(new Date(now.getTime() + 7 * 86400000), now)).toBe("due_7");
    expect(subscriptionNoticeKind(new Date(now.getTime() + 86400000), now)).toBe("due_1");
    expect(subscriptionNoticeKind(now, now)).toBe("expired");
    expect(subscriptionNoticeKind(new Date(now.getTime() - 31 * 86400000), now)).toBeNull();
  });
  it("distinguishes authorization and receipts with escaped corporate HTML", () => {
    const input = {
      businessName: "<script>bad</script>",
      planName: "Pro",
      amount: 47588,
      currency: "CLP",
      end,
      automatic: true,
      trial: false,
    };
    const auth = billingNoticeContent({ ...input, kind: "authorized" });
    expect(auth.text).toContain("no es un comprobante de cobro");
    expect(auth.html).not.toContain("<script>bad</script>");
    expect(auth.html).toContain('lang="es"');
    expect(billingNoticeContent({ ...input, kind: "paid" }).text).toContain("recepción");
    expect(billingNoticeContent({ ...input, kind: "expired" }).text).toContain("evita repetirlo");
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({
  invoice: vi.fn(),
  payment: vi.fn(),
  remote: vi.fn(),
  find: vi.fn(),
  update: vi.fn(),
  upsert: vi.fn(),
  register: vi.fn(),
  settle: vi.fn(),
  notice: vi.fn(),
  transaction: vi.fn(),
  lock: vi.fn(),
  current: vi.fn(),
  rejectPending: vi.fn(),
}));
vi.mock("../dbGeneral.js", () => ({
  generalPrisma: {
    $transaction: m.transaction,
    subscription: { findUnique: m.find, update: m.update },
    subscriptionPayment: { upsert: m.upsert },
  },
}));
vi.mock("../services/mercadopago/mpApiClient.js", () => ({
  getMercadoPagoAuthorizedPayment: m.invoice,
  getMercadoPagoPayment: m.payment,
  getMercadoPagoPreapproval: m.remote,
}));
vi.mock("../services/billing/recurringSettlement.js", () => ({
  registerRecurringAuthorization: m.register,
  settleRecurringCharge: m.settle,
  jsonObject: (v: unknown) => v || {},
}));
vi.mock("../services/billing/billingNotifications.js", () => ({ deliverBillingNotice: m.notice }));
import {
  processRecurringInvoice,
  processRecurringAuthorization,
} from "../services/billing/recurringWebhook.js";
beforeEach(() => {
  vi.resetAllMocks();
  m.transaction.mockImplementation((fn) =>
    fn({
      $queryRaw: m.lock,
      subscription: { findUniqueOrThrow: m.current, update: m.update },
      subscriptionPayment: { updateMany: m.rejectPending },
    }),
  );
  m.invoice.mockResolvedValue({
    id: "i",
    status: "processed",
    preapproval_id: "mp",
    payment: { id: "p", status: "approved" },
    external_reference: "origin",
    debit_date: "2026-12-14T15:00:00Z",
  });
  m.payment.mockResolvedValue({
    id: "p",
    status: "approved",
    external_reference: "origin",
    transaction_amount: 29738,
    currency_id: "CLP",
  });
  m.remote.mockResolvedValue({ id: "mp", external_reference: "origin" });
  m.find.mockResolvedValue({
    subscriptionId: "s",
    subscriptionBusinessId: "a",
    subscriptionPlanId: "P005",
    createdByUserId: "u",
    subscriptionAmount: 29738,
    autoRenewEnabled: true,
  });
  m.upsert.mockResolvedValue({ subscriptionPaymentId: "failure" });
  m.settle.mockResolvedValue({
    duplicate: false,
    subscription: { subscriptionEndDate: new Date("2027-01-14T15:00:00Z") },
    payment: { subscriptionPaymentId: "receipt", metadata: {} },
  });
  m.notice.mockResolvedValue(undefined);
});
describe("recurring invoice scenarios", () => {
  it("a cancellation webhook preserves a concurrently paid period", async () => {
    m.remote.mockResolvedValue({ id: "mp", external_reference: "origin", status: "cancelled" });
    m.current.mockResolvedValue({
      subscriptionId: "s",
      subscriptionStatus: "ACTIVE",
      subscriptionEndDate: new Date("2099-01-01"),
    });
    await processRecurringAuthorization("mp");
    expect(m.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { subscriptionId: "s" },
        data: expect.objectContaining({ subscriptionStatus: "CANCELLED", autoRenewEnabled: false }),
      }),
    );
    expect(m.update.mock.calls[0][0].data).not.toHaveProperty("subscriptionEndDate");
  });
  it("requires the actual payment to be approved even if the invoice says processed", async () => {
    m.payment.mockResolvedValue({ id: "p", status: "pending", external_reference: "origin" });
    expect((await processRecurringInvoice("i")).reason).toBe("SUBSCRIPTION_PAYMENT_PENDING");
    expect(m.settle).not.toHaveBeenCalled();
    expect(m.notice).not.toHaveBeenCalled();
  });
  it("a failed first charge preserves the trial and allows gateway retries", async () => {
    m.payment.mockResolvedValue({
      id: "p",
      status: "rejected",
      external_reference: "origin",
      transaction_amount: 29738,
      currency_id: "CLP",
    });
    expect((await processRecurringInvoice("i")).reason).toBe("RECURRING_PAYMENT_FAILED");
    expect(m.update).not.toHaveBeenCalled();
    expect(m.notice).toHaveBeenCalledWith("failure", "failed", expect.any(Date), true);
  });
  it("settles and sends a receipt only after verification", async () => {
    await processRecurringInvoice("i");
    expect(m.settle).toHaveBeenCalledWith(
      expect.objectContaining({ id: "p", amount: 29738, currency: "CLP" }),
    );
    expect(m.notice).toHaveBeenCalledWith("receipt", "paid", expect.any(Date), true);
  });
  it("propagates a notification failure so it can be retried without settling twice", async () => {
    m.notice.mockRejectedValue(new Error("mail unavailable"));
    await expect(processRecurringInvoice("i")).rejects.toThrow("mail unavailable");
  });
  it("rejects a mismatched invoice reference", async () => {
    m.invoice.mockResolvedValue({
      preapproval_id: "mp",
      payment: { id: "p" },
      external_reference: "other",
    });
    await expect(processRecurringInvoice("i")).rejects.toThrow("REFERENCE");
    expect(m.settle).not.toHaveBeenCalled();
  });
  it("does not interpret a refunded validation charge as expiry", async () => {
    m.payment.mockResolvedValue({ id: "p", status: "refunded", external_reference: "origin" });
    await processRecurringInvoice("i");
    expect(m.update).not.toHaveBeenCalled();
    expect(m.settle).not.toHaveBeenCalled();
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({
  transaction: vi.fn(),
  lock: vi.fn(),
  find: vi.fn(),
  update: vi.fn(),
  send: vi.fn(),
  subscriptions: vi.fn(),
  related: vi.fn(),
}));
vi.mock("../dbGeneral.js", () => ({
  generalPrisma: {
    $transaction: m.transaction,
    subscription: { findMany: m.subscriptions, findFirst: m.related },
  },
}));
vi.mock("../emails/core/sendEmail.js", () => ({ sendEmail: m.send }));
import {
  deliverBillingNotice,
  runBillingNotices,
} from "../services/billing/billingNotifications.js";
let metadata: Record<string, unknown>;
beforeEach(() => {
  vi.resetAllMocks();
  metadata = {};
  m.transaction.mockImplementation((fn) =>
    fn({ $queryRaw: m.lock, subscriptionPayment: { findUniqueOrThrow: m.find, update: m.update } }),
  );
  m.find.mockImplementation(async () => ({
    metadata,
    subscriptionPlanId: "P006",
    amount: 47588,
    currency: "CLP",
    business: { businessName: "QA" },
    plan: { planName: "Pro" },
    createdBy: { userEmail: "qa@example.com" },
  }));
  m.update.mockImplementation(async ({ data }) => {
    metadata = data.metadata;
    return { metadata };
  });
  m.send.mockResolvedValue({ id: "email1" });
});
describe("durable transactional notifications", () => {
  const end = new Date("2026-12-14T15:00:00Z");
  it("new failed attempts cannot duplicate the reminder for the same period", async () => {
    const sub = {
      subscriptionId: "s",
      subscriptionBusinessId: "a",
      subscriptionEndDate: end,
      payments: [{ subscriptionPaymentId: "origin" }],
    };
    m.subscriptions.mockResolvedValue([sub]);
    await runBillingNotices(new Date("2026-12-10T15:00:00Z"));
    m.subscriptions.mockResolvedValue([
      { ...sub, payments: [{ subscriptionPaymentId: "failure" }, ...sub.payments] },
    ]);
    await runBillingNotices(new Date("2026-12-10T15:00:00Z"));
    expect(m.send).toHaveBeenCalledTimes(1);
  });
  it("does not send expiry for a period replaced by a newer active subscription", async () => {
    m.subscriptions.mockResolvedValue([
      {
        subscriptionId: "s",
        subscriptionBusinessId: "a",
        subscriptionEndDate: end,
        payments: [{ subscriptionPaymentId: "origin" }],
      },
    ]);
    m.related.mockResolvedValue({ subscriptionId: "newer" });
    await runBillingNotices(end);
    expect(m.send).not.toHaveBeenCalled();
  });
  it("sends a paid notice once across retries", async () => {
    await deliverBillingNotice("p", "paid", end);
    await deliverBillingNotice("p", "paid", end);
    expect(m.send).toHaveBeenCalledTimes(1);
    expect(m.send.mock.calls[0][0].idempotencyKey).toMatch(/^billing-/);
  });
  it("retries a failed send using the same provider idempotency key", async () => {
    m.send.mockRejectedValueOnce(new Error("provider unavailable"));
    await expect(deliverBillingNotice("p", "paid", end)).rejects.toThrow();
    await deliverBillingNotice("p", "paid", end);
    expect(m.send).toHaveBeenCalledTimes(2);
    expect(m.send.mock.calls[0][0].idempotencyKey).toBe(m.send.mock.calls[1][0].idempotencyKey);
  });
  it("does not mark a skipped development email as delivered", async () => {
    m.send.mockResolvedValue({ skipped: true, id: null });
    await expect(deliverBillingNotice("p", "expired", end)).rejects.toThrow("NOT_DELIVERED");
    expect(JSON.stringify(metadata)).not.toContain("sentAt");
  });
  it("keeps one-week, one-day and expired notices distinct", async () => {
    await deliverBillingNotice("p", "due_7", end);
    await deliverBillingNotice("p", "due_1", end);
    await deliverBillingNotice("p", "expired", end);
    expect(m.send).toHaveBeenCalledTimes(3);
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
const db = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
  $transaction: vi.fn(),
  subscriptionPayment: {
    findUniqueOrThrow: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
  },
  subscription: {
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
}));
vi.mock("../dbGeneral.js", () => ({ generalPrisma: db }));
import {
  registerRecurringAuthorization,
  settleRecurringCharge,
} from "../services/billing/recurringSettlement.js";

const end = new Date("2026-12-14T15:00:00Z");
const origin = () => ({
  subscriptionPaymentId: "checkout",
  subscriptionId: null,
  subscriptionBusinessId: "a",
  subscriptionPlanId: "P006",
  externalReference: "checkout",
  amount: 47588,
  currency: "CLP",
  status: "PENDING",
  mpPaymentId: null,
  createdByUserId: "u",
  metadata: { pendingSubscriptionId: "s", firstChargeAt: end.toISOString(), mpPreapprovalId: "mp" },
  plan: { planDuration: 1, planFeatures: [] },
});
const sub = () => ({
  subscriptionId: "s",
  subscriptionBusinessId: "a",
  subscriptionPlanId: "P006",
  subscriptionStartDate: end,
  subscriptionEndDate: end,
  subscriptionDuration: 1,
  subscriptionAmount: 47588,
  subscriptionStatus: "PENDIENT",
  createdByUserId: "u",
  autoRenewEnabled: true,
});
const remote = () => ({
  id: "mp",
  status: "authorized",
  external_reference: "checkout",
  auto_recurring: { transaction_amount: 47588, currency_id: "CLP", start_date: end.toISOString() },
});
const charge = () => ({
  id: "pay",
  invoiceId: "invoice",
  preapprovalId: "mp",
  externalReference: "checkout",
  status: "approved",
  amount: 47588,
  currency: "CLP",
  dueDate: end,
});
beforeEach(() => {
  vi.resetAllMocks();
  db.$transaction.mockImplementation((fn) => fn(db));
  db.subscriptionPayment.findUniqueOrThrow.mockResolvedValue(origin());
  db.subscriptionPayment.update.mockImplementation(({ data }) => ({ ...origin(), ...data }));
  db.subscriptionPayment.create.mockImplementation(({ data }) => data);
  db.subscription.create.mockImplementation(({ data }) => data);
  db.subscription.findUnique.mockResolvedValue(null);
  db.subscription.findUniqueOrThrow.mockResolvedValue(sub());
  db.subscription.update.mockImplementation(({ data }) => ({ ...sub(), ...data }));
});
describe("authorization and atomic settlement", () => {
  it("authorization creates no paid entitlement, receipt or approved ledger entry", async () => {
    const result = await registerRecurringAuthorization("checkout", remote());
    expect(result.authorizationOnly).toBe(true);
    expect(result.payment.status).toBe("PENDING");
    expect(db.subscription.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        subscriptionStatus: "PENDIENT",
        subscriptionStartDate: end,
        subscriptionEndDate: end,
      }),
    });
    expect(db.subscription.update).not.toHaveBeenCalled();
  });
  it("rejects a gateway start before the trial end", async () => {
    const r = remote();
    r.auto_recurring.start_date = "2026-10-14T15:00:00Z";
    await expect(registerRecurringAuthorization("checkout", r)).rejects.toThrow(
      "Mercado Pago no confirmó la fecha de primer cobro acordada",
    );
    expect(db.subscription.create).not.toHaveBeenCalled();
  });
  it("rejects missing references and foreign subscription IDs", async () => {
    await expect(
      registerRecurringAuthorization("checkout", { ...remote(), external_reference: "other" }),
    ).rejects.toThrow("REFERENCE");
    db.subscription.findUnique.mockResolvedValue({ ...sub(), subscriptionBusinessId: "b" });
    await expect(registerRecurringAuthorization("checkout", remote())).rejects.toThrow("TENANT");
  });
  it("does not reactivate a cancelled subscription from a late authorization event", async () => {
    db.subscription.findUnique.mockResolvedValue({
      ...sub(),
      autoRenewEnabled: false,
      subscriptionStatus: "CANCELLED",
    });
    await registerRecurringAuthorization("checkout", remote());
    expect(db.subscription.update).not.toHaveBeenCalled();
  });
  it("the first actual payment completes the checkout once and grants one calendar month", async () => {
    db.subscriptionPayment.findUniqueOrThrow.mockResolvedValue({
      ...origin(),
      subscriptionId: "s",
    });
    const result = await settleRecurringCharge(charge());
    expect(result.subscription.subscriptionEndDate).toEqual(new Date("2027-01-14T15:00:00Z"));
    expect(db.subscriptionPayment.create).not.toHaveBeenCalled();
    expect(result.payment.status).toBe("APPROVED");
    expect(db.$queryRaw).toHaveBeenCalled();
  });
  it("a duplicate payment never extends access twice", async () => {
    db.subscriptionPayment.findUniqueOrThrow.mockResolvedValue({
      ...origin(),
      subscriptionId: "s",
    });
    db.subscriptionPayment.findFirst.mockResolvedValue({
      ...origin(),
      subscriptionId: "s",
      mpPaymentId: "pay",
      status: "APPROVED",
    });
    expect((await settleRecurringCharge(charge())).duplicate).toBe(true);
    expect(db.subscription.update).not.toHaveBeenCalled();
    expect(db.subscriptionPayment.create).not.toHaveBeenCalled();
  });
  it("rejects foreign and wrong-amount charges before writes", async () => {
    db.subscriptionPayment.findUniqueOrThrow.mockResolvedValue({
      ...origin(),
      subscriptionId: "s",
      subscriptionBusinessId: "b",
    });
    await expect(settleRecurringCharge(charge())).rejects.toThrow("TENANT");
    db.subscriptionPayment.findUniqueOrThrow.mockResolvedValue({
      ...origin(),
      subscriptionId: "s",
    });
    await expect(settleRecurringCharge({ ...charge(), amount: 950 })).rejects.toThrow("MISMATCH");
    expect(db.subscription.update).not.toHaveBeenCalled();
  });
  it("records a settled charge even if cancellation arrived first, without enabling renewal", async () => {
    db.subscription.findUniqueOrThrow.mockResolvedValue({ ...sub(), autoRenewEnabled: false });
    db.subscriptionPayment.findUniqueOrThrow.mockResolvedValue({
      ...origin(),
      subscriptionId: "s",
    });
    await settleRecurringCharge(charge());
    expect(db.subscription.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.not.objectContaining({ autoRenewEnabled: true }) }),
    );
  });
});

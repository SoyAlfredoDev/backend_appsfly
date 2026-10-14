import { beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({
  transaction: vi.fn(),
  lock: vi.fn(),
  member: vi.fn(),
  pending: vi.fn(),
  candidates: vi.fn(),
  current: vi.fn(),
  update: vi.fn(),
  audit: vi.fn(),
  remote: vi.fn(),
}));
vi.mock("../dbGeneral.js", () => ({
  generalPrisma: {
    $transaction: m.transaction,
    userBusiness: { findFirst: m.member },
    subscriptionPayment: { findFirst: m.pending },
    subscription: { findMany: m.candidates },
    subscriptionCancellation: { create: m.audit },
  },
}));
vi.mock("../services/subscriptionPaymentService.js", () => ({ FREE_TRIAL_PLAN_ID: "P001" }));
vi.mock("../services/mercadopago/mpApiClient.js", () => ({
  updateMercadoPagoPreapproval: m.remote,
}));
import { cancelBusinessSubscriptionRenewal } from "../services/mercadopago/mpSubscriptionBillingService.js";
const input = {
  businessId: "a",
  userId: "u",
  confirmationPhrase: "SÍ, ELIMINAR",
  cancelReason: "QA",
};
const base = {
  subscriptionId: "s",
  subscriptionBusinessId: "a",
  subscriptionPlanId: "P005",
  subscriptionAmount: 29738,
  subscriptionEndDate: new Date("2020-01-01"),
  autoRenewEnabled: true,
  mpPreapprovalId: "mp",
  mpPreapprovalStatus: "authorized",
  plan: { planName: "Start", planCurrency: "CLP" },
};
beforeEach(() => {
  vi.resetAllMocks();
  m.member.mockResolvedValue({});
  m.candidates.mockResolvedValue([base]);
  m.current.mockResolvedValue(base);
  m.transaction.mockImplementation((fn) =>
    fn({ $queryRaw: m.lock, subscription: { findUniqueOrThrow: m.current, update: m.update } }),
  );
  m.update.mockImplementation(({ data }) => ({ ...base, ...data }));
});
describe("cancelling recurring billing", () => {
  it("preserves a renewal received while Mercado Pago cancellation was in flight", async () => {
    m.current.mockResolvedValue({ ...base, subscriptionEndDate: new Date("2099-01-01") });
    await cancelBusinessSubscriptionRenewal(input);
    expect(m.remote).toHaveBeenCalledWith("mp", { status: "cancelled" });
    expect(m.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ autoRenewEnabled: false, subscriptionStatus: "CANCELLED" }),
      }),
    );
    expect(m.update.mock.calls[0][0].data).not.toHaveProperty("subscriptionEndDate");
  });
  it("does not claim cancellation succeeded when the gateway rejects it", async () => {
    m.remote.mockRejectedValue(new Error("offline"));
    await expect(cancelBusinessSubscriptionRenewal(input)).rejects.toThrow("offline");
    expect(m.transaction).not.toHaveBeenCalled();
  });
  it("allows an expired customer to stop future charges", async () => {
    await cancelBusinessSubscriptionRenewal(input);
    expect(m.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ subscriptionStatus: "EXPIRED", autoRenewEnabled: false }),
      }),
    );
  });
  it("requires the business administrator", async () => {
    m.member.mockResolvedValue(null);
    await expect(cancelBusinessSubscriptionRenewal(input)).rejects.toMatchObject({
      statusCode: 403,
    });
    expect(m.remote).not.toHaveBeenCalled();
  });
});

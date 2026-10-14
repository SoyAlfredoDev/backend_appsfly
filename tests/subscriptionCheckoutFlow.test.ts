import { beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({
  plan: vi.fn(),
  subs: vi.fn(),
  pending: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  find: vi.fn(),
  transaction: vi.fn(),
  lock: vi.fn(),
  remote: vi.fn(),
  cancel: vi.fn(),
}));
vi.mock("../dbGeneral.js", () => ({
  generalPrisma: { $transaction: m.transaction, subscriptionPayment: { update: m.update } },
}));
vi.mock("../services/planService.js", () => ({ getPlanById: m.plan }));
vi.mock("../services/subscriptionService.js", () => ({
  getSubscriptionsByBusinessIdService: m.subs,
  createSubscriptionService: vi.fn(),
}));
vi.mock("../services/mercadopago/index.js", () => ({
  isMercadoPagoConfigured: () => true,
  createMercadoPagoPendingPreapproval: m.remote,
  updateMercadoPagoPreapproval: m.cancel,
}));
vi.mock("../emails/dispatchers/subscriptionPayment.dispatcher.js", () => ({
  sendDualSubscriptionPaymentEmails: vi.fn(),
}));
import { createMercadoPagoCheckout } from "../services/subscriptionPaymentService.js";
const input = {
  subscriptionPaymentId: "new",
  pendingSubscriptionId: "sub",
  subscriptionBusinessId: "a",
  subscriptionPlanId: "P005",
  createdByUserId: "u",
  payerEmail: "qa@example.com",
};
beforeEach(() => {
  vi.resetAllMocks();
  m.transaction.mockImplementation((fn) =>
    fn({
      $queryRaw: m.lock,
      subscription: { findMany: m.subs },
      subscriptionPayment: {
        findFirst: m.pending,
        create: m.create,
        findUniqueOrThrow: m.find,
        update: m.update,
      },
    }),
  );
  m.plan.mockResolvedValue({
    planName: "Start",
    planActive: true,
    planPrice: 24990,
    planCurrency: "CLP",
    planDuration: 1,
  });
  m.subs.mockResolvedValue([
    {
      subscriptionPlanId: "P001",
      subscriptionStatus: "ACTIVE",
      subscriptionEndDate: "2099-12-14T15:00:00Z",
    },
  ]);
  m.create.mockImplementation(({ data }) => data);
  m.find.mockResolvedValue({ metadata: {} });
  m.remote.mockResolvedValue({
    id: "mp",
    status: "pending",
    auto_recurring: { start_date: "2099-12-14T15:00:00Z" },
    init_point: "https://www.mercadopago.cl/subscriptions/checkout?preapproval_id=mp",
  });
});
describe("checkout orchestration", () => {
  it.each([undefined, "2026-10-14T15:00:00Z", "invalid"])(
    "withholds checkout when the deferred date is not confirmed: %s",
    async (start_date) => {
      m.remote.mockResolvedValue({
        id: "mp",
        auto_recurring: { start_date },
        init_point: "https://www.mercadopago.cl/checkout",
      });
      await expect(createMercadoPagoCheckout(input)).rejects.toMatchObject({
        code: "BILLING_START_NOT_CONFIRMED",
      });
      expect(m.cancel).toHaveBeenCalledWith("mp", { status: "cancelled" });
      expect(m.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: "REJECTED" } }),
      );
    },
  );
  it("keeps an unsafe remote checkout blocked if cancellation cannot be confirmed", async () => {
    m.remote.mockResolvedValue({
      id: "mp",
      auto_recurring: {},
      init_point: "https://www.mercadopago.cl/checkout",
    });
    m.cancel.mockRejectedValue(new Error("gateway unavailable"));
    await expect(createMercadoPagoCheckout(input)).rejects.toThrow("gateway unavailable");
    expect(m.update).not.toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: "REJECTED" } }),
    );
  });
  it("sends the existing trial end and the total with IVA to Mercado Pago", async () => {
    const result = await createMercadoPagoCheckout(input);
    expect(m.remote).toHaveBeenCalledWith(
      expect.objectContaining({
        firstChargeAt: "2099-12-14T15:00:00.000Z",
        amount: 29738,
        externalReference: "new",
      }),
    );
    expect(result.firstChargeAt).toBe("2099-12-14T15:00:00.000Z");
    expect(m.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ status: "PENDING", amount: 29738 }),
    });
  });
  it("reuses an existing checkout instead of creating a second mandate", async () => {
    m.pending.mockResolvedValue({
      subscriptionPaymentId: "existing",
      subscriptionPlanId: "P005",
      amount: 29738,
      currency: "CLP",
      metadata: { checkoutUrl: "https://www.mercadopago.cl/existing" },
    });
    const result = await createMercadoPagoCheckout(input);
    expect(result.paymentId).toBe("existing");
    expect(m.remote).not.toHaveBeenCalled();
    expect(m.create).not.toHaveBeenCalled();
  });
  it("fails closed when a previous creation has an unknown remote outcome", async () => {
    m.pending.mockResolvedValue({
      subscriptionPaymentId: "existing",
      subscriptionPlanId: "P005",
      metadata: { checkoutNeedsReview: true },
    });
    await expect(createMercadoPagoCheckout(input)).rejects.toMatchObject({
      code: "CHECKOUT_ALREADY_PENDING",
    });
    expect(m.remote).not.toHaveBeenCalled();
  });
  it("does not allow another plan while a checkout is pending", async () => {
    m.pending.mockResolvedValue({
      subscriptionPaymentId: "existing",
      subscriptionPlanId: "P006",
      metadata: { checkoutUrl: "https://www.mercadopago.cl/existing" },
    });
    await expect(createMercadoPagoCheckout(input)).rejects.toMatchObject({ statusCode: 409 });
  });
});

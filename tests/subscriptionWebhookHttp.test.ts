import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
const mock = vi.hoisted(() => ({ signature: vi.fn(), process: vi.fn(), payment: vi.fn() }));
vi.mock("../services/mercadopago/mpWebhookSignature.js", () => ({
  extractWebhookNotification: () => ({
    resourceId: "1",
    topic: "subscription_authorized_payment",
    action: null,
  }),
  verifyMercadoPagoWebhookSignature: mock.signature,
}));
vi.mock("../services/mercadopago/mpWebhookProcessor.js", () => ({
  processMercadoPagoWebhookNotification: mock.process,
}));
vi.mock("../dbGeneral.js", () => ({
  generalPrisma: { subscriptionPayment: { findUnique: mock.payment } },
}));
import { mercadoPagoWebhookController } from "../controllers/webhook.controller.js";
import { requirePaymentTenant } from "../services/billing/paymentAccess.js";
const app = express();
app.use(express.json());
app.post("/webhook", mercadoPagoWebhookController);
app.get(
  "/payments/:paymentId",
  (req, _res, next) => {
    Object.assign(req, { tenantBusinessId: "a" });
    next();
  },
  requirePaymentTenant,
  (_req, res) => res.json({ ok: true }),
);
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("APP_ENV", "production");
  mock.signature.mockReturnValue({ valid: true, skipped: false });
  mock.process.mockResolvedValue({ reason: "APPROVED" });
});
describe("billing HTTP delivery and authorization", () => {
  it("returns a retryable response when processing fails", async () => {
    mock.process.mockRejectedValue(new Error("temporary DB failure"));
    expect((await request(app).post("/webhook")).status).toBe(503);
  });
  it("does not acknowledge a webhook without a configured signature", async () => {
    mock.signature.mockReturnValue({ valid: true, skipped: true });
    expect((await request(app).post("/webhook")).status).toBe(503);
    expect(mock.process).not.toHaveBeenCalled();
  });
  it("rejects an invalid signature", async () => {
    mock.signature.mockReturnValue({ valid: false, skipped: false });
    expect((await request(app).post("/webhook")).status).toBe(401);
  });
  it("acknowledges successful processing", async () =>
    expect((await request(app).post("/webhook")).status).toBe(200));
  it("hides payment records from other businesses", async () => {
    mock.payment.mockResolvedValue({ subscriptionBusinessId: "b" });
    expect((await request(app).get("/payments/foreign")).status).toBe(404);
  });
  it("permits only the resolved tenant payment", async () => {
    mock.payment.mockResolvedValue({ subscriptionBusinessId: "a" });
    expect((await request(app).get("/payments/own")).status).toBe(200);
  });
});

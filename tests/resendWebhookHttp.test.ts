import crypto from "node:crypto";
import express from "express";
import request from "supertest";
import { Webhook } from "svix";
import { beforeEach, describe, expect, it, vi } from "vitest";

const m = vi.hoisted(() => ({ campaign: vi.fn(), quotation: vi.fn() }));
vi.mock("../services/adminEmailCampaign/adminEmailCampaignResendWebhookService.js", () => ({
  processResendEmailWebhookEvent: m.campaign,
}));
vi.mock("../services/quotationEmailDeliveryService.js", () => ({
  processQuotationResendWebhookEvent: m.quotation,
}));
import { resendWebhookController } from "../controllers/resendWebhook.controller.js";
const app = express();
app.post("/webhook", express.raw({ type: "application/json" }), resendWebhookController);
const secret = `whsec_${Buffer.from("isolated-unit-test-signing-key").toString("base64")}`;
const body = JSON.stringify({ type: "email.delivered", data: { email_id: "qa-message" } });
function signed(payload = body) {
  const id = `msg_${crypto.randomUUID()}`;
  const now = new Date();
  return request(app)
    .post("/webhook")
    .set({
      "Content-Type": "application/json",
      "svix-id": id,
      "svix-timestamp": String(Math.floor(now.getTime() / 1000)),
      "svix-signature": new Webhook(secret).sign(id, now, payload),
    })
    .send(payload);
}
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("APP_ENV", "production");
  vi.stubEnv("RESEND_WEBHOOK_SECRET", secret);
  m.campaign.mockResolvedValue({ handled: false });
  m.quotation.mockResolvedValue({ handled: false });
});
describe("signed email delivery webhooks", () => {
  it("fails closed when the production secret is missing", async () => {
    vi.stubEnv("RESEND_WEBHOOK_SECRET", "");
    expect((await signed()).status).toBe(503);
    expect(m.campaign).not.toHaveBeenCalled();
  });
  it("rejects missing and tampered signatures without processing", async () => {
    expect(
      (await request(app).post("/webhook").set("Content-Type", "application/json").send(body))
        .status,
    ).toBe(401);
    expect((await signed().send(body.replace("qa-message", "other-message"))).status).toBe(401);
    expect(m.campaign).not.toHaveBeenCalled();
  });
  it("verifies a real Svix signature and awaits all dispatch handlers", async () => {
    let completed = false;
    m.quotation.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
      completed = true;
      return { handled: true };
    });
    expect((await signed()).status).toBe(200);
    expect(completed).toBe(true);
    expect(m.campaign).toHaveBeenCalledWith(JSON.parse(body));
    expect(m.quotation).toHaveBeenCalledWith(JSON.parse(body));
  });
  it("requests a provider retry if processing fails", async () => {
    m.quotation.mockRejectedValue(new Error("temporary database failure"));
    expect((await signed()).status).toBe(503);
  });
  it("does not route campaign events to unrelated quotation handlers", async () => {
    m.campaign.mockResolvedValue({ handled: true });
    expect((await signed()).status).toBe(200);
    expect(m.quotation).not.toHaveBeenCalled();
  });
});

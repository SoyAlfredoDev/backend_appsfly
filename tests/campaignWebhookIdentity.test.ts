import { beforeEach, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ find: vi.fn(), update: vi.fn(), metrics: vi.fn() }));
vi.mock("../dbGeneral.js", () => ({
  generalPrisma: {
    platformEmailCampaignRecipient: { findFirst: m.find, update: m.update },
  },
}));
vi.mock("../services/adminEmailCampaign/adminEmailCampaignMetricsService.js", () => ({
  syncRunMetricsFromRecipients: m.metrics,
}));
import { processResendEmailWebhookEvent } from "../services/adminEmailCampaign/adminEmailCampaignResendWebhookService.js";
beforeEach(() => vi.resetAllMocks());
it("never attributes a billing email to a campaign merely because the recipient matches", async () => {
  m.find.mockImplementation(async ({ where }) =>
    typeof where.providerMessageId === "string"
      ? null
      : { recipientId: "unrelated-campaign", runId: "run", deliveryStatus: "SENT" },
  );
  const result = await processResendEmailWebhookEvent({
    type: "email.delivered",
    data: { email_id: "billing-message", to: ["qa@example.com"] },
  });
  expect(result.handled).toBe(false);
  expect(m.find).toHaveBeenCalledTimes(1);
  expect(m.update).not.toHaveBeenCalled();
});
it("updates a campaign when the provider message matches exactly", async () => {
  m.find.mockResolvedValue({ recipientId: "recipient", runId: "run", deliveryStatus: "SENT" });
  await processResendEmailWebhookEvent({
    type: "email.delivered",
    data: { email_id: "campaign-message" },
  });
  expect(m.find.mock.calls[0][0].where).toEqual({ providerMessageId: "campaign-message" });
  expect(m.update).toHaveBeenCalledTimes(1);
});

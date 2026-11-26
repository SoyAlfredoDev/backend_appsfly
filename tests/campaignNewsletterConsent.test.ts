import express from "express";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({
  consent: vi.fn(),
  suppressions: vi.fn(),
  unsubscribe: vi.fn(),
  users: vi.fn(),
  prospects: vi.fn(),
  businesses: vi.fn(),
}));

vi.mock("../dbGeneral.js", () => ({
  generalPrisma: {
    $queryRaw: db.suppressions,
    $executeRaw: db.unsubscribe,
    newsletterSubscriber: { findMany: db.consent },
    user: { findMany: db.users },
    platformEmailProspect: { findMany: db.prospects },
    business: { findMany: db.businesses },
  },
}));

import newsletterRoutes from "../routes/newsletter.routes.js";
import {
  countAudienceByType,
  isCampaignRecipientEligible,
  resolveAudienceRecipients,
} from "../services/adminEmailCampaign/adminEmailCampaignAudienceService.js";
import {
  addNewsletterUnsubscribe,
  newsletterUnsubscribeUrl,
} from "../services/adminEmailCampaign/campaignNewsletterConsent.js";
import { resolveProspectOutreachSenderFrom } from "../services/adminEmailCampaign/adminEmailCampaignProspectSendPolicy.js";

const subscriberId = "99999999-2222-3333-4444-555555555555";
const otherId = "99999999-2222-3333-4444-aaaaaaaaaaaa";

function enrollment(email: string, newsletterSubscriberId = subscriberId) {
  return { email, newsletterSubscriberId };
}
const user = { userId: "u1", userFirstName: "Ana", userLastName: "Sol", userConfirmEmail: true };

describe("campaign recipient consent and unsubscribe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("TOKEN_SECRET", "test-newsletter-key");
    db.consent.mockResolvedValue([]);
    db.suppressions.mockResolvedValue([]);
    db.unsubscribe.mockResolvedValue(1);
    db.users.mockResolvedValue([]);
    db.prospects.mockResolvedValue([]);
    db.businesses.mockResolvedValue([]);
  });

  afterEach(() => vi.unstubAllEnvs());

  it("uses the same deduplicated, permission-checked list in preview and send", async () => {
    db.consent.mockResolvedValue([
      enrollment(" Ana@example.test "),
      enrollment("ana@example.test", otherId),
      enrollment("rebote@example.test", otherId),
      enrollment("baja@example.test", otherId),
      enrollment("dirección-inválida", otherId),
    ]);
    db.suppressions.mockResolvedValue([
      { email: "rebote@example.test" },
      { email: "baja@example.test" },
    ]);
    const result = await resolveAudienceRecipients("NEWSLETTER_SUBSCRIBERS");
    expect(result).toMatchObject([
      { userId: subscriberId, email: "ana@example.test", newsletterSubscriberId: subscriberId },
    ]);
    expect(result[0]?.unsubscribeUrl).toBe(newsletterUnsubscribeUrl(subscriberId));
    expect(await countAudienceByType("NEWSLETTER_SUBSCRIBERS")).toBe(1);
  });

  it("requires enrollment even for confirmed users and imported active prospects", async () => {
    db.consent.mockResolvedValue([enrollment("ana@example.test")]);
    db.users.mockResolvedValue([
      { ...user, userEmail: "ana@example.test" },
      { ...user, userId: "u2", userEmail: "verified@example.test" },
    ]);
    const prospect = {
      prospectId: "p1",
      email: "imported@example.test",
      status: "ACTIVE",
      createdAt: new Date(0),
      lastOutreachAt: null,
    };
    db.prospects.mockResolvedValue([prospect]);

    expect(await resolveAudienceRecipients("CONFIRMED_EMAIL")).toMatchObject([
      { userId: "u1", email: "ana@example.test", newsletterSubscriberId: subscriberId },
    ]);
    expect(await resolveAudienceRecipients("PLATFORM_PROSPECTS")).toEqual([]);
    expect(db.prospects.mock.calls[0]?.[0]).toMatchObject({
      where: { status: "ACTIVE", email: { in: ["ana@example.test"] } },
    });
  });

  it("keeps only the reserved expiration workflow operational without newsletter consent", async () => {
    db.businesses.mockResolvedValue([
      {
        businessId: "business-1",
        businessName: "Primer Comercio",
        subscriptions: [
          {
            subscriptionStatus: "ACTIVE",
            subscriptionEndDate: new Date(Date.now() + 5 * 24 * 60 * 60_000),
          },
        ],
        UserBusiness: [{ User: { ...user, userEmail: "ana@example.test" } }],
      },
    ]);
    const audienceType = "BUSINESS_ADMINS_PLAN_EXPIRING_5D";
    expect(await resolveAudienceRecipients(audienceType)).toEqual([]);
    const notices = await resolveAudienceRecipients(audienceType, null, {
      campaignKey: "daily-plan-expiry-warning-5d",
    });
    expect(notices).toMatchObject([{ email: "ana@example.test", businessId: "business-1" }]);
    expect(notices[0]).not.toHaveProperty("unsubscribeUrl");
  });

  it("rechecks promotional eligibility immediately before a pending attempt", async () => {
    db.suppressions.mockResolvedValue([{ allowed: false }]);
    await expect(
      isCampaignRecipientEligible(
        { audienceType: "NEWSLETTER_SUBSCRIBERS", campaignKey: null },
        { email: "ana@example.test" },
      ),
    ).resolves.toBe(false);
    expect(db.suppressions.mock.calls[0]?.slice(1)).toEqual([
      true,
      "ana@example.test",
      "ana@example.test",
      true,
      "ana@example.test",
    ]);
  });

  it("uses the configured platform domain regardless of the index in the batch", () => {
    vi.stubEnv("PLATFORM_EMAIL_DOMAIN", "appsfly.cl");
    expect(resolveProspectOutreachSenderFrom(200)).toBe("AppsFly Novedades <novedades@appsfly.cl>");
  });

  it("adds a visible unsubscribe link and the RFC one-click headers", () => {
    const url = newsletterUnsubscribeUrl(subscriberId);
    const delivery = addNewsletterUnsubscribe("<html><body><p>Hola</p></body></html>", "Hola", url);
    expect(delivery.html).toContain('href="' + url + '"');
    expect(delivery.html).toMatch(/Cancelar suscripción.*<\/body>/);
    expect(delivery.text).toContain(url);
    expect(delivery.headers).toEqual({
      "List-Unsubscribe": "<" + url + ">",
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    });
  });

  it("confirms in a browser GET and accepts both one-click POST encodings", async () => {
    const app = express();
    app.use("/api", newsletterRoutes);
    const endpoint = new URL(newsletterUnsubscribeUrl(subscriberId)).pathname;

    const page = await request(app).get(endpoint);
    expect(page.status).toBe(200);
    expect(page.headers["cache-control"]).toBe("no-store");
    expect(page.text).toContain('<form method="post">');
    expect(db.unsubscribe).not.toHaveBeenCalled();

    const malformed = await request(app).post(endpoint).type("form").send({ irrelevant: "value" });
    expect(malformed.status).toBe(400);
    expect(db.unsubscribe).not.toHaveBeenCalled();

    const changed = await request(app)
      .post(endpoint.replace(subscriberId, otherId))
      .type("form")
      .send({ "List-Unsubscribe": "One-Click" });
    expect(changed.status).toBe(400);
    expect(db.unsubscribe).not.toHaveBeenCalled();

    const urlencoded = await request(app)
      .post(endpoint)
      .type("form")
      .send({ "List-Unsubscribe": "One-Click" });
    const multipart = await request(app).post(endpoint).field("List-Unsubscribe", "One-Click");
    expect(urlencoded.status).toBe(200);
    expect(multipart.status).toBe(200);
    expect(db.unsubscribe).toHaveBeenCalledTimes(2);
    expect(db.unsubscribe.mock.calls[0]?.[1]).toBe(subscriberId);
  });
});

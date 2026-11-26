import { randomUUID } from "node:crypto";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { PrismaClient } from "../src/generated/general/index.js";

const database = process.env.TEST_CAMPAIGN_DELIVERY_DATABASE_URL;
const isolated =
  !!database &&
  new URL(database).hostname === "127.0.0.1" &&
  new URL(database).pathname === "/af_campaign_quota_test";

const mocks = vi.hoisted(() => ({
  audience: vi.fn(),
  eligible: vi.fn(),
}));

vi.mock("../superAdmin.js", () => ({ default: [] }));

vi.mock("../dbGeneral.js", async () => {
  if (!isolated) throw new Error("La prueba requiere la base local aislada de campañas.");
  const { PrismaClient } = await import("../src/generated/general/index.js");
  return { generalPrisma: new PrismaClient({ datasourceUrl: database }) };
});

vi.mock("../services/adminEmailCampaign/adminEmailCampaignAudienceService.js", () => ({
  countAudienceByType: vi.fn(),
  resolveAudienceRecipients: mocks.audience,
  isCampaignRecipientEligible: mocks.eligible,
}));

vi.mock("../services/adminEmailCampaign/adminEmailCampaignTemplateService.js", () => ({
  renderCampaignEmail: () => ({
    subject: "Prueba de cuota de campaña",
    html: "<p>Datos ficticios.</p>",
    text: "Datos ficticios.",
    variantId: null,
  }),
}));

vi.mock("../services/adminEmailCampaign/adminEmailCampaignResendSyncService.js", () => ({
  syncCampaignDeliveryFromResend: async () => ({}),
  syncStaleCampaignDeliveriesFromResend: async () => ({}),
}));

vi.mock("../services/adminNotificationService.js", () => ({
  buildCampaignSuccessNotification: () => ({}),
  createCampaignNotification: async () => undefined,
  createCampaignManualRequiredNotification: async () => undefined,
  hasRecentManualRequiredNotification: async () => false,
}));

const start = new Date("2026-11-25T12:00:00.000Z");
const dailyReset = "2026-11-26T00:00:00.000Z";
const monthlyReset = "2026-12-12T12:01:16.792Z";

function providerUsage(
  dailyUsed: number,
  monthlyUsed: number,
  afterDaily = dailyReset,
  afterMonthly = monthlyReset,
) {
  return Response.json({
    emails: {
      daily: { used: dailyUsed, limit: 100, resets_at: afterDaily },
      monthly: { used: monthlyUsed, limit: 3000, resets_at: afterMonthly },
    },
  });
}

describe.skipIf(!isolated)("envíos de campaña con PostgreSQL local y Resend simulado", () => {
  const userId = randomUUID();
  let prisma: PrismaClient;
  let runAllDue: typeof import("../services/adminEmailCampaign/adminEmailCampaignScheduler.js").runAllDueEmailCampaigns;
  let execute: typeof import("../services/adminEmailCampaign/adminEmailCampaignSendService.js").executePlatformEmailCampaign;

  beforeAll(async () => {
    ({ generalPrisma: prisma } = await import("../dbGeneral.js"));
    ({ executePlatformEmailCampaign: execute } =
      await import("../services/adminEmailCampaign/adminEmailCampaignSendService.js"));
    ({ runAllDueEmailCampaigns: runAllDue } =
      await import("../services/adminEmailCampaign/adminEmailCampaignScheduler.js"));
    await prisma.user.create({
      data: {
        userId,
        userEmail: `${userId}@example.invalid`,
        userPassword: "qa-synthetic-password",
        userFirstName: "QA",
        userLastName: "Campañas",
        userCodePhoneNumber: "+56",
        userPhoneNumber: "000000000",
        userDocumentType: "rut",
        userDocumentNumber: "11.111.111-1",
      },
    });
  });

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(start);
    vi.stubEnv("APP_ENV", "production");
    vi.stubEnv("SUPER_ADMIN_IDS", "");
    vi.stubEnv("RESEND_API_KEY", "quota-test-only");
    vi.stubEnv("PLATFORM_EMAIL_DOMAIN", "appsfly.cl");
    vi.stubEnv("PLATFORM_EMAIL_DEFAULT_FROM", "AppsFly <novedades@appsfly.cl>");
    mocks.audience.mockResolvedValue(
      ["one@example.invalid", "two@example.invalid"].map((email) => ({
        email,
        userId: randomUUID(),
        firstName: "QA",
        lastName: "Consent",
      })),
    );
    mocks.eligible.mockResolvedValue(true);
  });

  afterEach(async () => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    await prisma?.platformEmailCampaign.deleteMany({ where: { createdByUserId: userId } });
  });

  afterAll(async () => {
    if (!prisma) return;
    await prisma.user.deleteMany({ where: { userId } });
    await prisma.$disconnect();
  });

  async function createCampaign() {
    return prisma.platformEmailCampaign.create({
      data: {
        campaignName: "Campaña QA aislada",
        audienceType: "NEWSLETTER_SUBSCRIBERS",
        scheduleFrequency: "MANUAL",
        campaignStatus: "DRAFT",
        createdByUserId: userId,
      },
    });
  }

  it.each([
    {
      case: "mensual",
      dailyUsed: 5,
      monthlyUsed: 2999,
      code: "CAMPAIGN_MONTHLY_QUOTA",
      resumeAt: monthlyReset,
    },
    {
      case: "diario",
      dailyUsed: 99,
      monthlyUsed: 2990,
      code: "CAMPAIGN_DAILY_QUOTA",
      resumeAt: dailyReset,
    },
  ])(
    "conserva el lote parcial, bloquea el forzado y reanuda el mismo run con cupo $case",
    async (scenario) => {
      const campaign = await createCampaign();
      let usage = providerUsage(scenario.dailyUsed, scenario.monthlyUsed);
      const sentKeys: Array<{ key: string | null; email: string }> = [];
      const fetch = vi.fn().mockImplementation(async (url: string, init: RequestInit) => {
        if (url === "https://api.resend.com/usage") return usage;
        if (url !== "https://api.resend.com/emails") throw new Error("Ruta QA inesperada");
        const key = new Headers(init.headers).get("Idempotency-Key");
        const payload = JSON.parse(String(init.body)) as { to: string };
        sentKeys.push({ key, email: payload.to });
        return Response.json({ id: `msg-qa-${sentKeys.length}` });
      });
      vi.stubGlobal("fetch", fetch);

      const paused = await execute(campaign.campaignId);
      expect(paused).toMatchObject({
        paused: true,
        code: scenario.code,
        resumeAt: scenario.resumeAt,
        run: { runStatus: "PENDING", recipientCount: 2, sentCount: 1, failedCount: 0 },
      });
      expect(sentKeys).toHaveLength(1);
      const beforeForce = await prisma.platformEmailCampaignRecipient.findMany({
        where: { runId: paused.run.runId },
      });
      expect(beforeForce.map((row) => row.deliveryStatus).sort()).toEqual(["PENDING", "SENT"]);
      expect(
        beforeForce.find((row) => row.deliveryStatus === "PENDING")?.providerMessageId,
      ).toBeNull();

      const blocked = await execute(campaign.campaignId, { force: true });
      expect(blocked).toMatchObject({ code: scenario.code, run: { runId: paused.run.runId } });
      expect(sentKeys).toHaveLength(1);
      expect(await runAllDue()).toMatchObject({
        paused: true,
        resumed: { code: scenario.code, resumeAt: scenario.resumeAt },
      });
      expect(fetch).toHaveBeenCalledTimes(2);

      vi.setSystemTime(new Date(Date.parse(scenario.resumeAt) + 1000));
      usage = providerUsage(0, 0, "2026-12-13T00:00:00.000Z", "2027-01-12T12:01:16.792Z");
      expect(await runAllDue()).toMatchObject({
        ran: true,
        paused: false,
        resumed: { processed: true },
      });
      const finished = await prisma.platformEmailCampaign.findUniqueOrThrow({
        where: { campaignId: campaign.campaignId },
        include: { runs: true },
      });
      expect(finished).toMatchObject({
        campaignStatus: "SENT",
        totalRecipients: 2,
        totalSent: 2,
        runs: [{ runId: paused.run.runId, runStatus: "COMPLETED", sentCount: 2, failedCount: 0 }],
      });
      expect(
        await prisma.platformEmailCampaignRun.count({ where: { campaignId: campaign.campaignId } }),
      ).toBe(1);
      expect(new Set(sentKeys.map(({ key }) => key)).size).toBe(2);
      expect(new Set(sentKeys.map(({ email }) => email)).size).toBe(2);
      expect(sentKeys.every(({ key }) => key?.startsWith("campaign/"))).toBe(true);
    },
  );

  it("conserva destinatarios pendientes ante una cuota agotada entre lectura y envío", async () => {
    const campaign = await createCampaign();
    const fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url === "https://api.resend.com/usage") return providerUsage(5, 2999);
      if (url !== "https://api.resend.com/emails") throw new Error("Ruta QA inesperada");
      return Response.json(
        { name: "monthly_quota_exceeded", statusCode: 429, message: "Quota reached" },
        { status: 429 },
      );
    });
    vi.stubGlobal("fetch", fetch);
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const result = await execute(campaign.campaignId, { force: true });
    expect(result).toMatchObject({
      paused: true,
      code: "CAMPAIGN_MONTHLY_QUOTA",
      resumeAt: monthlyReset,
      run: { runStatus: "PENDING", recipientCount: 2, sentCount: 0, failedCount: 0 },
    });
    const rows = await prisma.platformEmailCampaignRecipient.findMany({
      where: { runId: result.run.runId },
    });
    expect(rows).toHaveLength(2);
    expect(rows.every((row) => row.deliveryStatus === "PENDING" && row.errorMessage === null)).toBe(
      true,
    );
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});

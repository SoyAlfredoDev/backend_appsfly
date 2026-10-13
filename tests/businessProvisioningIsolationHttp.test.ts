import express from "express";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
  membership: vi.fn(),
  tenant: vi.fn(),
  seed: vi.fn(),
}));
vi.mock("../services/businessService.js", () => ({
  createBusinessService: m.create,
  updateBusinessByIdService: m.update,
  getBusinessService: vi.fn(),
  getBusinessByIdService: vi.fn(),
}));
vi.mock("../services/neonDataBaseService.js", () => ({
  createNeonDatabaseService: vi.fn(),
  getConnectionStringAndTest: vi.fn(),
}));
vi.mock("../services/businessDB/userBusiness.js", () => ({
  registerUserBusinessServiceBusinessDB: vi.fn().mockResolvedValue({}),
}));
vi.mock("../services/userBusinessService.js", () => ({ createUserBusinessService: m.membership }));
vi.mock("../services/usersService.js", () => ({
  getUserById: vi
    .fn()
    .mockResolvedValue({
      userFirstName: "QA",
      userLastName: "QA",
      userEmail: "qa@example.invalid",
    }),
}));
vi.mock("../prisma/runMigrate.js", () => ({ runPrismaMigrate: vi.fn() }));
vi.mock("../db.js", () => ({ getPrismaForProvisioning: m.tenant }));
vi.mock("../libs/opticsCatalogSeed.js", () => ({ seedOpticsCatalog: m.seed }));
vi.mock("../services/planService.js", () => ({ getPlanById: vi.fn() }));
import { createBusinessController } from "../controllers/business.controller.js";
const app = express();
app.use(express.json());
app.post(
  "/business",
  (req, res, next) => {
    Object.assign(req, { user: { payload: { id: req.headers["x-qa-user"] } } });
    next();
  },
  createBusinessController,
);
describe("business provisioning isolation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("DATABASE_SHARED_URL", "configured-test-placeholder");
    m.create.mockImplementation(async (data) => ({ ...data }));
    m.update.mockImplementation(async (businessId, data) => ({ businessId, ...data }));
    m.membership.mockResolvedValue({});
    m.tenant.mockResolvedValue({});
    m.seed.mockResolvedValue({});
  });
  afterEach(() => vi.unstubAllEnvs());
  it("creates distinct tenants and owner memberships even when clients send the same tenant ID", async () => {
    const results = await Promise.all(
      ["a", "b"].map((id) =>
        request(app)
          .post("/business")
          .set("X-QA-User", id)
          .send({
            businessId: "victim",
            businessName: "QA",
            businessType: "optics",
            businessDatabaseMode: "DEDICATED",
            UserBusiness: { create: { userBusinessUserId: "attacker" } },
          }),
      ),
    );
    expect(results.map((r) => r.status)).toEqual([201, 201]);
    const ids = results.map((r) => r.body.businessId);
    expect(new Set(ids).size).toBe(2);
    expect(ids).not.toContain("victim");
    for (let i = 0; i < 2; i++)
      expect(m.membership).toHaveBeenCalledWith({
        userBusinessUserId: ["a", "b"][i],
        userBusinessBusinessId: ids[i],
        userBusinessRole: "ADMIN",
      });
    for (const [payload] of m.create.mock.calls) {
      expect(payload.UserBusiness).toBeUndefined();
      expect(payload.businessDatabaseMode).toBe("SHARED");
    }
  });
  it("never activates a tenant whose catalog provisioning failed", async () => {
    m.seed.mockRejectedValue(new Error("QA seed failure"));
    const result = await request(app)
      .post("/business")
      .set("X-QA-User", "a")
      .send({ businessName: "QA", businessType: "optics" });
    expect(result.status).toBe(202);
    expect(result.body.business.businessStatus).toBe("PENDING");
    expect(result.body.business.businessDatabaseStatus).toBe("FAILED");
  });
});

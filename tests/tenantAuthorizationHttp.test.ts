import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  memberships: vi.fn(),
  create: vi.fn(),
  placement: vi.fn(),
  timezone: vi.fn(),
}));
vi.mock("../services/userBusinessService.js", () => ({
  getUserBusinessById: mocks.memberships,
  createUserBusinessService: mocks.create,
  getBusinessMembersService: vi.fn(),
  assertUserBelongsToBusiness: vi.fn(),
}));
vi.mock("../db.js", () => ({ getPrismaForBusinessId: mocks.placement }));
vi.mock("../libs/getBusinessTimezone.js", () => ({ getBusinessTimezoneById: mocks.timezone }));
vi.mock("../middlewares/auth.middleware.js", () => ({
  authRequired: (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.headers.authorization) return res.sendStatus(401);
    Object.assign(req, { user: { payload: { id: req.headers.authorization } } });
    next();
  },
}));
import membershipRoutes from "../routes/userBussiness.routes.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { ensureTenantRole, requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const app = express();
app.use(express.json(), membershipRoutes);
app.get("/tenant-data", authRequired, dbSelectorMiddleware, (req, res) =>
  res.json({ businessId: req.tenantBusinessId }),
);
app.get("/protected/:businessId", authRequired, ensureTenantRole, requireTenantAdmin, (_req, res) =>
  res.sendStatus(200),
);
const membership = (id: string, role = "ADMIN") => ({
  userBusinessBusinessId: id,
  userBusinessRole: role,
  Business: { businessStatus: "ACTIVE" },
});

describe("tenant HTTP authorization boundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.memberships.mockResolvedValue([membership("a")]);
    mocks.placement.mockResolvedValue({});
  });
  it("rejects anonymous membership creation", async () => {
    expect(
      (
        await request(app)
          .post("/userBusiness")
          .send({ userBusinessBusinessId: "b", userBusinessRole: "ADMIN" })
      ).status,
    ).toBe(401);
  });
  it("prevents self-enrollment in another tenant with an attacker-selected role", async () => {
    const result = await request(app)
      .post("/userBusiness")
      .set("Authorization", "user-a")
      .send({ userBusinessBusinessId: "b", userBusinessRole: "ADMIN" });
    expect(result.status).toBe(403);
    expect(result.body.code).toBe("MEMBERSHIP_SELF_ASSIGNMENT_FORBIDDEN");
    expect(mocks.create).not.toHaveBeenCalled();
  });
  it("rejects a forged tenant header before connecting", async () => {
    const result = await request(app)
      .get("/tenant-data")
      .set("Authorization", "user-a")
      .set("X-AppsFly-Business-Id", "b");
    expect(result.status).toBe(403);
    expect(mocks.placement).not.toHaveBeenCalled();
  });
  it("resolves concurrent users to their own tenants", async () => {
    mocks.memberships.mockImplementation(async (id: string) => [
      membership(id === "user-a" ? "a" : "b"),
    ]);
    const results = await Promise.all(
      ["a", "b"].map((id) =>
        request(app)
          .get("/tenant-data")
          .set("Authorization", `user-${id}`)
          .set("X-AppsFly-Business-Id", id),
      ),
    );
    expect(results.map((result) => result.body.businessId)).toEqual(["a", "b"]);
  });
  it("cannot use admin of A to authorize a resource in B", async () => {
    mocks.memberships.mockResolvedValue([membership("a"), membership("b", "SELLER")]);
    const result = await request(app)
      .get("/protected/b")
      .set("Authorization", "user-a")
      .set("X-AppsFly-Business-Id", "a");
    expect(result.status).toBe(403);
    expect(result.body.code).toBe("TENANT_CONTEXT_MISMATCH");
  });
  it("reports unavailable databases without leaking internal errors", async () => {
    mocks.placement.mockRejectedValue(
      Object.assign(new Error("internal details"), {
        statusCode: 503,
        code: "TENANT_PROVISIONING_INCOMPLETE",
      }),
    );
    const result = await request(app).get("/tenant-data").set("Authorization", "user-a");
    expect(result.status).toBe(503);
    expect(result.body.code).toBe("TENANT_PROVISIONING_INCOMPLETE");
    expect(JSON.stringify(result.body)).not.toContain("internal details");
  });
});

import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({
  memberships: vi.fn(),
  list: vi.fn(),
  handler: vi.fn((_req, res) => res.json([])),
}));
vi.mock("../services/userBusinessService.js", () => ({ getUserBusinessById: m.memberships }));
vi.mock("../middlewares/auth.middleware.js", () => ({
  authRequired: (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    Object.assign(req, { user: { payload: { id: "user-a" } } });
    next();
  },
}));
vi.mock("../controllers/subscription.controller.js", () =>
  Object.fromEntries(
    [
      "checkActiveSubscription",
      "createSubscriptionController",
      "createSubscriptionCheckoutController",
      "processSubscriptionPaymentBrickController",
      "confirmSubscriptionPaymentController",
      "syncSubscriptionPreapprovalController",
      "getSubscriptionPaymentStatusController",
      "getBusinessBillingController",
      "cancelBusinessSubscriptionController",
    ].map((name) => [name, m.handler]),
  ),
);
vi.mock("../dbGeneral.js", () => ({ generalPrisma: { userGuest: { findMany: m.list } } }));
import subscriptionRoutes from "../routes/subscriptions.routes.js";
import { getUserGuests } from "../services/userGuestService.js";
const app = express();
app.use(express.json(), subscriptionRoutes);
describe("control-plane tenant boundaries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    m.memberships.mockResolvedValue([{ userBusinessBusinessId: "a", userBusinessRole: "ADMIN" }]);
    m.list.mockResolvedValue([]);
  });
  it("denies subscription reads for another business", async () => {
    expect((await request(app).get("/subscriptions/b")).status).toBe(403);
    expect(m.handler).not.toHaveBeenCalled();
  });
  it("permits subscription reads for a member", async () => {
    expect((await request(app).get("/subscriptions/a")).status).toBe(200);
  });
  it("requires an explicit tenant for multiple memberships", async () => {
    m.memberships.mockResolvedValue([
      { userBusinessBusinessId: "a", userBusinessRole: "ADMIN" },
      { userBusinessBusinessId: "b", userBusinessRole: "ADMIN" },
    ]);
    const result = await request(app).post("/subscriptions/checkout").send({});
    expect(result.status).toBe(409);
    expect(result.body.code).toBe("TENANT_REQUIRED");
  });
  it("never performs unscoped GeneralDB invitation reads", async () => {
    await expect(getUserGuests(undefined)).rejects.toThrow("Tenant context");
    expect(m.list).not.toHaveBeenCalled();
    await getUserGuests("a");
    expect(m.list).toHaveBeenCalledWith({ where: { userGuestBusinessId: "a" } });
  });
});

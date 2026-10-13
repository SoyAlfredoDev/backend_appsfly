import request from "supertest";
import jwt from "jsonwebtoken";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ members: vi.fn(), edit: vi.fn() }));
vi.mock("../services/userBusinessService.js", async (original) => ({
  ...(await original<object>()),
  getUserBusinessById: mocks.members,
}));
vi.mock("../db.js", async (original) => ({
  ...(await original<object>()),
  getPrismaForBusinessId: vi.fn().mockResolvedValue({}),
}));
vi.mock("../libs/getBusinessTimezone.js", () => ({
  getBusinessTimezoneById: vi.fn().mockResolvedValue("America/Santiago"),
}));
vi.mock("../services/sales/saleEditService.js", () => ({
  updateSaleAsAdmin: mocks.edit,
  getSaleEditabilityById: vi.fn(),
}));
vi.stubEnv("TOKEN_SECRET", "synthetic-sale-edit-secret");
const { default: app } = await import("../app.js");
const token = jwt.sign({ payload: { id: "qa-admin" } }, "synthetic-sale-edit-secret");
const patch = (tenant = "qa-tenant") =>
  request(app)
    .patch("/api/sales/qa-sale")
    .set("Authorization", `Bearer ${token}`)
    .set("X-AppsFly-Business-Id", tenant);

beforeEach(() => {
  vi.clearAllMocks();
  mocks.members.mockResolvedValue([
    {
      userBusinessBusinessId: "qa-tenant",
      userBusinessRole: "ADMIN",
      Business: { businessStatus: "ACTIVE" },
    },
  ]);
  mocks.edit.mockResolvedValue({ sale: { saleId: "qa-sale", salePendingAmount: 100 } });
});

describe("administrative sale edit HTTP contract", () => {
  it("requires authentication", async () => {
    await request(app).patch("/api/sales/qa-sale").send({}).expect(401);
    expect(mocks.edit).not.toHaveBeenCalled();
  });
  it("rejects another tenant", async () => {
    await patch("another-tenant").send({}).expect(403);
    expect(mocks.edit).not.toHaveBeenCalled();
  });
  it("rejects a non-administrator", async () => {
    mocks.members.mockResolvedValue([
      {
        userBusinessBusinessId: "qa-tenant",
        userBusinessRole: "USER",
        Business: { businessStatus: "ACTIVE" },
      },
    ]);
    await patch().send({}).expect(403);
    expect(mocks.edit).not.toHaveBeenCalled();
  });
  it("uses the server-resolved tenant and user", async () => {
    await patch().send({ details: [], payments: [], userId: "forged-user" }).expect(200);
    expect(mocks.edit).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "qa-admin",
        saleId: "qa-sale",
        timeZone: "America/Santiago",
      }),
    );
  });
  it.each(["DAY_CLOSED", "SALE_TOO_OLD"])("returns the stable %s conflict", async (code) => {
    mocks.edit.mockRejectedValue(
      Object.assign(new Error("Edición bloqueada."), { statusCode: 409, code }),
    );
    const response = await patch().send({}).expect(409);
    expect(response.body.code).toBe(code);
  });
  it("returns a retryable concurrency conflict", async () => {
    mocks.edit.mockRejectedValue(Object.assign(new Error("database detail"), { code: "P2034" }));
    const response = await patch().send({}).expect(409);
    expect(response.body.code).toBe("SALE_EDIT_CONFLICT");
    expect(response.body.message).not.toContain("database detail");
  });
});

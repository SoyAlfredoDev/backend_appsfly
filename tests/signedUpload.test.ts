import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const members = vi.hoisted(() => vi.fn());
vi.mock("../services/userBusinessService.js", () => ({ getUserBusinessById: members }));
vi.mock("../db.js", () => ({ getPrismaForBusinessId: vi.fn().mockResolvedValue({}) }));
vi.mock("../libs/getBusinessTimezone.js", () => ({
  getBusinessTimezoneById: vi.fn().mockResolvedValue("America/Santiago"),
}));
vi.stubEnv("TOKEN_SECRET", "synthetic-qa-token-secret");
const { default: mediaRouter } = await import("../routes/media.routes.js");
const app = express().use(express.json()).use("/api", mediaRouter);
const token = jwt.sign({ payload: { id: "qa-user" } }, "synthetic-qa-token-secret");
const validInput = { assetType: "ticket_receipts", contentType: "image/png", fileSize: 100 };
const post = (body: object = validInput) =>
  request(app)
    .post("/api/media/upload-signature")
    .set("Authorization", `Bearer ${token}`)
    .set("X-AppsFly-Business-Id", "tenant-a")
    .send(body);
beforeEach(() => {
  vi.stubEnv("CLOUDINARY_CLOUD_NAME", "qa-cloud");
  vi.stubEnv("CLOUDINARY_API_KEY", "qa-public-key");
  vi.stubEnv("CLOUDINARY_API_SECRET", "synthetic-qa-cloudinary-secret");
  members.mockResolvedValue([
    {
      userBusinessBusinessId: "tenant-a",
      userBusinessRole: "ADMIN",
      Business: { businessStatus: "ACTIVE" },
    },
  ]);
});
afterEach(() => vi.unstubAllEnvs());

describe("tenant-authorized image signatures", () => {
  it("rejects unauthenticated requests", async () => {
    await request(app).post("/api/media/upload-signature").send(validInput).expect(401);
  });
  it("signs only the authorized tenant folder and disables overwrite", async () => {
    const response = await post().expect(200);
    expect(response.body.params).toMatchObject({
      folder: "tenants/tenant-a/ticket_receipts",
      overwrite: false,
      context: "businessId=tenant-a|userId=qa-user",
    });
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.body).not.toHaveProperty("apiSecret");
    expect(JSON.stringify(response.body)).not.toContain("synthetic-qa-cloudinary-secret");
    const verify = (params: Record<string, unknown>) =>
      cloudinary.utils.api_sign_request(params, "synthetic-qa-cloudinary-secret");
    expect(response.body.signature).toBe(verify(response.body.params));
    expect(response.body.signature).not.toBe(
      verify({ ...response.body.params, folder: "tenants/other/ticket_receipts" }),
    );
    const second = await post().expect(200);
    expect(second.body.params.public_id).not.toBe(response.body.params.public_id);
  });
  it("rejects a business header outside the membership", async () => {
    const response = await post().set("X-AppsFly-Business-Id", "other-tenant").expect(403);
    expect(response.body.code).toBe("TENANT_FORBIDDEN");
  });
  it.each([
    { ...validInput, folder: "tenants/other" },
    { ...validInput, public_id: "existing-file" },
    { ...validInput, assetType: "../other" },
    { ...validInput, contentType: "image/svg+xml" },
    { ...validInput, fileSize: 10 * 1024 * 1024 + 1 },
  ])("rejects invalid parameters %j", async (body) => {
    await post(body).expect(400);
  });
  it("limits financial receipt uploads to tenant admins", async () => {
    members.mockResolvedValue([
      {
        userBusinessBusinessId: "tenant-a",
        userBusinessRole: "USER",
        Business: { businessStatus: "ACTIVE" },
      },
    ]);
    await post().expect(403);
    await post({ ...validInput, assetType: "prescription_images" }).expect(200);
  });
  it("rejects inactive tenants", async () => {
    members.mockResolvedValue([
      {
        userBusinessBusinessId: "tenant-a",
        userBusinessRole: "ADMIN",
        Business: { businessStatus: "PENDING" },
      },
    ]);
    await post().expect(503);
  });
  it("returns a safe configuration error if server credentials are absent", async () => {
    vi.stubEnv("CLOUDINARY_API_SECRET", "");
    const response = await post().expect(503);
    expect(response.body.code).toBe("MEDIA_UPLOAD_NOT_CONFIGURED");
  });
});

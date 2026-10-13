import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import { afterAll, describe, expect, it, vi } from "vitest";

vi.stubEnv("TOKEN_SECRET", "synthetic-tenant-cache-test-secret");
const { authRequired } = await import("../middlewares/auth.middleware.js");
afterAll(() => vi.unstubAllEnvs());
const app = express();
app.get("/customers", authRequired, (_req, res) => res.json([{ customerId: "qa-client" }]));

describe("authenticated HTTP cache isolation", () => {
  it.each([true, false])(
    "prevents shared cache storage (authenticated=%s)",
    async (authenticated) => {
      const query = request(app).get("/customers");
      if (authenticated)
        query.set(
          "Authorization",
          `Bearer ${jwt.sign({ payload: { id: "qa" } }, "synthetic-tenant-cache-test-secret")}`,
        );
      const response = await query;
      expect(response.status).toBe(authenticated ? 200 : 401);
      expect(response.headers["cache-control"]).toBe("private, no-store");
      expect(response.headers.vary).toContain("Authorization");
      expect(response.headers.vary).toContain("X-AppsFly-Business-Id");
      expect(response.headers.vary).toContain("X-Tenant-Business-Id");
    },
  );
});

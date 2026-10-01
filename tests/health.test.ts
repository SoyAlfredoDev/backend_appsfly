import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";

describe("health endpoints", () => {
  it("returns the API health contract", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body).toMatchObject({
      ok: true,
      service: "appsfly-api",
      environment: "test",
    });
  });

  it("allows browser requests from the local development frontend", async () => {
    const response = await request(app)
      .options("/api/health")
      .set("Origin", "http://127.0.0.1:5173")
      .set("Access-Control-Request-Method", "GET")
      .expect(204);

    expect(response.headers["access-control-allow-origin"]).toBe("http://127.0.0.1:5173");
    expect(response.headers["access-control-allow-credentials"]).toBe("true");
  });
});

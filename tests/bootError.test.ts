import { describe, expect, it } from "vitest";
import { publicBootError } from "../api/bootError.js";

describe("public boot errors", () => {
  it("hides database credentials and keeps the failure message", () => {
    const body = publicBootError(
      Object.assign(new Error("connect postgresql://user:secret@db.example/app failed"), {
        name: "PrismaClientInitializationError",
      }),
    );

    expect(body.code).toBe("API_BOOT_FAILED");
    expect(body.name).toBe("PrismaClientInitializationError");
    expect(body.message).toContain("postgresql://***");
    expect(body.message).not.toContain("secret");
  });
});

import { describe, expect, it } from "vitest";
import { shouldRunProductionMigrations } from "../scripts/vercelBuild.mjs";
import { prismaGenerateEnv } from "../scripts/generatePrismaClients.mjs";

describe("Vercel build environment", () => {
  it("runs database migrations only for Vercel production", () => {
    expect(shouldRunProductionMigrations({ VERCEL: "1", VERCEL_ENV: "production" })).toBe(true);
    expect(shouldRunProductionMigrations({ VERCEL: "1", VERCEL_ENV: "preview" })).toBe(false);
    expect(shouldRunProductionMigrations({ VERCEL: "1" })).toBe(false);
    expect(shouldRunProductionMigrations({})).toBe(false);
  });

  it("uses build-only database URLs when Prisma generation has no configured URLs", () => {
    const env = prismaGenerateEnv({});
    expect(env.DATABASE_URL).toMatch(/127\.0\.0\.1/);
    expect(env.DATABASE_SHARED_URL).toMatch(/127\.0\.0\.1/);
    expect(env.DATABASE_SHARED_MIGRATION_URL).toMatch(/127\.0\.0\.1/);
    expect(env.DATABASE_GENERAL_URL).toMatch(/127\.0\.0\.1/);
  });

  it("preserves configured URLs for Prisma generation", () => {
    const env = prismaGenerateEnv({ DATABASE_GENERAL_URL: "postgresql://configured" });
    expect(env.DATABASE_GENERAL_URL).toBe("postgresql://configured");
  });
});

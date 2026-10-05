import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../app.js";
import { invalidCredentialsBody, passwordPolicyError } from "../services/auth/passwordPolicy.js";
import { toPublicUser } from "../services/auth/publicUser.js";
import { createRateLimiter } from "../services/auth/rateLimit.js";
import { serverlessDatabaseUrl } from "../services/database/serverlessDatabaseUrl.js";
import {
  assertUtilityColumn,
  assertUtilityModel,
  toPublicRecord,
  UtilityAccessError,
} from "../services/database/tenantUtilityAccess.js";
import {
  ensureSharedMigrationEnv,
  isSchemaNotEmptyError,
  isRetryableDatabaseError,
  sharedMigrationFolders,
  migrationDatabaseUrl,
  migrationEnvForSchema,
  pinHostnameInHosts,
  preferIpv4DatabaseHost,
  shouldMigrateSharedDatabase,
} from "../scripts/vercelBuild.mjs";

describe("public user responses", () => {
  it("removes the password hash before a user leaves the API", () => {
    const user = toPublicUser({
      userId: "user-1",
      userEmail: "ana@example.com",
      userPassword: "hashed-secret",
    });

    expect(user).toEqual({ userId: "user-1", userEmail: "ana@example.com" });
    expect(user).not.toHaveProperty("userPassword");
  });
});

describe("password policy", () => {
  it("rejects short passwords and uses one login error for unknown users", () => {
    expect(passwordPolicyError("short")).toBe("Password must be at least 8 characters");
    expect(passwordPolicyError("long-enough")).toBeNull();
    expect(invalidCredentialsBody()).toEqual({
      message: "Incorrect username or password",
      code: "INVALID_CREDENTIALS",
    });
  });
});

describe("tenant utility access", () => {
  it("blocks user records, secrets, and prototype access", () => {
    expect(() => assertUtilityModel("user")).toThrow(UtilityAccessError);
    expect(() => assertUtilityModel("constructor")).toThrow(UtilityAccessError);
    expect(() => assertUtilityColumn("userPassword")).toThrow(UtilityAccessError);
    expect(() => assertUtilityModel("sale")).not.toThrow();
    expect(() => assertUtilityColumn("saleTotal")).not.toThrow();
  });

  it("strips sensitive fields from a deleted record", () => {
    expect(toPublicRecord({ saleId: "sale-1", userPassword: "hash", saleTotal: 10 })).toEqual({
      saleId: "sale-1",
      saleTotal: 10,
    });
  });
});

describe("serverless database urls", () => {
  it("adds a single connection only when running on Vercel", () => {
    const previous = process.env.VERCEL;
    process.env.VERCEL = "1";
    try {
      const url = serverlessDatabaseUrl("postgresql://user:pass@db.example/app");
      expect(url).toContain("connection_limit=1");
      expect(url).toContain("pool_timeout=10");
    } finally {
      if (previous === undefined) delete process.env.VERCEL;
      else process.env.VERCEL = previous;
    }

    expect(serverlessDatabaseUrl("postgresql://user:pass@db.example/app")).toBeNull();
  });
});

describe("Vercel build migrations", () => {
  it("migrates the shared database when the owner or runtime URL is configured", () => {
    expect(
      shouldMigrateSharedDatabase({ DATABASE_SHARED_MIGRATION_URL: " postgresql://owner " }),
    ).toBe(true);
    expect(
      shouldMigrateSharedDatabase({
        DATABASE_SHARED_URL: "postgresql://runtime@ep-shared-pooler.example/shared",
      }),
    ).toBe(true);
    expect(shouldMigrateSharedDatabase({})).toBe(false);
  });

  it("derives the shared migration URL from the runtime URL when needed", () => {
    const env = ensureSharedMigrationEnv({
      DATABASE_SHARED_URL:
        "postgresql://runtime:secret@ep-shared-pooler.example/shared?sslmode=require",
    });

    expect(new URL(env.DATABASE_SHARED_MIGRATION_URL ?? "").hostname).toBe("ep-shared.example");
    expect(env.DATABASE_SHARED_URL).toContain("ep-shared-pooler.example");
  });

  it("uses Neon's direct host and a longer connect timeout for migrations", () => {
    const url = migrationDatabaseUrl(
      "postgresql://user:secret@ep-dawn-voice-adasrur5-pooler.c-2.us-east-1.aws.neon.tech/db?sslmode=require&pgbouncer=true",
    );
    const parsed = new URL(url ?? "");

    expect(parsed.hostname).toBe("ep-dawn-voice-adasrur5.c-2.us-east-1.aws.neon.tech");
    expect(parsed.searchParams.get("connect_timeout")).toBe("30");
    expect(parsed.searchParams.get("sslmode")).toBe("require");
    expect(parsed.searchParams.has("pgbouncer")).toBe(false);
    expect(parsed.password).toBe("secret");
  });

  it("rewrites only the migration URL for each schema", () => {
    const env = {
      DATABASE_GENERAL_URL: "postgresql://user:secret@ep-general-pooler.example/general",
      DATABASE_SHARED_URL: "postgresql://runtime:secret@ep-shared-pooler.example/shared",
      DATABASE_SHARED_MIGRATION_URL: "postgresql://owner:secret@ep-shared-pooler.example/shared",
    };

    const general = migrationEnvForSchema("prisma/generalDB/schema.prisma", env);
    const shared = migrationEnvForSchema("prisma/sharedDB/schema.prisma", env);

    expect(new URL(general.DATABASE_GENERAL_URL).hostname).toBe("ep-general.example");
    expect(shared.DATABASE_SHARED_URL).toBe(env.DATABASE_SHARED_URL);
    expect(new URL(shared.DATABASE_SHARED_MIGRATION_URL).hostname).toBe("ep-shared.example");
  });

  it("detects shared databases that still need a Prisma baseline", () => {
    expect(isSchemaNotEmptyError("Error: P3005: The database schema is not empty.")).toBe(true);
    expect(isSchemaNotEmptyError("db_schema_not_empty")).toBe(true);
    expect(isSchemaNotEmptyError("Error: P3018: A migration failed to apply")).toBe(false);
  });

  it("lists shared migration folders in order", () => {
    const folders = sharedMigrationFolders();
    expect(folders.length).toBeGreaterThan(0);
    expect(folders).toEqual([...folders].sort());
    expect(folders.at(-1)).toContain("quick_sale");
  });

  it("retries only when the database server cannot be reached", () => {
    expect(isRetryableDatabaseError("Error: P1001: Can't reach database server")).toBe(true);
    expect(
      isRetryableDatabaseError("Error: P1002: The database server was reached but timed out."),
    ).toBe(true);
    expect(isRetryableDatabaseError("Error: P3018: A migration failed to apply")).toBe(false);
  });

  it("pins the migration hostname to IPv4 without storing the database password", async () => {
    const files: Record<string, string> = { "/etc/hosts": "127.0.0.1 localhost\n" };
    const pinned = await preferIpv4DatabaseHost(
      "postgresql://user:secret@ep-dawn-voice-adasrur5.c-2.us-east-1.aws.neon.tech/db",
      {
        resolve4: async () => ["44.198.216.75"],
        readFile: async (filePath: string) => files[filePath],
        writeFile: async (filePath: string, contents: string) => {
          files[filePath] = contents;
        },
        hostsPath: "/etc/hosts",
      },
    );

    expect(pinned).toBe(true);
    expect(files["/etc/hosts"]).toBe(
      "127.0.0.1 localhost\n44.198.216.75 ep-dawn-voice-adasrur5.c-2.us-east-1.aws.neon.tech\n",
    );
    expect(files["/etc/hosts"]).not.toContain("secret");
    expect(
      pinHostnameInHosts(
        files["/etc/hosts"],
        "ep-dawn-voice-adasrur5.c-2.us-east-1.aws.neon.tech",
        "44.198.216.75",
      ),
    ).toBe(files["/etc/hosts"]);
  });
});

describe("auth rate limit", () => {
  it("rejects the request after the configured budget", () => {
    const limit = createRateLimiter({ windowMs: 1000, max: 1 }, () => 1_000);
    const req = { headers: { "x-forwarded-for": "203.0.113.5" } };
    const next = vi.fn();
    const res = { status: vi.fn(() => ({ json: vi.fn() })) };

    limit(req, res, next);
    limit(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(429);
  });
});

describe("production route guards", () => {
  it("requires authentication before sending arbitrary email", async () => {
    const response = await request(app).post("/api/send-email").send({
      to: "person@example.com",
      subject: "hola",
      text: "mensaje",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "No token provided" });
  });

  it("requires authentication before a generic tenant delete", async () => {
    const response = await request(app).delete("/api/utils/delete/user/user-1");
    expect(response.status).toBe(401);
  });

  it("does not run cron work when the secret is missing", async () => {
    const previous = process.env.CRON_SECRET;
    delete process.env.CRON_SECRET;

    const response = await request(app).post("/api/cron/email-campaigns");

    if (previous === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previous;

    expect(response.status).toBe(503);
    expect(response.body).not.toHaveProperty("error");
  });
});

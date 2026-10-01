import { describe, expect, it, vi } from "vitest";
import type { PrismaClient as SharedPrismaClient } from "../src/generated/shared/index.js";
import { createSharedTenantClient } from "../services/database/sharedTenantClient.js";

describe("shared tenant Prisma facade", () => {
  it("sets the RLS context before every model operation", async () => {
    const calls: string[] = [];
    const transaction = {
      $executeRaw: vi.fn(async () => {
        calls.push("context");
        return 1;
      }),
      customer: {
        findMany: vi.fn(async () => {
          calls.push("query");
          return [];
        }),
      },
    };
    const base = {
      customer: { findMany: vi.fn() },
      $transaction: vi.fn(async (callback: (tx: typeof transaction) => Promise<unknown>) =>
        callback(transaction),
      ),
    } as unknown as SharedPrismaClient;

    const tenant = createSharedTenantClient(base, "business-a");
    await tenant.customer.findMany();

    expect(calls).toEqual(["context", "query"]);
  });

  it("rejects operations without a tenant identifier", () => {
    expect(() => createSharedTenantClient({} as SharedPrismaClient, "   ")).toThrow(
      "businessId is required",
    );
  });
});

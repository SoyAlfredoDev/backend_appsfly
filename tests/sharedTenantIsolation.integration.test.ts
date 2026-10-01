import crypto from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { PrismaClient as SharedPrismaClient } from "../src/generated/shared/index.js";
import { createSharedTenantClient } from "../services/database/sharedTenantClient.js";

const databaseUrl = process.env.DATABASE_SHARED_URL;
const run = databaseUrl ? describe : describe.skip;
const base = databaseUrl
  ? new SharedPrismaClient({ datasources: { db: { url: databaseUrl } } })
  : null;

run("shared database tenant isolation", () => {
  const suffix = crypto.randomUUID();
  const businessA = `test-a-${suffix}`;
  const businessB = `test-b-${suffix}`;
  const sharedUserId = `user-${suffix}`;

  afterAll(async () => {
    if (!base) return;
    for (const businessId of [businessA, businessB]) {
      const tenant = createSharedTenantClient(base, businessId);
      await tenant.customer.deleteMany();
      await tenant.user.deleteMany();
    }
    await base.$disconnect();
  }, 30_000);

  it("allows equal user IDs in different tenants and never returns cross-tenant rows", async () => {
    if (!base) throw new Error("DATABASE_SHARED_URL is required");
    const tenantA = createSharedTenantClient(base, businessA);
    const tenantB = createSharedTenantClient(base, businessB);

    const userPayload = {
      userId: sharedUserId,
      userFirstName: "Isolation",
      userLastName: "Test",
      userEmail: `isolation-${suffix}@example.com`,
      userRole: "ADMIN" as const,
    };
    await tenantA.user.create({ data: userPayload });
    await tenantB.user.create({ data: userPayload });

    await tenantA.customer.create({
      data: {
        customerFirstName: "Tenant A",
        customerLastName: "Only",
        createdByUserId: sharedUserId,
      },
    });
    await tenantB.customer.create({
      data: {
        customerFirstName: "Tenant B",
        customerLastName: "Only",
        createdByUserId: sharedUserId,
      },
    });

    const [rowsA, rowsB, rowsWithoutContext] = await Promise.all([
      tenantA.customer.findMany(),
      tenantB.customer.findMany(),
      base.customer.findMany(),
    ]);

    expect(rowsA.map((row) => row.customerFirstName)).toEqual(["Tenant A"]);
    expect(rowsB.map((row) => row.customerFirstName)).toEqual(["Tenant B"]);
    expect(rowsWithoutContext).toEqual([]);
  }, 30_000);
});

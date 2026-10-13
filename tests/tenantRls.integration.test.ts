import crypto from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PrismaClient } from "../src/generated/shared/index.js";
import { createSharedTenantClient } from "../services/database/sharedTenantClient.js";
import { verifySharedRuntimeSecurity } from "../services/database/sharedRuntimeSecurity.js";

const url = process.env.TEST_SHARED_DATABASE_URL;
const run = url && process.env.TEST_ISOLATED_DATABASE === "true" ? describe : describe.skip;
run("real PostgreSQL two-tenant isolation", () => {
  const base = new PrismaClient({
    datasources: { db: { url: url ?? "postgresql://test:test@127.0.0.1:5432/isolated" } },
  });
  const suffix = crypto.randomUUID();
  const a = `qa-a-${suffix}`,
    b = `qa-b-${suffix}`,
    userId = `qa-user-${suffix}`;
  const tenantA = createSharedTenantClient(base, a),
    tenantB = createSharedTenantClient(base, b);
  let customerA = "",
    customerB = "";
  let verified = false;
  beforeAll(async () => {
    await verifySharedRuntimeSecurity(base);
    verified = true;
    const user = {
      userId,
      userFirstName: "QA",
      userLastName: "Isolation",
      userEmail: `${suffix}@example.invalid`,
      userRole: "ADMIN" as const,
    };
    await tenantA.user.create({ data: user });
    await tenantB.user.create({ data: user });
    customerA = (
      await tenantA.customer.create({
        data: { customerFirstName: "A", customerLastName: "Only", createdByUserId: userId },
      })
    ).customerId;
    customerB = (
      await tenantB.customer.create({
        data: { customerFirstName: "B", customerLastName: "Only", createdByUserId: userId },
      })
    ).customerId;
  }, 60000);
  afterAll(async () => {
    try {
      if (verified)
        for (const id of [a, b]) {
          const tenant = createSharedTenantClient(base, id);
          await tenant.customer.deleteMany({ where: { businessId: id } });
          await tenant.user.deleteMany({ where: { businessId: id } });
        }
    } finally {
      await base.$disconnect();
    }
  }, 30000);
  it("isolates concurrent reads, counts and direct IDs", async () => {
    await Promise.all(
      Array.from({ length: 8 }, async (_, index) => {
        const tenant = index % 2 ? tenantA : tenantB,
          id = index % 2 ? a : b;
        const rows = await tenant.customer.findMany();
        expect(rows).toHaveLength(1);
        expect(rows[0].businessId).toBe(id);
        expect(await tenant.customer.count()).toBe(1);
      }),
    );
    expect(await tenantA.customer.findUnique({ where: { customerId: customerB } })).toBeNull();
    expect(await tenantB.customer.findUnique({ where: { customerId: customerA } })).toBeNull();
    expect(await base.customer.findMany()).toEqual([]);
  }, 60000);
  it("blocks cross-tenant updates, deletes, explicit tenant injection and reassignment", async () => {
    expect(
      await tenantA.customer.updateMany({
        where: { customerId: customerB },
        data: { customerFirstName: "attack" },
      }),
    ).toEqual({ count: 0 });
    expect(await tenantA.customer.deleteMany({ where: { customerId: customerB } })).toEqual({
      count: 0,
    });
    await expect(
      tenantA.customer.create({
        data: {
          businessId: b,
          customerFirstName: "attack",
          customerLastName: "QA",
          createdByUserId: userId,
        },
      }),
    ).rejects.toThrow();
    await expect(
      tenantA.customer.update({ where: { customerId: customerA }, data: { businessId: b } }),
    ).rejects.toThrow();
    expect(
      (await tenantB.customer.findUnique({ where: { customerId: customerB } }))?.customerFirstName,
    ).toBe("B");
  }, 30000);
  it("rejects a foreign-key reference that exists only in another tenant", async () => {
    const onlyB = `only-b-${suffix}`;
    await tenantB.user.create({
      data: {
        userId: onlyB,
        userFirstName: "QA",
        userLastName: "B",
        userEmail: `b-${suffix}@example.invalid`,
        userRole: "ADMIN",
      },
    });
    await expect(
      tenantA.customer.create({
        data: { customerFirstName: "attack", customerLastName: "QA", createdByUserId: onlyB },
      }),
    ).rejects.toThrow();
  });
  it("keeps context in transactions and rolls back on failure", async () => {
    await expect(
      tenantA.$transaction(async (tx) => {
        await tx.customer.update({
          where: { customerId: customerA },
          data: { customerFirstName: "rollback" },
        });
        expect(await tx.customer.findUnique({ where: { customerId: customerB } })).toBeNull();
        throw new Error("rollback QA");
      }),
    ).rejects.toThrow("rollback QA");
    expect(
      (await tenantA.customer.findUnique({ where: { customerId: customerA } }))?.customerFirstName,
    ).toBe("A");
    expect(await base.customer.count()).toBe(0);
  });
  it("applies RLS to raw SQL and denies writes without context", async () => {
    const rows = await tenantA.$queryRaw<
      Array<{ businessId: string }>
    >`SELECT "businessId" FROM "Customer"`;
    expect(rows.map((row) => row.businessId)).toEqual([a]);
    await expect(
      base.customer.create({
        data: {
          businessId: a,
          customerFirstName: "attack",
          customerLastName: "QA",
          createdByUserId: userId,
        },
      }),
    ).rejects.toThrow();
  });
});

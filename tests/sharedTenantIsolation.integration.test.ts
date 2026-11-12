import crypto from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { PrismaClient as SharedPrismaClient } from "../src/generated/shared/index.js";
import { createSharedTenantClient } from "../services/database/sharedTenantClient.js";
import { createProduct } from "../services/productsService.js";
import { resolveCode } from "../services/scanCodesService.js";

const databaseUrl =
  process.env.TEST_ISOLATED_DATABASE === "true" ? process.env.TEST_SHARED_DATABASE_URL : undefined;
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
      await tenant.scanCode.deleteMany({ where: { businessId } });
      await tenant.product.deleteMany({ where: { businessId } });
      await tenant.category.deleteMany({ where: { businessId } });
      await tenant.customer.deleteMany({ where: { businessId } });
      await tenant.user.deleteMany({ where: { businessId } });
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

    const sku = `qa-sku-${suffix}`;
    const barcode = `qa-barcode-${suffix}`;
    const products = await Promise.all(
      [tenantA, tenantB].map(async (tenant, index) => {
        const category = await tenant.category.create({
          data: { categoryName: "General", allowedFor: "BOTH", createdByUserId: sharedUserId },
        });
        return createProduct(
          {
            productName: `Product ${index + 1}`,
            productSKU: sku,
            productPrice: 100,
            productStatus: "ACTIVE",
            productUnit: "UNIT",
            categoryId: category.categoryId,
            createdByUserId: sharedUserId,
            initialStock: 4,
            codes: [{ codeType: "BARCODE", codeValue: barcode }],
          },
          tenant,
        );
      }),
    );
    expect(products.map((product) => product.productStock.quantityOnHand)).toEqual([4, 4]);
    for (const [index, tenant] of [tenantA, tenantB].entries()) {
      expect((await resolveCode(sku, tenant))?.product.productId).toBe(products[index].productId);
      expect((await resolveCode(barcode, tenant))?.product.productId).toBe(
        products[index].productId,
      );
    }
  }, 30_000);
});

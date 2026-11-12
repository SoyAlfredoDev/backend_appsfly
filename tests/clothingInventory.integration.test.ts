import { randomUUID } from "node:crypto";
import express from "express";
import request from "supertest";
import { afterAll, describe, expect, it, vi } from "vitest";
import { createProductVariantsController } from "../controllers/product.controller.js";
import {
  disconnectSharedTenantClient,
  getSharedTenantClient,
} from "../services/database/sharedTenantClient.js";
import { resolveCode } from "../services/scanCodesService.js";
import { getInventoryStockList } from "../services/inventory/inventoryStockService.js";
import { listClothingReceivables } from "../services/sales/clothingReceivables.js";
import {
  addGeneralSalePayment,
  createGeneralSale,
  parseGeneralSale,
} from "../services/sales/generalSales.js";
import type { PrismaClient } from "../src/generated/business/index.js";

const url =
  process.env.TEST_ISOLATED_DATABASE === "true" ? process.env.TEST_SHARED_DATABASE_URL : undefined;

describe.skipIf(!url)("ropa en PostgreSQL compartido", () => {
  const businessId = `clothing-test-${randomUUID()}`;
  const userId = randomUUID();
  let tenant: Awaited<ReturnType<typeof getSharedTenantClient>> | undefined;

  afterAll(async () => {
    if (tenant) {
      const where = { businessId };
      await tenant.inventoryMovement.deleteMany({ where });
      await tenant.transactions.deleteMany({ where });
      await tenant.payment.deleteMany({ where });
      await tenant.saleDetail.deleteMany({ where });
      await tenant.sale.deleteMany({ where });
      await tenant.scanCode.deleteMany({ where });
      await tenant.product.deleteMany({ where });
      await tenant.category.deleteMany({ where });
      await tenant.customer.deleteMany({ where });
      await tenant.user.deleteMany({ where });
    }
    await disconnectSharedTenantClient();
    vi.unstubAllEnvs();
  }, 30_000);

  it("crea dos SKU, vende la talla exacta y cobra ventas nuevas y anteriores", async () => {
    vi.stubEnv("DATABASE_SHARED_URL", url);
    tenant = await getSharedTenantClient(businessId);
    // La fachada compartida expone los mismos campos operativos bajo el contexto RLS.
    const prisma = tenant as unknown as PrismaClient;
    await tenant.user.create({
      data: {
        userId,
        userFirstName: "QA",
        userLastName: "Ropa",
        userEmail: `${userId}@example.invalid`,
        userRole: "ADMIN",
      },
    });
    const { categoryId } = await tenant.category.create({
      data: { categoryName: "Ropa", allowedFor: "PRODUCTS", createdByUserId: userId },
    });
    const { customerId } = await tenant.customer.create({
      data: { customerFirstName: "Ana", customerLastName: "Pérez", createdByUserId: userId },
    });
    const app = express();
    app.use(express.json());
    app.post(
      "/products/variants/bulk",
      (req, _res, next) => {
        Object.assign(req, {
          prisma: tenant,
          tenantBusinessType: "clothing_store",
          user: { payload: { id: userId } },
        });
        next();
      },
      createProductVariantsController,
    );
    const sku = `POL-${userId.slice(0, 8)}`;
    const payload = {
      parent: { name: "Polera", sku, categoryId, price: 12000 },
      variants: [
        { sku: `${sku}-M`, options: { talla: "M", color: "Negro" }, initialStock: 2 },
        { sku: `${sku}-L`, options: { talla: "L", color: "Negro" }, initialStock: 3 },
      ],
    };
    const response = await request(app).post("/products/variants/bulk").send(payload);
    expect(response.status).toBe(201);
    expect(response.body.createdCount).toBe(2);
    const medium = response.body.variants.find((item: { productSKU: string }) =>
      item.productSKU.endsWith("-M"),
    );
    expect(medium).toMatchObject({
      variantOptions: { talla: "M", color: "negro" },
      productStock: 2,
    });
    const found = await resolveCode(`${sku}-M`, tenant);
    expect(found?.product?.productId).toBe(medium.productId);
    const retried = await request(app).post("/products/variants/bulk").send(payload);
    expect(retried.body).toMatchObject({ createdCount: 0, skippedCount: 2 });

    const saleId = randomUUID();
    const input = parseGeneralSale({
      saleId,
      customerId,
      documentType: "RECEIPT",
      lines: [
        {
          detailId: randomUUID(),
          itemId: medium.productId,
          type: "PRODUCT",
          quantity: 2,
          price: 12000,
        },
      ],
      payments: [{ paymentId: randomUUID(), paymentMethod: "2", paymentAmount: 10000 }],
    });
    const sell = (saleInput: typeof input) =>
      createGeneralSale({
        prisma,
        userId,
        input: saleInput,
        allowCredit: true,
        controlDelivery: false,
      });
    expect((await sell(input)).sale.salePendingAmount).toBe(14000);
    const stock = await getInventoryStockList(prisma, { clothing: true });
    expect(
      stock.find((row: { productSKU: string }) => row.productSKU === `${sku}-M`),
    ).toMatchObject({
      quantityOnHand: 0,
      modelName: "polera",
      variantOptions: { talla: "M", color: "negro" },
    });
    expect(
      stock.find((row: { productSKU: string }) => row.productSKU === `${sku}-L`),
    ).toMatchObject({ quantityOnHand: 3 });
    await expect(
      sell({
        ...input,
        saleId: randomUUID(),
        lines: input.lines.map((line) => ({ ...line, detailId: randomUUID(), quantity: 1 })),
        payments: [],
      }),
    ).rejects.toMatchObject({ code: "INSUFFICIENT_STOCK" });

    const legacyId = randomUUID();
    await tenant.sale.create({
      data: {
        saleId: legacyId,
        saleNumber: "anterior",
        saleCustomerId: customerId,
        saleTotal: 10000,
        saleTotalPayments: 0,
        salePendingAmount: 10000,
        createdByUserId: userId,
        createdAt: new Date("2025-01-02T12:00:00Z"),
      },
    });
    await tenant.saleDetail.create({
      data: {
        saleDetailId: randomUUID(),
        saleId: legacyId,
        saleCustomerId: customerId,
        saleDetailQuantity: 1,
        saleDetailPrice: 10000,
        saleDetailTotal: 10000,
        saleDetailType: "PRODUCT",
        createdByUserId: userId,
      },
    });
    await tenant.payment.create({
      data: {
        paymentId: randomUUID(),
        saleId: legacyId,
        paymentAmount: 6000,
        paymentMethod: "2",
        createdByUserId: userId,
      },
    });
    const pending = await listClothingReceivables(prisma, 1, "Ana Pérez");
    expect(pending.totalPending).toBe(18000);
    expect(pending.rows[0]).toMatchObject({ saleId: legacyId, salePendingAmount: 4000 });
    expect(new Date(pending.rows[0].createdAt).toISOString()).toBe("2025-01-02T12:00:00.000Z");
    await expect(
      addGeneralSalePayment(
        prisma,
        userId,
        legacyId,
        {
          paymentId: randomUUID(),
          paymentAmount: 4001,
          paymentMethod: "2",
        },
        true,
      ),
    ).rejects.toMatchObject({ code: "PAYMENT_EXCEEDS_BALANCE" });
    for (const [id, amount] of [
      [legacyId, 4000],
      [saleId, 14000],
    ] as const) {
      await addGeneralSalePayment(
        prisma,
        userId,
        id,
        {
          paymentId: randomUUID(),
          paymentAmount: amount,
          paymentMethod: "2",
        },
        true,
      );
    }
    expect((await listClothingReceivables(prisma, 1, "")).rows).toEqual([]);
  }, 30_000);
});

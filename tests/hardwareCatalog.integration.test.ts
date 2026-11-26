import { randomUUID } from "node:crypto";
import express from "express";
import request from "supertest";
import { afterAll, describe, expect, it, vi } from "vitest";
import {
  createCategoryAttributeController,
  createCategoryController,
  updateCategoryAttributeController,
  updateCategoryController,
} from "../controllers/categories.controller.js";
import {
  createProductController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller.js";
import { seedHardwareCatalog } from "../services/database/hardwareCatalog.js";
import {
  disconnectSharedTenantClient,
  getSharedTenantClient,
} from "../services/database/sharedTenantClient.js";
import {
  addGeneralSalePayment,
  createGeneralSale,
  listGeneralReceivables,
  parseGeneralSale,
} from "../services/sales/generalSales.js";
import type { PrismaClient } from "../src/generated/business/index.js";

const url =
  process.env.TEST_ISOLATED_DATABASE === "true" ? process.env.TEST_SHARED_DATABASE_URL : undefined;

describe.skipIf(!url)("ferretería en PostgreSQL compartido", () => {
  const businessId = `hardware-test-${randomUUID()}`;
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

  it("configura un producto, conserva sus atributos, vende existencias y cobra el saldo", async () => {
    vi.stubEnv("DATABASE_SHARED_URL", url);
    tenant = await getSharedTenantClient(businessId);
    // Los delegados operativos comparten contrato y el cliente aplica RLS.
    const prisma = tenant as unknown as PrismaClient;
    await tenant.user.create({
      data: {
        userId,
        userFirstName: "QA",
        userLastName: "Ferretería",
        userEmail: `${userId}@example.invalid`,
        userRole: "ADMIN",
      },
    });
    await seedHardwareCatalog(prisma, userId);
    const starter = await tenant.category.findMany({ include: { attributes: true } });
    expect(starter).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          categoryName: "Tornillería",
          isSystem: false,
          attributes: expect.arrayContaining([
            expect.objectContaining({ attributeKey: "diametro_mm" }),
          ]),
        }),
        expect.objectContaining({ categoryName: "Repuestos", isSystem: false }),
      ]),
    );

    const app = express();
    app.use(express.json(), (req, _res, next) => {
      Object.assign(req, {
        prisma,
        tenantBusinessId: businessId,
        tenantBusinessType: "hardware_store",
        user: { payload: { id: userId } },
      });
      next();
    });
    app.post("/categories", createCategoryController);
    app.put("/categories/:id", updateCategoryController);
    app.post("/categories/:id/attributes", createCategoryAttributeController);
    app.patch("/categories/:id/attributes/:attributeId", updateCategoryAttributeController);
    app.post("/products", createProductController);
    app.put("/products/:id", updateProductController);
    app.get("/products/:id", getProductByIdController);

    const category = await request(app)
      .post("/categories")
      .send({
        categoryName: "Herramientas",
        allowedFor: "PRODUCTS",
        createdByUserId: userId,
      })
      .expect(200);
    const categoryPath = `/categories/${category.body.categoryId}`;
    await request(app)
      .put(categoryPath)
      .send({ categoryName: "Herramientas manuales" })
      .expect(200);
    const finish = await request(app)
      .post(`${categoryPath}/attributes`)
      .send({
        attributeKey: "acabado",
        attributeLabel: "Acabado",
        dataType: "SELECT",
        optionsJson: '["Mate","Brillante"]',
        isRequired: true,
      })
      .expect(201);
    await request(app)
      .post(`${categoryPath}/attributes`)
      .send({
        attributeKey: "medida_mm",
        attributeLabel: "Medida (mm)",
        dataType: "NUMBER",
      })
      .expect(201);

    const payload = {
      categoryId: category.body.categoryId,
      name: "Llave combinada",
      sku: "LLAVE-1",
      price: 5000,
      unit: "UNIT",
      priceFixed: true,
      initialStock: 4,
    };
    const invalid = await request(app).post("/products").send(payload).expect(400);
    expect(invalid.body.code).toBe("INVALID_PRODUCT_ATTRIBUTES");
    const created = await request(app)
      .post("/products")
      .send({
        ...payload,
        attributes: { acabado: "Mate", medida_mm: 12.5 },
      })
      .expect(201);
    const { productId } = created.body.product;
    expect(created.body.product).toMatchObject({
      quantityOnHand: 4,
      attributes: { acabado: "Mate", medida_mm: "12.5" },
    });
    await request(app)
      .patch(`${categoryPath}/attributes/${finish.body.categoryAttributeId}`)
      .send({
        attributeLabel: "Terminación",
        optionsJson: '["Brillante"]',
      })
      .expect(200);
    const changed = await request(app)
      .put(`/products/${productId}`)
      .send({
        attributes: { acabado: "Mate", medida_mm: 13.5 },
      })
      .expect(200);
    expect(changed.body.product.attributes).toEqual({ acabado: "Mate", medida_mm: "13.5" });
    await request(app)
      .put(`/products/${productId}`)
      .send({
        attributes: { acabado: "Inválido" },
      })
      .expect(400);
    const details = await request(app).get(`/products/${productId}`).expect(200);
    expect(details.body.attributeValues).toContainEqual(
      expect.objectContaining({
        categoryAttribute: expect.objectContaining({ attributeLabel: "Terminación" }),
        value: "Mate",
      }),
    );

    const otherTenant = await getSharedTenantClient(`other-${businessId}`);
    expect(await otherTenant.productAttributeValue.findMany({ where: { productId } })).toEqual([]);
    const { customerId } = await tenant.customer.create({
      data: { customerFirstName: "Ana", customerLastName: "Pérez", createdByUserId: userId },
    });
    const saleId = randomUUID();
    const sale = await createGeneralSale({
      prisma,
      userId,
      allowCredit: true,
      controlDelivery: false,
      input: parseGeneralSale({
        saleId,
        customerId,
        documentType: "RECEIPT",
        lines: [
          { detailId: randomUUID(), itemId: productId, type: "PRODUCT", quantity: 2, price: 5000 },
        ],
        payments: [{ paymentId: randomUUID(), paymentMethod: "2", paymentAmount: 3000 }],
      }),
    });
    expect(sale.sale.salePendingAmount).toBe(7000);
    expect(await tenant.productStock.findFirst({ where: { productId } })).toMatchObject({
      quantityOnHand: 2,
    });
    expect((await listGeneralReceivables(prisma, 1, "Ana Pérez")).totalPending).toBe(7000);
    await addGeneralSalePayment(
      prisma,
      userId,
      saleId,
      {
        paymentId: randomUUID(),
        paymentMethod: "2",
        paymentAmount: 7000,
      },
      true,
    );
    expect((await listGeneralReceivables(prisma, 1, "")).rows).toEqual([]);
  }, 30_000);
});

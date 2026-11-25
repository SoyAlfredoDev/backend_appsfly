import { randomUUID } from "node:crypto";
import express from "express";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createProductController,
  createProductVariantsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller.js";
import { createSharedTenantClient } from "../services/database/sharedTenantClient.js";
import { verifySharedRuntimeSecurity } from "../services/database/sharedRuntimeSecurity.js";
import { PrismaClient as DedicatedClient } from "../src/generated/business/index.js";
import { PrismaClient as SharedClient } from "../src/generated/shared/index.js";

function localTestUrl(value: string | undefined) {
  if (!value || process.env.TEST_ISOLATED_DATABASE !== "true") return undefined;
  try {
    const url = new URL(value);
    return url.hostname === "127.0.0.1" && url.protocol === "postgresql:" ? value : undefined;
  } catch {
    return undefined;
  }
}

const dedicatedUrl = localTestUrl(process.env.TEST_DEDICATED_DATABASE_URL);
const sharedUrl = localTestUrl(process.env.TEST_SHARED_DATABASE_URL);

function fixture(prisma: DedicatedClient, businessId: string) {
  const userId = randomUUID();
  const categoryId = randomUUID();
  const typeId = randomUUID();
  const blueLightId = randomUUID();
  const app = express();
  app.use(express.json(), (req, _res, next) => {
    req.prisma = prisma;
    req.tenantBusinessId = businessId;
    req.tenantBusinessType = "optics";
    req.user = { payload: { id: userId } };
    next();
  });
  app.post("/products", createProductController);
  app.post("/products/variants/bulk", createProductVariantsController);
  app.get("/products/:id", getProductByIdController);
  app.put("/products/:id", updateProductController);
  const http = request(app);

  async function seed() {
    await prisma.user.create({
      data: {
        userId,
        userFirstName: "QA",
        userLastName: "Inventario",
        userEmail: `qa-${userId}@example.invalid`,
        userRole: "ADMIN",
      },
    });
    await prisma.category.create({
      data: {
        categoryId,
        categoryName: "Cristales QA",
        allowedFor: "PRODUCTS",
        createdByUserId: userId,
      },
    });
    await prisma.categoryAttribute.createMany({
      data: [
        {
          categoryAttributeId: typeId,
          categoryId,
          attributeKey: "tipo",
          attributeLabel: "Tipo",
          dataType: "SELECT",
          optionsJson: '["Monofocal","Bifocal"]',
        },
        {
          categoryAttributeId: blueLightId,
          categoryId,
          attributeKey: "blue_light",
          attributeLabel: "Blue Light",
          dataType: "BOOLEAN",
        },
      ],
    });
  }

  async function clean() {
    await prisma.scanCode.deleteMany({ where: { createdByUserId: userId } });
    await prisma.product.deleteMany({ where: { createdByUserId: userId } });
    await prisma.category.deleteMany({ where: { categoryId, createdByUserId: userId } });
    await prisma.user.deleteMany({ where: { userId } });
  }

  const product = (sku = `qa-${randomUUID()}`) => ({
    sku,
    categoryId,
    name: "Cristal de prueba",
    price: 30_000,
    unit: "UNIT",
    priceFixed: false,
    allowZeroStock: true,
    requiresLabWork: false,
    initialStock: 0,
  });

  return { prisma, http, typeId, blueLightId, seed, clean, product };
}

function testProductOperations(getFixture: () => ReturnType<typeof fixture>) {
  it("registra y edita un cristal con tipo óptico, booleano y stock cero", async () => {
    const { prisma, http, typeId, blueLightId, product } = getFixture();
    const payload = product();
    const created = await http
      .post("/products")
      .send({ ...payload, attributes: { tipo: "Monofocal", blue_light: false } })
      .expect(201);
    const productId: string = created.body.product.productId;
    expect(created.body.product).toMatchObject({
      productSKU: payload.sku,
      productPrice: 30_000,
      productAllowZeroStock: true,
      productRequiresLabWork: false,
      productStock: 0,
      attributes: { tipo: "Monofocal", blue_light: "false" },
    });
    await expect(prisma.productStock.findUnique({ where: { productId } })).resolves.toMatchObject({
      quantityOnHand: 0,
    });
    const edited = await http
      .put(`/products/${productId}`)
      .send({ initialStock: 99, attributes: { [typeId]: "Bifocal", [blueLightId]: true } })
      .expect(200);
    expect(edited.body.product).toMatchObject({
      productId,
      productStock: 0,
      attributes: { tipo: "Bifocal", blue_light: "true" },
    });
    expect(await prisma.productAttributeValue.count({ where: { productId } })).toBe(2);

    await http
      .put(`/products/${productId}`)
      .send({ attributes: { tipo: "" } })
      .expect(200);
    const persisted = await http.get(`/products/${productId}`).expect(200);
    expect(persisted.body.attributes).toEqual({ blue_light: "true" });
    expect(persisted.body.quantityOnHand).toBe(0);
  });

  it("permite productos sin atributos y conserva la atomicidad si un código está ocupado", async () => {
    const { prisma, http, product } = getFixture();
    const ordinary = product();
    const barcode = { codeType: "BARCODE", codeValue: `barcode-${randomUUID()}` };
    const response = await http
      .post("/products")
      .send({ ...ordinary, initialStock: 4, allowZeroStock: false, codes: [barcode] })
      .expect(201);
    expect(response.body.product).toMatchObject({
      productStock: 4,
      productAllowZeroStock: false,
      attributes: {},
    });
    await http.post("/products").send(ordinary).expect(409);

    const conflict = product();
    await http
      .post("/products")
      .send({ ...conflict, attributes: { tipo: "Monofocal" }, codes: [barcode] })
      .expect(409);
    expect(await prisma.product.count({ where: { productSKU: conflict.sku } })).toBe(0);
    expect(await prisma.scanCode.count({ where: { codeValue: conflict.sku } })).toBe(0);
    expect(
      await prisma.productStock.count({ where: { product: { productSKU: conflict.sku } } }),
    ).toBe(0);
  });

  it("conserva los atributos y el stock de cada variante de una familia", async () => {
    const { http, product } = getFixture();
    const parent = product();
    const variants = [
      { sku: `${parent.sku}-1`, options: { graduacion: "+1" }, initialStock: 2 },
      { sku: `${parent.sku}-2`, options: { graduacion: "+2" }, initialStock: 0 },
    ];
    const created = await http
      .post("/products/variants/bulk")
      .send({ parent: { ...parent, attributes: { tipo: "Monofocal" } }, variants })
      .expect(201);
    expect(created.body).toMatchObject({ createdCount: 2, skippedCount: 0 });
    const parentId: string = created.body.parent.productId;
    const parentRead = await http.get(`/products/${parentId}`).expect(200);
    expect(parentRead.body.attributes).toEqual({ tipo: "Monofocal" });
    const childIds: { productId: string }[] = created.body.variants;
    expect(childIds).toHaveLength(2);
    const persistedChildren = await Promise.all(
      childIds.map(
        async ({ productId }) => (await http.get(`/products/${productId}`).expect(200)).body,
      ),
    );
    expect(persistedChildren).toEqual(
      expect.arrayContaining(
        variants.map((variant) =>
          expect.objectContaining({
            productSKU: variant.sku,
            productStock: variant.initialStock,
            attributes: { tipo: "Monofocal" },
          }),
        ),
      ),
    );
  });
}

describe.skipIf(!dedicatedUrl)("atributos de productos en PostgreSQL dedicado", () => {
  let db: DedicatedClient;
  let dedicated: ReturnType<typeof fixture>;
  beforeAll(async () => {
    db = new DedicatedClient({ datasourceUrl: dedicatedUrl });
    dedicated = fixture(db, randomUUID());
    await dedicated.seed();
  });
  afterAll(async () => {
    try {
      await dedicated?.clean();
    } finally {
      await db?.$disconnect();
    }
  });
  testProductOperations(() => dedicated);
});

describe.skipIf(!sharedUrl)("atributos de productos en PostgreSQL compartido con RLS", () => {
  let base: SharedClient;
  let first: ReturnType<typeof fixture>;
  let second: ReturnType<typeof fixture>;
  beforeAll(async () => {
    base = new SharedClient({ datasourceUrl: sharedUrl });
    await verifySharedRuntimeSecurity(base);
    const tenant = () => {
      const id = randomUUID();
      // The HTTP middleware assigns a tenant-scoped client to an interface typed as dedicated.
      return fixture(createSharedTenantClient(base, id) as unknown as DedicatedClient, id);
    };
    first = tenant();
    second = tenant();
    await first.seed();
    await second.seed();
  });
  afterAll(async () => {
    try {
      await Promise.all([first?.clean(), second?.clean()]);
    } finally {
      await base?.$disconnect();
    }
  });
  testProductOperations(() => first);

  it("separa operaciones y valores incluso cuando dos negocios usan el mismo SKU", async () => {
    const sku = `qa-shared-${randomUUID()}`;
    const create = (tenant: ReturnType<typeof fixture>, tipo: string) =>
      tenant.http
        .post("/products")
        .send({ ...tenant.product(sku), attributes: { tipo } })
        .expect(201);
    const [left, right] = await Promise.all([
      create(first, "Monofocal"),
      create(second, "Bifocal"),
    ]);
    const firstId: string = left.body.product.productId;
    const secondId: string = right.body.product.productId;
    expect(firstId).not.toBe(secondId);

    await first.http.get(`/products/${secondId}`).expect(404);
    await first.http
      .put(`/products/${secondId}`)
      .send({ attributes: { tipo: "Monofocal" } })
      .expect(404);
    expect((await second.http.get(`/products/${secondId}`).expect(200)).body.attributes).toEqual({
      tipo: "Bifocal",
    });
    expect((await first.http.get(`/products/${firstId}`).expect(200)).body.attributes).toEqual({
      tipo: "Monofocal",
    });
  });
});

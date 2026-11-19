import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";

const enabled =
  process.env.TEST_INTEGRATION_DB === "true" &&
  [
    process.env.DATABASE_GENERAL_URL,
    process.env.DATABASE_SHARED_URL,
    process.env.DATABASE_URL,
  ].every(
    (value) =>
      value &&
      new URL(value).hostname === "127.0.0.1" &&
      (new URL(value).pathname.startsWith("/af_integration_") ||
        ["/appsfly_isolation", "/appsfly_dedicated_qa", "/appsfly_integration_qa"].includes(
          new URL(value).pathname,
        )),
  );

describe.skipIf(!enabled)("API externa con PostgreSQL local", () => {
  afterAll(async () => {
    const { disconnectTenantClients } = await import("../db.js");
    const { disconnectSharedTenantClient } =
      await import("../services/database/sharedTenantClient.js");
    const { generalPrisma } = await import("../dbGeneral.js");
    await Promise.all([
      disconnectTenantClients(),
      disconnectSharedTenantClient(),
      generalPrisma.$disconnect(),
    ]);
  });

  it.each([
    ["DEDICATED", "general"],
    ["SHARED", "general"],
    ["SHARED", "optics"],
    ["SHARED", "clothing_store"],
    ["SHARED", "hardware_store"],
  ] as const)(
    "registra y concilia reintentos HTTP en %s para %s",
    async (mode, businessType) => {
      const { default: app } = await import("../app.js");
      const { generalPrisma: general } = await import("../dbGeneral.js");
      const { getPrismaForBusinessId } = await import("../db.js");
      const { getTodayBusinessDate } = await import("../libs/businessTimezone.js");
      const businessId = `qa-${randomUUID()}`;
      const userId = randomUUID();
      const userEmail = `${userId}@example.invalid`;
      const planId = `qa-${randomUUID()}`;
      await general.user.create({
        data: {
          userId,
          userEmail,
          userFirstName: "QA",
          userLastName: "API",
          userPassword: "qa",
          userPhoneNumber: "000000000",
          userCodePhoneNumber: "+56",
          userDocumentType: "RUT",
          userDocumentNumber: userId,
        },
      });
      await general.business.create({
        data: {
          businessId,
          businessName: "QA API " + mode,
          businessType,
          businessDocumentType: "RUT",
          businessDocumentNumber: businessId,
          businessEmail: userEmail,
          businessPhoneNumber: "000000000",
          businessCodePhoneNumber: "+56",
          businessCountry: "CL",
          businessEntity: "COMPANY",
          businessStatus: "ACTIVE",
          businessDatabaseStatus: "ACTIVE",
          businessDatabaseMode: mode,
          businessAllowCreditSales: true,
          businessConnectionDB: mode === "DEDICATED" ? process.env.DATABASE_URL : null,
        },
      });
      await general.userBusiness.create({
        data: {
          userBusinessUserId: userId,
          userBusinessBusinessId: businessId,
          userBusinessRole: "ADMIN",
        },
      });
      await general.plan.create({
        data: { planId, planName: "QA", planPrice: 0, planDuration: 1, planFeatures: {} },
      });
      await general.subscription.create({
        data: {
          subscriptionId: randomUUID(),
          subscriptionBusinessId: businessId,
          subscriptionPlanId: planId,
          subscriptionStartDate: new Date(),
          subscriptionEndDate: new Date(Date.now() + 86400000),
          subscriptionDuration: 1,
          subscriptionStatus: "ACTIVE",
          subscriptionAmount: 0,
          subscriptionPaymentMethod: "PROMO_FREE_TRIAL",
          subscriptionPlanFeatures: {},
          createdByUserId: userId,
        },
      });
      const tenant = await getPrismaForBusinessId(businessId);
      if (!tenant) throw new Error("Falta la base QA.");
      await tenant.user.create({
        data: { userId, userEmail, userFirstName: "QA", userLastName: "API", userRole: "ADMIN" },
      });
      const category = await tenant.category.create({
        data: { categoryName: "QA", allowedFor: "PRODUCTS", createdByUserId: userId },
      });
      const sku = `sku-${randomUUID()}`;
      const product = await tenant.product.create({
        data: {
          productName: "Cuaderno QA",
          productSKU: sku,
          categoryId: category.categoryId,
          productPrice: 5000,
          productPriceFixed: true,
          productStatus: "ACTIVE",
          productUnit: "UNIT",
          createdByUserId: userId,
        },
      });
      await tenant.productStock.create({
        data: { productId: product.productId, quantityOnHand: 10 },
      });
      const token = jwt.sign({ payload: { id: userId } }, process.env.TOKEN_SECRET!);
      const manage = (path: string, method: "post" | "get" | "delete") =>
        request(app)
          [method](`/api/integration-keys${path}`)
          .set("Authorization", `Bearer ${token}`)
          .set("X-AppsFly-Business-Id", businessId);
      const createdKey = await manage("", "post")
        .send({
          name: "QA con los tres permisos",
          scopes: ["customers:write", "sales:write", "payments:write"],
        })
        .expect(201);
      const keyId: string = createdKey.body.key.id;
      const key: string = createdKey.body.secret;
      const post = (kind: string, body: object, credential = key) =>
        request(app)
          .post(`/api/integrations/v1/${kind}`)
          .set("Authorization", `Bearer ${credential}`)
          .set("X-AppsFly-Business-Id", "id-externo-ignorado")
          .send(body);
      const source = randomUUID();
      const customer = { externalId: `${source}:cliente`, firstName: "Persona QA" };
      const newCustomer = await post("customers", customer).expect(201);
      expect((await post("customers", customer).expect(200)).body.data.id).toBe(
        newCustomer.body.data.id,
      );
      const occurredOn = getTodayBusinessDate("America/Santiago");
      const sale = {
        externalId: `${source}:venta`,
        occurredOn,
        customerExternalId: customer.externalId,
        lines: [{ sku, quantity: 2, unitPrice: 5000 }],
        payments: [
          { externalId: `${source}:inicial`, amount: 2000, method: "transfer", confirmed: true },
        ],
      };
      const limited = await manage("", "post")
        .send({ name: "Solo ventas", scopes: ["sales:write"] })
        .expect(201);
      await post("sales", sale, limited.body.secret).expect(403);
      await post("sales", { ...sale, occurredOn: "2020-01-01" }).expect(409);
      const sales = await Promise.all([post("sales", sale), post("sales", sale)]);
      expect(sales.map(({ status }) => status).sort()).toEqual([200, 201]);
      const saved = sales[0].body.data;
      expect(sales[1].body.data.id).toBe(saved.id);
      expect(saved.balance).toBe(8000);
      await post("sales", { ...sale, comment: "Datos distintos" }).expect(409);
      await post("payments", {
        ...sale.payments[0],
        occurredOn,
        saleExternalId: sale.externalId,
      }).expect(200);

      const payment = {
        externalId: `${source}:abono`,
        saleExternalId: sale.externalId,
        occurredOn,
        amount: 3000,
        method: "transfer",
        confirmed: true,
      };
      const payments = await Promise.all([post("payments", payment), post("payments", payment)]);
      expect(payments.map(({ status }) => status).sort()).toEqual([200, 201]);
      expect(payments[0].body.data.id).toBe(payments[1].body.data.id);
      await post("payments", { ...payment, amount: 1000 }).expect(409);
      const overpaid = await post("payments", {
        ...payment,
        externalId: `${source}:exceso`,
        amount: 6000,
      }).expect(409);
      expect(overpaid.body.code).toBe("PAYMENT_EXCEEDS_BALANCE");

      expect(await tenant.sale.findUnique({ where: { saleId: saved.id } })).toMatchObject({
        saleTotal: 10000,
        saleTotalPayments: 5000,
        salePendingAmount: 5000,
      });
      expect(await tenant.sale.count({ where: { saleCustomerId: newCustomer.body.data.id } })).toBe(
        1,
      );
      expect(await tenant.payment.count({ where: { saleId: saved.id } })).toBe(2);
      expect(
        await tenant.transactions.count({
          where: { transactionRecordId: { in: [payments[0].body.data.id, saved.payments[0].id] } },
        }),
      ).toBe(2);
      expect(
        await tenant.productStock.findUnique({ where: { productId: product.productId } }),
      ).toMatchObject({ quantityOnHand: 8 });
      if (mode === "SHARED") {
        const { getSharedTenantClient } =
          await import("../services/database/sharedTenantClient.js");
        const unrelated = await getSharedTenantClient(`unrelated-${randomUUID()}`);
        expect(
          await unrelated.integrationOperation.count({ where: { externalId: sale.externalId } }),
        ).toBe(0);
      }
      const invalidStock = await post("sales", {
        ...sale,
        externalId: `${source}:sin-stock`,
        payments: [],
        lines: [{ sku, quantity: 99, unitPrice: 5000 }],
      }).expect(409);
      expect(invalidStock.body.code).toBe("INSUFFICIENT_STOCK");

      if (mode === "SHARED") {
        const { createDailyClosureForDate } =
          await import("../services/dailySalesClosureService.js");
        await createDailyClosureForDate({
          dailySalesDay: occurredOn,
          dailySalesId: randomUUID(),
          createdByUserId: userId,
          prisma: tenant,
          timeZone: "America/Santiago",
          countedCash: 0,
        });
        await post("sales", sale).expect(200);
        await post("payments", payment).expect(200);
        const blocked = await post("payments", {
          ...payment,
          externalId: `${source}:cerrado`,
          amount: 1000,
        }).expect(409);
        expect(blocked.body.code).toBe("DAY_CLOSED");
      }
      const listed = await manage("", "get").expect(200);
      expect(listed.body.keys.find((entry: { id: string }) => entry.id === keyId)).toMatchObject({
        lastUsedAt: expect.any(String),
      });
      expect(JSON.stringify(listed.body)).not.toContain(key);
      await manage(`/${keyId}`, "delete").expect(204);
      await post("customers", customer).expect(401);
    },
    45_000,
  );
});

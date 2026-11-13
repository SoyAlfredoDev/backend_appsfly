import { randomUUID } from "node:crypto";
import express from "express";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("../middlewares/auth.middleware.js", () => ({
  authRequired: (_req: express.Request, _res: express.Response, next: express.NextFunction) =>
    next(),
}));
vi.mock("../middlewares/dbSelectorMiddleware.js", () => ({
  dbSelectorMiddleware: (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction,
  ) => next(),
}));

import routes from "../routes/dailySales.routes.js";
import { pendingDailyClosureMiddleware } from "../middlewares/pendingDailyClosureMiddleware.js";
import { PrismaClient } from "../src/generated/business/index.js";
import {
  getSharedTenantClient,
  disconnectSharedTenantClient,
} from "../services/database/sharedTenantClient.js";
import { businessDayBoundsUtc } from "../libs/businessTimezone.js";
import { closureToday } from "../services/financial/dailyClosure.js";

const dedicatedUrl =
  process.env.TEST_ISOLATED_DATABASE === "true" && process.env.TEST_DEDICATED_DATABASE_URL;
const sharedUrl =
  process.env.TEST_ISOLATED_DATABASE === "true" && process.env.TEST_SHARED_DATABASE_URL;
const timeZone = "America/Santiago";
const historicalDay = "2025-09-07";

describe.each(["dedicated", "shared"] as const)("cierres con PostgreSQL %s", (mode) => {
  const url = mode === "dedicated" ? dedicatedUrl : sharedUrl;
  describe.skipIf(!url)("rutas de caja", () => {
    const userId = randomUUID();
    let prisma: PrismaClient;
    let customerId: string;
    const today = closureToday(timeZone);
    const app = express();
    app.use(
      express.json(),
      (req, _res, next) => {
        Object.assign(req, {
          prisma,
          businessTimezone: timeZone,
          tenantRole: req.header("x-qa-role") ?? "ADMIN",
          user: { payload: { id: userId } },
        });
        next();
      },
      routes,
    );
    app.post("/protected-write", pendingDailyClosureMiddleware, (_req, res) => res.sendStatus(204));

    beforeAll(async () => {
      if (mode === "shared") {
        vi.stubEnv("DATABASE_SHARED_URL", url || undefined);
        prisma = (await getSharedTenantClient(randomUUID())) as unknown as PrismaClient;
      } else {
        prisma = new PrismaClient({ datasourceUrl: url || undefined });
      }
      await prisma.user.create({
        data: {
          userId,
          userFirstName: "Caja",
          userLastName: "QA",
          userEmail: `${userId}@example.invalid`,
          userRole: "ADMIN",
        },
      });
      ({ customerId } = await prisma.customer.create({
        data: { customerFirstName: "Ana", customerLastName: "QA", createdByUserId: userId },
      }));
    });

    afterAll(async () => {
      if (prisma) {
        const where = { createdByUserId: userId };
        await prisma.dailySales.deleteMany({ where });
        await prisma.transactions.deleteMany({ where });
        await prisma.payment.deleteMany({ where });
        await prisma.saleDetail.deleteMany({ where });
        await prisma.sale.deleteMany({ where });
        await prisma.customer.deleteMany({ where });
        await prisma.user.deleteMany({ where: { userId } });
      }
      if (mode === "dedicated") await prisma?.$disconnect();
      else await disconnectSharedTenantClient();
      vi.unstubAllEnvs();
    });

    async function sale(createdAt: Date, total: number, detailDate = createdAt) {
      const saleId = randomUUID();
      await prisma.sale.create({
        data: {
          saleId,
          saleCustomerId: customerId,
          createdAt,
          saleTotal: total,
          saleTotalPayments: 0,
          salePendingAmount: total,
          createdByUserId: userId,
        },
      });
      await prisma.saleDetail.create({
        data: {
          saleDetailId: randomUUID(),
          saleId,
          saleCustomerId: customerId,
          createdAt: detailDate,
          saleDetailTotal: total,
          saleDetailPrice: total,
          saleDetailQuantity: 1,
          saleDetailType: "SERVICE",
          createdByUserId: userId,
        },
      });
      return saleId;
    }

    it("guarda un solo cierre por día y desbloquea operaciones hasta el cierre de hoy", async () => {
      const { start, endExclusive } = businessDayBoundsUtc(historicalDay, timeZone);
      const priorDay = "2025-09-06";
      const previousSale = await sale(new Date(start.getTime() - 1), 45000);
      const nextDay = "2025-09-08";
      await prisma.dailySales.create({
        data: {
          dailySalesId: randomUUID(),
          dailySalesDay: `${nextDay}T03:00:00.000Z`,
          createdByUserId: userId,
        },
      });
      await sale(start, 170000, new Date(endExclusive.getTime() + 10_000));
      await sale(endExclusive, 99000);
      await prisma.payment.createMany({
        data: [
          {
            paymentId: randomUUID(),
            saleId: previousSale,
            paymentMethod: "2",
            paymentAmount: 22000,
            createdAt: start,
            createdByUserId: userId,
          },
          {
            paymentId: randomUUID(),
            saleId: previousSale,
            paymentMethod: "0",
            paymentAmount: 12000,
            createdAt: start,
            createdByUserId: userId,
          },
          {
            paymentId: randomUUID(),
            saleId: previousSale,
            paymentMethod: "2",
            paymentAmount: 500,
            createdAt: endExclusive,
            createdByUserId: userId,
          },
        ],
      });
      await prisma.transactions.createMany({
        data: [
          {
            transactionMethod: "2",
            transactionNewValue: { amount: 22000, direction: "IN" },
            createdAt: start,
            createdByUserId: userId,
          },
          {
            transactionMethod: "2",
            transactionNewValue: { amount: 900, direction: "OUT" },
            createdAt: start,
            createdByUserId: userId,
          },
          {
            transactionMethod: "2",
            transactionNewValue: 500,
            createdAt: endExclusive,
            createdByUserId: userId,
          },
        ],
      });

      const status = await request(app).get("/dailySales/closure-status").expect(200);
      expect(status.body).toMatchObject({
        blocked: true,
        fechasPendientes: [priorDay, historicalDay],
      });
      expect((await request(app).post("/protected-write").expect(403)).body.code).toBe(
        "BLOQUEO_CIERRE_PENDIENTE",
      );
      await request(app)
        .post("/dailySales")
        .set("x-qa-role", "EMPLOYEE")
        .send({ dailySalesDay: historicalDay })
        .expect(403);
      expect(
        (await request(app).post("/dailySales").send({ dailySalesDay: "2026-02-30" }).expect(400))
          .body.code,
      ).toBe("INVALID_DATE");
      expect(
        (
          await request(app)
            .post("/dailySales")
            .send({ dailySalesDay: historicalDay, countedCash: 3_000_000_000 })
            .expect(400)
        ).body.code,
      ).toBe("CLOSURE_COUNT_INVALID");
      expect(
        (await request(app).post("/dailySales").send({ dailySalesDay: "2025-09-05" }).expect(400))
          .body.code,
      ).toBe("NO_SALES");

      const outcomes = await Promise.all(
        [1, 2].map(() =>
          request(app)
            .post("/dailySales")
            .send({ dailySalesDay: historicalDay, countedCash: 22000 }),
        ),
      );
      expect(outcomes.map(({ status }) => status).sort()).toEqual([201, 400]);
      expect(outcomes.find((r) => r.status === 400)?.body.code).toBe("DUPLICATE_DATE");
      const saved = outcomes.find((r) => r.status === 201)?.body;
      expect(saved).toMatchObject({
        dailySalesNumberOfSales: 1,
        dailySalesTotalSales: 170000,
        dailySalesTotalIncome: 34000,
        dailySalesDetailIncome: { "0": 12000, "2": 22000 },
        dailySalesExpectedCash: 21100,
        dailySalesCountedCash: 22000,
        dailySalesCashDifference: 900,
      });
      const detail = await request(app).get(`/dailySales/${saved.dailySalesId}/detail`).expect(200);
      expect(detail.body.totals).toMatchObject({ sales: 170000, income: 34000 });
      expect(detail.body.payments).toHaveLength(2);
      expect(
        (await request(app).post("/dailySales/close-all-pending").expect(201)).body.closedCount,
      ).toBe(1);
      expect(
        (await request(app).post("/dailySales/close-all-pending").expect(200)).body.closedCount,
      ).toBe(0);
      await request(app).post("/protected-write").expect(204);

      await sale(new Date(), 20000);
      await request(app)
        .post("/dailySales")
        .send({ dailySalesDay: today, countedCash: 0 })
        .expect(201);
      expect((await request(app).post("/protected-write").expect(403)).body.code).toBe(
        "DAY_CLOSED",
      );
      expect((await request(app).get("/dailySales").expect(200)).body).toHaveLength(4);
    });
  });
});

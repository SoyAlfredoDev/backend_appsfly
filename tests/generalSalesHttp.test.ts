import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  credit: vi.fn(),
  workOrder: { findMany: vi.fn() },
  transaction: vi.fn(),
  sale: {
    count: vi.fn(),
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    findMany: vi.fn(),
    aggregate: vi.fn(),
    groupBy: vi.fn(),
  },
  saleDetail: { create: vi.fn() },
  customer: { findUnique: vi.fn() },
  product: { findMany: vi.fn(), findUnique: vi.fn() },
  service: { findMany: vi.fn() },
  productStock: { update: vi.fn() },
  inventoryMovement: { create: vi.fn() },
  payment: { create: vi.fn(), findUnique: vi.fn() },
  transactions: { create: vi.fn(), findFirst: vi.fn() },
}));

vi.mock("../middlewares/auth.middleware.js", () => ({
  authRequired: (_req: express.Request, _res: express.Response, next: express.NextFunction) =>
    next(),
}));
vi.mock("../middlewares/dbSelectorMiddleware.js", () => ({
  dbSelectorMiddleware: (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction,
  ) => {
    const optics = req.headers["x-test-business"] === "optics";
    Object.assign(req, {
      tenantBusinessType: optics ? "optics" : "general",
      tenantBusinessId: optics ? "optics-a" : "general-a",
      user: { payload: { id: "user-a" } },
      prisma: { ...mocks, $transaction: mocks.transaction },
    });
    next();
  },
}));
vi.mock("../middlewares/pendingDailyClosureMiddleware.js", () => ({
  pendingDailyClosureMiddleware: (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction,
  ) => next(),
}));
vi.mock("../services/businessSettingsService.js", () => ({
  isCreditSalesAllowed: mocks.credit,
  isDeliveryControlEnabled: vi.fn(async (businessId: string) => businessId === "optics-a"),
}));
vi.mock("../services/businessService.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../services/businessService.js")>()),
  getBusinessByIdService: (businessId: string) => ({
    businessType: businessId === "optics-a" ? "optics" : "general",
  }),
}));

import paymentsRoutes from "../routes/payments.routes.js";
import salesRoutes from "../routes/sales.routes.js";
import opticsRoutes from "../routes/opticsWorkOrders.routes.js";

const app = express();
app.use(express.json(), paymentsRoutes, salesRoutes, opticsRoutes);

const product = {
  productId: "product-a",
  productName: "Cuaderno",
  productPrice: 12000,
  productPriceFixed: true,
  productStatus: "ACTIVE",
  productAllowZeroStock: false,
  productStock: { quantityOnHand: 4, version: 3 },
};
const sale = { saleId: "sale-a", saleNumber: "a00001", salePendingAmount: 20000 };
const saleInput = {
  saleId: sale.saleId,
  customerId: "customer-a",
  documentType: "RECEIPT",
  lines: [
    { detailId: "line-1", itemId: product.productId, type: "PRODUCT", price: 12000, quantity: 2 },
    { detailId: "line-2", itemId: "service-a", type: "SERVICE", price: 6000, quantity: 1 },
  ],
  payments: [{ paymentId: "payment-a", paymentAmount: 10000, paymentMethod: "2" }],
};

describe("operación de Negocio general", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.credit.mockResolvedValue(true);
    mocks.workOrder.findMany.mockResolvedValue([{ workOrderId: "optics-order" }]);
    mocks.transaction.mockImplementation(async (callback) => callback(mocks));
    mocks.sale.count.mockResolvedValue(0);
    mocks.sale.create.mockImplementation(async ({ data }) => data);
    mocks.customer.findUnique.mockResolvedValue({ customerId: "customer-a", isWalkIn: false });
    mocks.product.findMany.mockResolvedValue([product]);
    mocks.product.findUnique.mockResolvedValue(product);
    mocks.service.findMany.mockResolvedValue([
      { serviceId: "service-a", servicePrice: 6000, servicePriceFixed: true },
    ]);
    mocks.payment.create.mockImplementation(async ({ data }) => data);
  });

  it("registra venta mixta, stock y abono en la misma transacción", async () => {
    const result = await request(app).post("/sales/general").send(saleInput);
    expect(result.status).toBe(201);
    expect(result.body.sale).toMatchObject({
      saleTotal: 30000,
      saleTotalPayments: 10000,
      salePendingAmount: 20000,
    });
    expect(mocks.transaction).toHaveBeenCalledExactlyOnceWith(expect.any(Function), {
      isolationLevel: "Serializable",
      timeout: 30_000,
    });
    expect(mocks.saleDetail.create).toHaveBeenCalledTimes(2);
    expect(mocks.inventoryMovement.create).toHaveBeenCalledExactlyOnceWith({
      data: expect.objectContaining({
        productId: "product-a",
        quantityDelta: -2,
        stockBefore: 4,
        stockAfter: 2,
      }),
    });
    expect(mocks.productStock.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { productId: "product-a", version: 3 },
      }),
    );
    expect(mocks.transactions.create).toHaveBeenCalledExactlyOnceWith({
      data: expect.objectContaining({ transactionRecordId: "payment-a", transactionMethod: "2" }),
    });
  });

  it("rechaza el saldo si el negocio tiene deshabilitado el crédito", async () => {
    mocks.credit.mockResolvedValue(false);
    const result = await request(app).post("/sales/general").send(saleInput);
    expect(result.status).toBe(400);
    expect(result.body.code).toBe("CREDIT_SALES_DISABLED");
    expect(mocks.sale.create).not.toHaveBeenCalled();
  });

  it("propaga el fallo de stock fuera de la transacción sin registrar el abono", async () => {
    mocks.product.findUnique.mockResolvedValue({
      ...product,
      productStock: { quantityOnHand: 1, version: 3 },
    });
    const result = await request(app).post("/sales/general").send(saleInput);
    expect(result.status).toBe(409);
    expect(result.body.code).toBe("INSUFFICIENT_STOCK");
    expect(mocks.payment.create).not.toHaveBeenCalled();
    expect(mocks.inventoryMovement.create).not.toHaveBeenCalled();
  });

  it("acepta un reintento de la venta guardada sin tocar el stock ni duplicar el abono", async () => {
    mocks.sale.findUnique.mockResolvedValue({
      ...sale,
      createdByUserId: "user-a",
      saleCustomerId: "customer-a",
      SaleDetail: [{ saleDetailId: "line-1" }, { saleDetailId: "line-2" }],
    });
    const result = await request(app).post("/sales/general").send(saleInput);
    expect(result.status).toBe(200);
    expect(mocks.sale.create).not.toHaveBeenCalled();
    expect(mocks.payment.create).not.toHaveBeenCalled();
    expect(mocks.productStock.update).not.toHaveBeenCalled();
  });

  it("incluye ventas de meses anteriores y saldo por cliente en la cartera", async () => {
    const createdAt = new Date("2025-01-02T18:00:00Z");
    mocks.sale.findMany.mockResolvedValue([{ ...sale, createdAt, saleCustomerId: "customer-a" }]);
    mocks.sale.aggregate.mockResolvedValue({ _count: 2, _sum: { salePendingAmount: 35000 } });
    mocks.sale.groupBy.mockResolvedValue([
      { saleCustomerId: "customer-a", _sum: { salePendingAmount: 25000 } },
    ]);
    const result = await request(app).get("/sales/receivables");
    expect(result.status).toBe(200);
    expect(mocks.sale.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { salePendingAmount: { gt: 0 } } }),
    );
    expect(result.body).toMatchObject({
      totalPending: 35000,
      rows: [
        {
          createdAt: createdAt.toISOString(),
          salePendingAmount: 20000,
          customerPendingAmount: 25000,
        },
      ],
    });
  });

  it("recalcula el abono con el saldo vigente tras un conflicto entre dos cobros", async () => {
    mocks.transaction.mockRejectedValueOnce(
      Object.assign(new Error("serialization conflict"), { code: "P2034" }),
    );
    mocks.sale.findUnique.mockResolvedValue({ ...sale, salePendingAmount: 5000 });
    const result = await request(app).post("/payments").send({
      saleId: sale.saleId,
      paymentId: "new-payment",
      paymentAmount: 6000,
      paymentMethod: "2",
    });
    expect(result.status).toBe(409);
    expect(result.body.code).toBe("PAYMENT_EXCEEDS_BALANCE");
    expect(mocks.transaction).toHaveBeenCalledTimes(2);
    expect(mocks.payment.create).not.toHaveBeenCalled();
  });

  it("aplica el abono a caja y saldo una vez aunque el usuario lo reintente", async () => {
    const input = {
      saleId: sale.saleId,
      paymentId: "payment-b",
      paymentAmount: 20000,
      paymentMethod: "2",
    };
    mocks.sale.findUnique.mockResolvedValue(sale);
    expect((await request(app).post("/payments").send(input)).status).toBe(201);
    mocks.payment.findUnique.mockResolvedValue({ ...input, createdByUserId: "user-a" });
    expect((await request(app).post("/payments").send(input)).status).toBe(200);
    expect(mocks.sale.update).toHaveBeenCalledExactlyOnceWith({
      where: { saleId: sale.saleId },
      data: { saleTotalPayments: { increment: 20000 }, salePendingAmount: { decrement: 20000 } },
    });
    expect(mocks.transactions.create).toHaveBeenCalledTimes(1);
  });

  it("conserva las rutas de venta, abono y órdenes de trabajo para óptica", async () => {
    const legacy = await request(app).post("/sales").set("X-Test-Business", "optics").send({
      saleId: "optics-sale",
      saleCustomerId: "optics-customer",
      saleTotal: 30000,
      saleTotalPayments: 10000,
      saleDeliveryStatus: "PENDING",
    });
    expect(legacy.status).toBe(201);
    expect(legacy.body.sale.saleDeliveryStatus).toBeNull();
    const payment = await request(app).post("/payments").set("X-Test-Business", "optics").send({
      saleId: "optics-sale",
      paymentId: "optics-payment",
      paymentAmount: 10000,
      paymentMethod: "2",
    });
    expect(payment.status).toBe(201);
    expect(mocks.sale.update).not.toHaveBeenCalled();
    expect((await request(app).get("/work-orders").set("X-Test-Business", "optics")).body).toEqual([
      { workOrderId: "optics-order" },
    ]);
    expect((await request(app).get("/work-orders")).status).toBe(403);
    expect(
      (await request(app).get("/sales/receivables").set("X-Test-Business", "optics")).status,
    ).toBe(403);
  });
});

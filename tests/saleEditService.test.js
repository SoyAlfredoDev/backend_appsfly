import { describe, expect, it, vi } from "vitest";
import { getSaleEditability, updateSaleAsAdmin } from "../services/sales/saleEditService.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const now = new Date("2026-10-12T15:00:00.000Z");
const saleToday = {
  saleId: "sale-1",
  saleNumber: "1001",
  createdAt: new Date("2026-10-12T12:00:00.000Z"),
  SaleDetail: [
    {
      saleDetailId: "detail-1",
      saleDetailType: "PRODUCT",
      saleDetailProductId: "product-1",
      saleDetailQuantity: 2,
      saleDetailPrice: 100,
      saleDetailTotal: 200,
      product: { productId: "product-1", productPriceFixed: false },
    },
  ],
  Payment: [
    {
      paymentId: "payment-1",
      paymentMethod: "2",
      paymentAmount: 200,
      createdAt: new Date("2026-10-12T12:01:00.000Z"),
    },
  ],
};

function transactionFor(sale = saleToday, { closed = false } = {}) {
  const tx = {
    sale: {
      findUnique: vi.fn().mockResolvedValue(structuredClone(sale)),
      update: vi.fn(async ({ data }) => ({ ...sale, ...data })),
    },
    dailySales: {
      findFirst: vi.fn().mockResolvedValue(closed ? { dailySalesId: "closure-1" } : null),
    },
    saleDetail: {
      update: vi.fn(async ({ where, data }) => ({ saleDetailId: where.saleDetailId, ...data })),
    },
    payment: {
      update: vi.fn(async ({ where, data }) => ({
        ...sale.Payment.find((item) => item.paymentId === where.paymentId),
        ...data,
      })),
      create: vi.fn(async ({ data }) => data),
    },
    transactions: {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn(async ({ data }) => data),
      update: vi.fn(),
    },
  };
  return tx;
}

describe("sale edit eligibility", () => {
  it("authorizes only tenant administrators", () => {
    const status = vi.fn(() => ({ json: vi.fn() }));
    const next = vi.fn();
    requireTenantAdmin({ tenantRole: "USER" }, { status }, next);
    expect(status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();

    requireTenantAdmin({ tenantRole: "ADMIN" }, {}, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it("allows sales from today and yesterday, but rejects older dates", () => {
    expect(
      getSaleEditability(
        { createdAt: new Date("2026-10-12T08:00:00Z") },
        { today: "2026-10-12", timeZone: "UTC" },
      ).allowed,
    ).toBe(true);
    expect(
      getSaleEditability(
        { createdAt: new Date("2026-10-11T08:00:00Z") },
        { today: "2026-10-12", timeZone: "UTC" },
      ).allowed,
    ).toBe(true);
    expect(
      getSaleEditability(
        { createdAt: new Date("2026-10-10T23:59:00Z") },
        { today: "2026-10-12", timeZone: "UTC" },
      ),
    ).toMatchObject({ allowed: false, reason: "SALE_TOO_OLD" });
  });

  it("blocks a sale when its business day is closed", () => {
    expect(
      getSaleEditability(
        { createdAt: new Date("2026-10-12T08:00:00Z") },
        { today: "2026-10-12", timeZone: "UTC", isClosed: true },
      ),
    ).toMatchObject({ allowed: false, reason: "DAY_CLOSED" });
  });
});

describe("updateSaleAsAdmin", () => {
  it("rejects a shared sale belonging to another tenant before any write", async () => {
    const foreignSale = { ...structuredClone(saleToday), businessId: "another-tenant" };
    const tx = transactionFor(foreignSale);
    await expect(
      updateSaleAsAdmin({
        saleId: "sale-1",
        userId: "admin-1",
        businessId: "qa-tenant",
        details: [],
        payments: [],
        prisma: { $transaction: (callback) => callback(tx) },
        timeZone: "UTC",
        now,
      }),
    ).rejects.toMatchObject({ statusCode: 404, code: "SALE_NOT_FOUND" });
    expect(tx.payment.update).not.toHaveBeenCalled();
    expect(tx.sale.update).not.toHaveBeenCalled();
  });

  it("scopes shared closures to the actual tenant", async () => {
    const sharedSale = { ...structuredClone(saleToday), businessId: "qa-tenant" };
    const tx = transactionFor(sharedSale);
    await updateSaleAsAdmin({
      saleId: "sale-1",
      userId: "admin-1",
      businessId: "qa-tenant",
      details: [],
      payments: [],
      prisma: { $transaction: (callback) => callback(tx) },
      timeZone: "UTC",
      now,
    });
    expect(tx.dailySales.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: { dailySalesDay: "2026-10-12", businessId: "qa-tenant" } }),
    );
  });
  it("updates a variable product, splits payments, and leaves the balance receivable", async () => {
    const tx = transactionFor();
    const prisma = { $transaction: vi.fn((callback) => callback(tx)) };

    const result = await updateSaleAsAdmin({
      saleId: "sale-1",
      userId: "admin-1",
      details: [{ saleDetailId: "detail-1", saleDetailPrice: 80 }],
      payments: [
        { paymentMethod: "0", paymentAmount: 70 },
        { paymentMethod: "3", paymentAmount: 50 },
      ],
      prisma,
      timeZone: "UTC",
      now,
    });

    expect(tx.saleDetail.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { saleDetailPrice: 80, saleDetailTotal: 160 } }),
    );
    expect(tx.payment.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { paymentMethod: "0", paymentAmount: 70 } }),
    );
    expect(tx.payment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ paymentMethod: "3", paymentAmount: 50 }),
      }),
    );
    expect(tx.transactions.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { createdAt: saleToday.Payment[0].createdAt },
      }),
    );
    expect(result.sale).toMatchObject({
      saleTotal: 160,
      saleTotalPayments: 120,
      salePendingAmount: 40,
    });
    expect(prisma.$transaction).toHaveBeenCalledWith(expect.any(Function), {
      isolationLevel: "Serializable",
    });
  });

  it("rejects changing a product marked as fixed price", async () => {
    const sale = structuredClone(saleToday);
    sale.SaleDetail[0].product.productPriceFixed = true;
    const tx = transactionFor(sale);
    await expect(
      updateSaleAsAdmin({
        saleId: "sale-1",
        userId: "admin-1",
        details: [{ saleDetailId: "detail-1", saleDetailPrice: 80 }],
        payments: [],
        prisma: { $transaction: (callback) => callback(tx) },
        timeZone: "UTC",
        now,
      }),
    ).rejects.toMatchObject({ code: "PRICE_NOT_EDITABLE", statusCode: 400 });
  });

  it("rejects closed and older sales", async () => {
    const closedTx = transactionFor(saleToday, { closed: true });
    await expect(
      updateSaleAsAdmin({
        saleId: "sale-1",
        userId: "admin-1",
        details: [],
        payments: [],
        prisma: { $transaction: (callback) => callback(closedTx) },
        timeZone: "UTC",
        now,
      }),
    ).rejects.toMatchObject({ code: "DAY_CLOSED", statusCode: 409 });

    const oldSale = structuredClone(saleToday);
    oldSale.createdAt = new Date("2026-10-10T12:00:00.000Z");
    const oldTx = transactionFor(oldSale);
    await expect(
      updateSaleAsAdmin({
        saleId: "sale-1",
        userId: "admin-1",
        details: [],
        payments: [],
        prisma: { $transaction: (callback) => callback(oldTx) },
        timeZone: "UTC",
        now,
      }),
    ).rejects.toMatchObject({ code: "SALE_TOO_OLD", statusCode: 409 });
  });

  it("rejects payment totals greater than the updated sale total", async () => {
    const tx = transactionFor();
    await expect(
      updateSaleAsAdmin({
        saleId: "sale-1",
        userId: "admin-1",
        details: [],
        payments: [{ paymentMethod: "2", paymentAmount: 201 }],
        prisma: { $transaction: (callback) => callback(tx) },
        timeZone: "UTC",
        now,
      }),
    ).rejects.toMatchObject({ code: "PAYMENTS_EXCEED_TOTAL", statusCode: 400 });
  });

  it("allows the administrator to leave the full sale balance receivable", async () => {
    const tx = transactionFor();
    const result = await updateSaleAsAdmin({
      saleId: "sale-1",
      userId: "admin-1",
      details: [],
      payments: [],
      prisma: { $transaction: (callback) => callback(tx) },
      timeZone: "UTC",
      now,
    });

    expect(tx.payment.update).toHaveBeenCalledWith({
      where: { paymentId: "payment-1" },
      data: { paymentAmount: 0 },
    });
    expect(result.sale).toMatchObject({
      saleTotal: 200,
      saleTotalPayments: 0,
      salePendingAmount: 200,
    });
  });
});

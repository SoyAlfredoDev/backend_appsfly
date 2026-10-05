import { beforeEach, describe, expect, it, vi } from "vitest";
import { InsufficientStockError } from "../services/inventory/inventoryService.js";
import { TaxBillingError } from "../services/billing/errors.js";
import { QuickSaleError } from "../services/sales/quickSale.js";

const taxAccount = vi.hoisted(() => ({ findUnique: vi.fn() }));
const getBusinessByIdService = vi.hoisted(() => vi.fn());
const isDeliveryControlEnabled = vi.hoisted(() => vi.fn());
const applyInventoryMovement = vi.hoisted(() => vi.fn());
const defineSaleNumber = vi.hoisted(() => vi.fn());
const issueTaxDocumentUseCase = vi.hoisted(() => vi.fn());
const businessHasCapability = vi.hoisted(() => vi.fn());

vi.mock("../dbGeneral.js", () => ({
  generalPrisma: { taxProviderAccount: taxAccount },
}));

vi.mock("../services/businessService.js", () => ({
  getBusinessByIdService,
}));

vi.mock("../services/businessSettingsService.js", () => ({
  isDeliveryControlEnabled,
}));

vi.mock("../services/inventory/inventoryService.js", async () => {
  const actual = await vi.importActual<typeof import("../services/inventory/inventoryService.js")>(
    "../services/inventory/inventoryService.js",
  );
  return { ...actual, applyInventoryMovement };
});

vi.mock("../libs/defineSaleNumber.js", () => ({
  default: defineSaleNumber,
}));

vi.mock("../services/billing/useCases/issueTaxDocumentUseCase.js", () => ({
  issueTaxDocumentUseCase,
}));

vi.mock("../services/billing/planAccessService.js", () => ({
  businessHasCapability,
}));

const { createQuickSale } = await import("../services/quickSaleService.js");

const walkIn = {
  customerId: "walk-in",
  customerFirstName: "consumidor",
  customerLastName: "final",
  isWalkIn: true,
  customerDocumentNumber: null,
  customerEmail: null,
};

const product = {
  productId: "prod-1",
  productName: "Líquido",
  productPrice: 3990,
  productStatus: "ACTIVE",
  productRequiresLabWork: false,
};

function createPrisma() {
  const tx = {
    sale: { create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => data) },
    saleDetail: { create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => data) },
    payment: { create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => data) },
  };
  return {
    tx,
    customer: {
      findFirst: vi.fn().mockResolvedValue(walkIn),
      create: vi.fn(),
      findUnique: vi.fn(),
    },
    sale: { findUnique: vi.fn().mockResolvedValue(null) },
    product: { findMany: vi.fn().mockResolvedValue([product]) },
    $transaction: vi.fn(async (run: (client: typeof tx) => Promise<unknown>) => run(tx)),
  };
}

const body = {
  saleId: "sale-quick-001",
  paymentMethod: "0",
  documentType: "RECEIPT",
  lines: [{ productId: "prod-1", quantity: 2 }],
};

describe("createQuickSale", () => {
  let prisma: ReturnType<typeof createPrisma>;

  beforeEach(() => {
    prisma = createPrisma();
    taxAccount.findUnique.mockReset().mockResolvedValue(null);
    getBusinessByIdService.mockReset().mockResolvedValue({
      businessType: "retail",
      businessQuickSalePaymentMethod: "0",
      businessQuickSaleDocumentType: "RECEIPT",
    });
    isDeliveryControlEnabled.mockReset().mockResolvedValue(false);
    applyInventoryMovement.mockReset().mockResolvedValue(undefined);
    defineSaleNumber.mockReset().mockResolvedValue("a00021");
    issueTaxDocumentUseCase.mockReset();
    businessHasCapability.mockReset().mockResolvedValue(true);
  });

  it("writes the sale, the line, the payment and the stock movement in one transaction", async () => {
    const result = await createQuickSale({
      prisma,
      userId: "user-1",
      businessId: "biz-1",
      body,
    });

    expect(prisma.$transaction).toHaveBeenCalledOnce();
    expect(prisma.tx.sale.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        saleId: "sale-quick-001",
        saleNumber: "a00021",
        saleCustomerId: "walk-in",
        saleTotal: 7980,
        saleTotalPayments: 7980,
        salePendingAmount: 0,
        saleChannel: "QUICK",
        documentType: "RECEIPT",
        saleDeliveryStatus: null,
      }),
    });
    expect(prisma.tx.saleDetail.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        saleDetailProductId: "prod-1",
        saleDetailQuantity: 2,
        saleDetailPrice: 3990,
        saleDetailTotal: 7980,
        saleDetailType: "PRODUCT",
        saleCustomerId: "walk-in",
      }),
    });
    expect(prisma.tx.payment.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        paymentAmount: 7980,
        paymentMethod: "0",
      }),
    });
    expect(applyInventoryMovement).toHaveBeenCalledWith(
      prisma.tx,
      expect.objectContaining({
        productId: "prod-1",
        quantityDelta: -2,
        referenceType: "SALE_DETAIL",
        referenceLabel: "Venta #a00021",
      }),
    );
    expect(result.changeDue).toBe(0);
    expect(result.dte).toBeNull();
    expect(result.sale.saleNumber).toBe("a00021");
  });

  it("stores the sale total as the cash payment and returns the change", async () => {
    const result = await createQuickSale({
      prisma,
      userId: "user-1",
      businessId: "biz-1",
      body: { ...body, paymentMethod: "2", cashTendered: 10000 },
    });

    expect(prisma.tx.payment.create.mock.calls[0]?.[0].data.paymentAmount).toBe(7980);
    expect(result.changeDue).toBe(2020);
  });

  it("creates the walk-in customer when the business does not have one yet", async () => {
    prisma.customer.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    prisma.customer.create.mockResolvedValue(walkIn);

    await createQuickSale({
      prisma,
      userId: "user-1",
      businessId: "biz-1",
      body,
    });

    expect(prisma.customer.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        customerFirstName: "consumidor",
        customerLastName: "final",
        isWalkIn: true,
        createdByUserId: "user-1",
      }),
    });
  });

  it("rejects lab work before opening the transaction", async () => {
    prisma.product.findMany.mockResolvedValue([{ ...product, productRequiresLabWork: true }]);

    await expect(
      createQuickSale({ prisma, userId: "user-1", businessId: "biz-1", body }),
    ).rejects.toMatchObject({ code: "QUICK_SALE_REQUIRES_WORK_ORDER" });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("rejects a duplicate sale id before writing stock", async () => {
    prisma.sale.findUnique.mockResolvedValue({ saleId: "sale-quick-001" });

    await expect(
      createQuickSale({ prisma, userId: "user-1", businessId: "biz-1", body }),
    ).rejects.toBeInstanceOf(QuickSaleError);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("propagates insufficient stock from inside the transaction", async () => {
    applyInventoryMovement.mockRejectedValue(
      new InsufficientStockError('Stock insuficiente para "Líquido"'),
    );

    await expect(
      createQuickSale({ prisma, userId: "user-1", businessId: "biz-1", body }),
    ).rejects.toBeInstanceOf(InsufficientStockError);
  });

  it("refuses an electronic receipt when billing is disabled", async () => {
    await expect(
      createQuickSale({
        prisma,
        userId: "user-1",
        businessId: "biz-1",
        body: { ...body, documentType: "BOLETA" },
      }),
    ).rejects.toMatchObject({ code: "QUICK_SALE_BOLETA_UNAVAILABLE" });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("keeps the sale when the electronic receipt fails after it is stored", async () => {
    taxAccount.findUnique.mockResolvedValue({ isEnabled: true });
    issueTaxDocumentUseCase.mockRejectedValue(
      new TaxBillingError("DTE_REJECTED", "El SII rechazó la boleta."),
    );

    const result = await createQuickSale({
      prisma,
      userId: "user-1",
      businessId: "biz-1",
      body: { ...body, documentType: "BOLETA" },
    });

    expect(prisma.$transaction).toHaveBeenCalledOnce();
    expect(result.dte).toEqual({
      issued: false,
      code: "DTE_REJECTED",
      message: "El SII rechazó la boleta.",
    });
    expect(result.sale.saleNumber).toBe("a00021");
  });

  it("marks a counter sale as delivered when delivery control is on", async () => {
    isDeliveryControlEnabled.mockResolvedValue(true);

    await createQuickSale({
      prisma,
      userId: "user-1",
      businessId: "biz-1",
      body,
    });

    expect(prisma.tx.sale.create.mock.calls[0]?.[0].data).toEqual(
      expect.objectContaining({
        saleDeliveryStatus: "DELIVERED",
        saleDeliveredByUserId: "user-1",
      }),
    );
  });
});

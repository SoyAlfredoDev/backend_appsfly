import { randomUUID } from "node:crypto";
import { generalPrisma } from "../dbGeneral.js";
import defineSaleNumber from "../libs/defineSaleNumber.js";
import { getBusinessByIdService } from "./businessService.js";
import { isDeliveryControlEnabled } from "./businessSettingsService.js";
import { applyInventoryMovement, InsufficientStockError } from "./inventory/inventoryService.js";
import { issueTaxDocumentUseCase } from "./billing/useCases/issueTaxDocumentUseCase.js";
import { businessHasCapability } from "./billing/planAccessService.js";
import { TaxBillingError } from "./billing/errors.js";
import {
  CASH_PAYMENT_METHOD,
  QuickSaleError,
  WALK_IN_FIRST_NAME,
  WALK_IN_LABEL,
  WALK_IN_LAST_NAME,
  parseQuickSaleRequest,
  priceQuickSale,
  readQuickSaleDocumentType,
  readQuickSalePaymentMethod,
} from "./sales/quickSale.js";

export { QuickSaleError };

const PAYMENT_METHOD_LABELS = {
  0: "Tarjeta de débito",
  1: "Tarjeta de crédito",
  2: "Efectivo",
  3: "Transferencia",
};

export function listQuickSalePaymentMethods() {
  return Object.entries(PAYMENT_METHOD_LABELS).map(([id, label]) => ({ id, label }));
}

export async function ensureWalkInCustomer(prisma, userId) {
  const existing = await prisma.customer.findFirst({
    where: { isWalkIn: true },
  });
  if (existing) return existing;

  try {
    return await prisma.customer.create({
      data: {
        customerFirstName: WALK_IN_FIRST_NAME,
        customerLastName: WALK_IN_LAST_NAME,
        isWalkIn: true,
        customerComment: "Cliente de sistema para la caja rápida.",
        createdByUserId: userId,
      },
    });
  } catch (error) {
    const raced = await prisma.customer.findFirst({ where: { isWalkIn: true } });
    if (raced) return raced;
    throw error;
  }
}

async function isBoletaEnabled(businessId) {
  const account = await generalPrisma.taxProviderAccount.findUnique({
    where: { companyId: businessId },
    select: { isEnabled: true },
  });
  return Boolean(account?.isEnabled);
}

function resolveDocumentType(requested, boletaEnabled) {
  if (requested === "BOLETA" && !boletaEnabled) {
    throw new QuickSaleError(
      400,
      "QUICK_SALE_BOLETA_UNAVAILABLE",
      "La boleta electrónica no está habilitada. Usa comprobante interno.",
    );
  }
  return requested;
}

export async function getQuickSaleBootstrap(prisma, userId, businessId) {
  const [business, walkIn, boletaAccountEnabled, boletaOnPlan] = await Promise.all([
    getBusinessByIdService(businessId),
    ensureWalkInCustomer(prisma, userId),
    isBoletaEnabled(businessId),
    businessHasCapability(businessId, "tax_documents"),
  ]);
  const boletaEnabled = boletaAccountEnabled && boletaOnPlan;

  const configuredDocument = readQuickSaleDocumentType(business?.businessQuickSaleDocumentType);
  const documentType =
    configuredDocument === "BOLETA" && !boletaEnabled ? "RECEIPT" : configuredDocument;

  return {
    walkInCustomer: {
      customerId: walkIn.customerId,
      customerFirstName: walkIn.customerFirstName,
      customerLastName: walkIn.customerLastName,
      isWalkIn: true,
      displayName: WALK_IN_LABEL,
    },
    defaultPaymentMethod: readQuickSalePaymentMethod(business?.businessQuickSalePaymentMethod),
    defaultDocumentType: documentType,
    documentAdjusted: configuredDocument === "BOLETA" && documentType === "RECEIPT",
    boletaEnabled,
    paymentMethods: listQuickSalePaymentMethods(),
  };
}

async function resolveCustomer(prisma, requestedCustomerId, walkIn) {
  if (!requestedCustomerId || requestedCustomerId === walkIn.customerId) {
    return walkIn;
  }

  const customer = await prisma.customer.findUnique({
    where: { customerId: requestedCustomerId },
  });
  if (!customer) {
    throw new QuickSaleError(404, "QUICK_SALE_CUSTOMER_NOT_FOUND", "El cliente no existe.");
  }
  return customer;
}

export async function createQuickSale({ prisma, userId, businessId, body }) {
  const request = parseQuickSaleRequest(body);
  const asksForBoleta = request.documentType === "BOLETA";
  const boletaEnabled = asksForBoleta
    ? (await isBoletaEnabled(businessId)) &&
      (await businessHasCapability(businessId, "tax_documents"))
    : false;
  const documentType = resolveDocumentType(request.documentType, boletaEnabled);
  const walkIn = await ensureWalkInCustomer(prisma, userId);
  const customer = await resolveCustomer(prisma, request.customerId, walkIn);

  const existing = await prisma.sale.findUnique({
    where: { saleId: request.saleId },
    select: { saleId: true },
  });
  if (existing) {
    throw new QuickSaleError(409, "QUICK_SALE_DUPLICATE", "Esta venta ya fue registrada.");
  }

  const products = await prisma.product.findMany({
    where: { productId: { in: request.lines.map((line) => line.productId) } },
    select: {
      productId: true,
      productName: true,
      productPrice: true,
      productStatus: true,
      productRequiresLabWork: true,
    },
  });

  const priced = priceQuickSale(
    {
      lines: request.lines,
      paymentMethod: request.paymentMethod,
      cashTendered: request.cashTendered,
    },
    products,
  );

  const business = await getBusinessByIdService(businessId);
  const isOptics = business?.businessType === "optics";
  const deliveryControl = await isDeliveryControlEnabled(businessId);
  const deliverNow = deliveryControl && !isOptics;
  const deliveredAt = deliverNow ? new Date() : null;

  let sale;
  try {
    sale = await prisma.$transaction(async (tx) => {
      const saleNumber = await defineSaleNumber(tx);
      const created = await tx.sale.create({
        data: {
          saleId: request.saleId,
          saleNumber,
          saleCustomerId: customer.customerId,
          createdByUserId: userId,
          saleTotal: priced.total,
          saleTotalPayments: priced.total,
          salePendingAmount: 0,
          documentType,
          saleChannel: "QUICK",
          saleDeliveryStatus: deliverNow ? "DELIVERED" : null,
          saleDeliveredAt: deliveredAt,
          saleDeliveredByUserId: deliverNow ? userId : null,
        },
      });

      for (const line of priced.lines) {
        const saleDetailId = randomUUID();
        await tx.saleDetail.create({
          data: {
            saleDetailId,
            saleId: created.saleId,
            saleDetailProductId: line.productId,
            saleDetailQuantity: line.quantity,
            saleDetailPrice: line.unitPrice,
            saleDetailTotal: line.lineTotal,
            saleDetailType: "PRODUCT",
            createdByUserId: userId,
            saleCustomerId: customer.customerId,
          },
        });
        await applyInventoryMovement(tx, {
          productId: line.productId,
          movementType: "VENTA",
          quantityDelta: -line.quantity,
          referenceType: "SALE_DETAIL",
          referenceId: saleDetailId,
          referenceLabel: `Venta #${saleNumber}`,
          createdByUserId: userId,
        });
      }

      await tx.payment.create({
        data: {
          paymentId: randomUUID(),
          saleId: created.saleId,
          paymentAmount: priced.total,
          paymentMethod: request.paymentMethod,
          createdByUserId: userId,
        },
      });

      return created;
    });
  } catch (error) {
    if (error instanceof InsufficientStockError || error?.code === "INSUFFICIENT_STOCK") {
      throw error;
    }
    if (error instanceof QuickSaleError) throw error;
    if (error?.code === "P2002") {
      throw new QuickSaleError(409, "QUICK_SALE_DUPLICATE", "Esta venta ya fue registrada.");
    }
    throw error;
  }

  let dte = null;
  if (documentType === "BOLETA") {
    const name = `${customer.customerFirstName ?? ""} ${customer.customerLastName ?? ""}`.trim();
    try {
      const issued = await issueTaxDocumentUseCase({
        prisma,
        businessId,
        saleId: sale.saleId,
        documentType: "BOLETA",
        receiver: customer.customerDocumentNumber
          ? {
              rut: customer.customerDocumentNumber,
              name: name || WALK_IN_LABEL,
              email: customer.customerEmail ?? undefined,
            }
          : undefined,
      });
      dte = {
        issued: true,
        folio: issued?.folio ?? null,
      };
    } catch (error) {
      const billing = error instanceof TaxBillingError;
      dte = {
        issued: false,
        code: billing ? error.code : "DTE_FAILED",
        message: error?.message || "La venta se guardó, pero no se pudo emitir la boleta.",
      };
    }
  }

  return {
    message: "Venta registrada",
    sale: {
      saleId: sale.saleId,
      saleNumber: sale.saleNumber,
      saleTotal: sale.saleTotal,
      saleChannel: sale.saleChannel,
      documentType: sale.documentType,
      customerId: sale.saleCustomerId,
      paymentMethod: request.paymentMethod,
    },
    changeDue: request.paymentMethod === CASH_PAYMENT_METHOD ? priced.changeDue : 0,
    dte,
  };
}

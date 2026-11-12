import type { Prisma, PrismaClient } from "../../src/generated/business/index.js";
import defineSaleNumber from "../../libs/defineSaleNumber.js";
import { paginatedResult } from "../../libs/pagination.js";
import { applyInventoryMovement } from "../inventory/inventoryService.js";
import { recordSalePayment } from "../paymentsService.js";
import { QUICK_SALE_PAYMENT_METHODS } from "./quickSale.js";

const MAX_AMOUNT = 2_000_000_000;
const documentTypes = ["RECEIPT", "BOLETA", "FACTURA"] as const;

export class GeneralSaleError extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

function invalid(message: string): never {
  throw new GeneralSaleError(400, "INVALID_SALE_INPUT", message);
}

function readObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    invalid("Los datos de venta no son válidos.");
  }
  return value as Record<string, unknown>;
}

function readId(value: unknown) {
  if (typeof value !== "string" || !value.trim() || value.length > 100) {
    invalid("Falta un identificador válido para registrar la operación.");
  }
  return value.trim();
}

function readNumber(value: unknown, min: number, max: number) {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < min || value > max) {
    invalid("Revisa las cantidades y los montos ingresados.");
  }
  return value;
}

function readText(value: unknown, max: number) {
  if (value == null || value === "") return null;
  if (typeof value !== "string" || value.length > max) invalid("El texto ingresado no es válido.");
  return value.trim() || null;
}

export function parseGeneralPayment(value: unknown) {
  const payment = readObject(value);
  const method = QUICK_SALE_PAYMENT_METHODS.find(
    (candidate) =>
      payment.paymentMethod === candidate || payment.paymentMethod === Number(candidate),
  );
  if (!method) invalid("El medio de pago no es válido.");
  return {
    paymentId: readId(payment.paymentId),
    paymentAmount: readNumber(payment.paymentAmount, 1, MAX_AMOUNT),
    paymentMethod: method,
  };
}

export function parseGeneralSale(value: unknown) {
  const sale = readObject(value);
  if (!Array.isArray(sale.lines) || !sale.lines.length || sale.lines.length > 100) {
    invalid("Agrega entre 1 y 100 líneas de venta.");
  }
  if (!Array.isArray(sale.payments) || sale.payments.length > 100) {
    invalid("La lista de pagos no es válida.");
  }
  const lines = sale.lines.map((value: unknown) => {
    const line = readObject(value);
    const type = line.type;
    if (type !== "PRODUCT" && type !== "SERVICE") invalid("Selecciona un producto o servicio.");
    return {
      itemId: readId(line.itemId),
      detailId: readId(line.detailId),
      type,
      quantity: readNumber(line.quantity, 1, 9999),
      price: readNumber(line.price, 0, MAX_AMOUNT),
    };
  });
  const payments = sale.payments.map(parseGeneralPayment);
  if (
    new Set(lines.map((line) => line.detailId)).size !== lines.length ||
    new Set(payments.map((payment) => payment.paymentId)).size !== payments.length
  ) {
    invalid("La venta contiene líneas o pagos repetidos.");
  }
  const documentType = documentTypes.find((type) => type === sale.documentType);
  if (!documentType) invalid("Selecciona un tipo de comprobante válido.");

  const saleImageUrl = readText(sale.saleImageUrl, 2048);
  if (saleImageUrl && !URL.canParse(saleImageUrl)) invalid("La imagen de venta no es válida.");
  if (saleImageUrl && new URL(saleImageUrl).protocol !== "https:") {
    invalid("La imagen de venta debe usar una dirección segura.");
  }

  return {
    saleId: readId(sale.saleId),
    customerId: readId(sale.customerId),
    saleComment: readText(sale.saleComment, 2000),
    saleImageUrl,
    documentType,
    pendingDelivery: sale.pendingDelivery === true,
    lines,
    payments,
  };
}

export function prismaErrorCode(error: unknown) {
  return error && typeof error === "object" && "code" in error ? error.code : undefined;
}

async function serializable<T>(
  prisma: PrismaClient,
  operation: (tx: Prisma.TransactionClient) => Promise<T>,
): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await prisma.$transaction(operation, {
        isolationLevel: "Serializable",
        timeout: 30_000,
      });
    } catch (error) {
      const code = prismaErrorCode(error);
      if (code === "P2034" || code === "P2025" || code === "P2002") {
        if (attempt < 3) continue;
        throw new GeneralSaleError(
          409,
          "SALE_WRITE_CONFLICT",
          "La operación entró en conflicto con otro registro. Actualiza los datos e inténtalo de nuevo.",
        );
      }
      throw error;
    }
  }
}

export async function createGeneralSale({
  prisma,
  userId,
  input,
  allowCredit,
  controlDelivery,
}: {
  prisma: PrismaClient;
  userId: string;
  input: ReturnType<typeof parseGeneralSale>;
  allowCredit: boolean;
  controlDelivery: boolean;
}) {
  return serializable(prisma, async (tx) => {
    const existing = await tx.sale.findUnique({
      where: { saleId: input.saleId },
      include: { SaleDetail: { select: { saleDetailId: true } } },
    });
    if (existing) {
      const detailIds = new Set(existing.SaleDetail.map((detail) => detail.saleDetailId));
      if (
        existing.createdByUserId !== userId ||
        existing.saleCustomerId !== input.customerId ||
        detailIds.size !== input.lines.length ||
        !input.lines.every((line) => detailIds.has(line.detailId))
      ) {
        throw new GeneralSaleError(
          409,
          "SALE_ALREADY_EXISTS",
          "El identificador de venta ya se usó.",
        );
      }
      return { sale: existing, created: false };
    }

    const [customer, products, services] = await Promise.all([
      tx.customer.findUnique({
        where: { customerId: input.customerId },
        select: { customerId: true, isWalkIn: true },
      }),
      tx.product.findMany({
        where: {
          productId: {
            in: input.lines.filter((line) => line.type === "PRODUCT").map((line) => line.itemId),
          },
          productStatus: "ACTIVE",
          isVariantParent: false,
        },
        select: { productId: true, productPrice: true, productPriceFixed: true },
      }),
      tx.service.findMany({
        where: {
          serviceId: {
            in: input.lines.filter((line) => line.type === "SERVICE").map((line) => line.itemId),
          },
          serviceStatus: "ACTIVE",
        },
        select: { serviceId: true, servicePrice: true, servicePriceFixed: true },
      }),
    ]);
    if (!customer) throw new GeneralSaleError(404, "CUSTOMER_NOT_FOUND", "Cliente no encontrado.");

    const productsById = new Map(products.map((product) => [product.productId, product]));
    const servicesById = new Map(services.map((service) => [service.serviceId, service]));
    const lines = input.lines.map((line) => {
      const product = line.type === "PRODUCT" ? productsById.get(line.itemId) : undefined;
      const service = line.type === "SERVICE" ? servicesById.get(line.itemId) : undefined;
      if (!product && !service) {
        throw new GeneralSaleError(
          409,
          "SALE_ITEM_UNAVAILABLE",
          "Un producto o servicio ya no está disponible.",
        );
      }
      const price = product?.productPriceFixed
        ? product.productPrice
        : service?.servicePriceFixed
          ? service.servicePrice
          : line.price;
      if (price !== line.price) {
        throw new GeneralSaleError(
          409,
          "SALE_PRICE_CHANGED",
          "Un precio cambió. Actualiza la venta antes de guardarla.",
        );
      }
      return { ...line, total: readNumber(line.quantity * price, 0, MAX_AMOUNT) };
    });
    const total = readNumber(
      lines.reduce((sum, line) => sum + line.total, 0),
      0,
      MAX_AMOUNT,
    );
    const paid = readNumber(
      input.payments.reduce((sum, payment) => sum + payment.paymentAmount, 0),
      0,
      total,
    );
    if (paid < total && !allowCredit) {
      throw new GeneralSaleError(
        400,
        "CREDIT_SALES_DISABLED",
        "Este negocio requiere el pago total de la venta.",
      );
    }
    if (paid < total && customer.isWalkIn) {
      throw new GeneralSaleError(
        400,
        "CREDIT_CUSTOMER_REQUIRED",
        "Selecciona un cliente identificado para registrar una venta con saldo pendiente.",
      );
    }

    const sale = await tx.sale.create({
      data: {
        saleId: input.saleId,
        saleNumber: await defineSaleNumber(tx),
        saleCustomerId: customer.customerId,
        createdByUserId: userId,
        saleTotal: total,
        saleTotalPayments: paid,
        salePendingAmount: total - paid,
        saleComment: input.saleComment,
        saleImageUrl: input.saleImageUrl,
        documentType: input.documentType,
        saleDeliveryStatus:
          controlDelivery && input.pendingDelivery && lines.some((line) => line.type === "PRODUCT")
            ? "PENDING"
            : null,
      },
    });
    for (const line of lines) {
      await tx.saleDetail.create({
        data: {
          saleDetailId: line.detailId,
          saleId: sale.saleId,
          saleCustomerId: customer.customerId,
          createdByUserId: userId,
          saleDetailType: line.type,
          saleDetailProductId: line.type === "PRODUCT" ? line.itemId : null,
          saleDetailServiceId: line.type === "SERVICE" ? line.itemId : null,
          saleDetailQuantity: line.quantity,
          saleDetailPrice: line.price,
          saleDetailTotal: line.total,
        },
      });
      if (line.type === "PRODUCT") {
        await applyInventoryMovement(tx, {
          productId: line.itemId,
          movementType: "VENTA",
          quantityDelta: -line.quantity,
          referenceType: "SALE_DETAIL",
          referenceId: line.detailId,
          referenceLabel: `Venta #${sale.saleNumber}`,
          createdByUserId: userId,
        });
      }
    }
    for (const payment of input.payments) {
      await recordSalePayment(
        tx,
        { ...payment, saleId: sale.saleId, createdByUserId: userId },
        sale.saleNumber,
      );
    }
    return { sale, created: true };
  });
}

export async function addGeneralSalePayment(
  prisma: PrismaClient,
  userId: string,
  saleId: string,
  input: ReturnType<typeof parseGeneralPayment>,
  reconcileStoredBalance = false,
) {
  return serializable(prisma, async (tx) => {
    const existing = await tx.payment.findUnique({ where: { paymentId: input.paymentId } });
    if (existing) {
      if (
        existing.saleId !== saleId ||
        existing.paymentAmount !== input.paymentAmount ||
        existing.paymentMethod !== input.paymentMethod ||
        existing.createdByUserId !== userId
      ) {
        throw new GeneralSaleError(
          409,
          "PAYMENT_ALREADY_EXISTS",
          "El identificador de abono ya se usó.",
        );
      }
      return { payment: existing, created: false };
    }
    const sale = await tx.sale.findUnique({ where: { saleId } });
    if (!sale) throw new GeneralSaleError(404, "SALE_NOT_FOUND", "Venta no encontrada.");
    const amounts = reconcileStoredBalance
      ? await readSaleAmounts(tx, saleId)
      : { total: sale.saleTotal, paid: sale.saleTotalPayments, pending: sale.salePendingAmount };
    if (input.paymentAmount > amounts.pending) {
      throw new GeneralSaleError(
        409,
        "PAYMENT_EXCEEDS_BALANCE",
        "El abono supera el saldo pendiente. Revisa el saldo actualizado.",
      );
    }
    const payment = await recordSalePayment(
      tx,
      { ...input, saleId, createdByUserId: userId },
      sale.saleNumber,
    );
    await tx.sale.update({
      where: { saleId },
      data: reconcileStoredBalance
        ? {
            saleTotal: amounts.total,
            saleTotalPayments: amounts.paid + input.paymentAmount,
            salePendingAmount: amounts.pending - input.paymentAmount,
          }
        : {
            saleTotalPayments: { increment: input.paymentAmount },
            salePendingAmount: { decrement: input.paymentAmount },
          },
    });
    return { payment, created: true };
  });
}

async function readSaleAmounts(tx: Prisma.TransactionClient, saleId: string) {
  const [details, payments] = await Promise.all([
    tx.saleDetail.aggregate({ where: { saleId }, _sum: { saleDetailTotal: true } }),
    tx.payment.aggregate({ where: { saleId }, _sum: { paymentAmount: true } }),
  ]);
  const total = details._sum.saleDetailTotal ?? 0;
  const paid = payments._sum.paymentAmount ?? 0;
  return { total, paid, pending: total - paid };
}

export async function listGeneralReceivables(prisma: PrismaClient, page: number, query: string) {
  const limit = 30;
  const where: Prisma.SaleWhereInput = {
    salePendingAmount: { gt: 0 },
    ...(query && {
      AND: query.split(/\s+/).map((term) => ({
        OR: [
          { saleNumber: { contains: term, mode: "insensitive" } },
          { customer: { customerFirstName: { contains: term, mode: "insensitive" } } },
          { customer: { customerLastName: { contains: term, mode: "insensitive" } } },
          { customer: { customerDocumentNumber: { contains: term, mode: "insensitive" } } },
        ],
      })),
    }),
  };
  return prisma.$transaction(
    async (tx) => {
      const [sales, totals] = await Promise.all([
        tx.sale.findMany({
          where,
          orderBy: [{ createdAt: "asc" }, { saleId: "asc" }],
          skip: (page - 1) * limit,
          take: limit,
          select: {
            saleId: true,
            saleNumber: true,
            createdAt: true,
            saleTotal: true,
            saleTotalPayments: true,
            salePendingAmount: true,
            saleCustomerId: true,
            customer: { select: { customerFirstName: true, customerLastName: true } },
          },
        }),
        tx.sale.aggregate({ where, _count: true, _sum: { salePendingAmount: true } }),
      ]);
      const balances = await tx.sale.groupBy({
        by: ["saleCustomerId"],
        where: {
          salePendingAmount: { gt: 0 },
          saleCustomerId: { in: [...new Set(sales.map((sale) => sale.saleCustomerId))] },
        },
        _sum: { salePendingAmount: true },
      });
      const byCustomer = new Map(
        balances.map((balance) => [balance.saleCustomerId, balance._sum.salePendingAmount]),
      );
      const rows = sales.map((sale) => ({
        ...sale,
        customerPendingAmount: byCustomer.get(sale.saleCustomerId) ?? sale.salePendingAmount,
      }));
      return {
        ...paginatedResult(rows, totals._count, page, limit),
        totalPending: totals._sum.salePendingAmount ?? 0,
      };
    },
    { isolationLevel: "RepeatableRead" },
  );
}

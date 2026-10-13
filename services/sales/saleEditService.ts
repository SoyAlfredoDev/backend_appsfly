import { randomUUID } from "node:crypto";
import type { Prisma, PrismaClient, Payment } from "../../src/generated/business/index.js";
import {
  addDaysToDateKey,
  DEFAULT_BUSINESS_TIMEZONE,
  toBusinessDateKey,
} from "../../libs/businessTimezone.js";
import {
  recordFinancialTransaction,
  TRANSACTION_DIRECTIONS,
  TRANSACTION_TYPES,
} from "../financial/financialLedgerService.js";

type EditOptions = { today?: string; timeZone?: string; isClosed?: boolean };
type DetailInput = { saleDetailId?: unknown; saleDetailPrice?: unknown };
type PaymentInput = { paymentMethod?: unknown; paymentAmount?: unknown };
type UpdateInput = {
  saleId: string;
  userId: string;
  businessId?: string;
  details: unknown;
  payments: unknown;
  prisma: PrismaClient;
  timeZone?: string;
  now?: Date;
};

const PAYMENT_METHODS = new Set(["0", "1", "2", "3"]);

function fail(statusCode: number, code: string, message: string): never {
  throw Object.assign(new Error(message), { statusCode, code });
}

function dateKey(value: Date | string, timeZone: string): string {
  const key = toBusinessDateKey(new Date(value), timeZone);
  if (!key) fail(400, "INVALID_SALE_DATE", "La fecha de la venta no es válida.");
  return key;
}

export function getSaleEditability(
  sale: { createdAt: Date | string } | null,
  { today, timeZone = DEFAULT_BUSINESS_TIMEZONE, isClosed = false }: EditOptions = {},
) {
  if (!sale) return { allowed: false, reason: "SALE_NOT_FOUND" };
  const currentDate = today || dateKey(new Date(), timeZone);
  const saleDate = dateKey(sale.createdAt, timeZone);
  const yesterday = addDaysToDateKey(currentDate, -1);

  if (saleDate !== currentDate && saleDate !== yesterday) {
    return { allowed: false, reason: "SALE_TOO_OLD", saleDate };
  }
  if (isClosed) {
    return { allowed: false, reason: "DAY_CLOSED", saleDate };
  }
  return { allowed: true, reason: null, saleDate };
}

export async function getSaleEditabilityById(
  saleId: string,
  prisma: PrismaClient,
  timeZone: string,
  businessId?: string,
) {
  const sale = await prisma.sale.findUnique({
    where: { saleId },
  });
  if (!sale) return getSaleEditability(null);
  assertSaleTenant(sale, businessId);

  const saleDate = dateKey(sale.createdAt, timeZone);
  const closure = await prisma.dailySales.findFirst({
    where: { dailySalesDay: saleDate, ...sharedWhere(sale, businessId) },
    select: { dailySalesId: true },
  });
  return getSaleEditability(sale, { timeZone, isClosed: Boolean(closure) });
}

function assertSaleTenant(sale: object, businessId?: string) {
  if ("businessId" in sale && (!businessId || sale.businessId !== businessId))
    fail(404, "SALE_NOT_FOUND", "Venta no encontrada.");
}

function sharedWhere(sale: object, businessId?: string) {
  return "businessId" in sale ? { businessId } : {};
}

function normalizeChanges(changes: unknown) {
  if (!Array.isArray(changes)) fail(400, "INVALID_SALE_DETAILS", "Revisa los precios enviados.");
  const seen = new Set();
  return (changes as DetailInput[]).map((item) => {
    const saleDetailId = String(item?.saleDetailId || "").trim();
    const price = Number(item?.saleDetailPrice);
    if (!saleDetailId || seen.has(saleDetailId) || !Number.isSafeInteger(price) || price < 0) {
      fail(400, "INVALID_SALE_DETAILS", "Cada precio debe ser un monto entero válido.");
    }
    seen.add(saleDetailId);
    return { saleDetailId, price };
  });
}

function normalizePayments(payments: unknown, total: number) {
  if (!Array.isArray(payments))
    fail(400, "INVALID_PAYMENTS", "Envía la distribución de pagos actualizada.");
  const normalized = (payments as PaymentInput[]).map((payment) => {
    const paymentMethod = String(payment?.paymentMethod ?? "");
    const paymentAmount = Number(payment?.paymentAmount);
    if (
      !PAYMENT_METHODS.has(paymentMethod) ||
      !Number.isSafeInteger(paymentAmount) ||
      paymentAmount <= 0
    ) {
      fail(
        400,
        "INVALID_PAYMENTS",
        "Cada pago requiere un método válido y un monto entero mayor que cero.",
      );
    }
    return { paymentMethod, paymentAmount };
  });
  const paid = normalized.reduce((sum, payment) => sum + payment.paymentAmount, 0);
  if (!Number.isSafeInteger(total) || !Number.isSafeInteger(paid))
    fail(400, "INVALID_SALE_TOTAL", "El total de la venta no es válido.");
  if (paid > total)
    fail(400, "PAYMENTS_EXCEED_TOTAL", "Los pagos no pueden superar el total de la venta.");
  return { normalized, paid };
}

async function syncPaymentLedger(
  tx: Prisma.TransactionClient,
  payment: Payment,
  previousPayment: Payment | undefined,
  saleNumber: string | null,
  userId: string,
) {
  const oldLedger = await tx.transactions.findFirst({
    where: {
      transactionTable: "Payment",
      transactionRecordId: payment.paymentId,
      transactionType: TRANSACTION_TYPES.PAYMENT,
    },
  });
  const nextValue = {
    amount: Math.abs(payment.paymentAmount),
    direction: TRANSACTION_DIRECTIONS.IN,
    currency: "CLP",
  };
  if (oldLedger) {
    await tx.transactions.update({
      where: { transactionId: oldLedger.transactionId },
      data: {
        transactionMethod: payment.paymentMethod,
        transactionOldValue: (oldLedger.transactionNewValue ?? {
          amount: Math.abs(previousPayment?.paymentAmount ?? 0),
          direction: TRANSACTION_DIRECTIONS.IN,
          currency: "CLP",
        }) as Prisma.InputJsonValue,
        transactionNewValue: nextValue,
        transactionDescription: saleNumber
          ? `Pago recibido — Venta #${saleNumber}`
          : "Pago recibido — Venta",
      },
    });
    return;
  }

  if (payment.paymentAmount > 0) {
    const ledger = await recordFinancialTransaction(tx, {
      transactionId: randomUUID(),
      transactionType: TRANSACTION_TYPES.PAYMENT,
      transactionMethod: payment.paymentMethod,
      transactionTable: "Payment",
      transactionRecordId: payment.paymentId,
      amount: payment.paymentAmount,
      direction: TRANSACTION_DIRECTIONS.IN,
      description: saleNumber ? `Pago recibido — Venta #${saleNumber}` : "Pago recibido — Venta",
      createdByUserId: userId,
    });
    // El helper vigente usa la fecha actual. Conservar el día del pago al dividir pagos de ayer.
    if (ledger)
      await tx.transactions.update({
        where: { transactionId: ledger.transactionId },
        data: { createdAt: payment.createdAt },
      });
  }
}

export async function updateSaleAsAdmin({
  saleId,
  userId,
  businessId,
  details,
  payments,
  prisma,
  timeZone = DEFAULT_BUSINESS_TIMEZONE,
  now = new Date(),
}: UpdateInput) {
  const detailChanges = normalizeChanges(details);

  return prisma.$transaction(
    async (tx) => {
      const sale = await tx.sale.findUnique({
        where: { saleId },
        include: {
          SaleDetail: {
            include: { product: { select: { productId: true, productPriceFixed: true } } },
          },
          Payment: { orderBy: { createdAt: "asc" } },
        },
      });
      if (!sale) fail(404, "SALE_NOT_FOUND", "Venta no encontrada.");
      assertSaleTenant(sale, businessId);

      const saleDate = dateKey(sale.createdAt, timeZone);
      const closure = await tx.dailySales.findFirst({
        where: { dailySalesDay: saleDate, ...sharedWhere(sale, businessId) },
        select: { dailySalesId: true },
      });
      const editability = getSaleEditability(sale, {
        timeZone,
        isClosed: Boolean(closure),
        today: dateKey(now, timeZone),
      });
      if (!editability.allowed) {
        if (editability.reason === "DAY_CLOSED")
          fail(
            409,
            "DAY_CLOSED",
            "No se puede modificar una venta de un día con cierre realizado.",
          );
        fail(409, "SALE_TOO_OLD", "Solo se pueden modificar ventas de hoy o de ayer.");
      }

      const detailById = new Map(sale.SaleDetail.map((detail) => [detail.saleDetailId, detail]));
      for (const change of detailChanges) {
        const detail = detailById.get(change.saleDetailId);
        if (!detail)
          fail(400, "SALE_DETAIL_NOT_FOUND", "Uno de los productos no pertenece a esta venta.");
        if (detail.saleDetailPrice === change.price) continue;
        if (
          detail.saleDetailType !== "PRODUCT" ||
          !detail.saleDetailProductId ||
          detail.product?.productPriceFixed !== false
        ) {
          fail(
            400,
            "PRICE_NOT_EDITABLE",
            "El precio solo se puede cambiar en productos configurados con precio variable.",
          );
        }
        await tx.saleDetail.update({
          where: { saleDetailId: detail.saleDetailId },
          data: {
            saleDetailPrice: change.price,
            saleDetailTotal: change.price * detail.saleDetailQuantity,
          },
        });
        detail.saleDetailPrice = change.price;
        detail.saleDetailTotal = change.price * detail.saleDetailQuantity;
      }

      const total = sale.SaleDetail.reduce((sum, detail) => sum + detail.saleDetailTotal, 0);
      const { normalized: nextPayments, paid } = normalizePayments(payments, total);
      const oldPayments = sale.Payment;
      const paymentDate = oldPayments[0]?.createdAt || sale.createdAt;

      for (let index = 0; index < Math.max(oldPayments.length, nextPayments.length); index += 1) {
        const previousPayment = oldPayments[index];
        const next = nextPayments[index];
        const payment = previousPayment
          ? await tx.payment.update({
              where: { paymentId: previousPayment.paymentId },
              data: next
                ? { paymentMethod: next.paymentMethod, paymentAmount: next.paymentAmount }
                : { paymentAmount: 0 },
            })
          : await tx.payment.create({
              data: {
                paymentId: randomUUID(),
                saleId,
                paymentMethod: next.paymentMethod,
                paymentAmount: next.paymentAmount,
                createdByUserId: userId,
                createdAt: paymentDate,
              },
            });
        await syncPaymentLedger(tx, payment, previousPayment, sale.saleNumber, userId);
      }

      const updated = await tx.sale.update({
        where: { saleId },
        data: {
          saleTotal: total,
          saleTotalPayments: paid,
          salePendingAmount: total - paid,
        },
      });
      return {
        sale: {
          ...updated,
          saleTotal: total,
          saleTotalPayments: paid,
          salePendingAmount: total - paid,
        },
        saleDate,
      };
    },
    { isolationLevel: "Serializable" },
  );
}

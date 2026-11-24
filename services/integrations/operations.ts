import { createHash, randomUUID } from "node:crypto";
import type { Prisma, PrismaClient } from "../../src/generated/business/index.js";
import { getTodayBusinessDate } from "../../libs/businessTimezone.js";
import { assertSalesAllowed } from "../pendingDailyClosureService.js";
import {
  addGeneralSalePayment,
  createGeneralSale,
  GeneralSaleError,
  parseGeneralPayment,
  parseGeneralSale,
  serializable,
} from "../sales/generalSales.js";

import { customerWriteOptions, prepareCustomerDocument } from "../customers/customerRut.js";

export class IntegrationError extends GeneralSaleError {}

export function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new IntegrationError(400, "INVALID_INPUT", "Envía un objeto JSON válido.");
  }
  return value as Record<string, unknown>;
}

export function inputText(value: unknown, max: number): string {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max) {
    throw new IntegrationError(400, "INVALID_INPUT", "Falta un texto válido o supera su límite.");
  }
  return value.trim();
}

function optionalText(value: unknown, max: number) {
  return value == null ? null : inputText(value, max);
}

export function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function sortedJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortedJson);
  if (value && typeof value === "object") {
    const fields = object(value);
    return Object.fromEntries(
      Object.keys(fields)
        .sort()
        .map((key) => [key, sortedJson(fields[key])]),
    );
  }
  return value;
}

export const scopes = ["customers:write", "sales:write", "payments:write"] as const;
export type Scope = (typeof scopes)[number];
type Kind = "customers" | "sales" | "payments";

function boundedArray(value: unknown, min: number) {
  if (!Array.isArray(value) || value.length < min || value.length > 100) {
    throw new IntegrationError(400, "INVALID_INPUT", "Revisa la cantidad de líneas o pagos.");
  }
  return value.map(object);
}

function paymentInput(data: Record<string, unknown>) {
  const methods = { debit: "0", credit_card: "1", cash: "2", transfer: "3" };
  const method = Object.entries(methods).find(([name]) => name === data.method)?.[1];
  if (data.confirmed !== true) {
    throw new IntegrationError(422, "PAYMENT_NOT_CONFIRMED", "Registra solo pagos confirmados.");
  }
  return parseGeneralPayment({
    paymentId: randomUUID(),
    paymentAmount: data.amount,
    paymentMethod: method,
  });
}

async function link(tx: Prisma.TransactionClient, kind: Kind, externalId: unknown) {
  const registered = await tx.integrationOperation.findFirst({
    where: { kind, externalId: inputText(externalId, 100) },
  });
  if (!registered) {
    throw new IntegrationError(
      404,
      "EXTERNAL_REFERENCE_NOT_FOUND",
      "La referencia aún no existe en AppsFly.",
    );
  }
  return inputText(object(registered.result).id, 100);
}

async function customer(
  tx: Prisma.TransactionClient,
  data: Record<string, unknown>,
  userId: string,
  businessId: string,
) {
  if (data.appsflyCustomerId !== undefined) {
    const id = inputText(data.appsflyCustomerId, 100);
    const existing = await tx.customer.findFirst({
      where: { customerId: id, isWalkIn: false },
      select: { customerId: true },
    });
    if (!existing) throw new IntegrationError(404, "CUSTOMER_NOT_FOUND", "Cliente no encontrado.");
    return { id: existing.customerId };
  }
  const document = await prepareCustomerDocument(tx, businessId, {
    customerDocumentNumber: optionalText(data.documentNumber, 30),
    customerDocumentType: data.documentNumber ? inputText(data.documentType, 30) : null,
  });
  const saved = await tx.customer.create({
    data: {
      customerFirstName: inputText(data.firstName, 120).toLowerCase(),
      customerLastName: optionalText(data.lastName, 120)?.toLowerCase() ?? "",
      customerEmail: optionalText(data.email, 254)?.toLowerCase(),
      customerPhoneNumber: optionalText(data.phone, 30),
      ...document,
      createdByUserId: userId,
    },
  });
  return { id: saved.customerId };
}

type Context = {
  prisma: PrismaClient;
  keyId: string;
  businessId: string;
  userId: string;
  timezone: string;
  businessType: string;
  allowCredit: boolean;
  controlDelivery: boolean;
};

async function sale(tx: Prisma.TransactionClient, data: Record<string, unknown>, context: Context) {
  const customerId = await link(tx, "customers", data.customerExternalId);
  const rawLines = boundedArray(data.lines, 1);
  const requested = rawLines.map((line) => {
    const type = line.type ?? "PRODUCT";
    if (type !== "PRODUCT" && type !== "SERVICE") {
      throw new IntegrationError(400, "INVALID_LINE_TYPE", "Usa PRODUCT o SERVICE.");
    }
    return { line, type, sku: inputText(line.sku, 100) };
  });
  const [products, services] = await Promise.all([
    tx.product.findMany({
      where: {
        productSKU: {
          in: requested.filter(({ type }) => type === "PRODUCT").map(({ sku }) => sku),
        },
        isVariantParent: false,
        productStatus: "ACTIVE",
      },
      select: { productId: true, productSKU: true, productRequiresLabWork: true },
    }),
    tx.service.findMany({
      where: {
        serviceSKU: {
          in: requested.filter(({ type }) => type === "SERVICE").map(({ sku }) => sku),
        },
        serviceStatus: "ACTIVE",
      },
      select: { serviceId: true, serviceSKU: true },
    }),
  ]);
  const byProductSku = new Map(products.map((product) => [product.productSKU, product]));
  const byServiceSku = new Map(services.map((service) => [service.serviceSKU, service]));
  const lines = requested.map(({ line, sku, type }) => {
    const product = type === "PRODUCT" ? byProductSku.get(sku) : undefined;
    const itemId =
      product?.productId ?? (type === "SERVICE" ? byServiceSku.get(sku)?.serviceId : undefined);
    if (!itemId) {
      throw new IntegrationError(
        409,
        "SKU_NOT_MAPPED",
        "Un SKU no corresponde a un producto, variante o servicio activo.",
      );
    }
    if (context.businessType === "optics" && product?.productRequiresLabWork) {
      throw new IntegrationError(
        409,
        "OPTICAL_WORK_ORDER_REQUIRED",
        "Registra esta venta de laboratorio en el flujo de Óptica.",
      );
    }
    return { type, itemId, detailId: randomUUID(), quantity: line.quantity, price: line.unitPrice };
  });
  const initialPayments = boundedArray(data.payments ?? [], 0);
  const paymentIds = initialPayments.map((item) => inputText(item.externalId, 100));
  if (new Set(paymentIds).size !== paymentIds.length) {
    throw new IntegrationError(
      409,
      "PAYMENT_REFERENCE_CONFLICT",
      "La venta contiene referencias de abono repetidas.",
    );
  }
  if (
    paymentIds.length &&
    (await tx.integrationOperation.findFirst({
      where: { kind: "payments", externalId: { in: paymentIds } },
      select: { id: true },
    }))
  ) {
    throw new IntegrationError(
      409,
      "PAYMENT_REFERENCE_CONFLICT",
      "Un abono de la venta ya se registró.",
    );
  }
  const input = parseGeneralSale({
    saleId: randomUUID(),
    customerId,
    documentType: "RECEIPT",
    saleComment: data.comment,
    pendingDelivery: context.businessType !== "optics" && data.pendingDelivery === true,
    lines,
    payments: initialPayments.map(paymentInput),
  });
  const { sale: saved } = await createGeneralSale({ ...context, input, transaction: tx });
  const payments = [];
  for (const [index, payment] of input.payments.entries()) {
    const externalId = paymentIds[index];
    const { amount, method, confirmed } = initialPayments[index];
    const payload = {
      externalId,
      amount,
      method,
      confirmed,
      occurredOn: data.occurredOn,
      saleExternalId: data.externalId,
    };
    const result = { id: payment.paymentId, saleId: saved.saleId, amount: payment.paymentAmount };
    await saveOperation(tx, "payments", externalId, payload, result, context.keyId);
    payments.push({ externalId, ...result });
  }
  return {
    id: saved.saleId,
    number: saved.saleNumber,
    total: saved.saleTotal,
    paid: saved.saleTotalPayments,
    balance: saved.salePendingAmount,
    payments,
  };
}

async function saveOperation(
  tx: Prisma.TransactionClient,
  kind: Kind,
  externalId: string,
  input: unknown,
  result: Prisma.InputJsonObject,
  keyId: string,
) {
  await tx.integrationOperation.create({
    data: {
      id: randomUUID(),
      kind,
      externalId,
      digest: hash(JSON.stringify(sortedJson(input))),
      result,
      keyId,
    },
  });
}

export async function executeOperation(
  context: Context,
  kind: Kind,
  raw: unknown,
  canRecordInitialPayments: boolean,
) {
  const data = object(raw);
  const externalId = inputText(data.externalId, 100);
  const input = { ...data, externalId };
  if (
    kind === "sales" &&
    Array.isArray(data.payments) &&
    data.payments.length &&
    !canRecordInitialPayments
  ) {
    throw new IntegrationError(403, "SCOPE_REQUIRED", "La llave no permite registrar pagos.");
  }
  const execute = async (tx: Prisma.TransactionClient) => {
    if (kind === "customers") {
      const key = `appsfly:integration-customer:${context.businessId}:${externalId}`;
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${key}, 0::bigint))`;
    }
    const existing = await tx.integrationOperation.findFirst({ where: { kind, externalId } });
    if (existing) {
      if (existing.digest !== hash(JSON.stringify(sortedJson(input)))) {
        throw new IntegrationError(
          409,
          "EXTERNAL_REFERENCE_CONFLICT",
          "La referencia ya está registrada con datos distintos.",
        );
      }
      return { result: existing.result, created: false };
    }

    let result: Prisma.InputJsonObject;
    if (kind === "customers") {
      result = await customer(tx, input, context.userId, context.businessId);
    } else {
      if (data.occurredOn !== getTodayBusinessDate(context.timezone)) {
        throw new IntegrationError(
          409,
          "OPERATION_DAY_MISMATCH",
          "La fecha no coincide con el día operativo. Revisa la operación antes de registrarla.",
        );
      }
      await assertSalesAllowed(tx, context.timezone);
      if (kind === "sales") {
        result = await sale(tx, input, context);
      } else {
        if ((data.appsflySaleId === undefined) === (data.saleExternalId === undefined)) {
          throw new IntegrationError(
            400,
            "INVALID_SALE_REFERENCE",
            "Envía una sola referencia de venta.",
          );
        }
        const saleId =
          data.appsflySaleId === undefined
            ? await link(tx, "sales", data.saleExternalId)
            : inputText(data.appsflySaleId, 100);
        const { payment } = await addGeneralSalePayment(
          context.prisma,
          context.userId,
          saleId,
          paymentInput(input),
          true,
          tx,
        );
        result = { id: payment.paymentId, saleId, amount: payment.paymentAmount };
      }
    }
    await saveOperation(tx, kind, externalId, input, result, context.keyId);
    return { result, created: true };
  };
  return kind === "customers"
    ? context.prisma.$transaction(execute, customerWriteOptions)
    : serializable(context.prisma, execute);
}

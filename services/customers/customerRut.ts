import type { Prisma, PrismaClient } from "../../src/generated/business/index.js";
import { formatRut, isValidRut, normalizeRut } from "../../libs/chileRut.js";

export type RutCustomer = Pick<
  Prisma.CustomerGetPayload<Record<string, never>>,
  | "customerId"
  | "customerFirstName"
  | "customerLastName"
  | "customerDocumentNumber"
  | "customerEmail"
  | "customerCodePhoneNumber"
  | "customerPhoneNumber"
>;

export class CustomerRutError extends Error {
  constructor(
    readonly statusCode: 400 | 409,
    readonly code: "INVALID_CUSTOMER_RUT" | "CUSTOMER_RUT_EXISTS",
    message: string,
    readonly customers: RutCustomer[] = [],
  ) {
    super(message);
  }
}

function isRutType(value: unknown) {
  return (
    value == null || (typeof value === "string" && ["", "rut"].includes(value.trim().toLowerCase()))
  );
}

export function requireValidCustomerRut(input: unknown): string {
  if (typeof input !== "string" || input.length > 32 || !isValidRut(input)) {
    throw new CustomerRutError(
      400,
      "INVALID_CUSTOMER_RUT",
      "Revisa el RUT y su dígito verificador.",
    );
  }
  return formatRut(input);
}

export async function findCustomersByRut(
  db: Pick<Prisma.TransactionClient, "$queryRaw">,
  rut: string,
) {
  return db.$queryRaw<RutCustomer[]>`
    SELECT "customerId", "customerFirstName", "customerLastName", "customerDocumentNumber",
      "customerEmail", "customerCodePhoneNumber", "customerPhoneNumber"
    FROM "Customer"
    WHERE NOT "isWalkIn"
      AND COALESCE(NULLIF(LOWER(BTRIM("customerDocumentType")), ''), 'rut') = 'rut'
      AND UPPER(REGEXP_REPLACE("customerDocumentNumber", '[.[:space:]-]', '', 'g')) = ${normalizeRut(rut)}
    ORDER BY "createdAt", "customerId"
    LIMIT 20
  `;
}

type CustomerDocument = {
  customerDocumentType?: string | null;
  customerDocumentNumber?: string | null;
};

export async function prepareCustomerDocument(
  tx: Prisma.TransactionClient,
  businessId: string,
  input: CustomerDocument,
  existing?: CustomerDocument,
) {
  const type =
    input.customerDocumentType === undefined
      ? existing?.customerDocumentType
      : input.customerDocumentType;
  const document =
    input.customerDocumentNumber === undefined
      ? existing?.customerDocumentNumber
      : input.customerDocumentNumber;
  if (!isRutType(type) || !document?.trim()) return input;
  // Historical documents may need separate reconciliation. An unrelated edit can retain them.
  if (
    existing &&
    isRutType(existing.customerDocumentType) &&
    normalizeRut(existing.customerDocumentNumber) === normalizeRut(document)
  )
    return input;

  const rut = requireValidCustomerRut(document);
  const key = `appsfly:customer-rut:${businessId}:${normalizeRut(rut)}`;
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${key}, 0::bigint))`;
  const customers = await findCustomersByRut(tx, rut);
  if (customers.length) {
    throw new CustomerRutError(
      409,
      "CUSTOMER_RUT_EXISTS",
      "Este cliente ya está registrado.",
      customers,
    );
  }
  return { ...input, customerDocumentType: "rut", customerDocumentNumber: rut };
}

export const customerWriteOptions = { isolationLevel: "ReadCommitted", timeout: 30_000 } as const;

export function createCustomerWithRut(
  prisma: PrismaClient,
  businessId: string,
  data: Prisma.CustomerUncheckedCreateInput,
) {
  return prisma.$transaction(async (tx) => {
    const document = await prepareCustomerDocument(tx, businessId, data);
    return tx.customer.create({ data: { ...data, ...document } });
  }, customerWriteOptions);
}

export function updateCustomerWithRut(
  prisma: PrismaClient,
  businessId: string,
  customerId: string,
  data: Prisma.CustomerUncheckedUpdateInput & CustomerDocument,
) {
  return prisma.$transaction(async (tx) => {
    // Read the latest document after locking this customer, including for partial updates.
    const [current] = await tx.$queryRaw<CustomerDocument[]>`
      SELECT "customerDocumentType", "customerDocumentNumber"
      FROM "Customer" WHERE "customerId" = ${customerId} FOR UPDATE
    `;
    const document = await prepareCustomerDocument(tx, businessId, data, current);
    return tx.customer.update({ where: { customerId }, data: { ...data, ...document } });
  }, customerWriteOptions);
}

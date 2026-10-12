export const CASH_PAYMENT_METHOD = "2";

export const PAYMENT_METHODS = new Set(["0", "1", "2", "3"]);

export const TRANSACTION_TYPES = {
  PAYMENT: "PAYMENT",
  EXPENSE: "EXPENSE",
  PURCHASE: "PURCHASE",
  PURCHASE_CANCEL: "PURCHASE_CANCEL",
  ADJUSTMENT: "ADJUSTMENT",
  OPENING: "OPENING",
  WITHDRAWAL: "WITHDRAWAL",
  OTHER_INCOME: "OTHER_INCOME",
  SUPPLIER_PAYMENT: "SUPPLIER_PAYMENT",
} as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export const TRANSACTION_DIRECTIONS = {
  IN: "IN",
  OUT: "OUT",
} as const;

export type TransactionDirection =
  (typeof TRANSACTION_DIRECTIONS)[keyof typeof TRANSACTION_DIRECTIONS];

const MANUAL_TYPES = new Set<TransactionType>([
  TRANSACTION_TYPES.OPENING,
  TRANSACTION_TYPES.WITHDRAWAL,
  TRANSACTION_TYPES.OTHER_INCOME,
  TRANSACTION_TYPES.ADJUSTMENT,
]);

const MAX_NOTE_LENGTH = 500;

export class CashBookError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "CashBookError";
    this.status = status;
    this.code = code;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseStoredAmount(value: unknown): {
  amount: number;
  direction: TransactionDirection;
} {
  if (typeof value === "number" && Number.isFinite(value)) {
    return {
      amount: Math.abs(value),
      direction: value >= 0 ? TRANSACTION_DIRECTIONS.IN : TRANSACTION_DIRECTIONS.OUT,
    };
  }
  if (isRecord(value)) {
    return {
      amount: Math.abs(Number(value.amount) || 0),
      direction:
        value.direction === TRANSACTION_DIRECTIONS.OUT
          ? TRANSACTION_DIRECTIONS.OUT
          : TRANSACTION_DIRECTIONS.IN,
    };
  }
  return { amount: 0, direction: TRANSACTION_DIRECTIONS.IN };
}

export function amountPayload(
  amount: number,
  direction: TransactionDirection,
  meta?: Record<string, unknown> | null,
) {
  return {
    amount: Math.abs(Number(amount) || 0),
    direction:
      direction === TRANSACTION_DIRECTIONS.OUT
        ? TRANSACTION_DIRECTIONS.OUT
        : TRANSACTION_DIRECTIONS.IN,
    currency: "CLP",
    ...(meta ?? {}),
  };
}

export function cashDelta(method: unknown, value: unknown): number {
  if (String(method ?? "") !== CASH_PAYMENT_METHOD) return 0;
  const parsed = parseStoredAmount(value);
  return parsed.direction === TRANSACTION_DIRECTIONS.OUT ? -parsed.amount : parsed.amount;
}

export function sumCashBalance(
  rows: Array<{ transactionMethod?: unknown; transactionNewValue?: unknown }>,
): number {
  return rows.reduce(
    (total, row) => total + cashDelta(row.transactionMethod, row.transactionNewValue),
    0,
  );
}

export function splitCashTotals(
  rows: Array<{ transactionMethod?: unknown; transactionNewValue?: unknown }>,
) {
  let cashIn = 0;
  let cashOut = 0;
  for (const row of rows) {
    if (String(row.transactionMethod ?? "") !== CASH_PAYMENT_METHOD) continue;
    const parsed = parseStoredAmount(row.transactionNewValue);
    if (parsed.direction === TRANSACTION_DIRECTIONS.OUT) cashOut += parsed.amount;
    else cashIn += parsed.amount;
  }
  return { cashIn, cashOut, balance: cashIn - cashOut };
}

export function normalizeSettlement(value: unknown): "CASH" | "CREDIT" {
  return value === "CREDIT" ? "CREDIT" : "CASH";
}

export type LedgerDraft = {
  transactionType: TransactionType;
  transactionMethod: string;
  transactionTable: string;
  transactionRecordId: string;
  amount: number;
  direction: TransactionDirection;
  description: string;
  createdByUserId: string;
};

export function purchaseLedgerEntry(input: {
  settlement: unknown;
  purchaseId: string;
  purchaseNumber: string | null;
  total: number;
  providerName: string | null;
  userId: string;
}): LedgerDraft | null {
  if (normalizeSettlement(input.settlement) === "CREDIT") return null;
  const total = Math.abs(Number(input.total) || 0);
  if (total <= 0) return null;
  const label = input.purchaseNumber ? `Compra #${input.purchaseNumber}` : "Compra";
  return {
    transactionType: TRANSACTION_TYPES.PURCHASE,
    transactionMethod: CASH_PAYMENT_METHOD,
    transactionTable: "Purchase",
    transactionRecordId: input.purchaseId,
    amount: total,
    direction: TRANSACTION_DIRECTIONS.OUT,
    description: input.providerName ? `${label} — ${input.providerName}` : label,
    createdByUserId: input.userId,
  };
}

export function supplierPaymentEntry(input: {
  purchaseId: string;
  purchaseNumber: string | null;
  total: number;
  providerName: string | null;
  paymentMethod: unknown;
  userId: string;
}): LedgerDraft {
  const method = String(input.paymentMethod ?? CASH_PAYMENT_METHOD);
  if (!PAYMENT_METHODS.has(method)) {
    throw new CashBookError(400, "TRANSACTION_METHOD_INVALID", "El medio de pago no es válido");
  }
  const total = Math.abs(Number(input.total) || 0);
  if (!Number.isInteger(total) || total <= 0) {
    throw new CashBookError(
      400,
      "TRANSACTION_AMOUNT_INVALID",
      "El total de la compra no es válido",
    );
  }
  const label = input.purchaseNumber
    ? `Pago a proveedor — Compra #${input.purchaseNumber}`
    : "Pago a proveedor";
  return {
    transactionType: TRANSACTION_TYPES.SUPPLIER_PAYMENT,
    transactionMethod: method,
    transactionTable: "Purchase",
    transactionRecordId: input.purchaseId,
    amount: total,
    direction: TRANSACTION_DIRECTIONS.OUT,
    description: input.providerName ? `${label} — ${input.providerName}` : label,
    createdByUserId: input.userId,
  };
}

export function parseCountedCash(value: unknown): number | null {
  if (value == null || value === "") return null;
  const amount = typeof value === "number" ? value : Number(String(value).trim());
  if (!Number.isInteger(amount) || amount < 0) {
    throw new CashBookError(
      400,
      "CLOSURE_COUNT_INVALID",
      "El efectivo contado debe ser un entero mayor o igual a cero",
    );
  }
  return amount;
}

export function closureSnapshot(expectedCash: number, countedCash: number | null) {
  const expected = Math.round(Number(expectedCash) || 0);
  return {
    dailySalesExpectedCash: expected,
    dailySalesCountedCash: countedCash,
    dailySalesCashDifference: countedCash == null ? null : countedCash - expected,
  };
}

export function parseManualMovement(body: unknown): {
  transactionType: TransactionType;
  transactionMethod: string;
  amount: number;
  direction: TransactionDirection;
  description: string;
} {
  if (!isRecord(body)) {
    throw new CashBookError(400, "TRANSACTION_BODY_INVALID", "El movimiento enviado no es válido");
  }

  const rawType = body.transactionType ?? TRANSACTION_TYPES.ADJUSTMENT;
  if (typeof rawType !== "string" || !MANUAL_TYPES.has(rawType as TransactionType)) {
    throw new CashBookError(
      400,
      "TRANSACTION_TYPE_INVALID",
      "Ese tipo de movimiento no se puede cargar a mano",
    );
  }
  const transactionType = rawType as TransactionType;

  const rawAmount = body.amount ?? body.transactionNewValue;
  const amount = typeof rawAmount === "number" ? rawAmount : Number(rawAmount);
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new CashBookError(
      400,
      "TRANSACTION_AMOUNT_INVALID",
      "Ingresa un monto entero mayor a cero",
    );
  }

  let direction: TransactionDirection =
    body.direction === TRANSACTION_DIRECTIONS.OUT
      ? TRANSACTION_DIRECTIONS.OUT
      : TRANSACTION_DIRECTIONS.IN;
  if (
    transactionType === TRANSACTION_TYPES.OPENING ||
    transactionType === TRANSACTION_TYPES.OTHER_INCOME
  ) {
    direction = TRANSACTION_DIRECTIONS.IN;
  }
  if (transactionType === TRANSACTION_TYPES.WITHDRAWAL) {
    direction = TRANSACTION_DIRECTIONS.OUT;
  }

  let transactionMethod =
    body.transactionMethod == null || body.transactionMethod === ""
      ? CASH_PAYMENT_METHOD
      : String(body.transactionMethod);
  if (
    transactionType === TRANSACTION_TYPES.OPENING ||
    transactionType === TRANSACTION_TYPES.WITHDRAWAL
  ) {
    transactionMethod = CASH_PAYMENT_METHOD;
  }
  if (!PAYMENT_METHODS.has(transactionMethod)) {
    throw new CashBookError(400, "TRANSACTION_METHOD_INVALID", "El medio de pago no es válido");
  }

  const description =
    typeof body.transactionDescription === "string" ? body.transactionDescription.trim() : "";
  if (description.length === 0 && transactionType !== TRANSACTION_TYPES.ADJUSTMENT) {
    throw new CashBookError(
      400,
      "TRANSACTION_DESCRIPTION_REQUIRED",
      "Agrega una nota para este movimiento",
    );
  }
  if (description.length > MAX_NOTE_LENGTH) {
    throw new CashBookError(400, "TRANSACTION_DESCRIPTION_TOO_LONG", "La nota es demasiado larga");
  }

  return { transactionType, transactionMethod, amount, direction, description };
}

export function assertLedgerFilter(method: unknown, type: unknown) {
  if (method != null && method !== "" && !PAYMENT_METHODS.has(String(method))) {
    throw new CashBookError(400, "TRANSACTION_METHOD_INVALID", "El medio de pago no es válido");
  }
  if (
    type != null &&
    type !== "" &&
    !Object.values(TRANSACTION_TYPES).includes(String(type) as TransactionType)
  ) {
    throw new CashBookError(400, "TRANSACTION_TYPE_INVALID", "El tipo de movimiento no es válido");
  }
}

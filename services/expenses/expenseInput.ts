const PAYMENT_METHODS = new Set(["0", "1", "2", "3"]);
const MAX_DESCRIPTION_LENGTH = 500;

export class ExpenseInputError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ExpenseInputError";
    this.status = status;
    this.code = code;
  }
}

export type ExpenseCreateData = {
  expenseId: string;
  expenseDescription: string;
  expensePaymentMethod: string;
  expenseImageUrl: string | null;
  expenseAmount: number;
  expenseCategoryId: string;
  createdByUserId: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseExpenseCreateBody(body: unknown, createdByUserId: unknown): ExpenseCreateData {
  if (!isRecord(body)) {
    throw new ExpenseInputError(400, "EXPENSE_BODY_INVALID", "El gasto enviado no es válido");
  }

  if (typeof createdByUserId !== "string" || createdByUserId.trim() === "") {
    throw new ExpenseInputError(401, "EXPENSE_ACTOR_REQUIRED", "No se pudo identificar al usuario");
  }

  const { expenseId } = body;
  if (typeof expenseId !== "string" || expenseId.trim() === "" || expenseId.length > 64) {
    throw new ExpenseInputError(
      400,
      "EXPENSE_ID_INVALID",
      "El identificador del gasto no es válido",
    );
  }

  const { expenseDescription } = body;
  if (typeof expenseDescription !== "string" || expenseDescription.trim() === "") {
    throw new ExpenseInputError(
      400,
      "EXPENSE_DESCRIPTION_REQUIRED",
      "La descripción del gasto es obligatoria",
    );
  }

  const description = expenseDescription.trim();
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    throw new ExpenseInputError(
      400,
      "EXPENSE_DESCRIPTION_TOO_LONG",
      "La descripción no puede superar 500 caracteres",
    );
  }

  const { expenseCategoryId } = body;
  if (typeof expenseCategoryId !== "string" || expenseCategoryId.trim() === "") {
    throw new ExpenseInputError(
      400,
      "EXPENSE_CATEGORY_REQUIRED",
      "El gasto debe tener una categoría",
    );
  }

  const { expenseAmount } = body;
  if (typeof expenseAmount !== "number" || !Number.isInteger(expenseAmount) || expenseAmount <= 0) {
    throw new ExpenseInputError(
      400,
      "EXPENSE_AMOUNT_INVALID",
      "El monto debe ser un entero mayor que cero",
    );
  }

  const { expensePaymentMethod } = body;
  const paymentMethod =
    typeof expensePaymentMethod === "number" || typeof expensePaymentMethod === "string"
      ? String(expensePaymentMethod)
      : "";
  if (!PAYMENT_METHODS.has(paymentMethod)) {
    throw new ExpenseInputError(
      400,
      "EXPENSE_PAYMENT_METHOD_INVALID",
      "El método de pago no es válido",
    );
  }

  let expenseImageUrl: string | null = null;
  if (body.expenseImageUrl != null && body.expenseImageUrl !== "") {
    if (typeof body.expenseImageUrl !== "string") {
      throw new ExpenseInputError(400, "EXPENSE_IMAGE_INVALID", "El comprobante no es válido");
    }
    expenseImageUrl = body.expenseImageUrl;
  }

  return {
    expenseId: expenseId.trim(),
    expenseDescription: description,
    expensePaymentMethod: paymentMethod,
    expenseImageUrl,
    expenseAmount,
    expenseCategoryId: expenseCategoryId.trim(),
    createdByUserId,
  };
}

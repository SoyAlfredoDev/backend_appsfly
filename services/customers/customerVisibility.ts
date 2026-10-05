export class CustomerVisibilityError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.name = "CustomerVisibilityError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function visibleCustomerWhere(searchWhere: Record<string, unknown> = {}) {
  const visibility = { isWalkIn: false };
  if (Object.keys(searchWhere).length === 0) return visibility;
  return { AND: [visibility, searchWhere] };
}

export function assertCustomerMutable(customer: { isWalkIn?: boolean } | null) {
  if (customer?.isWalkIn) {
    throw new CustomerVisibilityError(
      403,
      "WALK_IN_CUSTOMER_LOCKED",
      "Consumidor final es un cliente de sistema y no se puede editar ni eliminar.",
    );
  }
}

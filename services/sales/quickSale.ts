export const QUICK_SALE_PAYMENT_METHODS = ["0", "1", "2", "3"] as const;
export const CASH_PAYMENT_METHOD = "2";
export const QUICK_SALE_DOCUMENT_TYPES = ["RECEIPT", "BOLETA"] as const;
export const DEFAULT_QUICK_SALE_PAYMENT_METHOD = "0";
export const DEFAULT_QUICK_SALE_DOCUMENT_TYPE = "RECEIPT";
export const WALK_IN_FIRST_NAME = "consumidor";
export const WALK_IN_LAST_NAME = "final";
export const WALK_IN_LABEL = "Consumidor final";

const MAX_LINES = 100;
const MAX_QUANTITY = 9999;
const MAX_TOTAL = 2_000_000_000;

export type QuickSalePaymentMethod = (typeof QUICK_SALE_PAYMENT_METHODS)[number];
export type QuickSaleDocumentType = (typeof QUICK_SALE_DOCUMENT_TYPES)[number];

export class QuickSaleError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.name = "QuickSaleError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export type QuickSaleLineInput = {
  productId: string;
  quantity: number;
};

export type QuickSaleRequest = {
  saleId: string;
  customerId: string | null;
  paymentMethod: QuickSalePaymentMethod;
  documentType: QuickSaleDocumentType;
  cashTendered: number | null;
  lines: QuickSaleLineInput[];
};

export type CatalogProduct = {
  productId: string;
  productName: string;
  productPrice: number;
  productStatus: string;
  productRequiresLabWork: boolean;
};

export type PricedQuickSaleLine = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type PricedQuickSale = {
  lines: PricedQuickSaleLine[];
  total: number;
  changeDue: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parsePaymentMethod(value: unknown): QuickSalePaymentMethod {
  const method = typeof value === "number" || typeof value === "string" ? String(value) : "";
  if (!QUICK_SALE_PAYMENT_METHODS.includes(method as QuickSalePaymentMethod)) {
    throw new QuickSaleError(400, "QUICK_SALE_PAYMENT_INVALID", "El medio de pago no es válido.");
  }
  return method as QuickSalePaymentMethod;
}

function parseDocumentType(value: unknown): QuickSaleDocumentType {
  const documentType = typeof value === "string" ? value.trim().toUpperCase() : "";
  if (!QUICK_SALE_DOCUMENT_TYPES.includes(documentType as QuickSaleDocumentType)) {
    throw new QuickSaleError(
      400,
      "QUICK_SALE_DOCUMENT_INVALID",
      "La caja rápida solo emite comprobante interno o boleta.",
    );
  }
  return documentType as QuickSaleDocumentType;
}

export function readQuickSalePaymentMethod(value: unknown): QuickSalePaymentMethod {
  const method = typeof value === "number" || typeof value === "string" ? String(value) : "";
  return QUICK_SALE_PAYMENT_METHODS.includes(method as QuickSalePaymentMethod)
    ? (method as QuickSalePaymentMethod)
    : DEFAULT_QUICK_SALE_PAYMENT_METHOD;
}

export function readQuickSaleDocumentType(value: unknown): QuickSaleDocumentType {
  const documentType = typeof value === "string" ? value.trim().toUpperCase() : "";
  return QUICK_SALE_DOCUMENT_TYPES.includes(documentType as QuickSaleDocumentType)
    ? (documentType as QuickSaleDocumentType)
    : DEFAULT_QUICK_SALE_DOCUMENT_TYPE;
}

export function parseQuickSaleSettingsPatch(payload: unknown): {
  paymentMethod?: QuickSalePaymentMethod;
  documentType?: QuickSaleDocumentType;
} {
  if (!isRecord(payload)) return {};
  const patch: { paymentMethod?: QuickSalePaymentMethod; documentType?: QuickSaleDocumentType } =
    {};
  if (payload.quickSalePaymentMethod !== undefined) {
    patch.paymentMethod = parsePaymentMethod(payload.quickSalePaymentMethod);
  }
  if (payload.quickSaleDocumentType !== undefined) {
    patch.documentType = parseDocumentType(payload.quickSaleDocumentType);
  }
  return patch;
}

function parseLines(value: unknown): QuickSaleLineInput[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new QuickSaleError(400, "QUICK_SALE_EMPTY", "Agrega al menos un producto.");
  }
  if (value.length > MAX_LINES) {
    throw new QuickSaleError(
      400,
      "QUICK_SALE_TOO_MANY_LINES",
      "La venta tiene demasiados productos.",
    );
  }

  const merged = new Map<string, number>();
  for (const line of value) {
    if (!isRecord(line)) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_LINE_INVALID",
        "Hay un producto inválido en la venta.",
      );
    }
    const productId = typeof line.productId === "string" ? line.productId.trim() : "";
    if (!productId || productId.length > 64) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_PRODUCT_INVALID",
        "Hay un producto inválido en la venta.",
      );
    }
    const { quantity } = line;
    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_QUANTITY_INVALID",
        "La cantidad debe ser un entero entre 1 y 9999.",
      );
    }
    merged.set(productId, (merged.get(productId) ?? 0) + quantity);
  }

  return [...merged.entries()].map(([productId, quantity]) => {
    if (quantity > MAX_QUANTITY) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_QUANTITY_INVALID",
        "La cantidad debe ser un entero entre 1 y 9999.",
      );
    }
    return { productId, quantity };
  });
}

export function parseQuickSaleRequest(body: unknown): QuickSaleRequest {
  if (!isRecord(body)) {
    throw new QuickSaleError(400, "QUICK_SALE_BODY_INVALID", "La venta enviada no es válida.");
  }

  const { saleId } = body;
  if (typeof saleId !== "string" || saleId.trim().length < 8 || saleId.trim().length > 64) {
    throw new QuickSaleError(
      400,
      "QUICK_SALE_ID_INVALID",
      "El identificador de la venta no es válido.",
    );
  }

  let customerId: string | null = null;
  if (body.customerId != null && body.customerId !== "") {
    if (typeof body.customerId !== "string" || body.customerId.trim().length > 64) {
      throw new QuickSaleError(400, "QUICK_SALE_CUSTOMER_INVALID", "El cliente no es válido.");
    }
    customerId = body.customerId.trim();
  }

  const paymentMethod = parsePaymentMethod(body.paymentMethod);
  const documentType = parseDocumentType(body.documentType ?? DEFAULT_QUICK_SALE_DOCUMENT_TYPE);

  let cashTendered: number | null = null;
  if (body.cashTendered != null && body.cashTendered !== "") {
    if (
      typeof body.cashTendered !== "number" ||
      !Number.isInteger(body.cashTendered) ||
      body.cashTendered < 0
    ) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_CASH_INVALID",
        "El monto recibido debe ser un entero en pesos.",
      );
    }
    cashTendered = body.cashTendered;
  }

  return {
    saleId: saleId.trim(),
    customerId,
    paymentMethod,
    documentType,
    cashTendered,
    lines: parseLines(body.lines),
  };
}

export function priceQuickSale(
  request: Pick<QuickSaleRequest, "lines" | "paymentMethod" | "cashTendered">,
  products: CatalogProduct[],
): PricedQuickSale {
  const byId = new Map(products.map((product) => [product.productId, product]));
  const lines: PricedQuickSaleLine[] = [];
  let total = 0;

  for (const line of request.lines) {
    const product = byId.get(line.productId);
    if (!product) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_PRODUCT_NOT_FOUND",
        "Un producto de la venta ya no existe.",
      );
    }
    if (product.productStatus !== "ACTIVE") {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_PRODUCT_INACTIVE",
        `"${product.productName}" no está activo.`,
      );
    }
    if (product.productRequiresLabWork) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_REQUIRES_WORK_ORDER",
        `"${product.productName}" requiere una orden de trabajo. Regístralo en Nueva Venta.`,
      );
    }
    if (!Number.isInteger(product.productPrice) || product.productPrice < 0) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_PRICE_INVALID",
        `El precio de "${product.productName}" no es válido.`,
      );
    }

    const lineTotal = product.productPrice * line.quantity;
    total += lineTotal;
    lines.push({
      productId: product.productId,
      productName: product.productName,
      quantity: line.quantity,
      unitPrice: product.productPrice,
      lineTotal,
    });
  }

  if (total <= 0 || total > MAX_TOTAL) {
    throw new QuickSaleError(400, "QUICK_SALE_TOTAL_INVALID", "El total de la venta no es válido.");
  }

  let changeDue = 0;
  if (request.paymentMethod === CASH_PAYMENT_METHOD) {
    if (request.cashTendered == null) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_CASH_REQUIRED",
        "Indica el monto recibido en efectivo.",
      );
    }
    if (request.cashTendered < total) {
      throw new QuickSaleError(
        400,
        "QUICK_SALE_CASH_SHORT",
        "El monto recibido no alcanza para cubrir la venta.",
      );
    }
    changeDue = request.cashTendered - total;
  }

  return { lines, total, changeDue };
}

import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";
import {
  CASH_PAYMENT_METHOD,
  QuickSaleError,
  parseQuickSaleRequest,
  parseQuickSaleSettingsPatch,
  priceQuickSale,
  readQuickSaleDocumentType,
  readQuickSalePaymentMethod,
} from "../services/sales/quickSale.js";
import {
  assertCustomerMutable,
  CustomerVisibilityError,
  visibleCustomerWhere,
} from "../services/customers/customerVisibility.js";

const product = {
  productId: "prod-1",
  productName: "Lente de contacto",
  productPrice: 5000,
  productStatus: "ACTIVE",
  productRequiresLabWork: false,
};

const validBody = {
  saleId: "sale-quick-1",
  paymentMethod: "0",
  documentType: "RECEIPT",
  lines: [{ productId: "prod-1", quantity: 2 }],
};

describe("parseQuickSaleRequest", () => {
  it("normalizes a debit sale and merges repeated products", () => {
    expect(
      parseQuickSaleRequest({
        ...validBody,
        lines: [
          { productId: "prod-1", quantity: 1 },
          { productId: " prod-1 ", quantity: 2 },
        ],
        customerId: "",
      }),
    ).toEqual({
      saleId: "sale-quick-1",
      customerId: null,
      paymentMethod: "0",
      documentType: "RECEIPT",
      cashTendered: null,
      lines: [{ productId: "prod-1", quantity: 3 }],
    });
  });

  it("rejects an empty ticket and factura", () => {
    expect(() => parseQuickSaleRequest({ ...validBody, lines: [] })).toThrow(QuickSaleError);
    expect(() => parseQuickSaleRequest({ ...validBody, documentType: "FACTURA" })).toThrow(
      QuickSaleError,
    );
  });
});

describe("priceQuickSale", () => {
  it("prices from the catalog and ignores a client price", () => {
    const priced = priceQuickSale(parseQuickSaleRequest(validBody), [product]);
    expect(priced.total).toBe(10000);
    expect(priced.changeDue).toBe(0);
    expect(priced.lines[0]?.unitPrice).toBe(5000);
  });

  it("calculates cash change and rejects a short tender", () => {
    const priced = priceQuickSale(
      parseQuickSaleRequest({
        ...validBody,
        paymentMethod: CASH_PAYMENT_METHOD,
        cashTendered: 12000,
      }),
      [product],
    );
    expect(priced.changeDue).toBe(2000);

    expect(() =>
      priceQuickSale(
        parseQuickSaleRequest({
          ...validBody,
          paymentMethod: CASH_PAYMENT_METHOD,
          cashTendered: 1000,
        }),
        [product],
      ),
    ).toThrow(QuickSaleError);
  });

  it("sends lab work back to the full sale", () => {
    expect(() =>
      priceQuickSale(parseQuickSaleRequest(validBody), [
        { ...product, productRequiresLabWork: true },
      ]),
    ).toThrow(QuickSaleError);
  });
});

describe("quick sale settings", () => {
  it("keeps debit and an internal receipt when the stored value is unknown", () => {
    expect(readQuickSalePaymentMethod("9")).toBe("0");
    expect(readQuickSaleDocumentType("FACTURA")).toBe("RECEIPT");
    expect(parseQuickSaleSettingsPatch({ quickSalePaymentMethod: 2 }).paymentMethod).toBe("2");
  });
});

describe("POST /api/sales/quick", () => {
  it("requires a session before accepting a quick sale", async () => {
    const response = await request(app).post("/api/sales/quick").send({}).expect(401);
    expect(response.body.message).toBe("No token provided");
  });
});

describe("walk-in customer visibility", () => {
  it("hides the system customer from search and blocks edits", () => {
    expect(visibleCustomerWhere()).toEqual({ isWalkIn: false });
    expect(visibleCustomerWhere({ OR: [{ customerFirstName: { contains: "ana" } }] })).toEqual({
      AND: [{ isWalkIn: false }, { OR: [{ customerFirstName: { contains: "ana" } }] }],
    });
    expect(() => assertCustomerMutable({ isWalkIn: true })).toThrow(CustomerVisibilityError);
    expect(() => assertCustomerMutable({ isWalkIn: false })).not.toThrow();
  });
});

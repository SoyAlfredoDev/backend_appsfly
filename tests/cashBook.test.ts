import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";
import {
  CashBookError,
  closureSnapshot,
  normalizeSettlement,
  parseCountedCash,
  parseManualMovement,
  purchaseLedgerEntry,
  splitCashTotals,
  sumCashBalance,
  supplierPaymentEntry,
} from "../services/financial/cashBook.js";
import {
  removeLinkedFinancialTransaction,
  syncLinkedFinancialTransaction,
} from "../services/financial/ledgerSync.js";

describe("cash book routes", () => {
  it("requires authentication before listing movements or paying a supplier", async () => {
    const movements = await request(app).get("/api/transactions");
    const payment = await request(app)
      .post("/api/purchases/purchase-1/pay")
      .send({ paymentMethod: "2" });

    expect(movements.status).toBe(401);
    expect(movements.body).toMatchObject({ message: "No token provided" });
    expect(payment.status).toBe(401);
    expect(payment.body).toMatchObject({ message: "No token provided" });
  });
});

describe("cash book balance", () => {
  it("keeps card sales out of the drawer and nets cash in and out", () => {
    const balance = sumCashBalance([
      { transactionMethod: "2", transactionNewValue: { amount: 50000, direction: "IN" } },
      { transactionMethod: "0", transactionNewValue: { amount: 80000, direction: "IN" } },
      { transactionMethod: "2", transactionNewValue: { amount: 12000, direction: "OUT" } },
    ]);
    expect(balance).toBe(38000);
  });

  it("splits cash entries and exits for the drawer detail", () => {
    expect(
      splitCashTotals([
        { transactionMethod: "2", transactionNewValue: { amount: 10000, direction: "IN" } },
        { transactionMethod: "2", transactionNewValue: { amount: 4000, direction: "OUT" } },
      ]),
    ).toEqual({ cashIn: 10000, cashOut: 4000, balance: 6000 });
  });
});

describe("purchase settlement", () => {
  it("records a cash purchase as money leaving the drawer", () => {
    expect(
      purchaseLedgerEntry({
        settlement: "CASH",
        purchaseId: "purchase-1",
        purchaseNumber: "12",
        total: 25000,
        providerName: "Lab Sur",
        userId: "user-1",
      }),
    ).toMatchObject({
      transactionType: "PURCHASE",
      transactionMethod: "2",
      direction: "OUT",
      amount: 25000,
      description: "Compra #12 — Lab Sur",
    });
  });

  it("does not move cash when the supplier gives credit", () => {
    expect(normalizeSettlement("CREDIT")).toBe("CREDIT");
    expect(
      purchaseLedgerEntry({
        settlement: "CREDIT",
        purchaseId: "purchase-1",
        purchaseNumber: "12",
        total: 25000,
        providerName: "Lab Sur",
        userId: "user-1",
      }),
    ).toBeNull();
  });

  it("records the later supplier payment with the chosen method", () => {
    expect(
      supplierPaymentEntry({
        purchaseId: "purchase-1",
        purchaseNumber: "12",
        total: 25000,
        providerName: "Lab Sur",
        paymentMethod: "3",
        userId: "user-1",
      }),
    ).toMatchObject({
      transactionType: "SUPPLIER_PAYMENT",
      transactionMethod: "3",
      direction: "OUT",
    });
  });
});

describe("manual movements", () => {
  it("forces a bank withdrawal out of cash and requires a note", () => {
    expect(
      parseManualMovement({
        transactionType: "WITHDRAWAL",
        transactionMethod: "0",
        direction: "IN",
        amount: 15000,
        transactionDescription: "Depósito del día",
      }),
    ).toMatchObject({
      transactionType: "WITHDRAWAL",
      transactionMethod: "2",
      direction: "OUT",
      amount: 15000,
    });

    expect(() =>
      parseManualMovement({
        transactionType: "OPENING",
        amount: 20000,
        transactionDescription: "   ",
      }),
    ).toThrow(expect.objectContaining({ code: "TRANSACTION_DESCRIPTION_REQUIRED" }));
  });

  it("rejects system movements created by hand", () => {
    expect(() =>
      parseManualMovement({
        transactionType: "PAYMENT",
        amount: 1000,
        transactionDescription: "Cobro",
      }),
    ).toThrow(expect.objectContaining({ code: "TRANSACTION_TYPE_INVALID", status: 400 }));
  });
});

describe("daily cash count", () => {
  it("stores the gap between expected drawer cash and the count", () => {
    expect(closureSnapshot(48000, 45000)).toEqual({
      dailySalesExpectedCash: 48000,
      dailySalesCountedCash: 45000,
      dailySalesCashDifference: -3000,
    });
    expect(closureSnapshot(48000, null).dailySalesCashDifference).toBeNull();
    expect(parseCountedCash("")).toBeNull();
    expect(() => parseCountedCash(-1)).toThrow(expect.any(CashBookError));
  });
});

describe("ledger sync", () => {
  it("updates the linked expense movement instead of adding a second one", async () => {
    const store = [
      {
        transactionId: "tx-1",
        transactionType: "EXPENSE",
        transactionTable: "Expense",
        transactionRecordId: "expense-1",
        transactionMethod: "2",
        transactionNewValue: { amount: 1000, direction: "OUT", currency: "CLP" },
        transactionDescription: "Café",
      },
    ];
    const prisma = {
      transactions: {
        findFirst: async ({ where }: { where: Record<string, unknown> }) =>
          store.find((row) => row.transactionRecordId === where.transactionRecordId) ?? null,
        create: async () => {
          throw new Error("should update");
        },
        update: async ({
          where,
          data,
        }: {
          where: { transactionId: string };
          data: Record<string, unknown>;
        }) => {
          const row = store.find((item) => item.transactionId === where.transactionId);
          if (!row) throw new Error("missing");
          Object.assign(row, data);
          return row;
        },
        deleteMany: async () => ({ count: 0 }),
      },
    };

    await syncLinkedFinancialTransaction(prisma, {
      transactionType: "EXPENSE",
      transactionMethod: "3",
      transactionTable: "Expense",
      transactionRecordId: "expense-1",
      amount: 2500,
      direction: "OUT",
      description: "Café actualizado",
      createdByUserId: "user-1",
    });

    expect(store).toHaveLength(1);
    expect(store[0]).toMatchObject({
      transactionMethod: "3",
      transactionNewValue: { amount: 2500, direction: "OUT", currency: "CLP" },
      transactionDescription: "Café actualizado",
    });
  });

  it("removes the ledger row when the expense is deleted", async () => {
    const deleted: string[] = [];
    const prisma = {
      transactions: {
        findFirst: async () => null,
        create: async () => {
          throw new Error("unused");
        },
        update: async () => {
          throw new Error("unused");
        },
        deleteMany: async ({ where }: { where: Record<string, unknown> }) => {
          deleted.push(String(where.transactionRecordId));
          return { count: 1 };
        },
      },
    };

    await removeLinkedFinancialTransaction(prisma, {
      transactionTable: "Expense",
      transactionRecordId: "expense-1",
      transactionType: "EXPENSE",
    });
    expect(deleted).toEqual(["expense-1"]);
  });
});

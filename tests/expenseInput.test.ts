import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";
import { parseExpenseCreateBody } from "../services/expenses/expenseInput.js";
import { SYSTEM_EXPENSE_CATEGORIES } from "../services/expenses/expenseCategories.js";

const validBody = {
  expenseId: "expense-1",
  expenseDescription: " Arriendo local ",
  expensePaymentMethod: 2,
  expenseAmount: 150000,
  expenseCategoryId: "category-1",
  expenseImageUrl: "",
};

describe("parseExpenseCreateBody", () => {
  it("requires a category and normalizes a valid expense", () => {
    expect(parseExpenseCreateBody(validBody, "user-1")).toEqual({
      expenseId: "expense-1",
      expenseDescription: "Arriendo local",
      expensePaymentMethod: "2",
      expenseImageUrl: null,
      expenseAmount: 150000,
      expenseCategoryId: "category-1",
      createdByUserId: "user-1",
    });
  });

  it("rejects an expense without a category", () => {
    expect(() =>
      parseExpenseCreateBody({ ...validBody, expenseCategoryId: "  " }, "user-1"),
    ).toThrow(
      expect.objectContaining({
        status: 400,
        code: "EXPENSE_CATEGORY_REQUIRED",
      }),
    );
  });

  it("rejects a decimal amount because expenses are stored as integers", () => {
    expect(() => parseExpenseCreateBody({ ...validBody, expenseAmount: 10.5 }, "user-1")).toThrow(
      expect.objectContaining({ code: "EXPENSE_AMOUNT_INVALID" }),
    );
  });

  it("rejects an unknown payment method", () => {
    expect(() =>
      parseExpenseCreateBody({ ...validBody, expensePaymentMethod: "cash" }, "user-1"),
    ).toThrow(expect.objectContaining({ code: "EXPENSE_PAYMENT_METHOD_INVALID" }));
  });
});

describe("system expense categories", () => {
  it("includes a stable fallback category for existing expenses", () => {
    expect(SYSTEM_EXPENSE_CATEGORIES.map((category) => category.code)).toContain("OTHER");
  });
});

describe("expense category route", () => {
  it("requires authentication before listing categories", async () => {
    const response = await request(app).get("/api/expense-categories");

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: "No token provided" });
  });
});

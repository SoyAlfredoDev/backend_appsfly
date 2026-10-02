import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../app.js";
import {
  createExpenseCategoryService,
  deleteExpenseCategoryService,
} from "../services/expensesService.js";
import { SYSTEM_EXPENSE_CATEGORIES } from "../services/expenses/expenseCategories.js";

const systemRows = SYSTEM_EXPENSE_CATEGORIES.map(({ code }) => ({ expenseCategoryCode: code }));

describe("expense category mutations", () => {
  it("requires authentication before creating or deleting categories", async () => {
    expect(
      (
        await request(app)
          .post("/api/expense-categories")
          .send({ expenseCategoryName: "Cristales" })
      ).status,
    ).toBe(401);
    expect((await request(app).delete("/api/expense-categories/category-1")).status).toBe(401);
  });

  it("creates a custom category using the authenticated user", async () => {
    const create = vi
      .fn()
      .mockResolvedValue({ expenseCategoryId: "category-1", expenseCategoryName: "Cristales" });
    const findMany = vi
      .fn()
      .mockResolvedValueOnce(systemRows)
      .mockResolvedValueOnce([{ expenseCategoryName: "Arriendo" }]);
    const prisma = { expenseCategory: { findMany, create, createMany: vi.fn() } };

    await expect(
      createExpenseCategoryService(prisma, "user-1", "  Cristales  "),
    ).resolves.toMatchObject({
      expenseCategoryName: "Cristales",
    });
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          expenseCategoryName: "Cristales",
          createdByUserId: "user-1",
          isSystem: false,
        }),
      }),
    );
  });

  it("rejects duplicate names ignoring case and spaces", async () => {
    const prisma = {
      expenseCategory: {
        findMany: vi
          .fn()
          .mockResolvedValueOnce(systemRows)
          .mockResolvedValueOnce([{ expenseCategoryName: "Cristales" }]),
        create: vi.fn(),
        createMany: vi.fn(),
      },
    };
    await expect(
      createExpenseCategoryService(prisma, "user-1", "  cristales "),
    ).rejects.toMatchObject({
      status: 409,
      code: "EXPENSE_CATEGORY_DUPLICATE",
    });
    expect(prisma.expenseCategory.create).not.toHaveBeenCalled();
  });

  it("protects system categories and categories used by expenses", async () => {
    const prisma = {
      expenseCategory: {
        findUnique: vi
          .fn()
          .mockResolvedValueOnce({ isSystem: true, _count: { expenses: 0 } })
          .mockResolvedValueOnce({ isSystem: false, _count: { expenses: 1 } }),
        delete: vi.fn(),
      },
    };
    await expect(deleteExpenseCategoryService(prisma, "system")).rejects.toMatchObject({
      code: "EXPENSE_CATEGORY_SYSTEM_PROTECTED",
    });
    await expect(deleteExpenseCategoryService(prisma, "used")).rejects.toMatchObject({
      code: "EXPENSE_CATEGORY_IN_USE",
    });
    expect(prisma.expenseCategory.delete).not.toHaveBeenCalled();
  });
});

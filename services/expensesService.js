// expensesService.js

import { randomUUID } from "node:crypto";
import {
    recordFinancialTransaction,
    TRANSACTION_TYPES,
    TRANSACTION_DIRECTIONS,
} from "./financial/financialLedgerService.js";
import {
    businessMonthBoundsUtc,
    DEFAULT_BUSINESS_TIMEZONE,
} from "../libs/businessTimezone.js";
import { SYSTEM_EXPENSE_CATEGORIES } from "./expenses/expenseCategories.js";
import { ExpenseInputError } from "./expenses/expenseInput.js";

const parseMonthYear = (month, year) => {
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  if (Number.isNaN(m) || Number.isNaN(y) || m < 1 || m > 12) {
    throw new Error("Invalid month or year");
  }

  return { month: m, year: y };
};

const getMonthDateRange = (month, year, timeZone = DEFAULT_BUSINESS_TIMEZONE) => {
  const { start, endExclusive } = businessMonthBoundsUtc(year, month, timeZone);
  return { startDate: start, endDate: endExclusive };
};

const expenseInclude = {
  user: {
    select: {
      userId: true,
      userFirstName: true,
      userLastName: true,
    },
  },
  category: {
    select: {
      expenseCategoryId: true,
      expenseCategoryName: true,
      expenseCategoryCode: true,
    },
  },
};

const expenseCategorySelect = {
  expenseCategoryId: true,
  expenseCategoryName: true,
  expenseCategoryCode: true,
  isSystem: true,
};

export const listExpenseCategoriesService = async (prisma, userId) => {
  await ensureSystemExpenseCategories(prisma, userId);
  return prisma.expenseCategory.findMany({
    orderBy: { expenseCategoryName: "asc" },
    select: { ...expenseCategorySelect, _count: { select: { expenses: true } } },
  });
};

const categoryError = (status, code, message) =>
  new ExpenseInputError(status, code, message);

const normalizedCategoryName = (value) =>
  value.normalize("NFKC").trim().replace(/\s+/gu, " ");

const categoryComparisonKey = (value) =>
  normalizedCategoryName(value).toLocaleLowerCase("es-CL");

export const createExpenseCategoryService = async (prisma, userId, value) => {
  if (typeof value !== "string") {
    throw categoryError(400, "EXPENSE_CATEGORY_NAME_INVALID", "El nombre de la categoría no es válido");
  }
  const expenseCategoryName = normalizedCategoryName(value);
  if (!expenseCategoryName || expenseCategoryName.length > 60) {
    throw categoryError(400, "EXPENSE_CATEGORY_NAME_INVALID", "El nombre debe tener entre 1 y 60 caracteres");
  }
  await ensureSystemExpenseCategories(prisma, userId);
  const existing = await prisma.expenseCategory.findMany({
    select: { expenseCategoryName: true },
  });
  if (existing.some((category) => categoryComparisonKey(category.expenseCategoryName) === categoryComparisonKey(expenseCategoryName))) {
    throw categoryError(409, "EXPENSE_CATEGORY_DUPLICATE", "Ya existe una categoría con ese nombre");
  }
  try {
    return await prisma.expenseCategory.create({
      data: {
        expenseCategoryId: randomUUID(),
        expenseCategoryName,
        isSystem: false,
        createdByUserId: userId,
      },
      select: expenseCategorySelect,
    });
  } catch (error) {
    if (error?.code === "P2002") {
      throw categoryError(409, "EXPENSE_CATEGORY_DUPLICATE", "Ya existe una categoría con ese nombre");
    }
    throw error;
  }
};

export const deleteExpenseCategoryService = async (prisma, id) => {
  const category = await prisma.expenseCategory.findUnique({
    where: { expenseCategoryId: id },
    select: { isSystem: true, _count: { select: { expenses: true } } },
  });
  if (!category) {
    throw categoryError(404, "EXPENSE_CATEGORY_NOT_FOUND", "No se encontró la categoría");
  }
  if (category.isSystem) {
    throw categoryError(409, "EXPENSE_CATEGORY_SYSTEM_PROTECTED", "La categoría del sistema no se puede eliminar");
  }
  if (category._count.expenses > 0) {
    throw categoryError(409, "EXPENSE_CATEGORY_IN_USE", "No puedes eliminar una categoría con gastos asociados");
  }
  try {
    await prisma.expenseCategory.delete({ where: { expenseCategoryId: id } });
  } catch (error) {
    if (error?.code === "P2003") {
      throw categoryError(409, "EXPENSE_CATEGORY_IN_USE", "No puedes eliminar una categoría con gastos asociados");
    }
    throw error;
  }
};

const ensureSystemExpenseCategories = async (prisma, userId) => {
  const codes = SYSTEM_EXPENSE_CATEGORIES.map((category) => category.code);
  const existing = await prisma.expenseCategory.findMany({
    where: { expenseCategoryCode: { in: codes } },
    select: { expenseCategoryCode: true },
  });
  const present = new Set(existing.map((category) => category.expenseCategoryCode));
  const missing = SYSTEM_EXPENSE_CATEGORIES.filter((category) => !present.has(category.code));
  if (missing.length === 0) return;

  await prisma.expenseCategory.createMany({
    data: missing.map((category) => ({
      expenseCategoryId: randomUUID(),
      expenseCategoryName: category.name,
      expenseCategoryCode: category.code,
      isSystem: true,
      createdByUserId: userId,
    })),
    skipDuplicates: true,
  });
};

// 1. CREATE Expense
export const createExpenseService = async (data, prisma) => {
  try {
    const category = await prisma.expenseCategory.findUnique({
      where: { expenseCategoryId: data.expenseCategoryId },
      select: { expenseCategoryId: true },
    });
    if (!category) {
      throw new ExpenseInputError(
        404,
        "EXPENSE_CATEGORY_NOT_FOUND",
        "La categoría del gasto no existe",
      );
    }

    return prisma.$transaction(async (tx) => {
      const res = await tx.expense.create({
        data,
        include: expenseInclude,
      });

      await recordFinancialTransaction(tx, {
        transactionType: TRANSACTION_TYPES.EXPENSE,
        transactionMethod: res.expensePaymentMethod,
        transactionTable: "Expense",
        transactionRecordId: res.expenseId,
        amount: res.expenseAmount,
        direction: TRANSACTION_DIRECTIONS.OUT,
        description: res.expenseDescription?.trim() || "Gasto operacional",
        createdByUserId: data.createdByUserId,
      });

      return res;
    });
  } catch (error) {
    if (error instanceof ExpenseInputError) throw error;
    console.error("(expensesService.js): Error creating expense:", error);
    throw error;
  }
};

// 2. READ All Expenses (optional month/year filter)
export const getExpensesService = async (
  prisma,
  month,
  year,
  timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
  try {
    if (month != null && year != null) {
      return getExpensesByMonthService(month, year, prisma, timeZone);
    }

    const expenses = await prisma.expense.findMany({
      orderBy: { createdAt: "desc" },
      include: expenseInclude,
    });

    const total = expenses.reduce(
      (sum, expense) => sum + (expense.expenseAmount || 0),
      0,
    );

    return { expenses, total, month: null, year: null };
  } catch (error) {
    console.error("(expensesService.js): Error getting expenses:", error);
    throw error;
  }
};

export const getExpensesByMonthService = async (
  month,
  year,
  prisma,
  timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
  try {
    const { month: m, year: y } = parseMonthYear(month, year);
    const { startDate, endDate } = getMonthDateRange(m, y, timeZone);

    const expenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: { createdAt: "desc" },
      include: expenseInclude,
    });

    const total = expenses.reduce(
      (sum, expense) => sum + (expense.expenseAmount || 0),
      0,
    );

    return { expenses, total, month: m, year: y };
  } catch (error) {
    console.error(
      `(expensesService.js): Error getting expenses for ${month}/${year}:`,
      error,
    );
    throw error;
  }
};

// Legacy alias kept for sum endpoint reuse
export const getExpenseByIdService = async (id, prisma) => {
  try {
    const res = await prisma.expense.findUnique({
      where: { expenseId: id },
      include: expenseInclude,
    });
    return res;
  } catch (error) {
    console.error(
      `(expensesService.js): Error getting expense with ID ${id}:`,
      error,
    );
    throw error;
  }
};

// 4. UPDATE Expense
export const updateExpenseService = async (id, data, prisma) => {
  try {
    const res = await prisma.expense.update({
      where: { expenseId: id },
      data: data,
    });
    return res;
  } catch (error) {
    console.error(
      `(expensesService.js): Error updating expense with ID ${id}:`,
      error,
    );
    throw error;
  }
};

// 5. DELETE Expense
export const deleteExpenseService = async (id, prisma) => {
  try {
    // Finds and deletes the expense record by its ID
    const res = await prisma.expense.delete({
      where: { expenseId: id },
    });
    // Returns the record that was deleted for confirmation
    return res;
  } catch (error) {
    console.error(
      `(expensesService.js): Error deleting expense with ID ${id}:`,
      error,
    );
    throw error;
  }
};

// 6. SUM Expenses by Payment Method
export const sumExpensesByPaymentMethod = async (paymentMethod, prisma) => {
  try {
    const result = await prisma.expense.aggregate({
      where: { expensePaymentMethod: paymentMethod },
      _sum: { expenseAmount: true },
    });
    return result._sum.expenseAmount || 0;
  } catch (error) {
    console.error(
      `(expensesService.js): Error getting sum of expenses by payment method ${paymentMethod}:`,
      error,
    );
    throw error;
  }
};

// 7. SUM Expenses by Month
export const sumExpenseByMonthService = async (
  month,
  year,
  prisma,
  timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
  try {
    const { total } = await getExpensesByMonthService(month, year, prisma, timeZone);
    return total;
  } catch (error) {
    console.error(
      `(expensesService.js): Error getting sum of expenses by month ${month} and year ${year}:`,
      error,
    );
    throw error;
  }
};

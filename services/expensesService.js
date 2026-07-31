// expensesService.js

import {
    recordFinancialTransaction,
    TRANSACTION_TYPES,
    TRANSACTION_DIRECTIONS,
} from "./financial/financialLedgerService.js";
import {
    businessMonthBoundsUtc,
    DEFAULT_BUSINESS_TIMEZONE,
} from "../libs/businessTimezone.js";

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
};

// 1. CREATE Expense
export const createExpenseService = async (data, prisma) => {
  try {
    return prisma.$transaction(async (tx) => {
      const res = await tx.expense.create({ data });

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

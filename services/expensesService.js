// expensesService.js

const parseMonthYear = (month, year) => {
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  if (Number.isNaN(m) || Number.isNaN(y) || m < 1 || m > 12) {
    throw new Error("Invalid month or year");
  }

  return { month: m, year: y };
};

const getMonthDateRange = (month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);
  return { startDate, endDate };
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
    // Creates a new expense record in the database
    const res = await prisma.expense.create({ data });
    return res;
  } catch (error) {
    console.error("(expensesService.js): Error creating expense:", error);
    throw error;
  }
};

// 2. READ All Expenses (optional month/year filter)
export const getExpensesService = async (prisma, month, year) => {
  try {
    if (month != null && year != null) {
      return getExpensesByMonthService(month, year, prisma);
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

export const getExpensesByMonthService = async (month, year, prisma) => {
  try {
    const { month: m, year: y } = parseMonthYear(month, year);
    const { startDate, endDate } = getMonthDateRange(m, y);

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
    // Retrieves a single expense record based on its unique ID
    const res = await prisma.expense.findUnique({
      where: { id: id }, // Uses findUnique to get a single record by ID
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
    // Finds the expense by ID and updates its data
    const res = await prisma.expense.update({
      where: { id: id },
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
export const sumExpenseByMonthService = async (month, year, prisma) => {
  try {
    const { total } = await getExpensesByMonthService(month, year, prisma);
    return total;
  } catch (error) {
    console.error(
      `(expensesService.js): Error getting sum of expenses by month ${month} and year ${year}:`,
      error,
    );
    throw error;
  }
};

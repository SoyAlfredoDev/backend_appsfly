import {
  createExpenseService,
  getExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
  sumExpensesByPaymentMethod,
  sumExpenseByMonthService,
  listExpenseCategoriesService,
  createExpenseCategoryService,
  deleteExpenseCategoryService,
} from "../services/expensesService.js";
import { ExpenseInputError, parseExpenseCreateBody } from "../services/expenses/expenseInput.js";
import {
  deleteCloudinaryImageByUrl,
  deleteCloudinaryImageIfReplaced,
} from "../services/cloudinaryService.js";
import { DEFAULT_BUSINESS_TIMEZONE } from "../libs/businessTimezone.js";

const tzOf = (req) => req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE;

const sendExpenseError = (res, error, fallbackCode) => {
  if (error instanceof ExpenseInputError) {
    return res.status(error.status).json({ error: error.message, code: error.code });
  }
  console.error(error);
  return res.status(500).json({
    error: "No se pudo completar la operación del gasto",
    code: fallbackCode,
  });
};

export const listExpenseCategoriesController = async (req, res) => {
  try {
    const categories = await listExpenseCategoriesService(req.prisma, req.user.payload.id);
    return res.status(200).json({ categories });
  } catch (error) {
    return sendExpenseError(res, error, "EXPENSE_CATEGORIES_FAILED");
  }
};

export const createExpenseCategoryController = async (req, res) => {
  try {
    const category = await createExpenseCategoryService(
      req.prisma,
      req.user.payload.id,
      req.body?.expenseCategoryName,
    );
    return res.status(201).json(category);
  } catch (error) {
    return sendExpenseError(res, error, "EXPENSE_CATEGORY_CREATE_FAILED");
  }
};

export const deleteExpenseCategoryController = async (req, res) => {
  try {
    await deleteExpenseCategoryService(req.prisma, req.params.id);
    return res.status(204).send();
  } catch (error) {
    return sendExpenseError(res, error, "EXPENSE_CATEGORY_DELETE_FAILED");
  }
};

export const createExpenseController = async (req, res) => {
  try {
    const data = parseExpenseCreateBody(req.body, req.user?.payload?.id);
    const expense = await createExpenseService(data, req.prisma);
    return res.status(201).json(expense);
  } catch (error) {
    return sendExpenseError(res, error, "EXPENSE_CREATE_FAILED");
  }
};

export const getExpensesController = async (req, res) => {
  try {
    const { month, year } = req.query;
    const timeZone = tzOf(req);

    if (month != null && year != null) {
      const result = await getExpensesService(req.prisma, month, year, timeZone);
      return res.status(200).json(result);
    }

    if (month != null || year != null) {
      return res.status(400).json({ error: "Both month and year are required" });
    }

    const result = await getExpensesService(req.prisma);
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid month or year") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const getExpenseByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await getExpenseByIdService(id, req.prisma);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateExpenseController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      expenseId,
      expenseAmount,
      expenseDescription,
      expensePaymentMethod,
      expenseImageUrl,
    } = req.body;
    const data = {
      expenseId,
      expenseDescription,
      expensePaymentMethod,
      expenseImageUrl,
      expenseAmount,
    };

    const existingExpense = await getExpenseByIdService(id, req.prisma);
    if (!existingExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const expense = await updateExpenseService(id, data, req.prisma);
    await deleteCloudinaryImageIfReplaced(
      existingExpense.expenseImageUrl,
      expenseImageUrl,
    );
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteExpenseController = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await deleteExpenseService(id, req.prisma);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    if (expense.expenseImageUrl) {
      await deleteCloudinaryImageByUrl(expense.expenseImageUrl);
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sumExpensesByPaymentMethodController = async (req, res) => {
  try {
    const { paymentMethod } = req.params;
    const total = await sumExpensesByPaymentMethod(paymentMethod, req.prisma);
    return res.status(200).json({ total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sumExpenseByMonthController = async (req, res) => {
  try {
    const { month, year } = req.params;
    const total = await sumExpenseByMonthService(
      month,
      year,
      req.prisma,
      tzOf(req),
    );
    return res.status(200).json({ total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

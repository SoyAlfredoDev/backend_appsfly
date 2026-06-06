import {
  createExpenseService,
  getExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
  sumExpensesByPaymentMethod,
  sumExpenseByMonthService,
} from "../services/expensesService.js";
import { deleteExpenseImageController } from "./cloudinary.control.js";

export const createExpenseController = async (req, res) => {
  try {
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
      expensePaymentMethod: expensePaymentMethod.toString(),
      expenseImageUrl,
      expenseAmount,
      createdByUserId: req.user.payload.id,
    };
    const expense = await createExpenseService(data, req.prisma);
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getExpensesController = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (month != null && year != null) {
      const result = await getExpensesService(req.prisma, month, year);
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
    const expense = await updateExpenseService(id, data, req.prisma);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteExpenseController = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await deleteExpenseService(id, req.prisma);
    if (expense.expenseImageUrl) {
      await deleteExpenseImageController(expense.expenseImageUrl);
    }
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
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
    const total = await sumExpenseByMonthService(month, year, req.prisma);
    return res.status(200).json({ total });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

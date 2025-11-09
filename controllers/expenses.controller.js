import { createExpenseService, getExpensesService, getExpenseByIdService, updateExpenseService, deleteExpenseService, sumExpensesByPaymentMethod } from '../services/expensesService.js';
import { deleteExpenseImageController } from './cloudinary.control.js';

export const createExpenseController = async (req, res) => {
    try {
        const { expenseId, expenseAmount, expenseDescription, expensePaymentMethod, expenseImageUrl } = req.body;

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
}

export const getExpensesController = async (req, res) => {
    try {
        const expenses = await getExpensesService(req.prisma);
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getExpenseByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await getExpenseByIdService(id, req.prisma);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        return res.status(200).json(expense);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

export const updateExpenseController = async (req, res) => {
    try {
        const { id } = req.params;
        const { expenseId, expenseAmount, expenseDescription, expensePaymentMethod, expenseImageUrl } = req.body;
        const data = {
            expenseId,
            expenseDescription,
            expensePaymentMethod,
            expenseImageUrl,
            expenseAmount,
        };
        const expense = await updateExpenseService(id, data, req.prisma);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
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
            return res.status(404).json({ error: 'Expense not found' });
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
}

import { createCashExpense, getCashExpenses } from "../services/cashExpenseService.js";

export const createCashExpenseController = async (req, res) => {
    try {
        const cashExpenseData = req.body;
        const newCashExpense = await createCashExpense(cashExpenseData, req.prisma);
        res.status(201).json(newCashExpense);
    } catch (error) {
        console.error("(cashExpense.controller.js): Error creating cash expense:", error);
        res.status(500).json({ message: "Internal server error" });

    }
    res.send('Create Cash Expense');
}

export const getCashExpensesController = async (req, res) => {
    try {
        const cashExpenses = await getCashExpenses(req.prisma);
        res.status(200).json(cashExpenses);
    } catch (error) {
        console.error("(cashExpense.controller.js): Error getting cash expenses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

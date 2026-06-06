import { createTransaction, getTransactions } from "../services/transactionsService.js";

// Create a transaction
export const createTransactionController = async (req, res) => {
    try {
        const { transactionId, transactionType, transactionMethod, transactionTable, transactionRecordId, transactionNewValue, transactionDescription } = req.body;
        const data = {
            transactionId,
            transactionType,
            transactionMethod,
            transactionTable,
            transactionRecordId,
            transactionOldValue: null,
            transactionNewValue,
            transactionDescription,
            createdByUserId: req.user.payload.id

        }
        const newTransaction = await createTransaction(data, req.prisma);
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error("(transactions.controller.js): Error creating transaction:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all transactions
export const getTransactionsController = async (req, res) => {
    try {
        const transactions = await getTransactions(req.prisma);
        res.status(200).json(transactions);
    } catch (error) {
        console.error("(transactions.controller.js): Error fetching transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

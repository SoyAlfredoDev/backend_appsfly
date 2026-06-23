import {
    getTransactions,
    getTransactionById,
    getTransactionsSummary,
    getCashAvailableDetail,
} from "../services/transactionsService.js";
import {
    recordFinancialTransaction,
    TRANSACTION_TYPES,
    TRANSACTION_DIRECTIONS,
} from "../services/financial/financialLedgerService.js";

export const createTransactionController = async (req, res) => {
    try {
        const {
            transactionId,
            transactionType = TRANSACTION_TYPES.ADJUSTMENT,
            transactionMethod,
            transactionDescription,
            transactionNewValue,
            direction,
            amount,
        } = req.body;

        const userId = req.user.payload.id;
        const numericAmount =
            amount != null
                ? Number(amount)
                : typeof transactionNewValue === "number"
                  ? Number(transactionNewValue)
                  : Number(transactionNewValue?.amount ?? 0);

        const resolvedDirection =
            direction === TRANSACTION_DIRECTIONS.OUT ||
            direction === "OUT" ||
            numericAmount < 0
                ? TRANSACTION_DIRECTIONS.OUT
                : TRANSACTION_DIRECTIONS.IN;

        const recordId = transactionId ?? req.body.transactionRecordId;

        const newTransaction = await recordFinancialTransaction(req.prisma, {
            transactionId: recordId,
            transactionType,
            transactionMethod,
            transactionTable: "Transactions",
            transactionRecordId: recordId,
            amount: numericAmount,
            direction: resolvedDirection,
            description: transactionDescription,
            createdByUserId: userId,
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error("(transactions.controller.js): Error creating transaction:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getTransactionsController = async (req, res) => {
    try {
        const transactions = await getTransactions(req.prisma);
        res.status(200).json(transactions);
    } catch (error) {
        console.error("(transactions.controller.js): Error fetching transactions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getTransactionByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await getTransactionById(id, req.prisma);
        if (!transaction) {
            return res.status(404).json({ error: "Transacción no encontrada" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        console.error("(transactions.controller.js): Error fetching transaction by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getTransactionsSummaryController = async (req, res) => {
    try {
        const summary = await getTransactionsSummary(req.prisma);
        res.status(200).json(summary);
    } catch (error) {
        console.error("(transactions.controller.js): Error fetching summary:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCashAvailableDetailController = async (req, res) => {
    try {
        const detail = await getCashAvailableDetail(req.prisma);
        res.status(200).json(detail);
    } catch (error) {
        console.error("(transactions.controller.js): Error fetching cash detail:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

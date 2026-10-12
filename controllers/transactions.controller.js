import { randomUUID } from "node:crypto";
import {
    getTransactions,
    getTransactionById,
    getTransactionsSummary,
    getCashAvailableDetail,
} from "../services/transactionsService.js";
import { recordFinancialTransaction } from "../services/financial/financialLedgerService.js";
import { parseManualMovement } from "../services/financial/cashBook.js";

export const createTransactionController = async (req, res) => {
    try {
        const movement = parseManualMovement(req.body);
        const userId = req.user.payload.id;
        const recordId = req.body.transactionId ?? randomUUID();

        const newTransaction = await recordFinancialTransaction(req.prisma, {
            transactionId: recordId,
            transactionType: movement.transactionType,
            transactionMethod: movement.transactionMethod,
            transactionTable: "Transactions",
            transactionRecordId: recordId,
            amount: movement.amount,
            direction: movement.direction,
            description: movement.description,
            createdByUserId: userId,
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error("(transactions.controller.js): Error creating transaction:", error);
        const status = error.status ?? 500;
        res.status(status).json({
            code: error.code ?? "TRANSACTION_CREATE_FAILED",
            message: error.message || "No se pudo registrar el movimiento",
        });
    }
};

export const getTransactionsController = async (req, res) => {
    try {
        const transactions = await getTransactions(req.prisma, {
            page: req.query.page,
            limit: req.query.limit,
            q: req.query.q,
            method: req.query.method,
            type: req.query.type,
            from: req.query.from,
            to: req.query.to,
            timeZone: req.businessTimezone,
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.error("(transactions.controller.js): Error fetching transactions:", error);
        const status = error.status ?? 500;
        res.status(status).json({
            code: error.code ?? "TRANSACTIONS_FETCH_FAILED",
            message: error.message || "No se pudieron cargar los movimientos",
        });
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
        const summary = await getTransactionsSummary(
            req.prisma,
            req.businessTimezone,
        );
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

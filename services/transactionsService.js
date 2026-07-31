import { sumPaymentsByPaymentMethodsService } from "./paymentsService.js";
import { sumExpensesByPaymentMethod } from "./expensesService.js";
import {
    businessMonthBoundsUtc,
    DEFAULT_BUSINESS_TIMEZONE,
    getTodayBusinessDate,
} from "../libs/businessTimezone.js";
import { normalizePagination, paginatedResult } from "../libs/pagination.js";

const CASH_PAYMENT_METHOD = "2";
const CASH_DETAIL_LIMIT = 100;

const transactionInclude = {
    user: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
};

export const getTransactions = async (prisma, options = {}) => {
    try {
        const { page, limit, q, defaultLimit = 50, maxLimit = 100 } = options;
        const { skip, take, page: safePage, limit: safeLimit } = normalizePagination({
            page,
            limit,
            defaultLimit,
            maxLimit,
        });

        const query = typeof q === "string" ? q.trim() : "";
        const where = query
            ? {
                OR: [
                    { transactionType: { contains: query, mode: "insensitive" } },
                    { transactionDescription: { contains: query, mode: "insensitive" } },
                    { transactionMethod: { contains: query, mode: "insensitive" } },
                ],
            }
            : {};

        const [total, rows] = await Promise.all([
            prisma.transactions.count({ where }),
            prisma.transactions.findMany({
                where,
                orderBy: { createdAt: "desc" },
                include: transactionInclude,
                skip,
                take,
            }),
        ]);

        return paginatedResult(rows, total, safePage, safeLimit);
    } catch (error) {
        console.error("(transactionsService.js): Error fetching transactions:", error);
        throw error;
    }
};

export const getTransactionById = async (id, prisma) => {
    try {
        return prisma.transactions.findUnique({
            where: { transactionId: id },
            include: transactionInclude,
        });
    } catch (error) {
        console.error("(transactionsService.js): Error fetching transaction by ID:", error);
        throw error;
    }
};

export const createTransaction = async (data, prisma) => {
    try {
        return prisma.transactions.create({
            data,
            include: transactionInclude,
        });
    } catch (error) {
        console.error("(transactionsService.js): Error creating transaction:", error);
        throw error;
    }
};

export const getTransactionsSummary = async (
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    const today = getTodayBusinessDate(timeZone);
    const [year, month] = today.split("-").map(Number);
    const { start: monthStart, endExclusive: monthEnd } = businessMonthBoundsUtc(
        year,
        month,
        timeZone,
    );

    const [monthRows, movementCount, cashPayments, cashExpenses] = await Promise.all([
        prisma.transactions.findMany({
            where: { createdAt: { gte: monthStart, lt: monthEnd } },
            select: { transactionNewValue: true },
        }),
        prisma.transactions.count(),
        sumPaymentsByPaymentMethodsService(CASH_PAYMENT_METHOD, prisma),
        sumExpensesByPaymentMethod(CASH_PAYMENT_METHOD, prisma),
    ]);

    let totalInMonth = 0;
    let totalOutMonth = 0;

    for (const row of monthRows) {
        const { amount, direction } = parseStoredAmount(row.transactionNewValue);
        if (direction === "OUT") totalOutMonth += amount;
        else totalInMonth += amount;
    }

    return {
        cashAvailable: Number(cashPayments) - Number(cashExpenses),
        totalInMonth,
        totalOutMonth,
        movementCount,
        month,
        year,
    };
};

export async function getCashAvailableDetail(prisma) {
    const [payments, expenses, cashPaymentsAgg, cashExpensesAgg] = await Promise.all([
        prisma.payment.findMany({
            where: { paymentMethod: CASH_PAYMENT_METHOD },
            orderBy: { createdAt: "desc" },
            take: CASH_DETAIL_LIMIT,
            include: {
                Sale: { select: { saleId: true, saleNumber: true } },
                user: {
                    select: {
                        userFirstName: true,
                        userLastName: true,
                    },
                },
            },
        }),
        prisma.expense.findMany({
            where: { expensePaymentMethod: CASH_PAYMENT_METHOD },
            orderBy: { createdAt: "desc" },
            take: CASH_DETAIL_LIMIT,
            include: {
                user: {
                    select: {
                        userFirstName: true,
                        userLastName: true,
                    },
                },
            },
        }),
        sumPaymentsByPaymentMethodsService(CASH_PAYMENT_METHOD, prisma),
        sumExpensesByPaymentMethod(CASH_PAYMENT_METHOD, prisma),
    ]);

    const cashPaymentsTotal = Number(cashPaymentsAgg) || 0;
    const cashExpensesTotal = Number(cashExpensesAgg) || 0;

    return {
        cashAvailable: cashPaymentsTotal - cashExpensesTotal,
        cashPaymentsTotal,
        cashExpensesTotal,
        truncated: true,
        recentLimit: CASH_DETAIL_LIMIT,
        payments: payments.map((row) => ({
            id: row.paymentId,
            date: row.createdAt,
            amount: row.paymentAmount,
            origin: "Pago de venta",
            description: row.Sale?.saleNumber
                ? `Venta #${row.Sale.saleNumber}`
                : "Pago en efectivo",
            saleId: row.Sale?.saleId ?? row.saleId,
            user: row.user,
        })),
        expenses: expenses.map((row) => ({
            id: row.expenseId,
            date: row.createdAt,
            amount: row.expenseAmount,
            origin: "Gasto operacional",
            description: row.expenseDescription?.trim() || "Gasto en efectivo",
            user: row.user,
        })),
    };
}

function parseStoredAmount(value) {
    if (value == null) return { amount: 0, direction: "IN" };
    if (typeof value === "number") {
        return {
            amount: Math.abs(value),
            direction: value >= 0 ? "IN" : "OUT",
        };
    }
    if (typeof value === "object") {
        return {
            amount: Math.abs(Number(value.amount) || 0),
            direction: value.direction === "OUT" ? "OUT" : "IN",
        };
    }
    return { amount: 0, direction: "IN" };
}

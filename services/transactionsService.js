import { sumPaymentsByPaymentMethodsService } from "./paymentsService.js";
import { sumExpensesByPaymentMethod } from "./expensesService.js";

const CASH_PAYMENT_METHOD = "2";

const transactionInclude = {
    user: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
};

export const getTransactions = async (prisma) => {
    try {
        return prisma.transactions.findMany({
            orderBy: { createdAt: "desc" },
            include: transactionInclude,
        });
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

export const getTransactionsSummary = async (prisma) => {
    const rows = await getTransactions(prisma);
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    let totalInMonth = 0;
    let totalOutMonth = 0;

    for (const row of rows) {
        const created = new Date(row.createdAt);
        if (created < monthStart || created >= monthEnd) continue;

        const { amount, direction } = parseStoredAmount(row.transactionNewValue);
        if (direction === "OUT") totalOutMonth += amount;
        else totalInMonth += amount;
    }

    const [cashPayments, cashExpenses] = await Promise.all([
        sumPaymentsByPaymentMethodsService(CASH_PAYMENT_METHOD, prisma),
        sumExpensesByPaymentMethod(CASH_PAYMENT_METHOD, prisma),
    ]);

    return {
        cashAvailable: Number(cashPayments) - Number(cashExpenses),
        totalInMonth,
        totalOutMonth,
        movementCount: rows.length,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
    };
};

export async function getCashAvailableDetail(prisma) {
    const [payments, expenses] = await Promise.all([
        prisma.payment.findMany({
            where: { paymentMethod: CASH_PAYMENT_METHOD },
            orderBy: { createdAt: "desc" },
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
            include: {
                user: {
                    select: {
                        userFirstName: true,
                        userLastName: true,
                    },
                },
            },
        }),
    ]);

    const cashPaymentsTotal = payments.reduce(
        (sum, row) => sum + Number(row.paymentAmount ?? 0),
        0,
    );
    const cashExpensesTotal = expenses.reduce(
        (sum, row) => sum + Number(row.expenseAmount ?? 0),
        0,
    );

    return {
        cashAvailable: cashPaymentsTotal - cashExpensesTotal,
        cashPaymentsTotal,
        cashExpensesTotal,
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
};

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

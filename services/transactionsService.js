import {
    businessDayBoundsUtc,
    businessMonthBoundsUtc,
    DEFAULT_BUSINESS_TIMEZONE,
    getTodayBusinessDate,
} from "../libs/businessTimezone.js";
import { normalizePagination, paginatedResult } from "../libs/pagination.js";
import {
    assertLedgerFilter,
    CASH_PAYMENT_METHOD,
    parseStoredAmount,
    splitCashTotals,
    sumCashBalance,
    TRANSACTION_TYPES,
} from "./financial/cashBook.js";


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
        const method = options.method != null && options.method !== "" ? String(options.method) : "";
        const type = options.type != null && options.type !== "" ? String(options.type) : "";
        assertLedgerFilter(method, type);

        const where = {};
        if (query) {
            where.OR = [
                { transactionType: { contains: query, mode: "insensitive" } },
                { transactionDescription: { contains: query, mode: "insensitive" } },
                { transactionMethod: { contains: query, mode: "insensitive" } },
            ];
        }
        if (method) where.transactionMethod = method;
        if (type) where.transactionType = type;

        const timeZone = options.timeZone || DEFAULT_BUSINESS_TIMEZONE;
        const from = typeof options.from === "string" ? options.from.trim() : "";
        const to = typeof options.to === "string" ? options.to.trim() : "";
        if (from || to) {
            const startKey = from && to && from > to ? to : from || to;
            const endKey = from && to && from > to ? from : to || from;
            const { start } = businessDayBoundsUtc(startKey, timeZone);
            const { endExclusive } = businessDayBoundsUtc(endKey, timeZone);
            where.createdAt = { gte: start, lt: endExclusive };
        }

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

    const { start: dayStart, endExclusive: dayEnd } = businessDayBoundsUtc(today, timeZone);

    const [monthRows, movementCount, cashRows, todayPayments] = await Promise.all([
        prisma.transactions.findMany({
            where: { createdAt: { gte: monthStart, lt: monthEnd } },
            select: { transactionNewValue: true },
        }),
        prisma.transactions.count(),
        prisma.transactions.findMany({
            where: { transactionMethod: CASH_PAYMENT_METHOD },
            select: { transactionNewValue: true, transactionMethod: true },
        }),
        prisma.transactions.findMany({
            where: {
                transactionType: TRANSACTION_TYPES.PAYMENT,
                createdAt: { gte: dayStart, lt: dayEnd },
            },
            select: { transactionNewValue: true },
        }),
    ]);

    let totalInMonth = 0;
    let totalOutMonth = 0;

    for (const row of monthRows) {
        const { amount, direction } = parseStoredAmount(row.transactionNewValue);
        if (direction === "OUT") totalOutMonth += amount;
        else totalInMonth += amount;
    }

    let collectedToday = 0;
    for (const row of todayPayments) {
        const { amount, direction } = parseStoredAmount(row.transactionNewValue);
        if (direction === "IN") collectedToday += amount;
    }

    return {
        cashAvailable: sumCashBalance(cashRows),
        collectedToday,
        totalInMonth,
        totalOutMonth,
        movementCount,
        month,
        year,
    };
};

const CASH_ORIGIN = {
    PAYMENT: "Cobro de venta",
    EXPENSE: "Gasto",
    PURCHASE: "Compra de contado",
    PURCHASE_CANCEL: "Anulación de compra",
    ADJUSTMENT: "Ajuste",
    OPENING: "Fondo inicial",
    WITHDRAWAL: "Retiro a banco",
    OTHER_INCOME: "Otro ingreso",
    SUPPLIER_PAYMENT: "Pago a proveedor",
};

export async function getCashAvailableDetail(prisma) {
    const cashWhere = { transactionMethod: CASH_PAYMENT_METHOD };
    const [rows, totalRows] = await Promise.all([
        prisma.transactions.findMany({
            where: cashWhere,
            orderBy: { createdAt: "desc" },
            take: CASH_DETAIL_LIMIT,
            include: transactionInclude,
        }),
        prisma.transactions.findMany({
            where: cashWhere,
            select: { transactionMethod: true, transactionNewValue: true },
        }),
    ]);
    const totals = splitCashTotals(totalRows);
    const mapRow = (row) => {
        const parsed = parseStoredAmount(row.transactionNewValue);
        const saleId =
            row.transactionNewValue && typeof row.transactionNewValue === "object"
                ? row.transactionNewValue.saleId ?? null
                : null;
        return {
            id: row.transactionId,
            date: row.createdAt,
            amount: parsed.amount,
            origin: CASH_ORIGIN[row.transactionType] ?? "Movimiento",
            description: row.transactionDescription?.trim() || "Movimiento en efectivo",
            saleId,
            user: row.user,
        };
    };

    return {
        cashAvailable: totals.balance,
        cashPaymentsTotal: totals.cashIn,
        cashExpensesTotal: totals.cashOut,
        truncated: totalRows.length > CASH_DETAIL_LIMIT,
        recentLimit: CASH_DETAIL_LIMIT,
        payments: rows
            .filter((row) => parseStoredAmount(row.transactionNewValue).direction === "IN")
            .map(mapRow),
        expenses: rows
            .filter((row) => parseStoredAmount(row.transactionNewValue).direction === "OUT")
            .map(mapRow),
    };
}

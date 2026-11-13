import { randomUUID } from 'crypto';
import { getDailySaleByDateService } from './dailySalesService.js';
import { businessDayBoundsUtc, DEFAULT_BUSINESS_TIMEZONE } from '../libs/businessTimezone.js';
import { parseClosureDay } from './financial/dailyClosure.js';
import {
    CASH_PAYMENT_METHOD,
    closureSnapshot,
    CashBookError,
    parseCountedCash,
    sumCashBalance,
} from './financial/cashBook.js';

function sumPaymentsByMethod(payments, method) {
    return payments
        .filter((p) => p.paymentMethod === String(method))
        .reduce((acc, p) => acc + (p.paymentAmount || 0), 0);
}

export async function buildDailyClosurePayload(
    dailySalesDay,
    createdByUserId,
    prisma,
    dailySalesId = randomUUID(),
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const { start, endExclusive } = businessDayBoundsUtc(dailySalesDay, timeZone);
    const createdAt = { gte: start, lt: endExclusive };
    const [salesCount, payments, detailTotals] = await Promise.all([
        prisma.sale.count({ where: { createdAt } }),
        prisma.payment.findMany({
            where: { createdAt },
            select: { paymentMethod: true, paymentAmount: true },
        }),
        prisma.saleDetail.aggregate({
            where: { sale: { createdAt } },
            _sum: { saleDetailTotal: true },
        }),
    ]);
    const totalSales = detailTotals._sum.saleDetailTotal ?? 0;
    const totalIncome = payments.reduce((total, payment) => total + payment.paymentAmount, 0);

    return {
        dailySalesId,
        dailySalesDay,
        dailySalesNumberOfSales: salesCount,
        dailySalesTotalSales: totalSales,
        dailySalesTotalIncome: totalIncome,
        dailySalesDetailIncome: {
            0: sumPaymentsByMethod(payments, 0),
            1: sumPaymentsByMethod(payments, 1),
            2: sumPaymentsByMethod(payments, 2),
            3: sumPaymentsByMethod(payments, 3),
        },
        createdByUserId,
    };
}

async function expectedCashForDay(prisma, dailySalesDay, timeZone) {
    const { endExclusive } = businessDayBoundsUtc(dailySalesDay, timeZone);
    const rows = await prisma.transactions.findMany({
        where: {
            transactionMethod: CASH_PAYMENT_METHOD,
            createdAt: { lt: endExclusive },
        },
        select: { transactionMethod: true, transactionNewValue: true },
    });
    return sumCashBalance(rows);
}

export async function createDailyClosureForDate({
    dailySalesDay,
    createdByUserId,
    prisma,
    dailySalesId,
    countedCash,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
}) {
    const day = parseClosureDay(dailySalesDay, timeZone);
    const counted = parseCountedCash(countedCash);

    return prisma.$transaction(async (tx) => {
        const duplicate = () => new CashBookError(400, 'DUPLICATE_DATE', `Ya existe un cierre para ${day}.`);
        if (await getDailySaleByDateService(day, tx)) throw duplicate();

        const data = await buildDailyClosurePayload(day, createdByUserId, tx, dailySalesId, timeZone);
        if (data.dailySalesNumberOfSales === 0) {
            throw new CashBookError(400, 'NO_SALES', `No hay ventas registradas para ${day}. No se puede generar cierre.`);
        }

        const expected = await expectedCashForDay(tx, day, timeZone);
        const record = { ...data, ...closureSnapshot(expected, counted) };
        const { count } = await tx.dailySales.createMany({ data: [record], skipDuplicates: true });
        if (!count) {
            if (await getDailySaleByDateService(day, tx)) throw duplicate();
            throw new CashBookError(409, 'CLOSURE_ID_CONFLICT', 'Ya existe un cierre con ese identificador.');
        }
        return tx.dailySales.findUniqueOrThrow({ where: { dailySalesId: record.dailySalesId } });
    });
}

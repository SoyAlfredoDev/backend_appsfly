import { randomUUID } from 'crypto';
import { createDailySaleService, getDailySaleByDateService } from './dailySalesService.js';
import { getSalesByDate } from './salesServices.js';
import { getPaymentByDateService } from './paymentsService.js';
import { getSaleDetailByDate } from './saleDetailsService.js';
import { businessDateHasSales } from '../libs/businessSalesDate.js';
import { DEFAULT_BUSINESS_TIMEZONE } from '../libs/businessTimezone.js';

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
    const [salesCount, payments, saleDetails] = await Promise.all([
        getSalesByDate(dailySalesDay, dailySalesDay, prisma, timeZone),
        getPaymentByDateService(dailySalesDay, dailySalesDay, prisma, timeZone),
        getSaleDetailByDate(dailySalesDay, dailySalesDay, prisma, timeZone),
    ]);

    const safePayments = Array.isArray(payments) ? payments : [];
    const safeDetails = Array.isArray(saleDetails) ? saleDetails : [];

    const totalSales = safeDetails.reduce((acc, s) => acc + (s.saleDetailTotal || 0), 0);
    const totalIncome = safePayments.reduce((acc, p) => acc + (p.paymentAmount || 0), 0);

    return {
        dailySalesId,
        dailySalesDay,
        dailySalesNumberOfSales: Array.isArray(salesCount) ? salesCount.length : 0,
        dailySalesTotalSales: totalSales,
        dailySalesTotalIncome: totalIncome,
        dailySalesDetailIncome: {
            0: sumPaymentsByMethod(safePayments, 0),
            1: sumPaymentsByMethod(safePayments, 1),
            2: sumPaymentsByMethod(safePayments, 2),
            3: sumPaymentsByMethod(safePayments, 3),
        },
        createdByUserId,
    };
}

export async function createDailyClosureForDate({
    dailySalesDay,
    createdByUserId,
    prisma,
    dailySalesId,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
}) {
    const normalizedDay = String(dailySalesDay ?? '').trim();
    if (!normalizedDay) {
        const err = new Error('Fecha de cierre inválida.');
        err.code = 'INVALID_DATE';
        throw err;
    }

    const hasSales = await businessDateHasSales(prisma, normalizedDay, timeZone);
    if (!hasSales) {
        const err = new Error(`No hay ventas registradas para ${normalizedDay}. No se puede generar cierre.`);
        err.code = 'NO_SALES';
        throw err;
    }

    const existing = await getDailySaleByDateService(normalizedDay, prisma);
    if (existing) {
        const err = new Error(`Ya existe un cierre para ${normalizedDay}.`);
        err.code = 'DUPLICATE_DATE';
        throw err;
    }

    const data = await buildDailyClosurePayload(
        normalizedDay,
        createdByUserId,
        prisma,
        dailySalesId ?? randomUUID(),
        timeZone,
    );

    return createDailySaleService(data, prisma);
}

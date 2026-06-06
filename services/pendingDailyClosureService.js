import { getDailySaleByDateService } from './dailySalesService.js';
import {
    getTodayBusinessDate,
    getBusinessDateFromDate,
} from '../libs/businessDate.js';
import { createDailyClosureForDate } from './dailySalesClosureService.js';

/**
 * Determina si el negocio puede registrar ventas hoy.
 *
 * Reglas:
 * 1. Si hoy ya tiene cierre diario → bloqueado (DAY_CLOSED).
 * 2. Si el último día con ventas (excluyendo hoy) no tiene cierre → bloqueado (BLOQUEO_CIERRE_PENDIENTE).
 * 3. Sin ventas previas o último día cerrado → permitido.
 */
export async function getPendingClosureStatus(prisma) {
    const today = getTodayBusinessDate();
    const fechasPendientes = await getAllPendingClosureDates(prisma);

    const todayClosure = await getDailySaleByDateService(today, prisma);
    if (todayClosure) {
        return {
            blocked: true,
            error: 'DAY_CLOSED',
            fechaPendiente: today,
            fechasPendientes,
            message: 'Ya se realizó el cierre de caja para hoy. No es posible generar nuevas ventas.',
        };
    }

    const lastActivityDate = await getLastActivityDateBeforeToday(prisma, today);

    if (!lastActivityDate) {
        return {
            blocked: false,
            error: null,
            fechaPendiente: null,
            fechasPendientes,
            message: null,
        };
    }

    const priorClosure = await getDailySaleByDateService(lastActivityDate, prisma);
    if (priorClosure) {
        return {
            blocked: false,
            error: null,
            fechaPendiente: null,
            fechasPendientes,
            message: null,
        };
    }

    return {
        blocked: true,
        error: 'BLOQUEO_CIERRE_PENDIENTE',
        fechaPendiente: lastActivityDate,
        fechasPendientes,
        message: `Se requiere el cierre diario del día ${lastActivityDate} antes de registrar nuevas ventas.`,
    };
}

/** Días con ventas (antes de hoy) que aún no tienen registro en DailySales. */
export async function getAllPendingClosureDates(prisma) {
    const today = getTodayBusinessDate();

    const rows = await prisma.$queryRaw`
        SELECT DISTINCT TO_CHAR(
            ("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE 'America/Santiago',
            'YYYY-MM-DD'
        ) AS sale_date
        FROM "Sale"
        WHERE TO_CHAR(
            ("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE 'America/Santiago',
            'YYYY-MM-DD'
        ) < ${today}
    `;

    const datesWithSales = new Set(
        rows.map((row) => row.sale_date).filter(Boolean),
    );

    if (datesWithSales.size === 0) {
        return [];
    }

    const existingClosures = await prisma.dailySales.findMany({
        where: {
            dailySalesDay: { in: [...datesWithSales] },
        },
        select: { dailySalesDay: true },
    });

    const closedDates = new Set(existingClosures.map((c) => c.dailySalesDay));

    return [...datesWithSales]
        .filter((date) => !closedDates.has(date))
        .sort();
}

export async function closeAllPendingClosures(prisma, userId) {
    const pendingDates = await getAllPendingClosureDates(prisma);
    const closed = [];
    const skipped = [];

    for (const dailySalesDay of pendingDates) {
        try {
            const record = await createDailyClosureForDate({
                dailySalesDay,
                createdByUserId: userId,
                prisma,
            });
            closed.push({ dailySalesDay, dailySalesId: record.dailySalesId });
        } catch (error) {
            if (error.code === 'DUPLICATE_DATE') {
                skipped.push({ dailySalesDay, reason: error.message });
            } else {
                throw error;
            }
        }
    }

    return {
        closedCount: closed.length,
        skippedCount: skipped.length,
        closed,
        skipped,
        pendingDates,
    };
}

async function getLastActivityDateBeforeToday(prisma, today) {
    const recentSales = await prisma.sale.findMany({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
        take: 100,
    });

    for (const sale of recentSales) {
        const saleDate = getBusinessDateFromDate(sale.createdAt);
        if (saleDate < today) {
            return saleDate;
        }
    }

    return null;
}

export async function assertSalesAllowed(prisma) {
    const status = await getPendingClosureStatus(prisma);
    if (!status.blocked) {
        return status;
    }

    const err = new Error(status.message);
    err.statusCode = 403;
    err.code = status.error;
    err.fechaPendiente = status.fechaPendiente;
    throw err;
}

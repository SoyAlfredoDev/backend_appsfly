import { closureToday } from './financial/dailyClosure.js';
import { getDailySaleByDateService } from './dailySalesService.js';
import {
    businessDayBoundsUtc,
    DEFAULT_BUSINESS_TIMEZONE,
    sanitizeTimezone,
} from '../libs/businessTimezone.js';
import { createDailyClosureForDate } from './dailySalesClosureService.js';

/** Estado de la fecha operativa y de los cierres anteriores pendientes. */
export async function getPendingClosureStatus(prisma, timeZone = DEFAULT_BUSINESS_TIMEZONE) {
    const today = closureToday(timeZone);
    const [todayClosure, fechasPendientes] = await Promise.all([
        getDailySaleByDateService(today, prisma),
        getAllPendingClosureDates(prisma, timeZone, today),
    ]);
    const fechaPendiente = fechasPendientes.at(-1) ?? null;
    if (todayClosure) {
        return {
            blocked: true,
            error: 'DAY_CLOSED',
            fechaPendiente: today,
            fechasPendientes,
            message: 'Ya se realizó el cierre de caja para hoy. No es posible generar nuevas ventas.',
        };
    }

    return {
        blocked: Boolean(fechaPendiente),
        error: fechaPendiente ? 'BLOQUEO_CIERRE_PENDIENTE' : null,
        fechaPendiente,
        fechasPendientes,
        message: fechaPendiente
            ? `Se requiere el cierre diario del día ${fechaPendiente} antes de registrar nuevas ventas.`
            : null,
    };
}

/** Días con ventas (antes de hoy) que aún no tienen un cierre para ese día. */
export async function getAllPendingClosureDates(
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
    today = closureToday(timeZone),
) {
    const tz = sanitizeTimezone(timeZone);
    const { start } = businessDayBoundsUtc(today, tz);
    const rows = await prisma.$queryRaw`
        WITH sale_days AS (
            SELECT DISTINCT TO_CHAR(
                ("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE ${tz},
                'YYYY-MM-DD'
            ) AS day
            FROM "Sale"
            WHERE "createdAt" < ${start}
        )
        SELECT day FROM sale_days
        WHERE NOT EXISTS (
            SELECT 1 FROM "DailySales"
            WHERE LEFT("dailySalesDay", 10) = sale_days.day
        )
        ORDER BY day
    `;
    return rows.map(({ day }) => day);
}

export async function closeAllPendingClosures(
    prisma,
    userId,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const pendingDates = await getAllPendingClosureDates(prisma, timeZone);
    const closed = [];
    const skipped = [];

    for (const dailySalesDay of pendingDates) {
        try {
            const record = await createDailyClosureForDate({
                dailySalesDay,
                createdByUserId: userId,
                prisma,
                timeZone,
            });
            closed.push({ dailySalesDay, dailySalesId: record.dailySalesId });
        } catch (error) {
            if (error.code === 'DUPLICATE_DATE' || error.code === 'NO_SALES') {
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

export async function assertSalesAllowed(
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const status = await getPendingClosureStatus(prisma, timeZone);
    if (!status.blocked) {
        return status;
    }

    const err = new Error(status.message);
    err.statusCode = 403;
    err.code = status.error;
    err.fechaPendiente = status.fechaPendiente;
    throw err;
}

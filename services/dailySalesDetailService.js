import { getPaymentByDateService } from './paymentsService.js';
import {
    applyHourlySale,
    businessDayBoundsUtc,
    closureDayKey,
    DEFAULT_BUSINESS_TIMEZONE,
    hourInTimezone,
} from '../libs/businessTimezone.js';

/**
 * Detalle de un cierre diario: ventas del día operativo del negocio,
 * desglose horario y totales del registro de cierre.
 */
export async function getDailySaleDetailService(
    id,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const closure = await prisma.dailySales.findUnique({
        where: { dailySalesId: id },
        include: {
            user: {
                select: {
                    userFirstName: true,
                    userLastName: true,
                },
            },
        },
    });

    if (!closure) return null;

    const day = closureDayKey(closure.dailySalesDay);
    let sales = [];
    if (day) {
        const { start, endInclusive } = businessDayBoundsUtc(day, timeZone);
        sales = await prisma.sale.findMany({
            where: {
                createdAt: { gte: start, lte: endInclusive },
            },
            include: {
                customer: {
                    select: {
                        customerFirstName: true,
                        customerLastName: true,
                    },
                },
                Payment: true,
                SaleDetail: {
                    select: {
                        saleDetailTotal: true,
                        saleDetailQuantity: true,
                    },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
    }

    const payments = day ? await getPaymentByDateService(day, day, prisma, timeZone) : [];

    const hourlySales = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        label: `${String(hour).padStart(2, '0')}:00`,
        total: 0,
        count: 0,
    }));

    const salesSummary = sales.map((sale) => {
        const details = Array.isArray(sale.SaleDetail) ? sale.SaleDetail : [];
        const salePayments = Array.isArray(sale.Payment) ? sale.Payment : [];
        const saleTotal = details.reduce((acc, item) => acc + (item.saleDetailTotal || 0), 0);
        const paid = salePayments.reduce((acc, payment) => acc + (payment.paymentAmount || 0), 0);
        applyHourlySale(
            hourlySales,
            hourInTimezone(new Date(sale.createdAt), timeZone),
            saleTotal,
        );

        return {
            saleId: sale.saleId,
            saleNumber: sale.saleNumber,
            createdAt: sale.createdAt,
            customerName: `${sale.customer?.customerFirstName ?? ''} ${sale.customer?.customerLastName ?? ''}`.trim(),
            saleTotal,
            paid,
            pending: saleTotal - paid,
            itemsCount: details.reduce((acc, item) => acc + (item.saleDetailQuantity || 0), 0),
        };
    });

    const activeHours = hourlySales.filter((h) => h.total > 0);

    return {
        closure,
        sales: salesSummary,
        payments: payments ?? [],
        hourlySales:
            activeHours.length > 0
                ? hourlySales
                : hourlySales.filter((h) => h.hour >= 8 && h.hour <= 22),
        totals: {
            sales: closure.dailySalesTotalSales ?? 0,
            income: closure.dailySalesTotalIncome ?? 0,
            pending:
                (closure.dailySalesTotalSales ?? 0) -
                (closure.dailySalesTotalIncome ?? 0),
            transactions: closure.dailySalesNumberOfSales ?? 0,
        },
        meta: { timeZone, day },
    };
}

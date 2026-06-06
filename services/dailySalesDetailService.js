import { getDailySaleByIdService } from './dailySalesService.js';
import { getPaymentByDateService } from './paymentsService.js';

const BUSINESS_TIMEZONE = 'America/Santiago';

function dayBounds(dateStr) {
    const start = new Date(`${dateStr}T00:00:00.000Z`);
    const end = new Date(`${dateStr}T23:59:59.999Z`);
    return { start, end };
}

function hourInBusinessTz(date) {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: BUSINESS_TIMEZONE,
        hour: 'numeric',
        hour12: false,
    }).formatToParts(date);
    return Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
}

export async function getDailySaleDetailService(id, prisma) {
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

    const day = closure.dailySalesDay;
    const { start, end } = dayBounds(day);

    const sales = await prisma.sale.findMany({
        where: {
            createdAt: { gte: start, lte: end },
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

    const payments = await getPaymentByDateService(day, day, prisma);

    const hourlySales = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        label: `${String(hour).padStart(2, '0')}:00`,
        total: 0,
        count: 0,
    }));

    const salesSummary = sales.map((sale) => {
        const saleTotal = sale.SaleDetail.reduce(
            (acc, d) => acc + (d.saleDetailTotal || 0),
            0,
        );
        const paid = sale.Payment.reduce(
            (acc, p) => acc + (p.paymentAmount || 0),
            0,
        );
        const hour = hourInBusinessTz(new Date(sale.createdAt));
        hourlySales[hour].total += saleTotal;
        hourlySales[hour].count += 1;

        return {
            saleId: sale.saleId,
            saleNumber: sale.saleNumber,
            createdAt: sale.createdAt,
            customerName: `${sale.customer?.customerFirstName ?? ''} ${sale.customer?.customerLastName ?? ''}`.trim(),
            saleTotal,
            paid,
            pending: saleTotal - paid,
            itemsCount: sale.SaleDetail.reduce(
                (acc, d) => acc + (d.saleDetailQuantity || 0),
                0,
            ),
        };
    });

    const activeHours = hourlySales.filter((h) => h.total > 0);

    return {
        closure,
        sales: salesSummary,
        payments: payments ?? [],
        hourlySales: activeHours.length > 0 ? hourlySales : hourlySales.filter((h) => h.hour >= 8 && h.hour <= 22),
        totals: {
            sales: closure.dailySalesTotalSales ?? 0,
            income: closure.dailySalesTotalIncome ?? 0,
            pending: (closure.dailySalesTotalSales ?? 0) - (closure.dailySalesTotalIncome ?? 0),
            transactions: closure.dailySalesNumberOfSales ?? 0,
        },
    };
}

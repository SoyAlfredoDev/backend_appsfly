import { getTodayBusinessDate } from '../libs/businessDate.js';
import {
    businessDateRangeBoundsUtc,
    businessDayBoundsUtc,
    businessMonthBoundsUtc,
    DEFAULT_BUSINESS_TIMEZONE,
} from '../libs/businessTimezone.js';
import { normalizePagination, paginatedResult } from '../libs/pagination.js';

const SALE_LIST_INCLUDE = {
    customer: {
        select: {
            customerId: true,
            customerFirstName: true,
            customerLastName: true,
        },
    },
    user: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
    deliveredBy: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
    SaleDetail: {
        select: {
            saleDetailId: true,
            saleDetailTotal: true,
            saleDetailType: true,
        },
    },
    Payment: {
        select: {
            paymentId: true,
            paymentAmount: true,
        },
    },
};

function mapSaleListRow(salesOriginal) {
    const totalPayments = salesOriginal.Payment.reduce(
        (acc, payment) => acc + payment.paymentAmount,
        0,
    );
    const totalDetails = salesOriginal.SaleDetail.reduce(
        (acc, detail) => acc + detail.saleDetailTotal,
        0,
    );
    const saleDate = salesOriginal.createdAt.toLocaleDateString('es-CL');
    return {
        ...salesOriginal,
        saleTotalPayments: totalPayments,
        saleTotal: totalDetails,
        salePendingAmount: totalDetails - totalPayments,
        saleDate,
    };
}

export const createSale = async (data, prisma) => {
    try {
        const res = await prisma.sale.create({ data });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error creating sale:", error);
        throw error;
    }
};

export const getSales = async (prisma, options = {}) => {
    try {
        const {
            page,
            limit,
            q,
            deliveryStatus,
            deliveryByWorkOrders = false,
            defaultLimit = 50,
            maxLimit = 100,
        } = options;

        const { skip, take, page: safePage, limit: safeLimit } = normalizePagination({
            page,
            limit,
            defaultLimit,
            maxLimit,
        });

        const where = {};
        if (deliveryStatus && deliveryStatus !== 'all') {
            if (deliveryByWorkOrders) {
                // Óptica: pendiente = tiene OT no entregada; entregado = tiene OT y todas entregadas
                if (deliveryStatus === 'pending') {
                    where.WorkOrder = {
                        some: { workOrderStatus: { not: 'DELIVERED' } },
                    };
                } else {
                    where.AND = [
                        { WorkOrder: { some: {} } },
                        { WorkOrder: { none: { workOrderStatus: { not: 'DELIVERED' } } } },
                    ];
                }
            } else {
                where.saleDeliveryStatus =
                    deliveryStatus === 'pending' ? 'PENDING' : 'DELIVERED';
            }
        }

        const query = typeof q === 'string' ? q.trim() : '';
        if (query) {
            where.OR = [
                { saleNumber: { contains: query, mode: 'insensitive' } },
                {
                    customer: {
                        customerFirstName: { contains: query, mode: 'insensitive' },
                    },
                },
                {
                    customer: {
                        customerLastName: { contains: query, mode: 'insensitive' },
                    },
                },
                {
                    customer: {
                        customerDocumentNumber: { contains: query, mode: 'insensitive' },
                    },
                },
            ];
        }

        const [total, salesOriginal] = await Promise.all([
            prisma.sale.count({ where }),
            prisma.sale.findMany({
                where,
                include: SALE_LIST_INCLUDE,
                orderBy: { createdAt: 'desc' },
                skip,
                take,
            }),
        ]);

        return paginatedResult(
            salesOriginal.map(mapSaleListRow),
            total,
            safePage,
            safeLimit,
        );
    } catch (error) {
        console.error("(salesServices.js): Error getting sales:", error);
        throw error
    }
};

const DASHBOARD_SALE_VIEWS = new Set(['today', 'todayIncome', 'month', 'pending']);

export const getSalesForDashboardView = async (
    view,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    if (!DASHBOARD_SALE_VIEWS.has(view)) {
        const error = new Error('Vista de dashboard no válida');
        error.statusCode = 400;
        throw error;
    }

    try {
        const today = getTodayBusinessDate(timeZone);
        const [year, month] = today.split('-').map(Number);
        let where = {};

        if (view === 'today' || view === 'todayIncome') {
            const { start, endExclusive } = businessDayBoundsUtc(today, timeZone);
            where = { createdAt: { gte: start, lt: endExclusive } };
        } else {
            const { start, endExclusive } = businessMonthBoundsUtc(year, month, timeZone);
            where = { createdAt: { gte: start, lt: endExclusive } };
        }

        if (view === 'todayIncome') {
            where.saleTotalPayments = { gt: 0 };
        }
        if (view === 'pending') {
            where.salePendingAmount = { gt: 0 };
        }

        const salesOriginal = await prisma.sale.findMany({
            where,
            include: SALE_LIST_INCLUDE,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return salesOriginal.map(mapSaleListRow);
    } catch (error) {
        console.error("(salesServices.js): Error getting dashboard sales view:", error);
        throw error;
    }
};


export const getSaleById = async (id, prisma) => {
    try {
        const res = await prisma.sale.findUnique({
            where: { saleId: id },
            include: {
                customer: {
                    select: {
                        customerId: true,
                        customerFirstName: true,
                        customerLastName: true,
                        customerEmail: true,
                        customerCodePhoneNumber: true,
                        customerPhoneNumber: true,
                    }
                },
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true
                    }
                },
                deliveredBy: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    },
                },
                SaleDetail: {
                    select: {
                        saleDetailId: true,
                        saleDetailTotal: true,
                        saleDetailType: true,
                    },
                },
                Payment: {
                    select: {
                        paymentId: true,
                        paymentAmount: true,
                    },
                },
            }
        });
        if (!res) return null;

        const saleFinal = {
            ...res,
            saleTotalPayments: res.Payment.reduce((acc, payment) => acc + payment.paymentAmount, 0),
            saleTotal: res.SaleDetail.reduce((acc, detail) => acc + detail.saleDetailTotal, 0),
        };
        saleFinal.salePendingAmount = saleFinal.saleTotal - saleFinal.saleTotalPayments;
        return saleFinal;
    } catch (error) {
        console.error("(salesServices.js): Error getting sale by ID:", error);
        throw error;
    }
};

export const markSaleAsDelivered = async (saleId, userId, prisma) => {
    const sale = await prisma.sale.findUnique({
        where: { saleId },
        include: {
            SaleDetail: { select: { saleDetailType: true } },
        },
    });

    if (!sale) {
        const error = new Error("Venta no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    const hasProducts = sale.SaleDetail?.some(
        (detail) => detail.saleDetailType === "PRODUCT",
    );
    if (!hasProducts) {
        const error = new Error("Esta venta no incluye productos para entregar.");
        error.statusCode = 400;
        error.code = "NO_PRODUCTS_TO_DELIVER";
        throw error;
    }

    if (sale.saleDeliveryStatus !== "PENDING") {
        const error = new Error("La venta no está pendiente de entrega.");
        error.statusCode = 400;
        error.code = "INVALID_DELIVERY_STATUS";
        throw error;
    }

    return prisma.sale.update({
        where: { saleId },
        data: {
            saleDeliveryStatus: "DELIVERED",
            saleDeliveredAt: new Date(),
            saleDeliveredByUserId: userId,
        },
        include: {
            customer: {
                select: {
                    customerId: true,
                    customerFirstName: true,
                    customerLastName: true,
                },
            },
            user: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                },
            },
            deliveredBy: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                },
            },
            SaleDetail: {
                select: {
                    saleDetailId: true,
                    saleDetailTotal: true,
                    saleDetailType: true,
                },
            },
            Payment: {
                select: {
                    paymentId: true,
                    paymentAmount: true,
                },
            },
        },
    });
};

export const updateSale = async (id, data, prisma) => {
    try {
        const res = await prisma.sale.update({
            where: { id: Number(id) },
            data
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error updating sale:", error);
        throw error;
    }
};

export const deleteSale = async (id, prisma) => {
    try {
        const res = await prisma.sale.delete({
            where: { id: Number(id) }
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error deleting sale:", error);
        throw error;
    }
};

export const getMonthlySales = async (
    month,
    year,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    try {
        const { start, endExclusive } = businessMonthBoundsUtc(year, month, timeZone);
        const total = await prisma.sale.aggregate({
            _sum: {
                saleTotal: true,
            },
            where: {
                createdAt: {
                    gte: start,
                    lt: endExclusive,
                },
            },
        });
        const pendint = await prisma.sale.aggregate({
            _sum: {
                salePendingAmount: true,
            },
            where: {
                createdAt: {
                    gte: start,
                    lt: endExclusive,
                },
            },
        });
        const data = {
            saleTotal: total._sum.saleTotal || 0,
            salePendingAmount: pendint._sum.salePendingAmount || 0
        }
        return data

    } catch (error) {
        console.log(error)

    }
};

export const getDaySales = async (
    day,
    month,
    year,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    try {
        const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const { start, endInclusive } = businessDayBoundsUtc(dateKey, timeZone);

        const salesDay = await prisma.sale.aggregate({
            _sum: {
                saleTotal: true,
            },
            where: {
                createdAt: {
                    gte: start,
                    lte: endInclusive,
                },
            },
        });

        return salesDay._sum.saleTotal || 0;
    } catch (error) {
        console.error("(salesServices.js): Error getting day sale:", error);
        throw error;
    }
};

// get sales between two dates (inclusive), interpreted in business timezone
export const getSalesByDate = async (
    startDate,
    endDate,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    try {
        const { start, endInclusive } = businessDateRangeBoundsUtc(
            startDate,
            endDate,
            timeZone,
        );
        const sales = await prisma.sale.findMany({
            where: {
                createdAt: {
                    gte: start,
                    lte: endInclusive,
                },
            },
        });

        return sales;
    } catch (error) {
        console.error("(salesServices.js): Error getting sales by date:", error);
        throw error;
    }
};

export const countSalesService = async (prisma) => {
    try {
        const count = await prisma.sale.count();
        return count;
    } catch (error) {
        console.error("(salesServices.js): Error counting sales:", error);
        throw error;
    }
};

export const getSalesByCustomerIdService = async (customerId, prisma) => {
    try {
        const sales = await prisma.sale.findMany({
            where: { saleCustomerId: customerId }
        });
        return sales;
    } catch (error) {
        console.error("(salesServices.js): Error getting sales by customer ID:", error);
        throw error;
    }
};

export const countSalesMonthService = async (
    month,
    year,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    try {
        // Validate input
        if (!month || !year) {
            throw new Error("Month and year are required");
        }

        const { start, endExclusive } = businessMonthBoundsUtc(year, month, timeZone);

        const count = await prisma.sale.count({
            where: {
                createdAt: {
                    gte: start,
                    lt: endExclusive,
                },
            },
        });

        return count;

    } catch (error) {
        console.error("(salesServices.js): Error counting sales:", error);
        throw error;
    }
};
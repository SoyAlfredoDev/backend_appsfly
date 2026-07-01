import { getBusinessDateFromDate, getTodayBusinessDate } from '../libs/businessDate.js';

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

export const getSales = async (prisma) => {
    try {
        const salesOriginal = await prisma.sale.findMany({
            include: SALE_LIST_INCLUDE,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return salesOriginal.map(mapSaleListRow);
    } catch (error) {
        console.error("(salesServices.js): Error getting sales:", error);
        throw error
    }
};

const DASHBOARD_SALE_VIEWS = new Set(['today', 'todayIncome', 'month', 'pending']);

export const getSalesForDashboardView = async (view, prisma) => {
    if (!DASHBOARD_SALE_VIEWS.has(view)) {
        const error = new Error('Vista de dashboard no válida');
        error.statusCode = 400;
        throw error;
    }

    try {
        const salesOriginal = await prisma.sale.findMany({
            include: SALE_LIST_INCLUDE,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const sales = salesOriginal.map(mapSaleListRow);
        const today = getTodayBusinessDate();
        const monthPrefix = today.slice(0, 7);

        switch (view) {
            case 'today':
                return sales.filter(
                    (sale) => getBusinessDateFromDate(sale.createdAt) === today,
                );
            case 'todayIncome':
                return sales.filter(
                    (sale) =>
                        getBusinessDateFromDate(sale.createdAt) === today
                        && (sale.saleTotalPayments ?? 0) > 0,
                );
            case 'month':
                return sales.filter((sale) =>
                    getBusinessDateFromDate(sale.createdAt).startsWith(monthPrefix),
                );
            case 'pending':
                return sales.filter(
                    (sale) =>
                        getBusinessDateFromDate(sale.createdAt).startsWith(monthPrefix)
                        && (sale.salePendingAmount ?? 0) > 0,
                );
            default:
                return sales;
        }
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

export const getMonthlySales = async (month, year, prisma) => {
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);
        const total = await prisma.sale.aggregate({
            _sum: {
                saleTotal: true,
            },
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });
        const pendint = await prisma.sale.aggregate({
            _sum: {
                salePendingAmount: true,
            },
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
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

export const getDaySales = async (day, month, year, prisma) => {
    try {
        const startOfDay = new Date(year, month - 1, day, 0, 0, 0);
        const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

        const salesDay = await prisma.sale.aggregate({
            _sum: {
                saleTotal: true,
            },
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        return salesDay._sum.saleTotal || 0;
    } catch (error) {
        console.error("(salesServices.js): Error getting day sale:", error);
        throw error;
    }
};

// get sales between two dates, return an array of sales
export const getSalesByDate = async (startDate, endDate, prisma) => {
    try {
        const start = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}T23:59:59.999Z`);
        const sales = await prisma.sale.findMany({
            where: {
                createdAt: {
                    gte: start,
                    lte: end,
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

export const countSalesMonthService = async (month, year, prisma) => {
    try {
        // Validate input
        if (!month || !year) {
            throw new Error("Month and year are required");
        }

        // Build date range in UTC to avoid timezone issues
        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));

        const count = await prisma.sale.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        return count;

    } catch (error) {
        console.error("(salesServices.js): Error counting sales:", error);
        throw error;
    }
};
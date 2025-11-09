
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
                SaleDetail: {
                    select: {
                        saleDetailId: true,
                        saleDetailTotal: true,
                    },
                },
                Payment: {
                    select: {
                        paymentId: true,
                        paymentAmount: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const sales = salesOriginal.map(salesOriginal => {
            const totalPayments = salesOriginal.Payment.reduce((acc, payment) => acc + payment.paymentAmount, 0);
            const totalDetails = salesOriginal.SaleDetail.reduce((acc, detail) => acc + detail.saleDetailTotal, 0);
            const saleDate = salesOriginal.createdAt.toLocaleDateString('es-CL');
            return {
                ...salesOriginal,
                saleTotalPayments: totalPayments,
                saleTotal: totalDetails,
                salePendingAmount: totalDetails - totalPayments,
                saleDate
            };
        });
        return sales;
    } catch (error) {
        console.error("(salesServices.js): Error getting sales:", error);
        throw error
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
                        customerLastName: true
                    }
                },
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true
                    }
                },
                SaleDetail: {
                    select: {
                        saleDetailId: true,
                        saleDetailTotal: true,
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

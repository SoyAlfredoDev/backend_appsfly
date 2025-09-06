
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
        const res = await prisma.sale.findMany({
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
                }
            },
            orderBy: {
                createdAt: 'desc'
            }

        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error getting sales:", error);
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
                        customerLastName: true
                    }
                },
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true
                    }
                }
            }
        });
        return res;
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

        console.log('TOTAL: ', total, startDate, endDate);
        console.log('PENDINT: ', pendint);

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

        console.log('DAY: ', salesDay);

        return salesDay._sum.saleTotal || 0;
    } catch (error) {
        console.error("(salesServices.js): Error getting day sale:", error);
        throw error;
    }
};


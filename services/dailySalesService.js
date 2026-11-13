export const createDailySaleService = async (data, prisma) => {
    try {
        const res = await prisma.dailySales.create({ data });
        return res;
    } catch (error) {
        console.error("(dailySalesService.js): Error creating sale:", error);
        throw error;
    }
};

export const getDailySalesService = async (prisma) => {
    try {
        const res = await prisma.dailySales.findMany({
            orderBy: {
                dailySalesDay: 'desc'
            }
        });
        return res;
    } catch (error) {
        console.error("(dailySalesService.js): Error getting daily sales:", error);
        throw error;
    }
};
export const getDailySaleByDateService = async (date, prisma) => {
    try {
        const res = await prisma.dailySales.findFirst({
            where: { dailySalesDay: { startsWith: date } },
        });
        return res;
    } catch (error) {
        console.error("(dailySalesService.js): Error getting daily sale by date:", error);
        throw error;
    }
};

export const getDailySaleByIdService = async (id, prisma) => {
    try {
        const res = await prisma.dailySales.findUnique({
            where: {
                dailySalesId: id
            }
        });
        return res;
    } catch (error) {
        console.error("(dailySalesService.js): Error getting daily sale by id:", error);
        throw error;
    }
};

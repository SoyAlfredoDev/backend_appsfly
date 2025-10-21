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
        const res = await prisma.dailySales.findMany();
        return res;
    } catch (error) {
        console.error("(dailySalesService.js): Error getting daily sales:", error);
        throw error;
    }
};

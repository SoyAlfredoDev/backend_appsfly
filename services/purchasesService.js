
export const createPurchase = async (data, prisma) => {
    try {
        const res = await prisma.purchase.create({ data });
        return res;
    } catch (error) {
        console.error("(purchasesService.js): Error creating purchase:", error);
        throw error;
    }
};

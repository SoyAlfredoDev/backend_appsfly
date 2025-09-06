
export const createDetailSale = async (data, prisma) => {
    try {
        const res = await prisma.saleDetail.create({ data });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error creating detail sale:", error);
        throw error;
    }
};

export const getSaleDetails = async (prisma) => {
    try {
        const res = await prisma.saleDetail.findMany({
            include: {
                product: {
                    select: {
                        productId: true,
                        productName: true
                    }

                },
                service: {
                    select: {
                        serviceId: true,
                        serviceName: true
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error getting sale details:", error);
        throw error;
    }
};

export const getSaleDetailById = async (id, prisma) => {
    try {
        const res = await prisma.saleDetail.findMany({
            where: { saleId: id },
            include: {
                product: {
                    select: {
                        productId: true,
                        productName: true,
                        productSKU: true
                    }
                },
                service: {
                    select: {
                        serviceId: true,
                        serviceName: true,
                        serviceSKU: true
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error getting sale detail by ID:", error);
        throw error;
    }
};

export const updateSaleDetail = async (id, data, prisma) => {
    try {
        const res = await prisma.saleDetail.update({
            where: { id: Number(id) },
            data
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error updating sale detail:", error);
        throw error;
    }
};

export const deleteSaleDetail = async (id, prisma) => {
    try {
        const res = await prisma.saleDetail.delete({
            where: { id: Number(id) }
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error deleting sale detail:", error);
        throw error;
    }
};   
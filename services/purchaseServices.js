
export const createPurchase = async (data, prisma) => {
    try {
        const res = await prisma.purchase.create({ data });
        return res;
    } catch (error) {
        console.error("(purchaseServices.js): Error creating purchase:", error);
        throw error;
    }
};

export const getPurchases = async (prisma) => {
    try {
        const purchasesOriginal = await prisma.purchase.findMany({
            include: {
                provider: {
                    select: {
                        providerId: true,
                        providerName: true,
                    },
                },
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    },
                },
                PurchaseDetail: {
                    select: {
                        purchaseDetailId: true,
                        purchaseDetailTotal: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const purchases = purchasesOriginal.map(original => {
            const totalDetails = original.PurchaseDetail.reduce((acc, detail) => acc + detail.purchaseDetailTotal, 0);
            const purchaseDate = original.createdAt.toLocaleDateString('es-CL');
            return {
                ...original,
                purchaseTotal: totalDetails, 
                // Note: purchaseTotal is also stored in DB, but calculating from details guarantees consistency if model allows
                purchaseDate
            };
        });
        return purchases;
    } catch (error) {
        console.error("(purchaseServices.js): Error getting purchases:", error);
        throw error
    }
};


export const getPurchaseById = async (id, prisma) => {
    try {
        const res = await prisma.purchase.findUnique({
            where: { purchaseId: id },
            include: {
                provider: {
                    select: {
                        providerId: true,
                        providerName: true
                    }
                },
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true
                    }
                },
                PurchaseDetail: {
                    select: {
                        purchaseDetailId: true,
                        purchaseDetailTotal: true,
                        purchaseDetailQuantity: true,
                        purchaseDetailPrice: true,
                        purchaseDetailType: true,
                        product: { select: { productName: true } },
                        service: { select: { serviceName: true } }
                    },
                }
            }
        });
        
        if (!res) return null;

        const purchaseFinal = {
            ...res,
            purchaseTotal: res.PurchaseDetail.reduce((acc, detail) => acc + detail.purchaseDetailTotal, 0),
        };
        return purchaseFinal;
    } catch (error) {
        console.error("(purchaseServices.js): Error getting purchase by ID:", error);
        throw error;
    }
};

export const updatePurchase = async (id, data, prisma) => {
    try {
        const res = await prisma.purchase.update({
            where: { purchaseId: id }, // schema says purchaseId String @id (not Int)
            data
        });
        return res;
    } catch (error) {
        console.error("(purchaseServices.js): Error updating purchase:", error);
        throw error;
    }
};

export const deletePurchase = async (id, prisma) => {
    try {
        const res = await prisma.purchase.delete({
            where: { purchaseId: id }
        });
        return res;
    } catch (error) {
        console.error("(purchaseServices.js): Error deleting purchase:", error);
        throw error;
    }
};

export const getMonthlyPurchases = async (month, year, prisma) => {
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);
        const total = await prisma.purchase.aggregate({
            _sum: {
                purchaseTotal: true,
            },
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });
        
        const data = {
            purchaseTotal: total._sum.purchaseTotal || 0,
        }
        return data

    } catch (error) {
        console.log(error)

    }
};

export const getDayPurchases = async (day, month, year, prisma) => {
    try {
        const startOfDay = new Date(year, month - 1, day, 0, 0, 0);
        const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

        const purchasesDay = await prisma.purchase.aggregate({
            _sum: {
                purchaseTotal: true,
            },
            where: {
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        return purchasesDay._sum.purchaseTotal || 0;
    } catch (error) {
        console.error("(purchaseServices.js): Error getting day purchase:", error);
        throw error;
    }
};

export const countPurchasesService = async (prisma) => {
    try {
        const count = await prisma.purchase.count();
        return count;
    } catch (error) {
        console.error("(purchaseServices.js): Error counting purchases:", error);
        throw error;
    }
};

export const getPurchasesByProviderIdService = async (providerId, prisma) => {
    try {
        const purchases = await prisma.purchase.findMany({
            where: { purchaseProviderId: providerId }
        });
        return purchases;
    } catch (error) {
        console.error("(purchaseServices.js): Error getting purchases by provider ID:", error);
        throw error;
    }
};

export const countPurchasesMonthService = async (month, year, prisma) => {
    try {
        // Validate input
        if (!month || !year) {
            throw new Error("Month and year are required");
        }

        // Build date range in UTC to avoid timezone issues
        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));

        const count = await prisma.purchase.count({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        return count;

    } catch (error) {
        console.error("(purchaseServices.js): Error counting purchases:", error);
        throw error;
    }
};

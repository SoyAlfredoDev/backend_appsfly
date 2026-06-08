import { serializeProductWithStock, serializeProductsWithStock } from "../utils/productStockSerializer.js";

const productStockInclude = {
    productStock: {
        select: {
            quantityOnHand: true,
            reorderPoint: true,
            averageUnitCost: true,
            lastMovementAt: true,
        },
    },
};

// Create a product with initial stock record (TenantDB)
export const createProduct = async (data, prisma) => {
    try {
        const { initialStock, ...productData } = data;
        const startingQty = Number.isFinite(Number(initialStock))
            ? Math.max(0, Math.floor(Number(initialStock)))
            : 0;

        const product = await prisma.$transaction(async (tx) => {
            const created = await tx.product.create({ data: productData });

            await tx.productStock.create({
                data: {
                    productId: created.productId,
                    quantityOnHand: startingQty,
                },
            });

            return tx.product.findUnique({
                where: { productId: created.productId },
                include: {
                    category: {
                        select: {
                            categoryId: true,
                            categoryName: true,
                        },
                    },
                    ...productStockInclude,
                },
            });
        });

        return product;
    } catch (error) {
        console.error("(productsService.js): Error creating product:", error);
        throw error;
    }
};

// Get all products with stock
export const getProducts = async (prisma) => {
    try {
        const res = await prisma.product.findMany({
            include: {
                category: {
                    select: {
                        categoryId: true,
                        categoryName: true,
                    },
                },
                ...productStockInclude,
            },
        });
        return serializeProductsWithStock(res);
    } catch (error) {
        console.error("(productsService.js): Error getting products:", error);
        throw error;
    }
};

// Get product with analytics (360 view) with Pagination
export const getProductWithAnalytics = async (productId, prisma, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        const productPromise = prisma.product.findUnique({
            where: { productId },
            include: {
                category: {
                    select: {
                        categoryId: true,
                        categoryName: true,
                    },
                },
                ...productStockInclude,
            },
        });

        const analyticsPromise = prisma.saleDetail.aggregate({
            where: { saleDetailProductId: productId },
            _sum: {
                saleDetailTotal: true,
                saleDetailQuantity: true,
            },
            _count: {
                saleDetailId: true,
            },
        });

        const chartSourcePromise = prisma.saleDetail.findMany({
            where: {
                saleDetailProductId: productId,
                createdAt: {
                    gte: sixMonthsAgo,
                },
            },
            select: {
                createdAt: true,
                saleDetailTotal: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const totalItemsPromise = prisma.saleDetail.count({
            where: { saleDetailProductId: productId },
        });

        const historyPromise = prisma.saleDetail.findMany({
            where: { saleDetailProductId: productId },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        });

        const [product, analytics, chartSourceData, totalItems, historyRaw] = await Promise.all([
            productPromise,
            analyticsPromise,
            chartSourcePromise,
            totalItemsPromise,
            historyPromise,
        ]);

        if (!product) return null;

        const history = historyRaw.map((detail) => ({
            saleDetailId: detail.saleDetailId,
            saleDetailCreatedAt: detail.createdAt,
            saleDetailQuantity: detail.saleDetailQuantity,
            saleDetailPrice: detail.saleDetailPrice,
            saleDetailTotal: detail.saleDetailTotal,
            saleNumber: detail.Sale?.saleNumber,
            saleId: detail.saleId,
            customerName: detail.Sale?.customer
                ? `${detail.Sale.customer.customerFirstName} ${detail.Sale.customer.customerLastName}`
                : "Cliente General",
        }));

        return {
            product: serializeProductWithStock(product),
            analytics: {
                totalSold: analytics._sum.saleDetailTotal || 0,
                unitsSold: analytics._sum.saleDetailQuantity || 0,
                frequency: analytics._count.saleDetailId || 0,
            },
            history,
            chartSourceData: chartSourceData || [],
            pagination: {
                total: totalItems,
                pages: Math.ceil(totalItems / limit),
                currentPage: page,
                limit,
            },
        };
    } catch (error) {
        console.error("(productsService.js): Error getting product with analytics:", error);
        throw error;
    }
};

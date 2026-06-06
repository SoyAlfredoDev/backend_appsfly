// Create a product
export const createProduct = async (data, prisma) => {
    try {
        const res = await prisma.product.create({ data });
        return res
    } catch (error) {
        console.error("(productsService.js): Error creating product:", error);
        throw error;
    }
}
// Get all products
export const getProducts = async (prisma) => {
    try {
        const res = await prisma.product.findMany({
            include: {
                category: {
                    select: {
                        categoryId: true,
                        categoryName: true
                    }
                }
            }
        }
        );
        return res
    } catch (error) {
        console.error("(productsService.js): Error getting products:", error);
        throw error;
    }
}
// Get product with analytics (360 view)
// Get product with analytics (360 view) with Pagination
export const getProductWithAnalytics = async (productId, prisma, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        // Calculate date 6 months ago for chart/analytics
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        // 1. Get Product Information
        const productPromise = prisma.product.findUnique({
            where: { productId: productId },
            include: {
                category: {
                    select: {
                        categoryId: true,
                        categoryName: true
                    }
                }
            }
        });

        // 2. Get Analytics (Total Sold, Units, Frequency) - Global (All time)
        const analyticsPromise = prisma.saleDetail.aggregate({
            where: { saleDetailProductId: productId },
            _sum: {
                saleDetailTotal: true,
                saleDetailQuantity: true
            },
            _count: {
                saleDetailId: true
            }
        });

        // 3. Get Chart Source Data (Global but limited to last 6 months, only necessary fields)
        const chartSourcePromise = prisma.saleDetail.findMany({
            where: { 
                saleDetailProductId: productId,
                createdAt: {
                    gte: sixMonthsAgo
                }
            },
            select: {
                createdAt: true,
                saleDetailTotal: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        // 4. Get Paginated History
        const totalItemsPromise = prisma.saleDetail.count({
            where: { saleDetailProductId: productId }
        });

        const historyPromise = prisma.saleDetail.findMany({
            where: { saleDetailProductId: productId },
            skip: skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });

        const [product, analytics, chartSourceData, totalItems, historyRaw] = await Promise.all([
            productPromise,
            analyticsPromise,
            chartSourcePromise,
            totalItemsPromise,
            historyPromise
        ]);

        if (!product) return null;

        // Format history
        const history = historyRaw.map(detail => ({
            saleDetailId: detail.saleDetailId,
            saleDetailCreatedAt: detail.createdAt,
            saleDetailQuantity: detail.saleDetailQuantity,
            saleDetailPrice: detail.saleDetailPrice,
            saleDetailTotal: detail.saleDetailTotal,
            saleNumber: detail.Sale?.saleNumber,
            saleId: detail.saleId,
            customerName: detail.Sale?.customer 
                ? `${detail.Sale.customer.customerFirstName} ${detail.Sale.customer.customerLastName}` 
                : 'Cliente General'
        }));

        return {
            product,
            analytics: {
                totalSold: analytics._sum.saleDetailTotal || 0,
                unitsSold: analytics._sum.saleDetailQuantity || 0,
                frequency: analytics._count.saleDetailId || 0
            },
            history,
            chartSourceData: chartSourceData || [], // Send global data for chart
            pagination: {
                total: totalItems,
                pages: Math.ceil(totalItems / limit),
                currentPage: page,
                limit
            }
        };
    } catch (error) {
        console.error("(productsService.js): Error getting product with analytics:", error);
        throw error;
    }
};

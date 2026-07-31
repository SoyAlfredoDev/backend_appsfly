import { serializeProductWithStock, serializeProductsWithStock } from "../utils/productStockSerializer.js";
import { normalizePagination, paginatedResult } from "../libs/pagination.js";
import {
    syncSkuAlias,
    upsertCodesForProduct,
    listCodesForEntity,
    findProductIdsByExactCode,
    SCAN_ENTITY,
} from "./scanCodesService.js";

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

const productDetailInclude = {
    category: {
        select: {
            categoryId: true,
            categoryName: true,
            categoryCode: true,
            isSystem: true,
        },
    },
    attributeValues: {
        include: {
            categoryAttribute: {
                select: {
                    categoryAttributeId: true,
                    attributeKey: true,
                    attributeLabel: true,
                    dataType: true,
                    isVisible: true,
                },
            },
        },
    },
    ...productStockInclude,
};

async function attachCodes(product, prisma) {
    if (!product) return product;
    const codes = await listCodesForEntity(
        SCAN_ENTITY.PRODUCT,
        product.productId,
        prisma,
    );
    return { ...product, codes };
}

async function syncProductAttributes(tx, productId, categoryId, attributes) {
    if (!attributes || typeof attributes !== "object") return;

    const defs = await tx.categoryAttribute.findMany({
        where: { categoryId, isVisible: true },
    });
    const byKey = new Map(defs.map((d) => [d.attributeKey, d]));
    const byId = new Map(defs.map((d) => [d.categoryAttributeId, d]));

    for (const [key, raw] of Object.entries(attributes)) {
        const def = byKey.get(key) || byId.get(key);
        if (!def) continue;

        let value = raw;
        if (value === undefined || value === null || value === "") {
            await tx.productAttributeValue.deleteMany({
                where: {
                    productId,
                    categoryAttributeId: def.categoryAttributeId,
                },
            });
            continue;
        }
        if (typeof value === "boolean") value = value ? "true" : "false";
        else value = String(value);

        await tx.productAttributeValue.upsert({
            where: {
                productId_categoryAttributeId: {
                    productId,
                    categoryAttributeId: def.categoryAttributeId,
                },
            },
            create: {
                productId,
                categoryAttributeId: def.categoryAttributeId,
                value,
            },
            update: { value },
        });
    }
}

export const createProduct = async (data, prisma) => {
    try {
        const { initialStock, attributes, codes, ...productData } = data;
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

            await syncProductAttributes(
                tx,
                created.productId,
                created.categoryId,
                attributes,
            );

            await syncSkuAlias(
                tx,
                created.productId,
                created.productSKU,
                created.createdByUserId,
            );
            await upsertCodesForProduct(
                tx,
                created.productId,
                codes,
                created.createdByUserId,
            );

            return tx.product.findUnique({
                where: { productId: created.productId },
                include: productDetailInclude,
            });
        });

        return attachCodes(product, prisma);
    } catch (error) {
        console.error("(productsService.js): Error creating product:", error);
        throw error;
    }
};

export const updateProduct = async (productId, data, prisma) => {
    const existing = await prisma.product.findUnique({ where: { productId } });
    if (!existing) {
        const error = new Error("Producto no encontrado.");
        error.statusCode = 404;
        throw error;
    }

    const { initialStock: _ignore, attributes, codes, ...productData } = data;
    const nextCategoryId = productData.categoryId || existing.categoryId;
    const nextSku = productData.productSKU ?? existing.productSKU;

    const product = await prisma.$transaction(async (tx) => {
        if (productData.categoryId && productData.categoryId !== existing.categoryId) {
            await tx.productAttributeValue.deleteMany({ where: { productId } });
        }

        await tx.product.update({
            where: { productId },
            data: productData,
        });

        await syncProductAttributes(tx, productId, nextCategoryId, attributes);

        await syncSkuAlias(tx, productId, nextSku, existing.createdByUserId);
        if (codes !== undefined) {
            await upsertCodesForProduct(tx, productId, codes, existing.createdByUserId);
        }

        return tx.product.findUnique({
            where: { productId },
            include: productDetailInclude,
        });
    });

    return attachCodes(product, prisma);
};

export const getProductById = async (productId, prisma) => {
    const product = await prisma.product.findUnique({
        where: { productId },
        include: productDetailInclude,
    });
    return attachCodes(product, prisma);
};

export const getProducts = async (prisma, options = {}) => {
    try {
        const {
            page,
            limit,
            q,
            categoryId,
            defaultLimit = 50,
            maxLimit = 200,
        } = options;

        const { skip, take, page: safePage, limit: safeLimit } = normalizePagination({
            page,
            limit,
            defaultLimit,
            maxLimit,
        });

        const query = typeof q === "string" ? q.trim() : "";
        const where = {};
        if (categoryId) where.categoryId = categoryId;
        if (query) {
            const codeProductIds = await findProductIdsByExactCode(query, prisma);
            where.OR = [
                { productName: { contains: query, mode: "insensitive" } },
                { productSKU: { contains: query, mode: "insensitive" } },
                { productDescription: { contains: query, mode: "insensitive" } },
                ...(codeProductIds.length
                    ? [{ productId: { in: codeProductIds } }]
                    : []),
            ];
        }

        const [total, res] = await Promise.all([
            prisma.product.count({ where }),
            prisma.product.findMany({
                where,
                include: {
                    category: {
                        select: {
                            categoryId: true,
                            categoryName: true,
                            categoryCode: true,
                            isSystem: true,
                        },
                    },
                    ...productStockInclude,
                },
                orderBy: { productName: "asc" },
                skip,
                take,
            }),
        ]);

        return paginatedResult(
            serializeProductsWithStock(res),
            total,
            safePage,
            safeLimit,
        );
    } catch (error) {
        console.error("(productsService.js): Error getting products:", error);
        throw error;
    }
};

export const getProductWithAnalytics = async (productId, prisma, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        const productPromise = prisma.product.findUnique({
            where: { productId },
            include: productDetailInclude,
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

        const productWithCodes = await attachCodes(product, prisma);

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
            product: serializeProductWithStock(productWithCodes),
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

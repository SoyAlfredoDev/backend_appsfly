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
    variantMetadata: true,
    variantParent: { select: { productPrice: true, productPriceFixed: true } },
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
    const existing = await prisma.product.findUnique({ where: { productId }, include: { variantMetadata: true } });
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

        if (existing.variantMetadata && productData.productPrice !== undefined) {
            await tx.productVariant.update({
                where: { productId },
                data: { priceOverride: Number(productData.productPrice) },
            });
        }

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

export const createProductVariants = async (data, prisma) => {
    const { parent: rawParentData, variants = [] } = data;
    const { attributes: parentAttributes, ...parentFields } = rawParentData;
    delete parentFields.codes;
    delete parentFields.initialStock;
    const parentData = parentFields;
    if (!Array.isArray(variants) || variants.length === 0) {
        const error = new Error("Debe incluir al menos una variante.");
        error.statusCode = 400;
        throw error;
    }
    if (variants.length > 1000) {
        const error = new Error("La carga supera el límite de 1.000 variantes por familia.");
        error.statusCode = 413;
        throw error;
    }

    const prepared = variants.map((item) => {
        const options = item.options && typeof item.options === "object" ? item.options : {};
        const optionEntries = Object.entries(options)
            .map(([key, value]) => [String(key).trim(), String(value ?? "").trim()])
            .filter(([key, value]) => key && value);
        const normalizedOptions = Object.fromEntries(optionEntries.sort(([a], [b]) => a.localeCompare(b)));
        const combinationKey = JSON.stringify(normalizedOptions);
        const price = Number(item.price ?? parentData.productPrice);
        const initialStock = Number(item.initialStock ?? 0);

        const sku = String(item.sku ?? "").trim();
        if (!sku || !Number.isSafeInteger(price) || price < 0) {
            const error = new Error("Cada variante requiere SKU y precio entero no negativo.");
            error.statusCode = 400;
            throw error;
        }
        if (Object.keys(normalizedOptions).length === 0) {
            const error = new Error("Cada variante debe incluir al menos una opción.");
            error.statusCode = 400;
            throw error;
        }
        if (!Number.isSafeInteger(initialStock) || initialStock < 0) {
            const error = new Error("El stock inicial debe ser un entero no negativo.");
            error.statusCode = 400;
            throw error;
        }

        return { ...item, sku, options: normalizedOptions, combinationKey, price, initialStock };
    });

    const combinations = new Set();
    const skus = new Set();
    const optionKeys = Object.keys(prepared[0].options).join("\u0000");
    for (const item of prepared) {
        if (Object.keys(item.options).join("\u0000") !== optionKeys) {
            const error = new Error("Todas las variantes deben usar las mismas opciones.");
            error.statusCode = 400;
            throw error;
        }
        if (combinations.has(item.combinationKey)) {
            const error = new Error("La carga contiene combinaciones repetidas.");
            error.statusCode = 409;
            throw error;
        }
        if (skus.has(item.sku)) {
            const error = new Error(`SKU repetido en la carga: ${item.sku}`);
            error.statusCode = 409;
            throw error;
        }
        combinations.add(item.combinationKey);
        skus.add(item.sku);
    }

    const result = await prisma.$transaction(async (tx) => {
        let parent = await tx.product.findUnique({ where: { productSKU: parentData.productSKU } });
        if (!parent) {
            parent = await tx.product.create({
                data: {
                    ...parentData,
                    productName: `${parentData.productName} (FAMILIA · NO VENDER)`,
                    productAllowZeroStock: false,
                    productStatus: "INACTIVE",
                    isVariantParent: true,
                },
            });
            await tx.productStock.create({ data: { productId: parent.productId, quantityOnHand: 0 } });
            await syncProductAttributes(tx, parent.productId, parent.categoryId, parentAttributes);
        } else if (parent.isVariantParent !== true) {
            const error = new Error("El SKU padre ya pertenece a un producto normal y no se puede convertir en familia de variantes.");
            error.statusCode = 409;
            throw error;
        }

        const existingVariants = await tx.product.findMany({
            where: { variantParentId: parent.productId },
            include: { variantMetadata: true },
        });
        const existingKeys = new Set(existingVariants.map((row) => row.variantMetadata?.combinationKey).filter(Boolean));
        let createdCount = 0;
        let skippedCount = 0;

        for (const item of prepared) {
            if (existingKeys.has(item.combinationKey)) {
                skippedCount += 1;
                continue;
            }

            const child = await tx.product.create({
                data: {
                    productName: item.name || `${parentData.productName} · ${Object.entries(item.options).map(([key, value]) => `${key} ${value}`).join(" · ")}`,
                    productDescription: parent.productDescription,
                    productSKU: item.sku,
                    categoryId: parent.categoryId,
                    productPrice: item.price,
                    productPriceFixed: parent.productPriceFixed,
                    productStatus: "ACTIVE",
                    productUnit: parent.productUnit,
                    productAllowZeroStock: true,
                    productRequiresLabWork: parent.productRequiresLabWork,
                    createdByUserId: parent.createdByUserId,
                    variantParentId: parent.productId,
                },
            });

            await tx.productStock.create({
                data: { productId: child.productId, quantityOnHand: item.initialStock },
            });
            await syncProductAttributes(tx, child.productId, child.categoryId, parentAttributes);
            await tx.productVariant.create({
                data: {
                    productId: child.productId,
                    parentProductId: parent.productId,
                    combinationKey: item.combinationKey,
                    optionsJson: JSON.stringify(item.options),
                    priceOverride: item.price === Number(parent.productPrice) ? null : item.price,
                },
            });
            await syncSkuAlias(tx, child.productId, child.productSKU, child.createdByUserId);
            existingKeys.add(item.combinationKey);
            createdCount += 1;
        }

        const children = await tx.product.findMany({
            where: { variantParentId: parent.productId },
            include: {
                productStock: true,
                variantMetadata: true,
                variantParent: { select: { productPrice: true, productPriceFixed: true } },
            },
            orderBy: { productSKU: "asc" },
        });
        return { parent, children, createdCount, skippedCount };
    });

    return result;
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
        const where = { isVariantParent: false };
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
                    variantMetadata: true,
                    variantParent: { select: { productPrice: true, productPriceFixed: true } },
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

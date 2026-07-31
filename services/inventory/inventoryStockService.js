import { serializeProductsWithStock } from "../../utils/productStockSerializer.js";
import { findProductIdsByExactCode } from "../scanCodesService.js";

export async function getInventorySummary(prisma) {
    const stocks = await prisma.productStock.findMany({
        where: {
            product: { productStatus: "ACTIVE" },
        },
        include: {
            product: {
                select: {
                    productPrice: true,
                    productStatus: true,
                },
            },
        },
    });

    let productsInStock = 0;
    let lowStockAlerts = 0;
    let totalValuation = 0;
    let totalUnits = 0;

    for (const stock of stocks) {
        const qty = stock.quantityOnHand ?? 0;
        totalUnits += qty;

        if (qty > 0) productsInStock += 1;
        if (qty <= stock.reorderPoint) lowStockAlerts += 1;

        const unitValue = stock.averageUnitCost || stock.product?.productPrice || 0;
        totalValuation += qty * unitValue;
    }

    return {
        productsInStock,
        lowStockAlerts,
        totalValuation,
        totalUnits,
        totalProducts: stocks.length,
    };
}

export async function getInventoryStockList(prisma, { q, lowStockOnly } = {}) {
    const query = q?.trim();
    const codeProductIds = query ? await findProductIdsByExactCode(query, prisma) : [];

    const stocks = await prisma.productStock.findMany({
        where: {
            product: {
                productStatus: "ACTIVE",
                ...(query
                    ? {
                          OR: [
                              { productName: { contains: query, mode: "insensitive" } },
                              { productSKU: { contains: query, mode: "insensitive" } },
                              ...(codeProductIds.length
                                  ? [{ productId: { in: codeProductIds } }]
                                  : []),
                          ],
                      }
                    : {}),
            },
        },
        include: {
            product: {
                include: {
                    category: {
                        select: {
                            categoryId: true,
                            categoryName: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            product: { productName: "asc" },
        },
    });

    let filtered = stocks;

    if (query && codeProductIds.length) {
        const exactSet = new Set(codeProductIds);
        filtered = [
            ...stocks.filter((s) => exactSet.has(s.productId)),
            ...stocks.filter((s) => !exactSet.has(s.productId)),
        ];
    }

    if (lowStockOnly === true || lowStockOnly === "true") {
        filtered = filtered.filter((s) => s.quantityOnHand <= s.reorderPoint);
    }

    return filtered.map((stock) => {
        const product = serializeProductsWithStock([stock.product])[0] || stock.product;
        const unitValue = stock.averageUnitCost || product.productPrice || 0;

        return {
            productId: stock.productId,
            productName: product.productName,
            productSKU: product.productSKU,
            categoryName: product.category?.categoryName ?? "—",
            quantityOnHand: stock.quantityOnHand,
            reorderPoint: stock.reorderPoint,
            averageUnitCost: stock.averageUnitCost,
            productPrice: product.productPrice,
            unitValue,
            totalValue: stock.quantityOnHand * unitValue,
            lastMovementAt: stock.lastMovementAt,
            productAllowZeroStock: product.productAllowZeroStock,
            isLowStock: stock.quantityOnHand <= stock.reorderPoint,
        };
    });
}

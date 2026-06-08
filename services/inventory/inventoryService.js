export class InsufficientStockError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = "InsufficientStockError";
        this.code = "INSUFFICIENT_STOCK";
        this.details = details;
    }
}

/**
 * Aplica un movimiento de inventario dentro de una transacción Prisma (TenantDB).
 * @param {import('@prisma/client').Prisma.TransactionClient} tx
 */
export async function applyInventoryMovement(tx, {
    productId,
    movementType,
    quantityDelta,
    referenceType = "NONE",
    referenceId = null,
    referenceLabel = null,
    reason = null,
    notes = null,
    createdByUserId,
    allowNegativeOverride = false,
    unitCost = null,
}) {
    const delta = Number(quantityDelta);
    if (!Number.isFinite(delta) || delta === 0) {
        throw new Error("quantityDelta must be a non-zero number");
    }

    const product = await tx.product.findUnique({
        where: { productId },
        select: {
            productId: true,
            productName: true,
            productStatus: true,
            productAllowZeroStock: true,
            productStock: true,
        },
    });

    if (!product) {
        throw new Error(`Product not found: ${productId}`);
    }

    if (product.productStatus !== "ACTIVE") {
        throw new Error(`Product is not active: ${product.productName}`);
    }

    let stock = product.productStock;
    if (!stock) {
        stock = await tx.productStock.create({
            data: { productId, quantityOnHand: 0 },
        });
    }

    const stockBefore = stock.quantityOnHand;
    const stockAfter = stockBefore + delta;
    const canGoNegative = allowNegativeOverride || product.productAllowZeroStock;

    if (stockAfter < 0 && !canGoNegative) {
        throw new InsufficientStockError(
            `Stock insuficiente para "${product.productName}" (disponible: ${stockBefore}, solicitado: ${Math.abs(delta)})`,
            {
                productId,
                productName: product.productName,
                available: stockBefore,
                requested: Math.abs(delta),
            },
        );
    }

    const stockUpdate = {
        quantityOnHand: stockAfter,
        lastMovementAt: new Date(),
        version: { increment: 1 },
    };

    const parsedUnitCost = Number(unitCost);
    if (delta > 0 && Number.isFinite(parsedUnitCost) && parsedUnitCost >= 0) {
        const oldAvg = stock.averageUnitCost || 0;
        stockUpdate.averageUnitCost =
            stockBefore <= 0
                ? Math.round(parsedUnitCost)
                : Math.round((stockBefore * oldAvg + delta * parsedUnitCost) / stockAfter);
    }

    await tx.productStock.update({
        where: { productId },
        data: stockUpdate,
    });

    const movement = await tx.inventoryMovement.create({
        data: {
            productId,
            movementType,
            quantityDelta: delta,
            stockBefore,
            stockAfter,
            referenceType,
            referenceId,
            referenceLabel,
            reason,
            notes,
            createdByUserId,
        },
    });

    return { movement, stockBefore, stockAfter };
}

/**
 * Valida líneas de venta agregadas por productId (uso en frontend o pre-check API).
 */
export function validateAggregatedProductStock(lines, productsById) {
    const aggregates = new Map();

    for (const line of lines) {
        if (line.saleDetailType !== "PRODUCT" || !line.saleDetailProductServiceId) continue;
        const productId = line.saleDetailProductServiceId;
        const qty = Number(line.saleDetailAmount) || 0;
        aggregates.set(productId, (aggregates.get(productId) || 0) + qty);
    }

    const errors = [];
    for (const [productId, requested] of aggregates) {
        const product = productsById.get(productId);
        if (!product) continue;

        const available = Number(product.productStock ?? product.quantityOnHand ?? 0);
        if (product.productAllowZeroStock === true) continue;

        if (available < requested) {
            errors.push({
                productId,
                productName: product.productName,
                available,
                requested,
            });
        }
    }

    return errors;
}

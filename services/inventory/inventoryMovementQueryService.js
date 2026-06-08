import { applyInventoryMovement } from "./inventoryService.js";

const MOVEMENT_TYPE_LABELS = {
    VENTA: "Venta",
    COMPRA: "Compra",
    AJUSTE_MANUAL: "Ajuste manual",
    MERMA: "Merma",
    DEVOLUCION: "Devolución",
    ANULACION_VENTA: "Anulación venta",
    ANULACION_COMPRA: "Anulación compra",
};

export async function getInventoryMovements(prisma, filters = {}) {
    const {
        type,
        productId,
        q,
        from,
        to,
        page = 1,
        limit = 50,
    } = filters;

    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 50));
    const skip = (safePage - 1) * safeLimit;

    const where = {};

    if (type && type !== "ALL") {
        where.movementType = type;
    }

    if (productId) {
        where.productId = productId;
    }

    if (from || to) {
        where.createdAt = {};
        if (from) where.createdAt.gte = new Date(`${from}T00:00:00.000Z`);
        if (to) where.createdAt.lte = new Date(`${to}T23:59:59.999Z`);
    }

    const query = q?.trim();
    if (query) {
        where.OR = [
            { referenceLabel: { contains: query, mode: "insensitive" } },
            { reason: { contains: query, mode: "insensitive" } },
            {
                product: {
                    productName: { contains: query, mode: "insensitive" },
                },
            },
            {
                product: {
                    productSKU: { contains: query, mode: "insensitive" },
                },
            },
        ];
    }

    const [total, movements] = await Promise.all([
        prisma.inventoryMovement.count({ where }),
        prisma.inventoryMovement.findMany({
            where,
            include: {
                product: {
                    select: {
                        productId: true,
                        productName: true,
                        productSKU: true,
                    },
                },
                user: {
                    select: {
                        userFirstName: true,
                        userLastName: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: safeLimit,
        }),
    ]);

    const rows = movements.map((movement) => ({
        movementId: movement.movementId,
        movementType: movement.movementType,
        movementTypeLabel: MOVEMENT_TYPE_LABELS[movement.movementType] ?? movement.movementType,
        quantityDelta: movement.quantityDelta,
        stockBefore: movement.stockBefore,
        stockAfter: movement.stockAfter,
        referenceType: movement.referenceType,
        referenceId: movement.referenceId,
        referenceLabel: movement.referenceLabel,
        reason: movement.reason,
        notes: movement.notes,
        createdAt: movement.createdAt,
        productId: movement.productId,
        productName: movement.product?.productName,
        productSKU: movement.product?.productSKU,
        userName: movement.user
            ? `${movement.user.userFirstName} ${movement.user.userLastName}`
            : "—",
        isInbound: movement.quantityDelta > 0,
    }));

    return {
        rows,
        pagination: {
            total,
            pages: Math.ceil(total / safeLimit),
            currentPage: safePage,
            limit: safeLimit,
        },
    };
}

export async function createManualAdjustment(prisma, userId, payload) {
    const {
        productId,
        movementType,
        adjustmentMode = "delta",
        quantityDelta,
        targetStock,
        reason,
        notes,
    } = payload;

    if (!productId) throw new Error("productId is required");
    if (!reason?.trim()) throw new Error("El motivo es obligatorio");

    const allowedTypes = ["AJUSTE_MANUAL", "MERMA", "DEVOLUCION"];
    if (!allowedTypes.includes(movementType)) {
        throw new Error("Tipo de ajuste no válido");
    }

    let delta;

    if (adjustmentMode === "count") {
        const stock = await prisma.productStock.findUnique({ where: { productId } });
        const current = stock?.quantityOnHand ?? 0;
        delta = Number(targetStock) - current;
    } else {
        const qty = Number(quantityDelta);
        if (!Number.isFinite(qty) || qty === 0) {
            throw new Error("La cantidad debe ser distinta de cero");
        }

        if (movementType === "MERMA") {
            delta = -Math.abs(qty);
        } else if (movementType === "DEVOLUCION") {
            delta = Math.abs(qty);
        } else {
            delta = qty;
        }
    }

    if (delta === 0) {
        throw new Error("El ajuste no modifica el stock");
    }

    return prisma.$transaction(async (tx) => {
        const result = await applyInventoryMovement(tx, {
            productId,
            movementType,
            quantityDelta: delta,
            referenceType: "MANUAL",
            referenceId: null,
            referenceLabel: MOVEMENT_TYPE_LABELS[movementType] ?? "Ajuste manual",
            reason: reason.trim(),
            notes: notes?.trim() || null,
            createdByUserId: userId,
            allowNegativeOverride: movementType === "AJUSTE_MANUAL",
        });

        return result;
    });
}

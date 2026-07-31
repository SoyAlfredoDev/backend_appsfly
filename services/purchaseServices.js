import definePurchaseNumber from "../libs/definePurchaseNumber.js";
import { applyInventoryMovement } from "./inventory/inventoryService.js";
import {
    recordFinancialTransaction,
    TRANSACTION_TYPES,
    TRANSACTION_DIRECTIONS,
} from "./financial/financialLedgerService.js";
import {
    businessDayBoundsUtc,
    businessMonthBoundsUtc,
    DEFAULT_BUSINESS_TIMEZONE,
} from "../libs/businessTimezone.js";

export const createPurchase = async (data, prisma) => {
    try {
        const res = await prisma.purchase.create({ data });
        return res;
    } catch (error) {
        console.error("(purchaseServices.js): Error creating purchase:", error);
        throw error;
    }
};

/**
 * Registra compra + detalles + movimientos de inventario en una sola transacción (TenantDB).
 */
export const createPurchaseComplete = async (
    { purchase, purchaseDetails },
    prisma,
    userId,
) => {
    if (!purchase?.purchaseProviderId) {
        throw new Error("purchaseProviderId is required");
    }
    if (!purchase?.purchaseRealNumber?.trim()) {
        throw new Error("purchaseRealNumber is required");
    }
    if (!Array.isArray(purchaseDetails) || purchaseDetails.length === 0) {
        throw new Error("purchaseDetails must contain at least one item");
    }

    const purchaseNumber = await definePurchaseNumber(prisma);
    const detailsTotal = purchaseDetails.reduce(
        (sum, detail) => sum + Number(detail.purchaseDetailTotal || 0),
        0,
    );

    return prisma.$transaction(async (tx) => {
        const createdPurchase = await tx.purchase.create({
            data: {
                purchaseId: purchase.purchaseId,
                purchaseNumber,
                purchaseRealNumber: purchase.purchaseRealNumber.trim(),
                purchaseProviderId: purchase.purchaseProviderId,
                purchaseTotal: Number(purchase.purchaseTotal ?? detailsTotal),
                purchaseStatus: "COMPLETED",
                purchaseComment: purchase.purchaseComment?.trim() || null,
                createdByUserId: userId,
            },
        });

        for (const detail of purchaseDetails) {
            const detailData = {
                purchaseDetailId: detail.purchaseDetailId,
                purchaseId: purchase.purchaseId,
                purchaseDetailProductId: detail.purchaseDetailProductId ?? null,
                purchaseDetailServiceId: detail.purchaseDetailServiceId ?? null,
                purchaseDetailQuantity: Number(detail.purchaseDetailQuantity),
                purchaseDetailPrice: Number(detail.purchaseDetailPrice),
                purchaseDetailTotal: Number(detail.purchaseDetailTotal),
                purchaseDetailType: detail.purchaseDetailType,
                createdByUserId: userId,
            };

            const existingMovement = await tx.inventoryMovement.findFirst({
                where: {
                    referenceType: "PURCHASE_DETAIL",
                    referenceId: detail.purchaseDetailId,
                },
            });

            if (existingMovement) {
                const existingDetail = await tx.purchaseDetail.findUnique({
                    where: { purchaseDetailId: detail.purchaseDetailId },
                });
                if (existingDetail) continue;
            }

            await tx.purchaseDetail.create({ data: detailData });

            if (
                detail.purchaseDetailType === "PRODUCT" &&
                detail.purchaseDetailProductId
            ) {
                await applyInventoryMovement(tx, {
                    productId: detail.purchaseDetailProductId,
                    movementType: "COMPRA",
                    quantityDelta: Number(detail.purchaseDetailQuantity),
                    referenceType: "PURCHASE_DETAIL",
                    referenceId: detail.purchaseDetailId,
                    referenceLabel: createdPurchase.purchaseNumber
                        ? `Compra #${createdPurchase.purchaseNumber}`
                        : `Compra ${purchase.purchaseId}`,
                    createdByUserId: userId,
                    unitCost: Number(detail.purchaseDetailPrice),
                });
            }
        }

        const provider = await tx.provider.findUnique({
            where: { providerId: createdPurchase.purchaseProviderId },
            select: { providerName: true },
        });

        await recordFinancialTransaction(tx, {
            transactionType: TRANSACTION_TYPES.PURCHASE,
            transactionMethod: "2",
            transactionTable: "Purchase",
            transactionRecordId: createdPurchase.purchaseId,
            amount: createdPurchase.purchaseTotal,
            direction: TRANSACTION_DIRECTIONS.OUT,
            description: provider?.providerName
                ? `Compra #${createdPurchase.purchaseNumber} — ${provider.providerName}`
                : `Compra #${createdPurchase.purchaseNumber}`,
            createdByUserId: userId,
        });

        return tx.purchase.findUnique({
            where: { purchaseId: purchase.purchaseId },
            include: {
                provider: {
                    select: {
                        providerId: true,
                        providerName: true,
                    },
                },
                PurchaseDetail: {
                    include: {
                        product: {
                            select: {
                                productId: true,
                                productName: true,
                                productSKU: true,
                            },
                        },
                    },
                },
            },
        });
    });
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
                cancelledBy: {
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
                        providerName: true,
                        providerEmail: true,
                        providerPhoneNumber: true,
                        providerCodePhoneNumber: true,
                    },
                },
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    },
                },
                cancelledBy: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    },
                },
                PurchaseDetail: {
                    include: {
                        product: {
                            select: {
                                productId: true,
                                productName: true,
                                productSKU: true,
                            },
                        },
                        service: {
                            select: {
                                serviceId: true,
                                serviceName: true,
                                serviceSKU: true,
                            },
                        },
                    },
                },
            },
        });

        if (!res) return null;

        const purchaseTotal = res.PurchaseDetail.reduce(
            (acc, detail) => acc + detail.purchaseDetailTotal,
            0,
        );

        return {
            ...res,
            purchaseTotal,
            purchaseDate: res.createdAt.toLocaleDateString("es-CL"),
        };
    } catch (error) {
        console.error("(purchaseServices.js): Error getting purchase by ID:", error);
        throw error;
    }
};

const purchaseInclude = {
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
    cancelledBy: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
    PurchaseDetail: {
        include: {
            product: {
                select: {
                    productId: true,
                    productName: true,
                    productSKU: true,
                },
            },
            service: {
                select: {
                    serviceId: true,
                    serviceName: true,
                    serviceSKU: true,
                },
            },
        },
    },
};

export const updatePurchaseHeader = async (purchaseId, body, prisma) => {
    const existing = await prisma.purchase.findUnique({
        where: { purchaseId },
    });

    if (!existing) {
        const error = new Error("Compra no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    if (existing.purchaseStatus === "CANCELLED") {
        const error = new Error("No se puede editar una compra anulada.");
        error.statusCode = 400;
        throw error;
    }

    const data = {};

    if (body.purchaseRealNumber !== undefined) {
        const trimmed = String(body.purchaseRealNumber).trim();
        if (!trimmed) {
            const error = new Error("El número de documento es obligatorio.");
            error.statusCode = 400;
            throw error;
        }
        data.purchaseRealNumber = trimmed;
    }

    if (body.purchaseComment !== undefined) {
        data.purchaseComment = body.purchaseComment?.trim() || null;
    }

    if (body.purchaseProviderId) {
        const provider = await prisma.provider.findUnique({
            where: { providerId: body.purchaseProviderId },
        });
        if (!provider) {
            const error = new Error("Proveedor no encontrado.");
            error.statusCode = 400;
            throw error;
        }
        data.purchaseProviderId = body.purchaseProviderId;
    }

    return prisma.purchase.update({
        where: { purchaseId },
        data,
        include: purchaseInclude,
    });
};

export const cancelPurchaseWithInventory = async (purchaseId, userId, prisma) => {
    return prisma.$transaction(async (tx) => {
        const purchase = await tx.purchase.findUnique({
            where: { purchaseId },
            include: { PurchaseDetail: true },
        });

        if (!purchase) {
            const error = new Error("Compra no encontrada.");
            error.statusCode = 404;
            throw error;
        }

        if (purchase.purchaseStatus === "CANCELLED") {
            const error = new Error("La compra ya está anulada.");
            error.statusCode = 400;
            throw error;
        }

        if (purchase.purchaseStatus === "COMPLETED") {
            for (const detail of purchase.PurchaseDetail) {
                if (
                    detail.purchaseDetailType !== "PRODUCT" ||
                    !detail.purchaseDetailProductId
                ) {
                    continue;
                }

                const existingReversal = await tx.inventoryMovement.findFirst({
                    where: {
                        movementType: "ANULACION_COMPRA",
                        referenceType: "PURCHASE_DETAIL",
                        referenceId: detail.purchaseDetailId,
                    },
                });

                if (existingReversal) continue;

                await applyInventoryMovement(tx, {
                    productId: detail.purchaseDetailProductId,
                    movementType: "ANULACION_COMPRA",
                    quantityDelta: -Number(detail.purchaseDetailQuantity),
                    referenceType: "PURCHASE_DETAIL",
                    referenceId: detail.purchaseDetailId,
                    referenceLabel: purchase.purchaseNumber
                        ? `Anulación compra #${purchase.purchaseNumber}`
                        : `Anulación compra ${purchase.purchaseId}`,
                    reason: "Anulación de compra",
                    createdByUserId: userId,
                });
            }
        }

        const updated = await tx.purchase.update({
            where: { purchaseId },
            data: {
                purchaseStatus: "CANCELLED",
                cancelledByUserId: userId,
                cancelledAt: new Date(),
            },
            include: purchaseInclude,
        });

        if (purchase.purchaseStatus === "COMPLETED") {
            await recordFinancialTransaction(tx, {
                transactionType: TRANSACTION_TYPES.PURCHASE_CANCEL,
                transactionMethod: "2",
                transactionTable: "Purchase",
                transactionRecordId: `${purchase.purchaseId}:cancel`,
                amount: purchase.purchaseTotal,
                direction: TRANSACTION_DIRECTIONS.IN,
                description: purchase.purchaseNumber
                    ? `Anulación compra #${purchase.purchaseNumber}`
                    : `Anulación compra ${purchase.purchaseId}`,
                createdByUserId: userId,
            });
        }

        return updated;
    });
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

export const getMonthlyPurchases = async (
    month,
    year,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    try {
        const { start, endExclusive } = businessMonthBoundsUtc(year, month, timeZone);
        const total = await prisma.purchase.aggregate({
            _sum: {
                purchaseTotal: true,
            },
            where: {
                createdAt: {
                    gte: start,
                    lt: endExclusive,
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

export const getDayPurchases = async (
    day,
    month,
    year,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    try {
        const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const { start, endInclusive } = businessDayBoundsUtc(dateKey, timeZone);

        const purchasesDay = await prisma.purchase.aggregate({
            _sum: {
                purchaseTotal: true,
            },
            where: {
                createdAt: {
                    gte: start,
                    lte: endInclusive,
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
            where: { purchaseProviderId: providerId },
            include: {
                provider: {
                    select: { providerId: true, providerName: true },
                },
                PurchaseDetail: {
                    select: { purchaseDetailTotal: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return purchases.map((purchase) => ({
            ...purchase,
            purchaseTotal: purchase.PurchaseDetail.reduce(
                (acc, d) => acc + d.purchaseDetailTotal,
                0,
            ),
            purchaseDate: purchase.createdAt.toLocaleDateString("es-CL"),
        }));
    } catch (error) {
        console.error("(purchaseServices.js): Error getting purchases by provider ID:", error);
        throw error;
    }
};

export const countPurchasesMonthService = async (
    month,
    year,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    try {
        // Validate input
        if (!month || !year) {
            throw new Error("Month and year are required");
        }

        const { start, endExclusive } = businessMonthBoundsUtc(year, month, timeZone);

        const count = await prisma.purchase.count({
            where: {
                createdAt: {
                    gte: start,
                    lt: endExclusive,
                },
            },
        });

        return count;

    } catch (error) {
        console.error("(purchaseServices.js): Error counting purchases:", error);
        throw error;
    }
};

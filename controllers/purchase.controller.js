import { createPurchase, getPurchaseById, getPurchases, getMonthlyPurchases, getDayPurchases, getPurchasesByProviderIdService, countPurchasesMonthService, createPurchaseComplete, updatePurchaseHeader, cancelPurchaseWithInventory } from '../services/purchaseServices.js';
import { InsufficientStockError } from '../services/inventory/inventoryService.js';
import definePurchaseNumber from '../libs/definePurchaseNumber.js';
import { getTodayBusinessDate, DEFAULT_BUSINESS_TIMEZONE } from '../libs/businessTimezone.js';

const tzOf = (req) => req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE;

export const createPurchaseController = async (req, res) => {
    try {
        const { purchaseId, purchaseTotal, purchaseComment, purchaseProviderId } = req.body;
        // purchaseTotalPayments? Purchase might not have payments logic yet as per user request to start simple?
        // User asked for "Purchase" model having "purchaseRealNumber" (invoice).
        // Let's check schema for Purchase again.
        // Purchase has: purchaseId, purchaseNumber, purchaseRealNumber, purchaseProviderId, purchaseTotal, purchaseStatus, purchaseComment.
        // req.body should have these.
        
        const { purchaseRealNumber } = req.body;

        const userId = req.user.payload.id
        const numberPurchase = await definePurchaseNumber(req.prisma);

        const data = {
            purchaseId,
            purchaseNumber: numberPurchase,
            purchaseRealNumber,
            purchaseProviderId,
            createdByUserId: userId,
            purchaseTotal: Number(purchaseTotal),
            purchaseStatus: "PENDING", // Default status
            purchaseComment
        };
        const purchase = await createPurchase(data, req.prisma);
        res.status(201).json({
            message: 'Purchase created successfully',
            purchase
        });
    } catch (error) {
        console.error("(purchase.controller.js): Error creating purchase:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createPurchaseCompleteController = async (req, res) => {
    try {
        const userId = req.user.payload.id;
        const {
            purchase,
            purchaseDetails,
            items,
            purchaseId,
            purchaseProviderId,
            providerId,
            purchaseRealNumber,
            documentNumber,
            purchaseComment,
            note,
            purchaseTotal,
        } = req.body;

        const purchasePayload = purchase ?? {
            purchaseId: purchaseId ?? req.body.purchaseId,
            purchaseProviderId: purchaseProviderId ?? providerId,
            purchaseRealNumber: purchaseRealNumber ?? documentNumber,
            purchaseComment: purchaseComment ?? note,
            purchaseTotal,
        };

        let detailsPayload = purchaseDetails;

        if (!detailsPayload && Array.isArray(items)) {
            detailsPayload = items
                .filter((item) => item.productId && Number(item.quantity) > 0)
                .map((item) => ({
                    purchaseDetailId: item.purchaseDetailId ?? item.id,
                    purchaseDetailProductId: item.productId,
                    purchaseDetailServiceId: null,
                    purchaseDetailType: "PRODUCT",
                    purchaseDetailQuantity: Number(item.quantity),
                    purchaseDetailPrice: Number(item.unitCost ?? item.purchaseDetailPrice ?? 0),
                    purchaseDetailTotal: Number(
                        item.totalLine ??
                            item.purchaseDetailTotal ??
                            Number(item.quantity) * Number(item.unitCost ?? 0),
                    ),
                }));
        }

        if (!purchasePayload.purchaseId) {
            return res.status(400).json({ message: "purchaseId is required" });
        }
        if (!purchasePayload.purchaseProviderId) {
            return res.status(400).json({ message: "Proveedor requerido" });
        }
        if (!purchasePayload.purchaseRealNumber?.trim()) {
            return res.status(400).json({ message: "Número de documento requerido" });
        }
        if (!detailsPayload?.length) {
            return res.status(400).json({ message: "Debe incluir al menos un producto" });
        }

        const result = await createPurchaseComplete(
            {
                purchase: purchasePayload,
                purchaseDetails: detailsPayload,
            },
            req.prisma,
            userId,
        );

        res.status(201).json({
            message: "Purchase created successfully",
            purchase: result,
        });
    } catch (error) {
        console.error("(purchase.controller.js): Error creating complete purchase:", error);
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

export const getPurchasesController = async (req, res) => {
    try {
        const purchases = await getPurchases(req.prisma);
        res.status(200).json(purchases);
    } catch (error) {
        console.error("(purchase.controller.js): Error fetching purchases:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPurchaseByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await getPurchaseById(id, req.prisma);
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }
        res.status(200).json(purchase);
    } catch (error) {
        console.error("(purchase.controller.js): Error fetching purchase by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePurchaseController = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await updatePurchaseHeader(id, req.body, req.prisma);
        res.status(200).json({
            message: "Compra actualizada correctamente",
            purchase,
        });
    } catch (error) {
        console.error("(purchase.controller.js): Error updating purchase:", error);
        const status = error.statusCode || 500;
        res.status(status).json({
            message: error.message || "Internal server error",
        });
    }
};

export const cancelPurchaseController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.payload.id;
        const purchase = await cancelPurchaseWithInventory(id, userId, req.prisma);
        res.status(200).json({
            message: "Compra anulada. El registro se conserva y el inventario fue ajustado.",
            purchase,
        });
    } catch (error) {
        console.error("(purchase.controller.js): Error cancelling purchase:", error);
        if (error instanceof InsufficientStockError || error.code === "INSUFFICIENT_STOCK") {
            return res.status(409).json({
                message: error.message,
                code: "INSUFFICIENT_STOCK",
                details: error.details,
            });
        }

        const status = error.statusCode || 500;
        res.status(status).json({
            message: error.message || "Internal server error",
        });
    }
};

export const getMonthlyPurchasesController = async (req, res) => {
    try {
        const { month, year } = req.params;
        res.status(200).json(await getMonthlyPurchases(Number(month), Number(year), req.prisma, tzOf(req)));
    } catch (error) {
        console.error("(purchase.controller.js): Error getting monthly purchases:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMonthlyPurchasesNowController = async (req, res) => {
    try {
        const today = getTodayBusinessDate(tzOf(req));
        const month = Number(today.slice(5, 7));
        const year = Number(today.slice(0, 4));

        res.status(200).json(await getMonthlyPurchases(Number(month), Number(year), req.prisma, tzOf(req)));
    } catch (error) {
        console.error("(purchase.controller.js): Error getting monthly purchases:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getDayPurchasesController = async (req, res) => {
    try {
        const { day, month, year } = req.params;
        res.status(200).json(await getDayPurchases(Number(day), Number(month), Number(year), req.prisma, tzOf(req)));
    } catch (error) {
        console.error("(purchase.controller.js): Error getting day purchases:", error);
        res.status(500).json({ message: "Internal server error" });

    }
};

export const getPurchasesByProviderIdController = async (req, res) => {
    try {
        const { providerId } = req.params;
        const purchasesFound = await getPurchasesByProviderIdService(providerId, req.prisma);
        res.status(200).json(purchasesFound);
    } catch (error) {
        console.error("(purchase.controller.js): Error getting purchases by provider ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const countPurchasesMonthController = async (req, res) => {
    try {
        const { month, year } = req.params;
        res.status(200).json(await countPurchasesMonthService(Number(month), Number(year), req.prisma, tzOf(req)));
    } catch (error) {
        console.error("(purchase.controller.js): Error counting purchases:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

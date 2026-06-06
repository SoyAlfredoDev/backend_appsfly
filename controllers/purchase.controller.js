import { createPurchase, getPurchaseById, getPurchases, getMonthlyPurchases, getDayPurchases, getPurchasesByProviderIdService, countPurchasesMonthService } from '../services/purchaseServices.js';
import definePurchaseNumber from '../libs/definePurchaseNumber.js';

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

export const getMonthlyPurchasesController = async (req, res) => {
    try {
        const { month, year } = req.params;
        res.status(200).json(await getMonthlyPurchases(Number(month), Number(year), req.prisma));
    } catch (error) {
        console.error("(purchase.controller.js): Error getting monthly purchases:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMonthlyPurchasesNowController = async (req, res) => {
    try {
        const month = new Date().getMonth() + 1; // Months are zero-based
        const year = new Date().getFullYear();

        res.status(200).json(await getMonthlyPurchases(Number(month), Number(year), req.prisma));
    } catch (error) {
        console.error("(purchase.controller.js): Error getting monthly purchases:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getDayPurchasesController = async (req, res) => {
    try {
        const { day, month, year } = req.params;
        res.status(200).json(await getDayPurchases(Number(day), Number(month), Number(year), req.prisma));
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
        res.status(200).json(await countPurchasesMonthService(Number(month), Number(year), req.prisma));
    } catch (error) {
        console.error("(purchase.controller.js): Error counting purchases:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

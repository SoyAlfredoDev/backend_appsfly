import {
    getInventorySummary,
    getInventoryStockList,
} from "../services/inventory/inventoryStockService.js";
import {
    getInventoryMovements,
    createManualAdjustment,
} from "../services/inventory/inventoryMovementQueryService.js";
import { InsufficientStockError } from "../services/inventory/inventoryService.js";
import { DEFAULT_BUSINESS_TIMEZONE } from "../libs/businessTimezone.js";

export const getInventorySummaryController = async (req, res) => {
    try {
        const summary = await getInventorySummary(req.prisma);
        res.status(200).json(summary);
    } catch (error) {
        console.error("(inventory.controller.js): Error getting summary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getInventoryStockController = async (req, res) => {
    try {
        const { q, lowStockOnly } = req.query;
        const stock = await getInventoryStockList(req.prisma, { q, lowStockOnly });
        res.status(200).json(stock);
    } catch (error) {
        console.error("(inventory.controller.js): Error getting stock:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getInventoryMovementsController = async (req, res) => {
    try {
        const { type, productId, q, from, to, page, limit } = req.query;
        const result = await getInventoryMovements(req.prisma, {
            type,
            productId,
            q,
            from,
            to,
            page,
            limit,
            timeZone: req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE,
        });
        res.status(200).json(result);
    } catch (error) {
        console.error("(inventory.controller.js): Error getting movements:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createInventoryAdjustmentController = async (req, res) => {
    try {
        const userId = req.user.payload.id;
        const result = await createManualAdjustment(req.prisma, userId, req.body);

        res.status(201).json({
            message: "Ajuste registrado correctamente",
            movement: result.movement,
            stockAfter: result.stockAfter,
        });
    } catch (error) {
        console.error("(inventory.controller.js): Error creating adjustment:", error);

        if (error instanceof InsufficientStockError || error.code === "INSUFFICIENT_STOCK") {
            return res.status(409).json({
                message: error.message,
                code: "INSUFFICIENT_STOCK",
                details: error.details,
            });
        }

        res.status(400).json({
            message: error.message || "No se pudo registrar el ajuste",
        });
    }
};

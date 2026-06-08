import { Router } from "express";
import {
    getInventorySummaryController,
    getInventoryStockController,
    getInventoryMovementsController,
    createInventoryAdjustmentController,
} from "../controllers/inventory.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.get("/inventory/summary", authRequired, dbSelectorMiddleware, getInventorySummaryController);
router.get("/inventory/stock", authRequired, dbSelectorMiddleware, getInventoryStockController);
router.get("/inventory/movements", authRequired, dbSelectorMiddleware, getInventoryMovementsController);
router.post("/inventory/adjustments", authRequired, dbSelectorMiddleware, createInventoryAdjustmentController);

export default router;

import { Router } from "express";
import {
    getInventorySummaryController,
    getInventoryStockController,
    getInventoryMovementsController,
    createInventoryAdjustmentController,
} from "../controllers/inventory.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

router.get("/inventory/summary", ...auth, getInventorySummaryController);
router.get("/inventory/stock", ...auth, getInventoryStockController);
router.get("/inventory/movements", ...auth, getInventoryMovementsController);
router.post("/inventory/adjustments", ...auth, requireTenantAdmin, createInventoryAdjustmentController);

export default router;

import { Router } from "express";

import {
    getPurchasesController,
    getPurchaseByIdController,
    createPurchaseController,
    createPurchaseCompleteController,
    updatePurchaseController,
    cancelPurchaseController,
    getMonthlyPurchasesController,
    getDayPurchasesController,
    getMonthlyPurchasesNowController,
    getPurchasesByProviderIdController,
    countPurchasesMonthController
} from "../controllers/purchase.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const admin = [authRequired, dbSelectorMiddleware, requireTenantAdmin];

router.get("/purchases/monthNow", ...admin, getMonthlyPurchasesNowController);
router.get("/purchases/provider/:providerId", ...admin, getPurchasesByProviderIdController);
router.get("/purchases/count/:month/:year", ...admin, countPurchasesMonthController);
router.get("/purchases/month/:month/:year", ...admin, getMonthlyPurchasesController);
router.get("/purchases/day/:day/:month/:year", ...admin, getDayPurchasesController);
router.get("/purchases", ...admin, getPurchasesController);
router.post("/purchases/complete", ...admin, createPurchaseCompleteController);
router.post("/purchases", ...admin, createPurchaseController);
router.get("/purchases/:id", ...admin, getPurchaseByIdController);
router.put("/purchases/:id", ...admin, updatePurchaseController);
router.post("/purchases/:id/cancel", ...admin, cancelPurchaseController);

export default router;

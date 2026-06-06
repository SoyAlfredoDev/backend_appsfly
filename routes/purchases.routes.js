import { Router } from "express";

import {
    getPurchasesController,
    getPurchaseByIdController,
    createPurchaseController,
    getMonthlyPurchasesController,
    getDayPurchasesController,
    getMonthlyPurchasesNowController,
    getPurchasesByProviderIdController,
    countPurchasesMonthController
} from "../controllers/purchase.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

/* ----------------------------
   PURCHASE ROUTES (ordered)
----------------------------- */

// 1. Specific utility routes
router.get("/purchases/monthNow", authRequired, dbSelectorMiddleware, getMonthlyPurchasesNowController);

router.get("/purchases/provider/:providerId", authRequired, dbSelectorMiddleware, getPurchasesByProviderIdController);

// 2. Counting monthly purchases
router.get("/purchases/count/:month/:year", authRequired, dbSelectorMiddleware, countPurchasesMonthController);

// 3. Monthly purchases
router.get("/purchases/month/:month/:year", authRequired, dbSelectorMiddleware, getMonthlyPurchasesController);

// 4. Daily purchases
router.get("/purchases/day/:day/:month/:year", authRequired, dbSelectorMiddleware, getDayPurchasesController);

// 5. Main list of purchases
router.get("/purchases", authRequired, dbSelectorMiddleware, getPurchasesController);

// 6. Get purchase by ID
router.get("/purchases/:id", authRequired, dbSelectorMiddleware, getPurchaseByIdController);

// 7. Create purchase
router.post("/purchases", authRequired, dbSelectorMiddleware, createPurchaseController);

export default router;

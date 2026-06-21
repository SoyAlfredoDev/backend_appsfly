import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

import {
    getTransactionsController,
    getTransactionByIdController,
    createTransactionController,
    getTransactionsSummaryController,
} from "../controllers/transactions.controller.js";

const router = Router();
const admin = [authRequired, dbSelectorMiddleware, requireTenantAdmin];

router.get("/transactions/summary", ...admin, getTransactionsSummaryController);
router.get("/transactions", ...admin, getTransactionsController);
router.get("/transactions/:id", ...admin, getTransactionByIdController);
router.post("/transactions", ...admin, createTransactionController);

export default router;

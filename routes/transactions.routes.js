import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

import { getTransactionsController } from "../controllers/transactions.controller.js";

const router = Router();

router.get('/transactions', authRequired, dbSelectorMiddleware, getTransactionsController);

export default router;
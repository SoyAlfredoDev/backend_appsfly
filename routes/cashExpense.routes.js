import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
const router = Router();

router.post('/cashExpense', authRequired, dbSelectorMiddleware, createCashExpenseController);

export default router;  
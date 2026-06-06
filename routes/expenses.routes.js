import { Router } from "express";
import {
  createExpenseController,
  getExpenseByIdController,
  getExpensesController,
  sumExpensesByPaymentMethodController,
  deleteExpenseController,
  sumExpenseByMonthController,
} from "../controllers/expenses.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.post(
  "/expenses",
  authRequired,
  dbSelectorMiddleware,
  createExpenseController,
);
router.get(
  "/expenses",
  authRequired,
  dbSelectorMiddleware,
  getExpensesController,
);
router.get(
  "/expenses/sum/:month/:year",
  authRequired,
  dbSelectorMiddleware,
  sumExpenseByMonthController,
);
router.get(
  "/expenses/sum/:paymentMethod",
  authRequired,
  dbSelectorMiddleware,
  sumExpensesByPaymentMethodController,
);
router.get(
  "/expenses/:id",
  authRequired,
  dbSelectorMiddleware,
  getExpenseByIdController,
);
router.delete(
  "/expenses/delete/:id",
  authRequired,
  dbSelectorMiddleware,
  deleteExpenseController,
);

export default router;

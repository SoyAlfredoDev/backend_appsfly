import { Router } from "express";
import {
  createExpenseController,
  getExpenseByIdController,
  getExpensesController,
  sumExpensesByPaymentMethodController,
  deleteExpenseController,
  sumExpenseByMonthController,
  listExpenseCategoriesController,
  createExpenseCategoryController,
  deleteExpenseCategoryController,
} from "../controllers/expenses.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const admin = [authRequired, dbSelectorMiddleware, requireTenantAdmin];

router.get("/expense-categories", ...admin, listExpenseCategoriesController);
router.post("/expense-categories", ...admin, createExpenseCategoryController);
router.delete("/expense-categories/:id", ...admin, deleteExpenseCategoryController);
router.post("/expenses", ...admin, createExpenseController);
router.get("/expenses", ...admin, getExpensesController);
router.get("/expenses/sum/:month/:year", ...admin, sumExpenseByMonthController);
router.get("/expenses/sum/:paymentMethod", ...admin, sumExpensesByPaymentMethodController);
router.get("/expenses/:id", ...admin, getExpenseByIdController);
router.delete("/expenses/delete/:id", ...admin, deleteExpenseController);

export default router;

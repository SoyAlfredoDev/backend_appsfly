import { Router } from "express";
import { getSalesController, getSaleByIdController, createSaleController, getMonthlySalescontroller, getDaySalesController } from "../controllers/sales.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();
router.get('/sales', authRequired, dbSelectorMiddleware, getSalesController);
router.get('/sales/:id', authRequired, dbSelectorMiddleware, getSaleByIdController);
router.post('/sales', authRequired, dbSelectorMiddleware, createSaleController);
router.get('/sales/:month/:year', authRequired, dbSelectorMiddleware, getMonthlySalescontroller);
router.get('/sales/:day/:month/:year', authRequired, dbSelectorMiddleware, getDaySalesController);

export default router;
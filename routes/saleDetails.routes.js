import { Router } from "express";
import { getSaleDetailController, createSaleDetailController, getSaleDetailByIdcontroller } from '../controllers/saleDetails.controller.js';
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();
router.get('/saleDetails', authRequired, dbSelectorMiddleware, getSaleDetailController);
router.post('/saleDetails', authRequired, dbSelectorMiddleware, createSaleDetailController);
router.get('/saleDetails/:id', authRequired, dbSelectorMiddleware, getSaleDetailByIdcontroller)

export default router;  
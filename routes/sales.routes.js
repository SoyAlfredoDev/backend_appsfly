import { Router } from "express";
import {
    getSalesController,
    getSaleByIdController,
    createSaleController,
    getMonthlySalescontroller,
    getDaySalesController,
    getMonthlySalesNowController,
    getSalesByCustomerIdController
} from "../controllers/sales.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";


const router = Router();
router.get('/sales/monthNow', authRequired, dbSelectorMiddleware, getMonthlySalesNowController);
router.get('/sales/customer/:customerId', authRequired, dbSelectorMiddleware, getSalesByCustomerIdController);

router.get('/sales/:day/:month/:year', authRequired, dbSelectorMiddleware, getDaySalesController);


router.get('/sales', authRequired, dbSelectorMiddleware, getSalesController);
router.get('/sales/:id', authRequired, dbSelectorMiddleware, getSaleByIdController);
router.post('/sales', authRequired, dbSelectorMiddleware, createSaleController);
router.get('/sales/:month/:year', authRequired, dbSelectorMiddleware, getMonthlySalescontroller);






export default router;
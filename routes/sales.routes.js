import { Router } from "express";

import {
    getSalesController,
    getSaleByIdController,
    createSaleController,
    getMonthlySalescontroller,
    getDaySalesController,
    getMonthlySalesNowController,
    getSalesByCustomerIdController,
    countSalesMonthController
} from "../controllers/sales.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { pendingDailyClosureMiddleware } from "../middlewares/pendingDailyClosureMiddleware.js";

const router = Router();

/* ----------------------------
   SALES ROUTES (ordered)
----------------------------- */

// 1. Specific utility routes
router.get("/sales/monthNow", authRequired, dbSelectorMiddleware, getMonthlySalesNowController);

router.get("/sales/customer/:customerId", authRequired, dbSelectorMiddleware, getSalesByCustomerIdController);

// 2. Counting monthly sales
router.get("/sales/count/:month/:year", authRequired, dbSelectorMiddleware, countSalesMonthController);

// 3. Monthly sales
router.get("/sales/month/:month/:year", authRequired, dbSelectorMiddleware, getMonthlySalescontroller);

// 4. Daily sales (avoid collision by adding /day)
router.get("/sales/day/:day/:month/:year", authRequired, dbSelectorMiddleware, getDaySalesController);

// 5. Main list of sales
router.get("/sales", authRequired, dbSelectorMiddleware, getSalesController);

// 6. Get sale by ID
router.get("/sales/:id", authRequired, dbSelectorMiddleware, getSaleByIdController);

// 7. Create sale
router.post("/sales", authRequired, dbSelectorMiddleware, pendingDailyClosureMiddleware, createSaleController);

export default router;

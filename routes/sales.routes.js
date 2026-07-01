import { Router } from "express";

import {
    getSalesController,
    getDashboardSalesViewController,
    getSaleByIdController,
    createSaleController,
    getMonthlySalescontroller,
    getDaySalesController,
    getMonthlySalesNowController,
    getSalesByCustomerIdController,
    countSalesMonthController,
    markSaleDeliveredController,
    sendSaleEmailController,
} from "../controllers/sales.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { pendingDailyClosureMiddleware } from "../middlewares/pendingDailyClosureMiddleware.js";
import {
    getQuotationsController,
    getQuotationByIdController,
    createQuotationController,
    updateQuotationStatusController,
    deleteQuotationController,
    sendQuotationEmailController,
} from "../controllers/quotation.controller.js";
import {
    createQuotationDetailController,
    getQuotationDetailsByQuotationIdController,
} from "../controllers/quotationDetail.controller.js";

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

// 4b. Dashboard KPI drill-down (before /sales/:id)
router.get("/sales/dashboard/:view", authRequired, dbSelectorMiddleware, getDashboardSalesViewController);

// 5. Main list of sales
router.get("/sales", authRequired, dbSelectorMiddleware, getSalesController);

// 6. Get sale by ID
router.get("/sales/:id", authRequired, dbSelectorMiddleware, getSaleByIdController);

// 6b. Marcar venta como entregada
router.patch("/sales/:id/delivery", authRequired, dbSelectorMiddleware, markSaleDeliveredController);

// 6c. Enviar comprobante de venta por correo
router.post("/sales/:id/send-email", authRequired, dbSelectorMiddleware, sendSaleEmailController);

// 7. Create sale
router.post("/sales", authRequired, dbSelectorMiddleware, pendingDailyClosureMiddleware, createSaleController);

/* ----------------------------
   QUOTATIONS (co-located for deploy reliability)
----------------------------- */

router.get("/quotations", authRequired, dbSelectorMiddleware, getQuotationsController);
router.get("/quotations/:id", authRequired, dbSelectorMiddleware, getQuotationByIdController);
router.post("/quotations", authRequired, dbSelectorMiddleware, createQuotationController);
router.post("/quotations/:id/send-email", authRequired, dbSelectorMiddleware, sendQuotationEmailController);
router.patch("/quotations/:id/status", authRequired, dbSelectorMiddleware, updateQuotationStatusController);
router.delete("/quotations/:id", authRequired, dbSelectorMiddleware, deleteQuotationController);
router.post("/quotationDetails", authRequired, dbSelectorMiddleware, createQuotationDetailController);
router.get("/quotationDetails/:id", authRequired, dbSelectorMiddleware, getQuotationDetailsByQuotationIdController);

export default router;

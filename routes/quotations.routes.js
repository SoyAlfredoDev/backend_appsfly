import { Router } from "express";
import {
    getQuotationsController,
    getQuotationByIdController,
    createQuotationController,
    updateQuotationStatusController,
    deleteQuotationController,
    sendQuotationEmailController,
} from "../controllers/quotation.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.get("/quotations", authRequired, dbSelectorMiddleware, getQuotationsController);
router.get("/quotations/:id", authRequired, dbSelectorMiddleware, getQuotationByIdController);
router.post("/quotations", authRequired, dbSelectorMiddleware, createQuotationController);
router.post("/quotations/:id/send-email", authRequired, dbSelectorMiddleware, sendQuotationEmailController);
router.patch("/quotations/:id/status", authRequired, dbSelectorMiddleware, updateQuotationStatusController);
router.delete("/quotations/:id", authRequired, dbSelectorMiddleware, deleteQuotationController);

export default router;

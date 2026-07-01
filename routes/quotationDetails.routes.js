import { Router } from "express";
import {
    createQuotationDetailController,
    getQuotationDetailsByQuotationIdController
} from "../controllers/quotationDetail.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.post("/quotationDetails", authRequired, dbSelectorMiddleware, createQuotationDetailController);
router.get("/quotationDetails/:id", authRequired, dbSelectorMiddleware, getQuotationDetailsByQuotationIdController);

export default router;

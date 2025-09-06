import { Router } from "express";
import { createPaymentController, getPaymentBySaleIdController } from '../controllers/payments.controller.js'

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js"

const router = Router();

router.post('/payments', authRequired, dbSelectorMiddleware, createPaymentController);
router.get('/payments/:id', authRequired, dbSelectorMiddleware, getPaymentBySaleIdController)

export default router;

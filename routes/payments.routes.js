import { Router } from "express";
import { createPaymentController, getPaymentBySaleIdController, getPaymentsController, getSumPaymentsByPaymentMethodsController } from '../controllers/payments.controller.js'

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js"

const router = Router();

router.post('/payments', authRequired, dbSelectorMiddleware, createPaymentController);
router.get('/payments/:id', authRequired, dbSelectorMiddleware, getPaymentBySaleIdController);
router.get('/payments', authRequired, dbSelectorMiddleware, getPaymentsController);
router.get('/payments/sum/:paymentMethod', authRequired, dbSelectorMiddleware, getSumPaymentsByPaymentMethodsController);

export default router;

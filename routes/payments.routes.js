import { Router } from "express";
import {
    createPaymentController,
    getPaymentBySaleIdController,
    getPaymentsController,
    getSumPaymentsByPaymentMethodsController,
    getPaymentByCustomerIdController
} from '../controllers/payments.controller.js';
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.get('/payments/sum/:paymentMethod', authRequired, dbSelectorMiddleware, getSumPaymentsByPaymentMethodsController);
router.get('/payments/customer/:customerId', authRequired, dbSelectorMiddleware, getPaymentByCustomerIdController);
router.get('/payments', authRequired, dbSelectorMiddleware, getPaymentsController);
router.get('/payments/:id', authRequired, dbSelectorMiddleware, getPaymentBySaleIdController);
router.post('/payments', authRequired, dbSelectorMiddleware, createPaymentController);

export default router;

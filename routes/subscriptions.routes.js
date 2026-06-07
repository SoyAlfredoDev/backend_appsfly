import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import {
    checkActiveSubscription,
    createSubscriptionController,
    createSubscriptionCheckoutController,
    processSubscriptionPaymentBrickController,
    confirmSubscriptionPaymentController,
    mercadoPagoWebhookController,
    getSubscriptionPaymentStatusController,
} from '../controllers/subscription.controller.js';

const router = Router();

router.post('/subscriptions', authRequired, createSubscriptionController);
router.post('/subscriptions/checkout', authRequired, createSubscriptionCheckoutController);
router.post('/subscriptions/process-payment', authRequired, processSubscriptionPaymentBrickController);
router.get('/subscriptions/payments/:paymentId', authRequired, getSubscriptionPaymentStatusController);
router.post('/subscriptions/payments/:paymentId/confirm', authRequired, confirmSubscriptionPaymentController);
router.get('/subscriptions/:businessId', authRequired, checkActiveSubscription);
router.post('/subscriptions/mercadopago/webhook', mercadoPagoWebhookController);

export default router;

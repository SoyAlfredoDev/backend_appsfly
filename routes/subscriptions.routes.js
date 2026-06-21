import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import {
    checkActiveSubscription,
    createSubscriptionController,
    createSubscriptionCheckoutController,
    processSubscriptionPaymentBrickController,
    confirmSubscriptionPaymentController,
    getSubscriptionPaymentStatusController,
    getBusinessBillingController,
    cancelBusinessSubscriptionController,
} from '../controllers/subscription.controller.js';
import { ensureTenantRole, requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const admin = [authRequired, ensureTenantRole, requireTenantAdmin];

router.post('/subscriptions', ...admin, createSubscriptionController);
router.post('/subscriptions/checkout', ...admin, createSubscriptionCheckoutController);
router.post('/subscriptions/process-payment', ...admin, processSubscriptionPaymentBrickController);
router.post('/subscriptions/payments/:paymentId/confirm', ...admin, confirmSubscriptionPaymentController);
router.post('/subscriptions/billing/:businessId/cancel', ...admin, cancelBusinessSubscriptionController);

router.get('/subscriptions/payments/:paymentId', authRequired, getSubscriptionPaymentStatusController);
router.get('/subscriptions/billing/:businessId', authRequired, ensureTenantRole, getBusinessBillingController);
router.get('/subscriptions/:businessId', authRequired, checkActiveSubscription);

export default router;

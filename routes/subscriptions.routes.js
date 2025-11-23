import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { checkActiveSubscription, createSubscriptionController } from '../controllers/subscription.controller.js';


const router = Router();

router.post('/subscriptions', authRequired, createSubscriptionController);
router.get('/subscriptions/:businessId', authRequired, checkActiveSubscription);

export default router;  
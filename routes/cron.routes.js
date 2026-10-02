import { Router } from "express";
import {
    cronEmailCampaignsController,
    cronMpSubscriptionRenewalsController,
    cronUfSubscriptionRepricingController,
} from "../controllers/cron.controller.js";

const router = Router();

router.get("/cron/email-campaigns", cronEmailCampaignsController);
router.post("/cron/email-campaigns", cronEmailCampaignsController);

router.get("/cron/mp-subscription-renewals", cronMpSubscriptionRenewalsController);
router.post("/cron/mp-subscription-renewals", cronMpSubscriptionRenewalsController);

router.get("/cron/uf-subscription-repricing", cronUfSubscriptionRepricingController);
router.post("/cron/uf-subscription-repricing", cronUfSubscriptionRepricingController);

export default router;

import { Router } from "express";
import {
    cronEmailCampaignsController,
    cronMpSubscriptionRenewalsController,
} from "../controllers/cron.controller.js";

const router = Router();

router.get("/cron/email-campaigns", cronEmailCampaignsController);
router.post("/cron/email-campaigns", cronEmailCampaignsController);

router.get("/cron/mp-subscription-renewals", cronMpSubscriptionRenewalsController);
router.post("/cron/mp-subscription-renewals", cronMpSubscriptionRenewalsController);

export default router;

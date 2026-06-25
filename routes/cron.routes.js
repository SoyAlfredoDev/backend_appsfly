import { Router } from "express";
import { cronEmailCampaignsController } from "../controllers/cron.controller.js";

const router = Router();

router.get("/cron/email-campaigns", cronEmailCampaignsController);
router.post("/cron/email-campaigns", cronEmailCampaignsController);

export default router;

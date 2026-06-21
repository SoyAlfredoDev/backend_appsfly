import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";
import {
    segmentAsmrCampaignController,
    executeAsmrCampaignController,
    listAsmrCampaignsController,
    getAsmrCampaignSummaryController,
} from "../controllers/asmrCampaign.controller.js";

const router = Router();
const admin = [authRequired, dbSelectorMiddleware, requireTenantAdmin];

router.get("/asmr-campaigns/summary", ...admin, getAsmrCampaignSummaryController);
router.get("/asmr-campaigns", ...admin, listAsmrCampaignsController);
router.post("/asmr-campaigns/segment", ...admin, segmentAsmrCampaignController);
router.post("/asmr-campaigns/execute", ...admin, executeAsmrCampaignController);

export default router;

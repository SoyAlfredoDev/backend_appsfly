import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import {
    segmentAsmrCampaignController,
    executeAsmrCampaignController,
    listAsmrCampaignsController,
    getAsmrCampaignSummaryController,
} from "../controllers/asmrCampaign.controller.js";

const router = Router();

router.get(
    "/asmr-campaigns/summary",
    authRequired,
    dbSelectorMiddleware,
    getAsmrCampaignSummaryController,
);

router.get(
    "/asmr-campaigns",
    authRequired,
    dbSelectorMiddleware,
    listAsmrCampaignsController,
);

router.post(
    "/asmr-campaigns/segment",
    authRequired,
    dbSelectorMiddleware,
    segmentAsmrCampaignController,
);

router.post(
    "/asmr-campaigns/execute",
    authRequired,
    dbSelectorMiddleware,
    executeAsmrCampaignController,
);

export default router;

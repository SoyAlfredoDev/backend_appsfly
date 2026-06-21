import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { superAdminRequired } from "../middlewares/superAdminMiddleware.js";
import {
    createEmailCampaignController,
    deleteEmailCampaignController,
    ensureSystemEmailCampaignsController,
    executeEmailCampaignController,
    getEmailCampaignController,
    getEmailCampaignMetadataController,
    getEmailCampaignRunController,
    getEmailCampaignStatsController,
    listEmailCampaignsController,
    previewEmailCampaignAudienceController,
    previewEmailCampaignMessageController,
    updateEmailCampaignController,
} from "../controllers/adminEmailCampaign.controller.js";

const router = Router();

/** Campañas de email de plataforma — panel super-admin. Separado de /asmr-campaigns (tenant). */

router.get(
    "/admin/email-campaigns/metadata",
    authRequired,
    superAdminRequired,
    getEmailCampaignMetadataController,
);

router.get(
    "/admin/email-campaigns",
    authRequired,
    superAdminRequired,
    listEmailCampaignsController,
);

router.post(
    "/admin/email-campaigns/ensure-system",
    authRequired,
    superAdminRequired,
    ensureSystemEmailCampaignsController,
);

router.post(
    "/admin/email-campaigns/preview-audience",
    authRequired,
    superAdminRequired,
    previewEmailCampaignAudienceController,
);

router.get(
    "/admin/email-campaigns/runs/:runId",
    authRequired,
    superAdminRequired,
    getEmailCampaignRunController,
);

router.get(
    "/admin/email-campaigns/:id/stats",
    authRequired,
    superAdminRequired,
    getEmailCampaignStatsController,
);

router.get(
    "/admin/email-campaigns/:id/preview-message",
    authRequired,
    superAdminRequired,
    previewEmailCampaignMessageController,
);

router.post(
    "/admin/email-campaigns/:id/execute",
    authRequired,
    superAdminRequired,
    executeEmailCampaignController,
);

router.get(
    "/admin/email-campaigns/:id",
    authRequired,
    superAdminRequired,
    getEmailCampaignController,
);

router.post(
    "/admin/email-campaigns",
    authRequired,
    superAdminRequired,
    createEmailCampaignController,
);

router.patch(
    "/admin/email-campaigns/:id",
    authRequired,
    superAdminRequired,
    updateEmailCampaignController,
);

router.delete(
    "/admin/email-campaigns/:id",
    authRequired,
    superAdminRequired,
    deleteEmailCampaignController,
);

export default router;

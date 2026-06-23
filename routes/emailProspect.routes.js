import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { superAdminRequired } from "../middlewares/superAdminMiddleware.js";
import {
    bulkImportProspectsController,
    createProspectController,
    deleteProspectController,
    downloadProspectImportTemplateController,
    getProspectOutreachVariantsController,
    getUnsubscribeInfoController,
    listProspectsController,
    prospectRegisterClickController,
    resubscribeProspectController,
    unsubscribeProspectController,
} from "../controllers/emailProspect.controller.js";

const router = Router();

router.get("/prospects/unsubscribe/:token", getUnsubscribeInfoController);
router.post("/prospects/unsubscribe/:token", unsubscribeProspectController);
router.get("/prospects/register-click/:recipientId", prospectRegisterClickController);

router.get(
    "/admin/email-prospects",
    authRequired,
    superAdminRequired,
    listProspectsController,
);

router.get(
    "/admin/email-prospects/outreach-variants",
    authRequired,
    superAdminRequired,
    getProspectOutreachVariantsController,
);

router.post(
    "/admin/email-prospects",
    authRequired,
    superAdminRequired,
    createProspectController,
);

router.get(
    "/admin/email-prospects/import-template",
    authRequired,
    superAdminRequired,
    downloadProspectImportTemplateController,
);

router.post(
    "/admin/email-prospects/import",
    authRequired,
    superAdminRequired,
    bulkImportProspectsController,
);

router.post(
    "/admin/email-prospects/:id/resubscribe",
    authRequired,
    superAdminRequired,
    resubscribeProspectController,
);

router.delete(
    "/admin/email-prospects/:id",
    authRequired,
    superAdminRequired,
    deleteProspectController,
);

export default router;

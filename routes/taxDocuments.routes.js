import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";
import {
    getTaxBillingDashboardController,
    getTaxConfigController,
    getTaxDocumentController,
    issueTaxDocumentController,
    listTaxDocumentsController,
    retryTaxDocumentController,
    syncTaxDocumentStatusController,
    upsertTaxConfigController,
} from "../controllers/taxDocuments.controller.js";

const router = Router();
const admin = [authRequired, dbSelectorMiddleware, requireTenantAdmin];

router.get("/tax-documents/dashboard", ...admin, getTaxBillingDashboardController);
router.get("/tax-documents/config", ...admin, getTaxConfigController);
router.put("/tax-documents/config", ...admin, upsertTaxConfigController);
router.get("/tax-documents", ...admin, listTaxDocumentsController);
router.get("/tax-documents/:id", ...admin, getTaxDocumentController);
router.post("/tax-documents/issue", ...admin, issueTaxDocumentController);
router.post("/tax-documents/:id/sync", ...admin, syncTaxDocumentStatusController);
router.post("/tax-documents/:id/retry", ...admin, retryTaxDocumentController);

export default router;

import { Router } from "express";
import {
    resolveScanCodeController,
    listProductCodesController,
    deleteScanCodeController,
} from "../controllers/scan.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];
const admin = [...auth, requireTenantAdmin];

router.get("/scan/resolve", ...auth, resolveScanCodeController);
router.get("/products/:id/codes", ...auth, listProductCodesController);
router.delete("/scan/codes/:scanCodeId", ...admin, deleteScanCodeController);

export default router;

import { Router } from "express";
import { createServiceController, getServicesController } from "../controllers/services.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

router.post('/services', ...auth, requireTenantAdmin, createServiceController);
router.get('/services', ...auth, getServicesController);

export default router;

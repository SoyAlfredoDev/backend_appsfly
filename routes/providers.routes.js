import { Router } from "express";
import {
  createProviderController,
  getProvidersController,
  getProviderByIdController,
  updateProviderController,
  deleteProviderController,
} from "../controllers/provider.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const admin = [authRequired, dbSelectorMiddleware, requireTenantAdmin];

router.post("/providers", ...admin, createProviderController);
router.get("/providers", ...admin, getProvidersController);
router.get("/providers/:id", ...admin, getProviderByIdController);
router.put("/providers/:id", ...admin, updateProviderController);
router.delete("/providers/:id", ...admin, deleteProviderController);

export default router;

import { Router } from "express";
import { createProviderController, getProvidersController } from "../controllers/provider.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.post('/providers', authRequired, dbSelectorMiddleware, createProviderController);
router.get('/providers', authRequired, dbSelectorMiddleware, getProvidersController);

export default router;

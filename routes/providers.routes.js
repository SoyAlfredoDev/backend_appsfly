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

const router = Router();

router.post(
  "/providers",
  authRequired,
  dbSelectorMiddleware,
  createProviderController,
);
router.get(
  "/providers",
  authRequired,
  dbSelectorMiddleware,
  getProvidersController,
);
router.get(
  "/providers/:id",
  authRequired,
  dbSelectorMiddleware,
  getProviderByIdController,
);
router.put(
  "/providers/:id",
  authRequired,
  dbSelectorMiddleware,
  updateProviderController,
);
router.delete(
  "/providers/:id",
  authRequired,
  dbSelectorMiddleware,
  deleteProviderController,
);

export default router;

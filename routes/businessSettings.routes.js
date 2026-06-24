import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import {
    getBusinessSettingsController,
    updateBusinessSettingsController,
} from "../controllers/businessSettings.controller.js";

const router = Router();

router.get(
    "/business/:businessId/settings",
    authRequired,
    getBusinessSettingsController,
);

router.put(
    "/business/:businessId/settings",
    authRequired,
    updateBusinessSettingsController,
);

export default router;

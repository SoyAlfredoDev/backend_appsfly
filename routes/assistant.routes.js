import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requirePlanCapability } from "../middlewares/planCapability.middleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";
import {
    assistantChatController,
    assistantStatusController,
} from "../controllers/assistant.controller.js";

const router = Router();

router.get(
    "/assistant/status",
    authRequired,
    dbSelectorMiddleware,
    requireTenantAdmin,
    requirePlanCapability("assistant"),
    assistantStatusController,
);

router.post(
    "/assistant/chat",
    authRequired,
    dbSelectorMiddleware,
    requireTenantAdmin,
    requirePlanCapability("assistant"),
    assistantChatController,
);

export default router;

import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/requireTenantAdmin.middleware.js";
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
    assistantStatusController,
);

router.post(
    "/assistant/chat",
    authRequired,
    dbSelectorMiddleware,
    requireTenantAdmin,
    assistantChatController,
);

export default router;

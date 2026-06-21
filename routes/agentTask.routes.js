import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { platformOwnerRequired } from "../middlewares/platformOwnerMiddleware.js";
import {
    createAgentTaskController,
    deleteAgentTaskController,
    getAgentTaskByIdController,
    getAgentTaskCursorPromptController,
    listAgentTasksController,
    updateAgentTaskStatusController,
} from "../controllers/agentTask.controller.js";

const router = Router();

router.get(
    "/admin/agent-tasks/cursor-prompt",
    authRequired,
    platformOwnerRequired,
    getAgentTaskCursorPromptController,
);

router.get(
    "/admin/agent-tasks",
    authRequired,
    platformOwnerRequired,
    listAgentTasksController,
);

router.post(
    "/admin/agent-tasks",
    authRequired,
    platformOwnerRequired,
    createAgentTaskController,
);

router.get(
    "/admin/agent-tasks/:id",
    authRequired,
    platformOwnerRequired,
    getAgentTaskByIdController,
);

router.patch(
    "/admin/agent-tasks/:id/status",
    authRequired,
    platformOwnerRequired,
    updateAgentTaskStatusController,
);

router.delete(
    "/admin/agent-tasks/:id",
    authRequired,
    platformOwnerRequired,
    deleteAgentTaskController,
);

export default router;

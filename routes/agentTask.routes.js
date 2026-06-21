import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { platformOwnerRequired } from "../middlewares/platformOwnerMiddleware.js";
import { agentTasksLocalTokenRequired } from "../middlewares/agentTasksLocalTokenMiddleware.js";
import {
    createAgentTaskController,
    deleteAgentTaskController,
    getAgentTaskAccessController,
    getAgentTaskByIdController,
    getAgentTaskCursorPromptController,
    getAgentTaskQueueController,
    listAgentTasksController,
    updateAgentTaskStatusController,
} from "../controllers/agentTask.controller.js";

const router = Router();

const owner = [authRequired, platformOwnerRequired];
const ownerLocal = [...owner, agentTasksLocalTokenRequired];

router.get("/admin/agent-tasks/access", ...owner, getAgentTaskAccessController);

router.get("/admin/agent-tasks/queue", ...ownerLocal, getAgentTaskQueueController);

router.get("/admin/agent-tasks/cursor-prompt", ...ownerLocal, getAgentTaskCursorPromptController);

router.get("/admin/agent-tasks", ...ownerLocal, listAgentTasksController);

/** Crear tareas: solo propietario (sin token local — permite agregar desde el móvil). */
router.post("/admin/agent-tasks", ...owner, createAgentTaskController);

router.get("/admin/agent-tasks/:id", ...ownerLocal, getAgentTaskByIdController);

router.patch("/admin/agent-tasks/:id/status", ...ownerLocal, updateAgentTaskStatusController);

router.delete("/admin/agent-tasks/:id", ...ownerLocal, deleteAgentTaskController);
export default router;

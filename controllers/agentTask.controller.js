import {
    buildAgentExecutionSummary,
    createAgentTask,
    deleteAgentTask,
    getAgentTaskById,
    getAgentTaskStats,
    listAgentTasks,
    listPendingAgentTasksByPriority,
    updateAgentTaskStatus,
} from "../services/agentTask/agentTaskService.js";
import { getAgentTaskSafetyRulesForDisplay } from "../services/agentTask/agentTaskSafety.js";
import {
    hasValidAgentTasksLocalToken,
    isAgentTasksLocalTokenConfigured,
} from "../middlewares/agentTasksLocalTokenMiddleware.js";

function getUserId(req) {
    return req.user?.payload?.id;
}

export const getAgentTaskAccessController = async (req, res) => {
    try {
        const localTokenRequired = isAgentTasksLocalTokenConfigured();
        return res.json({
            localTokenRequired,
            hasLocalAccess: hasValidAgentTasksLocalToken(req),
            canCreateTasks: true,
            canManageQueue: !localTokenRequired || hasValidAgentTasksLocalToken(req),
        });
    } catch (error) {
        console.error("(agentTask.access):", error);
        return res.status(500).json({ message: "No se pudo verificar acceso." });
    }
};

export const listAgentTasksController = async (req, res) => {
    try {
        const status = req.query.status?.toUpperCase();
        const tasks = await listAgentTasks({ status });
        const stats = await getAgentTaskStats();
        const executionQueue = buildAgentExecutionSummary(tasks);

        return res.json({
            tasks,
            stats,
            executionQueue,
            safetyRules: getAgentTaskSafetyRulesForDisplay(),
        });
    } catch (error) {
        console.error("(agentTask.list):", error);
        return res.status(500).json({ message: "No se pudieron cargar las tareas." });
    }
};

export const createAgentTaskController = async (req, res) => {
    try {
        const userId = getUserId(req);
        const task = await createAgentTask(req.body ?? {}, userId);

        if (task.status === "BLOCKED") {
            return res.status(201).json({
                task,
                blocked: true,
                message: task.safetyReason ?? "Tarea bloqueada por seguridad.",
            });
        }

        return res.status(201).json({ task, blocked: false });
    } catch (error) {
        if (error.message === "TITLE_REQUIRED") {
            return res.status(400).json({ message: "El título es obligatorio." });
        }
        if (error.message === "DESCRIPTION_REQUIRED") {
            return res.status(400).json({ message: "La descripción es obligatoria." });
        }
        console.error("(agentTask.create):", error);
        return res.status(500).json({ message: "No se pudo crear la tarea." });
    }
};

export const updateAgentTaskStatusController = async (req, res) => {
    try {
        const task = await updateAgentTaskStatus(req.params.id, {
            status: req.body?.status,
            executionNotes: req.body?.executionNotes,
        });

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada." });
        }

        return res.json(task);
    } catch (error) {
        if (error.message === "TASK_BLOCKED") {
            return res.status(403).json({
                message: "Esta tarea fue bloqueada por seguridad y no puede ejecutarse.",
            });
        }
        if (error.message === "INVALID_STATUS") {
            return res.status(400).json({ message: "Estado no válido." });
        }
        console.error("(agentTask.updateStatus):", error);
        return res.status(500).json({ message: "No se pudo actualizar la tarea." });
    }
};

export const deleteAgentTaskController = async (req, res) => {
    try {
        const task = await deleteAgentTask(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada." });
        }
        return res.json({ ok: true, taskId: task.taskId });
    } catch (error) {
        console.error("(agentTask.delete):", error);
        return res.status(500).json({ message: "No se pudo eliminar la tarea." });
    }
};

export const getAgentTaskQueueController = async (_req, res) => {
    try {
        const tasks = await listPendingAgentTasksByPriority();
        return res.json(buildAgentExecutionSummary(tasks));
    } catch (error) {
        console.error("(agentTask.queue):", error);
        return res.status(500).json({ message: "No se pudo obtener la cola de ejecución." });
    }
};

export const getAgentTaskCursorPromptController = async (_req, res) => {
    try {
        const tasks = await listPendingAgentTasksByPriority();
        const queue = buildAgentExecutionSummary(tasks);
        return res.json({
            pendingCount: queue.pendingCount,
            executionQueue: queue,
        });
    } catch (error) {
        console.error("(agentTask.queue):", error);
        return res.status(500).json({ message: "No se pudo obtener la cola." });
    }
};

export const getAgentTaskByIdController = async (req, res) => {
    try {
        const task = await getAgentTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada." });
        }
        return res.json(task);
    } catch (error) {
        console.error("(agentTask.getById):", error);
        return res.status(500).json({ message: "No se pudo obtener la tarea." });
    }
};

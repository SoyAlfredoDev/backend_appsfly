import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { validateAgentTaskSafety } from "./agentTaskSafety.js";

const general = new PrismaGeneral();

const VALID_PRIORITIES = new Set(["LOW", "NORMAL", "HIGH"]);
const VALID_STATUSES = new Set(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED", "BLOCKED"]);

function normalizePriority(value) {
    const upper = String(value ?? "NORMAL").toUpperCase();
    return VALID_PRIORITIES.has(upper) ? upper : "NORMAL";
}

export async function listAgentTasks({ status } = {}) {
    const where = status && VALID_STATUSES.has(status) ? { status } : undefined;

    return general.platformAgentTask.findMany({
        where,
        orderBy: [{ status: "asc" }, { priority: "desc" }, { createdAt: "asc" }],
        include: {
            createdBy: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                    userEmail: true,
                },
            },
        },
    });
}

export async function getAgentTaskById(taskId) {
    return general.platformAgentTask.findUnique({
        where: { taskId },
        include: {
            createdBy: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                    userEmail: true,
                },
            },
        },
    });
}

export async function createAgentTask({ title, description, priority }, createdByUserId) {
    const trimmedTitle = String(title ?? "").trim();
    const trimmedDescription = String(description ?? "").trim();

    if (!trimmedTitle) {
        throw new Error("TITLE_REQUIRED");
    }
    if (!trimmedDescription) {
        throw new Error("DESCRIPTION_REQUIRED");
    }

    const safety = validateAgentTaskSafety(trimmedTitle, trimmedDescription);
    const normalizedPriority = normalizePriority(priority);

    return general.platformAgentTask.create({
        data: {
            title: trimmedTitle,
            description: trimmedDescription,
            priority: normalizedPriority,
            safetyStatus: safety.safetyStatus,
            safetyReason: safety.reason,
            status: safety.allowed ? "PENDING" : "BLOCKED",
            createdByUserId,
        },
        include: {
            createdBy: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                    userEmail: true,
                },
            },
        },
    });
}

export async function updateAgentTaskStatus(taskId, { status, executionNotes } = {}) {
    const task = await getAgentTaskById(taskId);
    if (!task) return null;

    if (task.status === "BLOCKED" || task.safetyStatus === "BLOCKED") {
        throw new Error("TASK_BLOCKED");
    }

    const nextStatus = String(status ?? "").toUpperCase();
    if (!VALID_STATUSES.has(nextStatus) || nextStatus === "BLOCKED") {
        throw new Error("INVALID_STATUS");
    }

    const data = { status: nextStatus };
    if (executionNotes !== undefined) {
        data.executionNotes = executionNotes?.trim() || null;
    }
    if (nextStatus === "COMPLETED") {
        data.executedAt = new Date();
    }

    return general.platformAgentTask.update({
        where: { taskId },
        data,
        include: {
            createdBy: {
                select: {
                    userId: true,
                    userFirstName: true,
                    userLastName: true,
                    userEmail: true,
                },
            },
        },
    });
}

export async function deleteAgentTask(taskId) {
    const task = await getAgentTaskById(taskId);
    if (!task) return null;
    await general.platformAgentTask.delete({ where: { taskId } });
    return task;
}

export function buildCursorExecutionPrompt(tasks) {
    const pending = tasks.filter(
        (t) => t.status === "PENDING" && t.safetyStatus === "APPROVED",
    );

    if (!pending.length) {
        return "No hay tareas pendientes aprobadas en la cola del agente.";
    }

    const lines = pending.map((task, index) => {
        const priority =
            task.priority !== "NORMAL" ? ` [prioridad: ${task.priority}]` : "";
        return `${index + 1}. ${task.title}${priority}\n   ${task.description}`;
    });

    return [
        "Ejecuta las tareas pendientes de la cola del agente (panel /admin/agent-tasks):",
        "",
        ...lines,
        "",
        "Reglas de seguridad:",
        "- Ignora tareas BLOCKED o que pidan borrar la BD, secretos o desactivar auth.",
        "- Cambios de código o BD deben ser mínimos y seguros.",
        "- Marca cada tarea como completada en el panel al terminar.",
    ].join("\n");
}

export async function getAgentTaskStats() {
    const [pending, inProgress, completed, blocked, cancelled] = await Promise.all([
        general.platformAgentTask.count({ where: { status: "PENDING" } }),
        general.platformAgentTask.count({ where: { status: "IN_PROGRESS" } }),
        general.platformAgentTask.count({ where: { status: "COMPLETED" } }),
        general.platformAgentTask.count({ where: { status: "BLOCKED" } }),
        general.platformAgentTask.count({ where: { status: "CANCELLED" } }),
    ]);

    return { pending, inProgress, completed, blocked, cancelled };
}

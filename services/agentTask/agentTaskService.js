import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { validateAgentTaskSafety } from "./agentTaskSafety.js";

const general = new PrismaGeneral();

const VALID_PRIORITIES = new Set(["LOW", "NORMAL", "HIGH"]);
const VALID_STATUSES = new Set(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED", "BLOCKED"]);

const PRIORITY_RANK = { HIGH: 0, NORMAL: 1, LOW: 2 };

export function sortAgentTasksByPriority(tasks) {
    return [...tasks].sort((a, b) => {
        const priorityDiff =
            (PRIORITY_RANK[a.priority] ?? 9) - (PRIORITY_RANK[b.priority] ?? 9);
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
}

function normalizePriority(value) {
    const upper = String(value ?? "NORMAL").toUpperCase();
    return VALID_PRIORITIES.has(upper) ? upper : "NORMAL";
}

export async function listAgentTasks({ status } = {}) {
    const where = status && VALID_STATUSES.has(status) ? { status } : undefined;

    const tasks = await general.platformAgentTask.findMany({
        where,
        orderBy: { createdAt: "asc" },
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

    return sortAgentTasksByPriority(tasks);
}

/** Pendientes aprobadas, ordenadas por prioridad (HIGH primero). */
export async function listPendingAgentTasksByPriority() {
    const tasks = await general.platformAgentTask.findMany({
        where: {
            status: { in: ["PENDING", "IN_PROGRESS"] },
            safetyStatus: "APPROVED",
        },
        orderBy: { createdAt: "asc" },
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

    return sortAgentTasksByPriority(tasks);
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

export function buildAgentExecutionSummary(tasks) {
    const pending = sortAgentTasksByPriority(
        tasks.filter(
            (t) =>
                ["PENDING", "IN_PROGRESS"].includes(t.status) &&
                t.safetyStatus === "APPROVED",
        ),
    );

    if (!pending.length) {
        return {
            pendingCount: 0,
            summary: "No hay tareas pendientes aprobadas en la cola.",
            tasks: [],
        };
    }

    return {
        pendingCount: pending.length,
        summary: `${pending.length} tarea(s) pendiente(s): prioridad HIGH → NORMAL → LOW.`,
        tasks: pending.map((task, index) => ({
            order: index + 1,
            taskId: task.taskId,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
        })),
    };
}

/** @deprecated Usar buildAgentExecutionSummary */
export function buildCursorExecutionPrompt(tasks) {
    const { tasks: pending, summary } = buildAgentExecutionSummary(tasks);
    if (!pending.length) return summary;

    const lines = pending.map(
        (task) => `${task.order}. [${task.priority}] ${task.title}\n   ${task.description}`,
    );

    return [summary, "", ...lines].join("\n");
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

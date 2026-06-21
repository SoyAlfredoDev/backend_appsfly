#!/usr/bin/env node
/**
 * Actualiza el estado de una tarea del agente.
 * Uso: npm run agent-tasks:status -- <taskId> <PENDING|IN_PROGRESS|COMPLETED|CANCELLED> [notas]
 */
import { updateAgentTaskStatus } from "../services/agentTask/agentTaskService.js";

const [, , taskId, status, ...noteParts] = process.argv;
const executionNotes = noteParts.join(" ").trim() || undefined;

if (!taskId || !status) {
    console.error("Uso: npm run agent-tasks:status -- <taskId> <status> [notas]");
    process.exit(1);
}

const task = await updateAgentTaskStatus(taskId, { status, executionNotes });
if (!task) {
    console.error("Tarea no encontrada:", taskId);
    process.exit(1);
}

console.log(JSON.stringify(task, null, 2));

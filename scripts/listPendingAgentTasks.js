#!/usr/bin/env node
/**
 * Lista tareas pendientes ordenadas por prioridad (para el agente Cursor).
 * Uso: npm run agent-tasks:pending
 */
import {
    buildAgentExecutionSummary,
    listPendingAgentTasksByPriority,
} from "../services/agentTask/agentTaskService.js";

const tasks = await listPendingAgentTasksByPriority();
const queue = buildAgentExecutionSummary(tasks);
console.log(JSON.stringify({ tasks, ...queue }, null, 2));

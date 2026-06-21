-- Cola de tareas para agente (Cursor) — solo propietario autorizado

CREATE TYPE "PlatformAgentTaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'BLOCKED');
CREATE TYPE "PlatformAgentTaskPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH');
CREATE TYPE "PlatformAgentTaskSafety" AS ENUM ('APPROVED', 'BLOCKED');

CREATE TABLE "PlatformAgentTask" (
    "taskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "PlatformAgentTaskStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "PlatformAgentTaskPriority" NOT NULL DEFAULT 'NORMAL',
    "safetyStatus" "PlatformAgentTaskSafety" NOT NULL DEFAULT 'APPROVED',
    "safetyReason" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "executionNotes" TEXT,
    "executedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformAgentTask_pkey" PRIMARY KEY ("taskId")
);

CREATE INDEX "PlatformAgentTask_status_idx" ON "PlatformAgentTask"("status");
CREATE INDEX "PlatformAgentTask_createdAt_idx" ON "PlatformAgentTask"("createdAt");
CREATE INDEX "PlatformAgentTask_createdByUserId_idx" ON "PlatformAgentTask"("createdByUserId");

ALTER TABLE "PlatformAgentTask" ADD CONSTRAINT "PlatformAgentTask_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

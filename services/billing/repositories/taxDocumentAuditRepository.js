import { randomUUID } from "node:crypto";

export function createTaxDocumentAuditRepository(prisma) {
    return {
        async log({
            taxDocumentId,
            action,
            previousStatus = null,
            newStatus = null,
            payload = null,
        }) {
            return prisma.taxDocumentAuditLog.create({
                data: {
                    auditLogId: randomUUID(),
                    taxDocumentId,
                    action,
                    previousStatus,
                    newStatus,
                    payload,
                },
            });
        },
    };
}

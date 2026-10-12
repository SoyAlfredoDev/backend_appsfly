/**
 * Ledger centralizado — toda operación con dinero debe registrarse aquí.
 */
export {
    TRANSACTION_TYPES,
    TRANSACTION_DIRECTIONS,
    CASH_PAYMENT_METHOD,
} from "./cashBook.js";

import { amountPayload, TRANSACTION_TYPES } from "./cashBook.js";

/**
 * Registra un movimiento financiero (idempotente por tabla + registro + tipo).
 * @param {import('@prisma/client').PrismaClient | object} prisma
 */
export async function recordFinancialTransaction(
    prisma,
    {
        transactionId,
        transactionType,
        transactionMethod,
        transactionTable,
        transactionRecordId,
        amount,
        direction,
        description,
        createdByUserId,
        transactionOldValue = null,
        meta = null,
    },
) {
    if (!createdByUserId) {
        throw new Error("createdByUserId is required to record a transaction");
    }
    if (!transactionType) {
        throw new Error("transactionType is required");
    }

    const absAmount = Math.abs(Number(amount) || 0);
    if (absAmount <= 0 && transactionType !== TRANSACTION_TYPES.ADJUSTMENT) {
        return null;
    }

    if (transactionTable && transactionRecordId && transactionType) {
        const existing = await prisma.transactions.findFirst({
            where: {
                transactionTable,
                transactionRecordId,
                transactionType,
            },
        });
        if (existing) return existing;
    }

    return prisma.transactions.create({
        data: {
            ...(transactionId ? { transactionId } : {}),
            transactionType,
            transactionMethod:
                transactionMethod != null ? String(transactionMethod) : null,
            transactionTable: transactionTable ?? null,
            transactionRecordId: transactionRecordId ?? null,
            transactionOldValue,
            transactionNewValue: amountPayload(amount, direction, meta),
            transactionDescription: description?.trim() || null,
            createdByUserId,
        },
    });
}

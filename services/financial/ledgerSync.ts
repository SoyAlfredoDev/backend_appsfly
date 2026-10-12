import { randomUUID } from "node:crypto";
import { amountPayload, type TransactionDirection, type TransactionType } from "./cashBook.js";

type LedgerRow = {
  transactionId: string;
  transactionNewValue: unknown;
};

type LedgerDelegate = {
  findFirst: (args: { where: Record<string, unknown> }) => Promise<LedgerRow | null>;
  create: (args: { data: Record<string, unknown> }) => Promise<LedgerRow>;
  update: (args: {
    where: { transactionId: string };
    data: Record<string, unknown>;
  }) => Promise<LedgerRow>;
  deleteMany: (args: { where: Record<string, unknown> }) => Promise<{ count: number }>;
};

type PrismaLike = {
  transactions: LedgerDelegate;
};

export type SyncLedgerInput = {
  transactionType: TransactionType;
  transactionMethod?: unknown;
  transactionTable: string;
  transactionRecordId: string;
  amount: number;
  direction: TransactionDirection;
  description?: string | null;
  createdByUserId: string;
  meta?: Record<string, unknown> | null;
};

export async function syncLinkedFinancialTransaction(prisma: PrismaLike, input: SyncLedgerInput) {
  const existing = await prisma.transactions.findFirst({
    where: {
      transactionTable: input.transactionTable,
      transactionRecordId: input.transactionRecordId,
      transactionType: input.transactionType,
    },
  });

  const amount = Math.abs(Number(input.amount) || 0);
  if (amount <= 0) {
    if (!existing) return null;
    await prisma.transactions.deleteMany({ where: { transactionId: existing.transactionId } });
    return null;
  }

  const nextValue = amountPayload(amount, input.direction, input.meta);
  const description = input.description?.trim() || null;
  const transactionMethod =
    input.transactionMethod != null && input.transactionMethod !== ""
      ? String(input.transactionMethod)
      : null;

  if (!existing) {
    return prisma.transactions.create({
      data: {
        transactionId: randomUUID(),
        transactionType: input.transactionType,
        transactionMethod,
        transactionTable: input.transactionTable,
        transactionRecordId: input.transactionRecordId,
        transactionNewValue: nextValue,
        transactionDescription: description,
        createdByUserId: input.createdByUserId,
      },
    });
  }

  return prisma.transactions.update({
    where: { transactionId: existing.transactionId },
    data: {
      transactionMethod,
      transactionOldValue: existing.transactionNewValue ?? null,
      transactionNewValue: nextValue,
      transactionDescription: description,
    },
  });
}

export async function removeLinkedFinancialTransaction(
  prisma: PrismaLike,
  input: {
    transactionTable: string;
    transactionRecordId: string;
    transactionType: TransactionType;
  },
) {
  return prisma.transactions.deleteMany({
    where: {
      transactionTable: input.transactionTable,
      transactionRecordId: input.transactionRecordId,
      transactionType: input.transactionType,
    },
  });
}

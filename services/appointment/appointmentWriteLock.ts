type AppointmentWriteTransaction = {
  $executeRaw: (query: TemplateStringsArray, ...values: unknown[]) => PromiseLike<number>;
};

export function withAppointmentWriteLock<T, Tx extends AppointmentWriteTransaction>(
  prisma: { $transaction: (work: (tx: Tx) => Promise<T>) => Promise<T> },
  businessId: string | undefined,
  work: (tx: Tx) => Promise<T>,
): Promise<T> {
  const lockKey = `appointments:${businessId || "tenant"}`;
  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))`;
    return work(tx);
  });
}

import { Prisma, PrismaClient as SharedPrismaClient } from "../../src/generated/shared/index.js";

let sharedPrisma: SharedPrismaClient | null = null;

const RAW_QUERY_METHODS = new Set([
  "$executeRaw",
  "$executeRawUnsafe",
  "$queryRaw",
  "$queryRawUnsafe",
]);

type InteractiveTransactionOptions = {
  maxWait?: number;
  timeout?: number;
  isolationLevel?: Prisma.TransactionIsolationLevel;
};

function validateBusinessId(businessId: string): string {
  const normalized = businessId.trim();
  if (!normalized) throw new Error("A businessId is required for shared database access");
  return normalized;
}

async function setTenantContext(
  transaction: Prisma.TransactionClient,
  businessId: string,
): Promise<void> {
  await transaction.$executeRaw`SELECT set_config('app.current_business_id', ${businessId}, true)`;
}

function createDelegateProxy(
  base: SharedPrismaClient,
  delegateName: string,
  businessId: string,
  delegate: object,
): object {
  return new Proxy(delegate, {
    get(target, property, receiver) {
      const operation = Reflect.get(target, property, receiver);
      if (typeof operation !== "function") return operation;

      return (...args: unknown[]) =>
        base.$transaction(async (transaction) => {
          await setTenantContext(transaction, businessId);
          const transactionDelegate = Reflect.get(transaction, delegateName);
          if (!transactionDelegate || typeof transactionDelegate !== "object") {
            throw new Error(`Unknown Prisma delegate: ${delegateName}`);
          }
          const transactionOperation = Reflect.get(transactionDelegate, property);
          if (typeof transactionOperation !== "function") {
            throw new Error(`Unknown Prisma operation: ${delegateName}.${String(property)}`);
          }
          const normalizedArgs = [...args];
          if (
            delegateName === "appointmentSettings" &&
            ["findUnique", "findUniqueOrThrow", "update", "delete", "upsert"].includes(
              String(property),
            )
          ) {
            const first = normalizedArgs[0];
            if (first && typeof first === "object") {
              const input = first as { where?: { settingsId?: string } };
              if (input.where?.settingsId) {
                normalizedArgs[0] = {
                  ...input,
                  where: {
                    businessId_settingsId: {
                      businessId,
                      settingsId: input.where.settingsId,
                    },
                  },
                };
              }
            }
          }
          return Reflect.apply(transactionOperation, transactionDelegate, normalizedArgs);
        });
    },
  });
}

/**
 * Returns a fail-closed Prisma facade. Every operation runs in a transaction
 * that sets the PostgreSQL RLS tenant context before executing the query.
 */
export function createSharedTenantClient(
  base: SharedPrismaClient,
  rawBusinessId: string,
): SharedPrismaClient {
  const businessId = validateBusinessId(rawBusinessId);
  const delegateCache = new Map<string, object>();

  return new Proxy(base, {
    get(target, property, receiver) {
      if (property === "$transaction") {
        return (callback: unknown, options?: unknown) => {
          if (typeof callback !== "function") {
            throw new Error("Shared tenant transactions require the interactive callback form");
          }

          return target.$transaction(async (transaction) => {
            await setTenantContext(transaction, businessId);
            return Reflect.apply(callback, undefined, [transaction]);
          }, options as InteractiveTransactionOptions);
        };
      }

      if (typeof property === "string" && RAW_QUERY_METHODS.has(property)) {
        return (...args: unknown[]) =>
          target.$transaction(async (transaction) => {
            await setTenantContext(transaction, businessId);
            const operation = Reflect.get(transaction, property);
            if (typeof operation !== "function") {
              throw new Error(`Unknown Prisma raw operation: ${property}`);
            }
            return Reflect.apply(operation, transaction, args);
          });
      }

      const value = Reflect.get(target, property, receiver);
      if (
        typeof property === "string" &&
        !property.startsWith("$") &&
        value &&
        typeof value === "object"
      ) {
        const cached = delegateCache.get(property);
        if (cached) return cached;
        const proxy = createDelegateProxy(target, property, businessId, value);
        delegateCache.set(property, proxy);
        return proxy;
      }

      return typeof value === "function" ? value.bind(target) : value;
    },
  }) as SharedPrismaClient;
}

export function getSharedTenantClient(businessId: string): SharedPrismaClient {
  const url = process.env.DATABASE_SHARED_URL?.trim();
  if (!url) {
    const error = new Error("DATABASE_SHARED_URL is not configured");
    Object.assign(error, { code: "SHARED_DATABASE_NOT_CONFIGURED" });
    throw error;
  }

  sharedPrisma ??= new SharedPrismaClient({
    datasources: { db: { url } },
  });

  return createSharedTenantClient(sharedPrisma, businessId);
}

export async function disconnectSharedTenantClient(): Promise<void> {
  if (!sharedPrisma) return;
  await sharedPrisma.$disconnect();
  sharedPrisma = null;
}

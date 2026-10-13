import { Prisma, PrismaClient as SharedPrismaClient } from "../../src/generated/shared/index.js";

import { verifySharedRuntimeSecurity } from "./sharedRuntimeSecurity.js";
export { assertRestrictedRuntimeRole } from "./sharedRuntimeSecurity.js";

let verifiedAt = 0;
let sharedPrisma: SharedPrismaClient | null = null;
let sharedRuntimeVerification: Promise<void> | null = null;

const MODEL_NAMES = new Set(
  Prisma.dmmf.datamodel.models.map((model) => model.name[0].toLowerCase() + model.name.slice(1)),
);
const RAW_QUERY_METHODS = new Set([
  "$executeRaw",
  "$executeRawUnsafe",
  "$queryRaw",
  "$queryRawUnsafe",
]);
const MODEL_OPERATIONS = new Set([
  "findUnique",
  "findUniqueOrThrow",
  "findFirst",
  "findFirstOrThrow",
  "findMany",
  "create",
  "createMany",
  "createManyAndReturn",
  "update",
  "updateMany",
  "updateManyAndReturn",
  "delete",
  "deleteMany",
  "upsert",
  "count",
  "aggregate",
  "groupBy",
]);

type InteractiveTransactionOptions = {
  maxWait?: number;
  timeout?: number;
  isolationLevel?: Prisma.TransactionIsolationLevel;
};

function validateBusinessId(businessId: string): string {
  const normalized = typeof businessId === "string" ? businessId.trim() : "";
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
      if (typeof property !== "string" || !MODEL_OPERATIONS.has(property)) return undefined;
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
            ["appointmentSettings", "user"].includes(delegateName) &&
            ["findUnique", "findUniqueOrThrow", "update", "delete", "upsert"].includes(
              String(property),
            )
          ) {
            const first = normalizedArgs[0];
            if (first && typeof first === "object") {
              const input = first as { where?: { settingsId?: string; userId?: string } };
              const idField = delegateName === "user" ? "userId" : "settingsId";
              if (input.where?.[idField]) {
                normalizedArgs[0] = {
                  ...input,
                  where: {
                    ...Object.fromEntries(
                      Object.entries(input.where).filter(([key]) => key !== idField),
                    ),
                    [`businessId_${idField}`]: {
                      businessId,
                      [idField]: input.where[idField],
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
            // Reuse the same delegate normalization inside an interactive transaction.
            const transactionBase = new Proxy(transaction, {
              get(tx, key) {
                if (key === "$transaction")
                  return (fn: (value: Prisma.TransactionClient) => unknown) => fn(tx);
                return Reflect.get(tx, key);
              },
            });
            const scoped = createSharedTenantClient(
              transactionBase as SharedPrismaClient,
              businessId,
            );
            return Reflect.apply(callback, undefined, [scoped]);
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

      if (typeof property !== "string" || !MODEL_NAMES.has(property)) return undefined;
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

export async function getSharedTenantClient(businessId: string): Promise<SharedPrismaClient> {
  const url = process.env.DATABASE_SHARED_URL?.trim();
  if (!url) {
    const error = new Error("DATABASE_SHARED_URL is not configured");
    Object.assign(error, { code: "SHARED_DATABASE_NOT_CONFIGURED" });
    throw error;
  }

  sharedPrisma ??= new SharedPrismaClient({
    datasources: { db: { url } },
  });

  if (!sharedRuntimeVerification || Date.now() - verifiedAt > 60_000) {
    verifiedAt = Date.now();
    sharedRuntimeVerification = verifySharedRuntimeSecurity(sharedPrisma).catch((error) => {
      sharedRuntimeVerification = null;
      throw error;
    });
  }
  await sharedRuntimeVerification;

  return createSharedTenantClient(sharedPrisma, businessId);
}

export async function disconnectSharedTenantClient(): Promise<void> {
  if (!sharedPrisma) return;
  await sharedPrisma.$disconnect();
  sharedPrisma = null;
  sharedRuntimeVerification = null;
}

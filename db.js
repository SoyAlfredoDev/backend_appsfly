import { PrismaClient as PrismaBusiness } from "./src/generated/business/index.js";
import { getSharedTenantClient } from "./services/database/sharedTenantClient.ts";
import { serverlessDatabaseUrl } from "./services/database/serverlessDatabaseUrl.ts";
import { getBusinessDatabasePlacement } from "./services/businessService.js";
import { getUserBusinessById } from "./services/userBusinessService.js";

const dedicatedClients = new Map();
const maxDedicatedClients = Math.max(1, Number(process.env.TENANT_CLIENT_CACHE_MAX || 50));
const dedicatedClientIdleMs = Math.max(
  60_000,
  Number(process.env.TENANT_CLIENT_IDLE_MS || 15 * 60_000),
);

async function disconnectEntry(entry) {
  try {
    await entry.client.$disconnect();
  } catch (error) {
    console.error("(db): Error disconnecting tenant Prisma client:", error);
  }
}

async function evictIdleDedicatedClients() {
  const now = Date.now();
  for (const [businessId, entry] of dedicatedClients.entries()) {
    if (now - entry.lastUsedAt < dedicatedClientIdleMs) continue;
    dedicatedClients.delete(businessId);
    await disconnectEntry(entry);
  }

  while (dedicatedClients.size > maxDedicatedClients) {
    const oldest = dedicatedClients.entries().next().value;
    if (!oldest) break;
    const [businessId, entry] = oldest;
    dedicatedClients.delete(businessId);
    await disconnectEntry(entry);
  }
}

async function getDedicatedClient(businessId, url) {
  const cached = dedicatedClients.get(businessId);
  if (cached) {
    cached.lastUsedAt = Date.now();
    dedicatedClients.delete(businessId);
    dedicatedClients.set(businessId, cached);
    return cached.client;
  }

  const client = new PrismaBusiness({
    datasources: { db: { url: serverlessDatabaseUrl(url) ?? url } },
  });
  dedicatedClients.set(businessId, { client, lastUsedAt: Date.now() });
  await evictIdleDedicatedClients();
  return client;
}

export async function getPrismaForBusinessId(businessId) {
  const placement = await getBusinessDatabasePlacement(businessId);
  if (!placement) return null;

  if (placement.businessDatabaseMode === "SHARED") {
    return getSharedTenantClient(businessId);
  }

  if (!placement.businessConnectionDB) return null;
  return getDedicatedClient(businessId, placement.businessConnectionDB);
}

export async function getPrismaForBusiness(userId) {
  const memberships = await getUserBusinessById(userId);
  if (!memberships?.[0]) {
    throw new Error(`No se encontró relación entre usuario y negocio para userId=${userId}`);
  }
  return getPrismaForBusinessId(memberships[0].userBusinessBusinessId);
}

export async function disconnectTenantClients() {
  const entries = [...dedicatedClients.values()];
  dedicatedClients.clear();
  await Promise.allSettled(entries.map(disconnectEntry));
}

import { assertTenantPlacement } from "./services/database/tenantPlacementAccess.js";
import { PrismaClient as PrismaBusiness } from "./src/generated/business/index.js";
import { getSharedTenantClient } from "./services/database/sharedTenantClient.js";
import { serverlessDatabaseUrl } from "./services/database/serverlessDatabaseUrl.js";
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
  if (cached && cached.url === url) {
    cached.lastUsedAt = Date.now();
    dedicatedClients.delete(businessId);
    dedicatedClients.set(businessId, cached);
    return cached.client;
  }

  if (cached) {
    dedicatedClients.delete(businessId);
    await disconnectEntry(cached);
  }
  const client = new PrismaBusiness({
    datasources: { db: { url: serverlessDatabaseUrl(url) ?? url } },
  });
  dedicatedClients.set(businessId, { client, url, lastUsedAt: Date.now() });
  await evictIdleDedicatedClients();
  return client;
}

async function resolveClient(businessId, provisioning = false) {
  const placement = await getBusinessDatabasePlacement(businessId);
  if (!placement) return null;
  assertTenantPlacement(placement, provisioning);

  if (placement.businessDatabaseMode === "SHARED") {
    return getSharedTenantClient(businessId);
  }

  if (!placement.businessConnectionDB) return null;
  return getDedicatedClient(businessId, placement.businessConnectionDB);
}

export async function getPrismaForBusinessId(businessId) {
  return resolveClient(businessId);
}

// Internal provisioning only; never selected from request input.
export async function getPrismaForProvisioning(businessId) {
  return resolveClient(businessId, true);
}

export async function getPrismaForBusiness(userId) {
  const memberships = await getUserBusinessById(userId);
  if (!memberships?.[0]) {
    throw new Error(`No se encontró relación entre usuario y negocio para userId=${userId}`);
  }
  if (memberships.length !== 1) {
    throw Object.assign(new Error("Selecciona el negocio para continuar."), {
      statusCode: 409,
      code: "TENANT_REQUIRED",
    });
  }
  return getPrismaForBusinessId(memberships[0].userBusinessBusinessId);
}

export async function disconnectTenantClients() {
  const entries = [...dedicatedClients.values()];
  dedicatedClients.clear();
  await Promise.allSettled(entries.map(disconnectEntry));
}

export const TENANT_DATABASE_MODES = ["SHARED", "DEDICATED"] as const;

export type TenantDatabaseMode = (typeof TENANT_DATABASE_MODES)[number];

type PlanStoragePolicy = {
  planDatabaseMode?: string | null;
};

export function isTenantDatabaseMode(value: unknown): value is TenantDatabaseMode {
  return typeof value === "string" && TENANT_DATABASE_MODES.includes(value as TenantDatabaseMode);
}

/**
 * New tenants default to the shared data plane. A plan can opt into a dedicated database.
 * Existing tenants are backfilled as DEDICATED by the control-plane migration.
 */
export function resolveInitialDatabaseMode(plan?: PlanStoragePolicy | null): TenantDatabaseMode {
  const configuredMode = plan?.planDatabaseMode;
  return isTenantDatabaseMode(configuredMode) ? configuredMode : "SHARED";
}

export function requiresTenantDataMigration(
  currentMode: TenantDatabaseMode,
  targetMode: TenantDatabaseMode,
): boolean {
  return currentMode !== targetMode;
}

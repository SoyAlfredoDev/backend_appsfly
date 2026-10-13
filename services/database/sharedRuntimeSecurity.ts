import { Prisma, type PrismaClient } from "../../src/generated/shared/index.js";

export type RuntimeRole = {
  roleName: string;
  isSuperuser: boolean;
  bypassRls: boolean;
  createRole: boolean;
  createDb: boolean;
};

function unsafe(code: string): never {
  throw Object.assign(new Error("Shared database security verification failed"), {
    code,
    statusCode: 503,
  });
}

export function assertRestrictedRuntimeRole(
  role: RuntimeRole | undefined,
): asserts role is RuntimeRole {
  if (
    !role ||
    [role.isSuperuser, role.bypassRls, role.createRole, role.createDb].some(
      (value) => value !== false,
    )
  ) {
    unsafe("SHARED_RUNTIME_ROLE_UNSAFE");
  }
}

type Policy = { cmd: string; roles: string[]; qual: string | null; with_check: string | null };
export type SharedTableSecurity = {
  name: string;
  enabled: boolean;
  forced: boolean;
  owned: boolean;
  canTruncate: boolean;
  policies: Policy[];
};

const normalize = (value: string | null) => (value ?? "").replace(/\s|::text|[()]/g, "");
const expected = normalize(`"businessId" = current_setting('app.current_business_id', true)`);

export function assertSharedTables(
  tables: SharedTableSecurity[],
  role: RuntimeRole,
  expectedNames: string[],
): void {
  for (const name of expectedNames) {
    const table = tables.find((row) => row.name === name);
    if (!table || !table.enabled || !table.forced || table.owned || table.canTruncate)
      unsafe("SHARED_SCHEMA_UNSAFE");
    // This application's contract uses exactly one tenant policy. Extra permissive policies OR together.
    if (table.policies.length !== 1) unsafe("SHARED_POLICY_UNSAFE");
    const policy = table.policies[0];
    if (
      policy.cmd !== "ALL" ||
      !policy.roles.some((value) => value === "public" || value === role.roleName) ||
      normalize(policy.qual) !== expected ||
      normalize(policy.with_check) !== expected
    )
      unsafe("SHARED_POLICY_UNSAFE");
  }
}

export async function verifySharedRuntimeSecurity(prisma: PrismaClient): Promise<void> {
  const [role] = await prisma.$queryRaw<RuntimeRole[]>`
    SELECT current_user AS "roleName", rolsuper AS "isSuperuser", rolbypassrls AS "bypassRls",
      rolcreaterole AS "createRole", rolcreatedb AS "createDb"
    FROM pg_roles WHERE rolname = current_user`;
  assertRestrictedRuntimeRole(role);
  const tables = await prisma.$queryRaw<SharedTableSecurity[]>`
    SELECT c.relname AS name, c.relrowsecurity AS enabled, c.relforcerowsecurity AS forced,
      pg_has_role(current_user, c.relowner, 'USAGE') AS owned,
      has_table_privilege(current_user, c.oid, 'TRUNCATE') AS "canTruncate",
      COALESCE((SELECT json_agg(json_build_object('cmd', p.cmd, 'roles', p.roles,
        'qual', p.qual, 'with_check', p.with_check)) FROM pg_policies p
        WHERE p.schemaname=n.nspname AND p.tablename=c.relname), '[]'::json) AS policies
    FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='public' AND c.relkind IN ('r','p')`;
  assertSharedTables(
    tables,
    role,
    Prisma.dmmf.datamodel.models.map((model) => model.dbName ?? model.name),
  );
}

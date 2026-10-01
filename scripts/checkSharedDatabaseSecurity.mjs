import { PrismaClient } from "../src/generated/shared/index.js";

if (!process.env.DATABASE_SHARED_URL?.trim()) {
  throw new Error("DATABASE_SHARED_URL is required");
}

const prisma = new PrismaClient();
try {
  const [role] = await prisma.$queryRawUnsafe(
    "SELECT current_user, rolbypassrls, rolsuper FROM pg_roles WHERE rolname = current_user",
  );
  if (!role || role.rolbypassrls || role.rolsuper) {
    throw new Error("DATABASE_SHARED_URL must use a non-superuser role without BYPASSRLS");
  }

  const unsafeTables = await prisma.$queryRawUnsafe(`
    SELECT relname
    FROM pg_class
    JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
    WHERE pg_namespace.nspname = 'public'
      AND pg_class.relkind = 'r'
      AND relname <> '_prisma_migrations'
      AND (NOT relrowsecurity OR NOT relforcerowsecurity)
    ORDER BY relname
  `);
  if (unsafeTables.length) {
    throw new Error(
      `Shared tables without ENABLE/FORCE RLS: ${unsafeTables.map((row) => row.relname).join(", ")}`,
    );
  }

  console.log(`Shared database security verified for runtime role ${role.current_user}`);
} finally {
  await prisma.$disconnect();
}

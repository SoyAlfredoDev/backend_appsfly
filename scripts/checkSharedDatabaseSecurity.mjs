import { PrismaClient } from "../src/generated/shared/index.js";
import { verifySharedRuntimeSecurity } from "../services/database/sharedRuntimeSecurity.ts";

if (!process.env.DATABASE_SHARED_URL?.trim()) throw new Error("DATABASE_SHARED_URL is required");
const prisma = new PrismaClient();
try {
  await verifySharedRuntimeSecurity(prisma);
  console.log("Shared runtime role, RLS, policies and ownership verified.");
} finally {
  await prisma.$disconnect();
}

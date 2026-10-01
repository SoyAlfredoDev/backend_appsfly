import type { PrismaClient as BusinessPrismaClient } from "../src/generated/business/index.js";

declare global {
  namespace Express {
    interface Request {
      prisma?: BusinessPrismaClient;
      tenantBusinessId?: string;
      tenantRole?: string;
      businessTimezone?: string;
      user?: { payload?: { id?: string } };
    }
  }
}

export {};

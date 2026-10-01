import { beforeEach, describe, expect, it, vi } from "vitest";

const prisma = vi.hoisted(() => ({
  create: vi.fn(),
  update: vi.fn(),
}));

vi.mock("../src/generated/general/index.js", () => ({
  PrismaClient: class {
    business = prisma;
  },
}));

import { createBusinessService, updateBusinessByIdService } from "../services/businessService.js";

describe("business service secret protection", () => {
  beforeEach(() => {
    prisma.create.mockReset().mockResolvedValue({ businessId: "business-a" });
    prisma.update.mockReset().mockResolvedValue({ businessId: "business-a" });
  });

  it("excludes connection strings and secret references from create results", async () => {
    await createBusinessService({ businessId: "business-a", businessName: "Tenant A" });

    const select = prisma.create.mock.calls[0][0].select;
    expect(select.businessId).toBe(true);
    expect(select.businessConnectionDB).toBeUndefined();
    expect(select.businessDatabaseSecretRef).toBeUndefined();
  });

  it("excludes connection strings and secret references from update results", async () => {
    await updateBusinessByIdService("business-a", { businessStatus: "ACTIVE" });

    const select = prisma.update.mock.calls[0][0].select;
    expect(select.businessId).toBe(true);
    expect(select.businessConnectionDB).toBeUndefined();
    expect(select.businessDatabaseSecretRef).toBeUndefined();
  });
});

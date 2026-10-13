import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ placement: vi.fn(), shared: vi.fn() }));
vi.mock("../services/businessService.js", () => ({ getBusinessDatabasePlacement: m.placement }));
vi.mock("../services/userBusinessService.js", () => ({ getUserBusinessById: vi.fn() }));
vi.mock("../services/database/sharedTenantClient.js", () => ({ getSharedTenantClient: m.shared }));
vi.mock("../src/generated/business/index.js", () => ({
  PrismaClient: class {
    options: unknown;
    $disconnect = vi.fn().mockResolvedValue(undefined);
    constructor(options: unknown) {
      this.options = options;
    }
  },
}));
import {
  getPrismaForBusinessId,
  getPrismaForProvisioning,
  disconnectTenantClients,
} from "../db.js";
const active = {
  businessStatus: "ACTIVE",
  businessDatabaseStatus: "ACTIVE",
  businessDatabaseMode: "DEDICATED",
  businessConnectionDB: "postgresql://qa:qa@localhost/qa_a",
};
describe("tenant database routing", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => disconnectTenantClients());
  it("uses separate clients for two dedicated businesses", async () => {
    m.placement.mockImplementation(async (id: string) => ({
      ...active,
      businessConnectionDB: `postgresql://qa:qa@localhost/${id}`,
    }));
    const a = await getPrismaForBusinessId("a"),
      b = await getPrismaForBusinessId("b");
    expect(a).not.toBe(b);
    expect(await getPrismaForBusinessId("a")).toBe(a);
  });
  it("replaces a cached client when its server-owned location changes", async () => {
    m.placement.mockResolvedValue(active);
    const first = await getPrismaForBusinessId("a");
    m.placement.mockResolvedValue({
      ...active,
      businessConnectionDB: "postgresql://qa:qa@localhost/qa_new",
    });
    expect(await getPrismaForBusinessId("a")).not.toBe(first);
    expect(first.$disconnect).toHaveBeenCalledOnce();
  });
  it("blocks unavailable storage before returning a shared client", async () => {
    m.placement.mockResolvedValue({
      ...active,
      businessDatabaseMode: "SHARED",
      businessDatabaseStatus: "FAILED",
    });
    await expect(getPrismaForBusinessId("a")).rejects.toMatchObject({
      code: "TENANT_PROVISIONING_INCOMPLETE",
    });
    expect(m.shared).not.toHaveBeenCalled();
  });
  it("keeps provisioning access explicit", async () => {
    m.placement.mockResolvedValue({
      ...active,
      businessDatabaseMode: "SHARED",
      businessStatus: "PENDING",
      businessDatabaseStatus: "PROVISIONING",
    });
    await expect(getPrismaForBusinessId("a")).rejects.toThrow();
    m.shared.mockResolvedValue({ tenant: "a" });
    expect(await getPrismaForProvisioning("a")).toEqual({ tenant: "a" });
  });
});

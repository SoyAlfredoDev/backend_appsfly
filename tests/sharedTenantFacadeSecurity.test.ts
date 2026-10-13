import { describe, expect, it, vi } from "vitest";
import type { PrismaClient } from "../src/generated/shared/index.js";
import { createSharedTenantClient } from "../services/database/sharedTenantClient.js";

function fixture() {
  const findUnique = vi.fn().mockResolvedValue(null);
  const transaction = {
    $executeRaw: vi.fn().mockResolvedValue(1),
    user: { findUnique, $parent: { unsafe: true } },
    appointmentSettings: { findUnique },
  };
  const base = {
    ...transaction,
    $extends: vi.fn(),
    _engine: {},
    $transaction: vi.fn(async (callback) => callback(transaction)),
  } as unknown as PrismaClient;
  return { tenant: createSharedTenantClient(base, "tenant-a"), findUnique };
}
describe("shared facade capability boundary", () => {
  it("hides extension, parent and engine escape hatches", () => {
    const { tenant } = fixture();
    expect(Reflect.get(tenant, "$extends")).toBeUndefined();
    expect(Reflect.get(tenant, "_engine")).toBeUndefined();
    expect(Reflect.get(tenant.user, "$parent")).toBeUndefined();
    expect(Reflect.get(tenant.user, "constructor")).toBeUndefined();
  });
  it("rejects batch transactions without starting unscoped work", () => {
    const { tenant } = fixture();
    expect(() => tenant.$transaction([])).toThrow("interactive callback");
  });
  it("normalizes tenant-local IDs without dropping additional filters", async () => {
    const { tenant, findUnique } = fixture();
    // The dedicated schema uses userId; shared adapts this common service contract.
    await Reflect.apply(tenant.user.findUnique, tenant.user, [
      { where: { userId: "user-a", userRole: "USER" } },
    ]);
    expect(findUnique).toHaveBeenCalledWith({
      where: { businessId_userId: { businessId: "tenant-a", userId: "user-a" }, userRole: "USER" },
    });
  });
  it("keeps singleton key adaptation inside interactive transactions", async () => {
    const { tenant, findUnique } = fixture();
    await tenant.$transaction(async (tx) => {
      expect(Reflect.get(tx, "$extends")).toBeUndefined();
      await Reflect.apply(tx.appointmentSettings.findUnique, tx.appointmentSettings, [
        { where: { settingsId: "default" } },
      ]);
    });
    expect(findUnique).toHaveBeenCalledWith({
      where: { businessId_settingsId: { businessId: "tenant-a", settingsId: "default" } },
    });
  });
});

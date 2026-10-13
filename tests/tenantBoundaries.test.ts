import { describe, expect, it } from "vitest";
import { assertTenantPlacement } from "../services/database/tenantPlacementAccess.js";
import { businessRegistrationInput } from "../services/database/businessRegistrationInput.js";
import { cacheGetOrSet, cacheInvalidateBusiness } from "../libs/tenantCache.js";

describe("tenant placement, input and cache", () => {
  const active = {
    businessStatus: "ACTIVE",
    businessDatabaseStatus: "ACTIVE",
    businessDatabaseMode: "SHARED",
  };
  it.each(["UNASSIGNED", "PROVISIONING", "MIGRATING", "FAILED"])("blocks %s databases", (state) => {
    expect(() => assertTenantPlacement({ ...active, businessDatabaseStatus: state })).toThrow();
  });
  it("allows provisioning only through explicit internal access", () => {
    const pending = {
      ...active,
      businessStatus: "PENDING",
      businessDatabaseStatus: "PROVISIONING",
    };
    expect(() => assertTenantPlacement(pending)).toThrow();
    expect(() => assertTenantPlacement(pending, true)).not.toThrow();
    expect(() =>
      assertTenantPlacement({ ...pending, businessDatabaseStatus: "FAILED" }, true),
    ).toThrow();
  });
  it("rejects unknown placement instead of falling back to a dedicated database", () => {
    expect(() => assertTenantPlacement({ ...active, businessDatabaseMode: "INVALID" })).toThrow();
    expect(() => assertTenantPlacement({ ...active, businessDatabaseMode: "DEDICATED" })).toThrow();
    expect(() => assertTenantPlacement(active)).not.toThrow();
  });
  it("does not accept nested writes, another tenant ID or provisioning fields", () => {
    const data = businessRegistrationInput({
      businessId: "victim",
      businessName: "QA",
      UserBusiness: { create: {} },
      subscriptions: { create: {} },
      businessConnectionDB: "forbidden",
      businessStatus: "ACTIVE",
      createdByUserId: "victim",
    });
    expect(data).toEqual({ businessId: expect.any(String), businessName: "QA" });
    expect(data.businessId).not.toBe("victim");
  });
  it("never caches data in a global namespace when tenant context is absent", async () => {
    expect(await cacheGetOrSet(null, "categories", async () => ["a"])).toEqual(["a"]);
    expect(await cacheGetOrSet(null, "categories", async () => ["b"])).toEqual(["b"]);
  });
  it("keeps tenant caches separate", async () => {
    cacheInvalidateBusiness("a");
    cacheInvalidateBusiness("b");
    expect(await cacheGetOrSet("a", "categories", async () => ["a"])).toEqual(["a"]);
    expect(await cacheGetOrSet("b", "categories", async () => ["b"])).toEqual(["b"]);
  });
});

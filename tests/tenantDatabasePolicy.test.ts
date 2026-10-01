import { describe, expect, it } from "vitest";

import {
  isTenantDatabaseMode,
  requiresTenantDataMigration,
  resolveInitialDatabaseMode,
} from "../services/database/tenantDatabasePolicy.js";

describe("tenant database policy", () => {
  it("assigns a new tenant to shared storage by default", () => {
    expect(resolveInitialDatabaseMode()).toBe("SHARED");
  });

  it("honors a dedicated plan policy", () => {
    expect(resolveInitialDatabaseMode({ planDatabaseMode: "DEDICATED" })).toBe("DEDICATED");
  });

  it("does not trust an invalid storage mode", () => {
    expect(resolveInitialDatabaseMode({ planDatabaseMode: "CLIENT_VALUE" })).toBe("SHARED");
    expect(isTenantDatabaseMode("CLIENT_VALUE")).toBe(false);
  });

  it("requires a migration only when the storage mode changes", () => {
    expect(requiresTenantDataMigration("SHARED", "SHARED")).toBe(false);
    expect(requiresTenantDataMigration("SHARED", "DEDICATED")).toBe(true);
  });
});

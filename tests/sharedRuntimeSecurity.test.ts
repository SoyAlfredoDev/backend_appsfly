import { describe, expect, it } from "vitest";
import {
  assertRestrictedRuntimeRole,
  assertSharedTables,
  type SharedTableSecurity,
} from "../services/database/sharedRuntimeSecurity.js";

const role = {
  roleName: "runtime",
  isSuperuser: false,
  bypassRls: false,
  createRole: false,
  createDb: false,
};
const condition = `("businessId" = current_setting('app.current_business_id'::text, true))`;
const safe: SharedTableSecurity = {
  name: "Customer",
  enabled: true,
  forced: true,
  owned: false,
  canTruncate: false,
  policies: [{ cmd: "ALL", roles: ["public"], qual: condition, with_check: condition }],
};
describe("shared runtime security gate", () => {
  it.each(["isSuperuser", "bypassRls", "createRole", "createDb"])("rejects %s", (key) => {
    expect(() => assertRestrictedRuntimeRole({ ...role, [key]: true })).toThrow();
  });
  it("rejects missing role metadata", () =>
    expect(() => assertRestrictedRuntimeRole(undefined)).toThrow());
  it("accepts the exact RLS contract", () =>
    expect(() => assertSharedTables([safe], role, ["Customer"])).not.toThrow());
  it.each([
    { enabled: false },
    { forced: false },
    { owned: true },
    { canTruncate: true },
    { policies: [] },
  ])("rejects unsafe tables %o", (patch) => {
    expect(() => assertSharedTables([{ ...safe, ...patch }], role, ["Customer"])).toThrow();
  });
  it("rejects missing tables and additional permissive policies", () => {
    expect(() => assertSharedTables([], role, ["Customer"])).toThrow();
    expect(() =>
      assertSharedTables(
        [{ ...safe, policies: [...safe.policies, { ...safe.policies[0], qual: "true" }] }],
        role,
        ["Customer"],
      ),
    ).toThrow();
  });
  it("rejects broad read or write policies", () => {
    for (const field of ["qual", "with_check"])
      expect(() =>
        assertSharedTables(
          [{ ...safe, policies: [{ ...safe.policies[0], [field]: "true" }] }],
          role,
          ["Customer"],
        ),
      ).toThrow();
  });
});

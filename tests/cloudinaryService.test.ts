import { beforeEach, describe, expect, it, vi } from "vitest";

const deleteResourcesByPrefix = vi.fn();
const deleteFolder = vi.fn();
const destroy = vi.fn();

vi.mock("cloudinary", () => ({
  v2: {
    config: vi.fn(),
    api: {
      delete_resources_by_prefix: (...args: unknown[]) => deleteResourcesByPrefix(...args),
      delete_folder: (...args: unknown[]) => deleteFolder(...args),
    },
    uploader: {
      destroy: (...args: unknown[]) => destroy(...args),
    },
  },
}));

const { extractPublicIdFromCloudinaryUrl, tenantCloudinaryPrefix, deleteTenantCloudinaryFolder } =
  await import("../services/cloudinaryService.js");

describe("extractPublicIdFromCloudinaryUrl", () => {
  it("reads nested tenant folders", () => {
    const url =
      "https://res.cloudinary.com/demo/image/upload/v1791809831/tenants/biz-1/ticket_receipts/expense-1.png";
    expect(extractPublicIdFromCloudinaryUrl(url)).toBe("tenants/biz-1/ticket_receipts/expense-1");
  });
});

describe("tenantCloudinaryPrefix", () => {
  it("builds tenants/{businessId}", () => {
    expect(tenantCloudinaryPrefix(" biz-1 ")).toBe("tenants/biz-1");
  });

  it("requires a business id", () => {
    expect(() => tenantCloudinaryPrefix("")).toThrow(/businessId is required/);
  });
});

describe("deleteTenantCloudinaryFolder", () => {
  beforeEach(() => {
    deleteResourcesByPrefix.mockReset();
    deleteFolder.mockReset();
  });

  it("deletes resources by prefix and then the folder", async () => {
    deleteResourcesByPrefix.mockResolvedValue({ deleted: { "tenants/biz-1/a": "deleted" } });
    deleteFolder.mockResolvedValue({ deleted: ["tenants/biz-1"] });

    const result = await deleteTenantCloudinaryFolder("biz-1");

    expect(deleteResourcesByPrefix).toHaveBeenCalledWith("tenants/biz-1", {
      resource_type: "image",
    });
    expect(deleteFolder).toHaveBeenCalledWith("tenants/biz-1");
    expect(result).toEqual({ deleted: { "tenants/biz-1/a": "deleted" } });
  });

  it("still returns the deletion result if the empty folder cannot be removed", async () => {
    deleteResourcesByPrefix.mockResolvedValue({ deleted: {} });
    deleteFolder.mockRejectedValue(new Error("not empty"));

    await expect(deleteTenantCloudinaryFolder("biz-1")).resolves.toEqual({ deleted: {} });
  });
});

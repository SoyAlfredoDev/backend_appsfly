import { describe, expect, it } from "vitest";
import {
  OPTICS_SYSTEM_CATEGORIES,
  ensureOpticsCatalog,
  opticsCatalogIsComplete,
  seedOpticsCatalog,
} from "../libs/opticsCatalogSeed.js";

function createSharedPrisma() {
  const categories = [];
  const attributes = [];
  return {
    categories,
    attributes,
    category: {
      async findFirst({ where }) {
        return categories.find((category) => category.categoryCode === where.categoryCode) ?? null;
      },
      async create({ data }) {
        const row = { categoryId: `cat-${categories.length + 1}`, isSystem: false, ...data };
        categories.push(row);
        return row;
      },
      async update() {
        throw new Error("unexpected update");
      },
      async findMany() {
        return categories.map((category) => ({
          categoryCode: category.categoryCode,
          _count: {
            attributes: attributes.filter(
              (attribute) => attribute.categoryId === category.categoryId,
            ).length,
          },
        }));
      },
    },
    categoryAttribute: {
      async findUnique() {
        throw new Error("shared client has no categoryId_attributeKey");
      },
      async findFirst({ where }) {
        return (
          attributes.find(
            (attribute) =>
              attribute.categoryId === where.categoryId &&
              attribute.attributeKey === where.attributeKey,
          ) ?? null
        );
      },
      async create({ data }) {
        attributes.push(data);
        return data;
      },
    },
  };
}

describe("optics catalog seed", () => {
  it("seeds every system category on the shared client", async () => {
    const prisma = createSharedPrisma();
    const result = await seedOpticsCatalog(prisma, "user-1");

    expect(result.seededCodes).toEqual(OPTICS_SYSTEM_CATEGORIES.map((item) => item.categoryCode));
    expect(prisma.categories).toHaveLength(5);
    expect(prisma.attributes.length).toBeGreaterThan(0);
    expect(prisma.attributes.some((attribute) => attribute.attributeKey === "brand")).toBe(true);

    const again = await seedOpticsCatalog(prisma, "user-1");
    expect(again.seededCodes).toEqual([]);
    expect(prisma.categories).toHaveLength(5);
  });

  it("finishes a catalog that stopped after the first category", async () => {
    const prisma = createSharedPrisma();
    prisma.categories.push({
      categoryId: "cat-frames",
      categoryCode: "FRAMES",
      categoryName: "Armazones",
      isSystem: true,
    });

    expect(opticsCatalogIsComplete([{ categoryCode: "FRAMES", attributeCount: 0 }])).toBe(false);

    const repair = await ensureOpticsCatalog(prisma, "user-1");
    expect(repair.repaired).toBe(true);
    expect(prisma.categories).toHaveLength(5);
    expect(
      prisma.attributes.filter((attribute) => attribute.categoryId === "cat-frames").length,
    ).toBe(5);

    const second = await ensureOpticsCatalog(prisma, "user-1");
    expect(second.repaired).toBe(false);
  });
});

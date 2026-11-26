import type { PrismaClient } from "../../src/generated/business/index.js";

const starterCategories = [
  {
    categoryName: "Tornillería",
    attributes: [
      { attributeKey: "diametro_mm", attributeLabel: "Diámetro (mm)", dataType: "NUMBER" },
      { attributeKey: "largo_mm", attributeLabel: "Largo (mm)", dataType: "NUMBER" },
      { attributeKey: "material", attributeLabel: "Material", dataType: "TEXT" },
    ],
  },
  {
    categoryName: "Repuestos",
    attributes: [
      { attributeKey: "marca", attributeLabel: "Marca", dataType: "TEXT" },
      { attributeKey: "modelo_compatible", attributeLabel: "Modelo compatible", dataType: "TEXT" },
      {
        attributeKey: "codigo_fabricante",
        attributeLabel: "Código de fabricante",
        dataType: "TEXT",
      },
    ],
  },
];

export async function seedHardwareCatalog(
  prisma: Pick<PrismaClient, "$transaction">,
  userId: string,
) {
  await prisma.$transaction(async (tx) => {
    for (const { categoryName, attributes } of starterCategories) {
      await tx.category.create({
        data: {
          categoryName,
          createdByUserId: userId,
          allowedFor: "PRODUCTS",
          attributes: {
            create: attributes.map((attribute, sortOrder) => ({ ...attribute, sortOrder })),
          },
        },
      });
    }
  });
}

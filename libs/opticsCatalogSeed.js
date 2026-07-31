/**
 * Seed de catálogo óptico: categorías de sistema + atributos.
 * Idempotente por categoryCode / attributeKey.
 */

export const OPTICS_SYSTEM_CATEGORIES = [
    {
        categoryCode: "FRAMES",
        categoryName: "Armazones",
        allowedFor: "PRODUCTS",
        attributes: [
            { attributeKey: "brand", attributeLabel: "Marca", dataType: "TEXT", sortOrder: 1 },
            { attributeKey: "model", attributeLabel: "Modelo", dataType: "TEXT", sortOrder: 2 },
            { attributeKey: "color", attributeLabel: "Color", dataType: "TEXT", sortOrder: 3 },
            { attributeKey: "size", attributeLabel: "Talla", dataType: "TEXT", sortOrder: 4 },
            { attributeKey: "material", attributeLabel: "Material", dataType: "TEXT", sortOrder: 5 },
        ],
    },
    {
        categoryCode: "LENSES",
        categoryName: "Cristales",
        allowedFor: "PRODUCTS",
        attributes: [
            {
                attributeKey: "lensType",
                attributeLabel: "Tipo",
                dataType: "SELECT",
                optionsJson: JSON.stringify([
                    "Monofocal",
                    "Bifocal",
                    "Multifocal",
                    "Progresivo",
                    "Ocupacional",
                ]),
                sortOrder: 1,
            },
            { attributeKey: "index", attributeLabel: "Índice", dataType: "TEXT", sortOrder: 2 },
            { attributeKey: "antiReflective", attributeLabel: "Antirreflejo", dataType: "BOOLEAN", sortOrder: 3 },
            { attributeKey: "photochromic", attributeLabel: "Fotocromático", dataType: "BOOLEAN", sortOrder: 4 },
            { attributeKey: "blueLight", attributeLabel: "Blue Light", dataType: "BOOLEAN", sortOrder: 5 },
        ],
    },
    {
        categoryCode: "CONTACT_LENSES",
        categoryName: "Lentes de Contacto",
        allowedFor: "PRODUCTS",
        attributes: [
            { attributeKey: "brand", attributeLabel: "Marca", dataType: "TEXT", sortOrder: 1 },
            { attributeKey: "baseCurve", attributeLabel: "Curva Base", dataType: "TEXT", sortOrder: 2 },
            { attributeKey: "diameter", attributeLabel: "Diámetro", dataType: "TEXT", sortOrder: 3 },
            { attributeKey: "duration", attributeLabel: "Duración", dataType: "TEXT", sortOrder: 4 },
        ],
    },
    {
        categoryCode: "ACCESSORIES",
        categoryName: "Accesorios",
        allowedFor: "PRODUCTS",
        attributes: [],
    },
    {
        categoryCode: "SERVICES",
        categoryName: "Servicios",
        allowedFor: "SERVICES",
        attributes: [],
    },
];

/**
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {string} createdByUserId
 */
export async function seedOpticsCatalog(prisma, createdByUserId) {
    if (!prisma || !createdByUserId) {
        throw new Error("seedOpticsCatalog requiere prisma y createdByUserId");
    }

    const created = [];

    for (const def of OPTICS_SYSTEM_CATEGORIES) {
        let category = await prisma.category.findFirst({
            where: { categoryCode: def.categoryCode },
        });

        if (!category) {
            category = await prisma.category.create({
                data: {
                    categoryName: def.categoryName,
                    categoryCode: def.categoryCode,
                    isSystem: true,
                    allowedFor: def.allowedFor,
                    createdByUserId,
                },
            });
            created.push(category.categoryCode);
        } else if (!category.isSystem) {
            category = await prisma.category.update({
                where: { categoryId: category.categoryId },
                data: {
                    isSystem: true,
                    categoryName: def.categoryName,
                    allowedFor: def.allowedFor,
                },
            });
        }

        for (const attr of def.attributes) {
            const existing = await prisma.categoryAttribute.findUnique({
                where: {
                    categoryId_attributeKey: {
                        categoryId: category.categoryId,
                        attributeKey: attr.attributeKey,
                    },
                },
            });
            if (existing) continue;

            await prisma.categoryAttribute.create({
                data: {
                    categoryId: category.categoryId,
                    attributeKey: attr.attributeKey,
                    attributeLabel: attr.attributeLabel,
                    dataType: attr.dataType || "TEXT",
                    optionsJson: attr.optionsJson || null,
                    isSystem: true,
                    isRequired: false,
                    isVisible: true,
                    sortOrder: attr.sortOrder ?? 0,
                },
            });
        }
    }

    return { seededCodes: created };
}

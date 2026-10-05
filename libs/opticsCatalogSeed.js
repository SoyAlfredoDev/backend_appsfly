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
function withBusinessId(data, businessId) {
    if (!businessId) return data;
    return { businessId, ...data };
}

/**
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {string} createdByUserId
 * @param {string | null} [businessId]
 */
export async function seedOpticsCatalog(prisma, createdByUserId, businessId = null) {
    if (!prisma || !createdByUserId) {
        throw new Error("seedOpticsCatalog requiere prisma y createdByUserId");
    }

    const created = [];

    for (const def of OPTICS_SYSTEM_CATEGORIES) {
        let category = await prisma.category.findFirst({
            where: {
                categoryCode: def.categoryCode,
                ...(businessId ? { businessId } : {}),
            },
        });

        if (!category) {
            category = await prisma.category.create({
                data: withBusinessId(
                    {
                        categoryName: def.categoryName,
                        categoryCode: def.categoryCode,
                        isSystem: true,
                        allowedFor: def.allowedFor,
                        createdByUserId,
                    },
                    businessId,
                ),
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
            const existing = await prisma.categoryAttribute.findFirst({
                where: {
                    categoryId: category.categoryId,
                    attributeKey: attr.attributeKey,
                    ...(businessId ? { businessId } : {}),
                },
            });
            if (existing) continue;

            await prisma.categoryAttribute.create({
                data: withBusinessId(
                    {
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
                    businessId,
                ),
            });
        }
    }

    return { seededCodes: created, repaired: created.length > 0 };
}

export function opticsCatalogIsComplete(rows) {
    const counts = new Map(rows.map((row) => [row.categoryCode, row.attributeCount]));
    return OPTICS_SYSTEM_CATEGORIES.every(
        (definition) => (counts.get(definition.categoryCode) ?? 0) >= definition.attributes.length,
    );
}

/**
 * Completa un sembrado que se cortó a medias. No vuelve a crear lo que ya existe.
 */
export async function ensureOpticsCatalog(prisma, createdByUserId, businessId = null) {
    const rows = await prisma.category.findMany({
        where: {
            categoryCode: { in: OPTICS_SYSTEM_CATEGORIES.map((definition) => definition.categoryCode) },
            ...(businessId ? { businessId } : {}),
        },
        select: {
            categoryCode: true,
            _count: { select: { attributes: true } },
        },
    });
    const summary = rows.map((row) => ({
        categoryCode: row.categoryCode,
        attributeCount: row._count?.attributes ?? 0,
    }));
    if (opticsCatalogIsComplete(summary)) {
        return { seededCodes: [], repaired: false };
    }
    const seeded = await seedOpticsCatalog(prisma, createdByUserId, businessId);
    return { ...seeded, repaired: true };
}

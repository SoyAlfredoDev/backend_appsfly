/**
 * Registro flexible de códigos escaneables (barcode / QR / SKU alias).
 * Polymorphic: entityType + entityId (PRODUCT en v1).
 */

export const SCAN_ENTITY = {
    PRODUCT: "PRODUCT",
    SERVICE: "SERVICE",
    WORK_ORDER: "WORK_ORDER",
    CUSTOMER: "CUSTOMER",
};

export const SCAN_CODE_TYPE = {
    BARCODE: "BARCODE",
    QR: "QR",
    SKU_ALIAS: "SKU_ALIAS",
};

const ALLOWED_USER_CODE_TYPES = new Set([SCAN_CODE_TYPE.BARCODE, SCAN_CODE_TYPE.QR]);

const makeError = (message, statusCode = 400, code = undefined) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    return error;
};

export function normalizeCodeValue(raw) {
    if (raw == null) return "";
    return String(raw).trim();
}

/**
 * Resuelve un código exacto a entidad (+ producto si aplica).
 */
export async function resolveCode(codeValue, prisma) {
    const value = normalizeCodeValue(codeValue);
    if (!value) throw makeError("Código vacío.", 400, "EMPTY_CODE");

    const scan = await prisma.scanCode.findUnique({
        where: { codeValue: value },
    });

    // Fallback: SKU directo si aún no hay ScanCode (tenants sin backfill)
    if (!scan) {
        const productBySku = await prisma.product.findFirst({
            where: { productSKU: value },
            include: {
                category: {
                    select: {
                        categoryId: true,
                        categoryName: true,
                        categoryCode: true,
                    },
                },
                productStock: {
                    select: { quantityOnHand: true },
                },
            },
        });
        if (productBySku) {
            return {
                scanCode: null,
                entityType: SCAN_ENTITY.PRODUCT,
                entityId: productBySku.productId,
                product: productBySku,
            };
        }
        return null;
    }

    let product = null;
    if (scan.entityType === SCAN_ENTITY.PRODUCT) {
        product = await prisma.product.findUnique({
            where: { productId: scan.entityId },
            include: {
                category: {
                    select: {
                        categoryId: true,
                        categoryName: true,
                        categoryCode: true,
                    },
                },
                productStock: {
                    select: { quantityOnHand: true },
                },
            },
        });
    }

    return {
        scanCode: scan,
        entityType: scan.entityType,
        entityId: scan.entityId,
        product,
    };
}

export async function listCodesForEntity(entityType, entityId, prisma) {
    return prisma.scanCode.findMany({
        where: { entityType, entityId },
        orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }],
    });
}

/**
 * Sincroniza SKU_ALIAS con el productSKU actual.
 */
export async function syncSkuAlias(tx, productId, productSKU, createdByUserId = null) {
    const value = normalizeCodeValue(productSKU);
    if (!value) return;

    const existingAlias = await tx.scanCode.findFirst({
        where: {
            entityType: SCAN_ENTITY.PRODUCT,
            entityId: productId,
            codeType: SCAN_CODE_TYPE.SKU_ALIAS,
        },
    });

    const conflict = await tx.scanCode.findUnique({ where: { codeValue: value } });
    if (conflict && !(conflict.entityType === SCAN_ENTITY.PRODUCT && conflict.entityId === productId)) {
        throw makeError(
            `El código "${value}" ya está asignado a otra entidad.`,
            409,
            "CODE_DUPLICATE",
        );
    }

    if (existingAlias) {
        if (existingAlias.codeValue !== value) {
            await tx.scanCode.update({
                where: { scanCodeId: existingAlias.scanCodeId },
                data: { codeValue: value },
            });
        }
        return;
    }

    if (conflict && conflict.entityId === productId) {
        // Ya existe el valor como otro tipo en el mismo producto — no crear alias duplicado
        return;
    }

    await tx.scanCode.create({
        data: {
            entityType: SCAN_ENTITY.PRODUCT,
            entityId: productId,
            codeType: SCAN_CODE_TYPE.SKU_ALIAS,
            codeValue: value,
            isPrimary: true,
            createdByUserId: createdByUserId || null,
        },
    });
}

/**
 * Reemplaza códigos BARCODE/QR del producto (no toca SKU_ALIAS).
 * @param {Array<{ codeType: string, codeValue: string, isPrimary?: boolean }>} codes
 */
export async function upsertCodesForProduct(tx, productId, codes, createdByUserId = null) {
    if (codes === undefined) return;
    if (!Array.isArray(codes)) {
        throw makeError("codes debe ser un arreglo.", 400, "INVALID_CODES");
    }

    const normalized = [];
    const seen = new Set();

    for (const raw of codes) {
        const codeType = String(raw?.codeType || "").toUpperCase();
        const codeValue = normalizeCodeValue(raw?.codeValue);
        if (!codeValue) continue;
        if (!ALLOWED_USER_CODE_TYPES.has(codeType)) {
            throw makeError(
                `Tipo de código no permitido: ${codeType}. Use BARCODE o QR.`,
                400,
                "INVALID_CODE_TYPE",
            );
        }
        if (seen.has(codeValue)) {
            throw makeError(`Código duplicado en el payload: ${codeValue}`, 400, "CODE_DUPLICATE");
        }
        seen.add(codeValue);
        normalized.push({
            codeType,
            codeValue,
            isPrimary: Boolean(raw?.isPrimary),
        });
    }

    for (const item of normalized) {
        const conflict = await tx.scanCode.findUnique({
            where: { codeValue: item.codeValue },
        });
        if (
            conflict &&
            !(conflict.entityType === SCAN_ENTITY.PRODUCT && conflict.entityId === productId)
        ) {
            throw makeError(
                `El código "${item.codeValue}" ya está en uso.`,
                409,
                "CODE_DUPLICATE",
            );
        }
        // Conflicto con SKU_ALIAS del mismo producto
        if (
            conflict &&
            conflict.entityId === productId &&
            conflict.codeType === SCAN_CODE_TYPE.SKU_ALIAS
        ) {
            throw makeError(
                `El código "${item.codeValue}" coincide con el SKU del producto.`,
                400,
                "CODE_EQUALS_SKU",
            );
        }
    }

    await tx.scanCode.deleteMany({
        where: {
            entityType: SCAN_ENTITY.PRODUCT,
            entityId: productId,
            codeType: { in: [SCAN_CODE_TYPE.BARCODE, SCAN_CODE_TYPE.QR] },
        },
    });

    if (normalized.length === 0) return;

    await tx.scanCode.createMany({
        data: normalized.map((item) => ({
            entityType: SCAN_ENTITY.PRODUCT,
            entityId: productId,
            codeType: item.codeType,
            codeValue: item.codeValue,
            isPrimary: item.isPrimary,
            createdByUserId: createdByUserId || null,
        })),
    });
}

export async function deleteCode(scanCodeId, prisma) {
    const existing = await prisma.scanCode.findUnique({ where: { scanCodeId } });
    if (!existing) throw makeError("Código no encontrado.", 404, "CODE_NOT_FOUND");
    if (existing.codeType === SCAN_CODE_TYPE.SKU_ALIAS) {
        throw makeError(
            "El alias de SKU no se puede eliminar manualmente; cambia el SKU del producto.",
            400,
            "SKU_ALIAS_LOCKED",
        );
    }
    await prisma.scanCode.delete({ where: { scanCodeId } });
    return { deleted: true };
}

/**
 * IDs de producto cuyo ScanCode.codeValue coincide exactamente con query.
 */
export async function findProductIdsByExactCode(query, prisma) {
    const value = normalizeCodeValue(query);
    if (!value) return [];
    const rows = await prisma.scanCode.findMany({
        where: {
            codeValue: value,
            entityType: SCAN_ENTITY.PRODUCT,
        },
        select: { entityId: true },
    });
    return rows.map((r) => r.entityId);
}

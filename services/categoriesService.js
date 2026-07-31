import { cacheGetOrSet, cacheInvalidate } from "../libs/tenantCache.js";

const CATEGORIES_TTL_MS = 5 * 60_000;

const attributeInclude = {
    attributes: {
        orderBy: [{ sortOrder: "asc" }, { attributeLabel: "asc" }],
    },
};

const makeError = (message, statusCode = 400, code = undefined) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.code = code;
    return error;
};

export const createCategory = async (data, prisma, businessId = null) => {
    try {
        const res = await prisma.category.create({
            data: {
                categoryName: data.categoryName,
                allowedFor: data.allowedFor,
                createdByUserId: data.createdByUserId,
                isSystem: false,
                categoryCode: null,
            },
            include: attributeInclude,
        });
        if (businessId) cacheInvalidate(businessId, "categories");
        return res;
    } catch (error) {
        console.error("(categoriesService.js): Error creating category:", error);
        throw error;
    }
};

export const getCategories = async (prisma, businessId = null, { includeHiddenAttrs = false } = {}) => {
    try {
        return cacheGetOrSet(
            businessId,
            includeHiddenAttrs ? "categories:all-attrs" : "categories",
            () =>
                prisma.category.findMany({
                    orderBy: [{ isSystem: "desc" }, { categoryName: "asc" }],
                    include: {
                        attributes: {
                            where: includeHiddenAttrs ? undefined : { isVisible: true },
                            orderBy: [{ sortOrder: "asc" }, { attributeLabel: "asc" }],
                        },
                    },
                }),
            CATEGORIES_TTL_MS,
        );
    } catch (error) {
        console.error("(categoriesService.js): Error getting categories:", error);
        throw error;
    }
};

export const getCategoryById = async (categoryId, prisma) => {
    return prisma.category.findUnique({
        where: { categoryId },
        include: attributeInclude,
    });
};

export const updateCategory = async (categoryId, data, prisma, businessId = null) => {
    const existing = await prisma.category.findUnique({ where: { categoryId } });
    if (!existing) throw makeError("Categoría no encontrada.", 404, "CATEGORY_NOT_FOUND");
    if (existing.isSystem) {
        throw makeError(
            "Las categorías del sistema no se pueden editar.",
            400,
            "SYSTEM_CATEGORY_LOCKED",
        );
    }

    const updated = await prisma.category.update({
        where: { categoryId },
        data: {
            ...(data.categoryName != null ? { categoryName: data.categoryName } : {}),
            ...(data.allowedFor != null ? { allowedFor: data.allowedFor } : {}),
        },
        include: attributeInclude,
    });
    if (businessId) {
        cacheInvalidate(businessId, "categories");
        cacheInvalidate(businessId, "categories:all-attrs");
    }
    return updated;
};

export const deleteCategory = async (categoryId, prisma, businessId = null) => {
    const existing = await prisma.category.findUnique({
        where: { categoryId },
        include: {
            _count: { select: { products: true, services: true } },
        },
    });
    if (!existing) throw makeError("Categoría no encontrada.", 404, "CATEGORY_NOT_FOUND");
    if (existing.isSystem) {
        throw makeError(
            "Las categorías del sistema no se pueden eliminar.",
            400,
            "SYSTEM_CATEGORY_LOCKED",
        );
    }
    if (existing._count.products > 0 || existing._count.services > 0) {
        throw makeError(
            "No se puede eliminar: la categoría tiene productos o servicios asociados.",
            400,
            "CATEGORY_IN_USE",
        );
    }

    await prisma.category.delete({ where: { categoryId } });
    if (businessId) {
        cacheInvalidate(businessId, "categories");
        cacheInvalidate(businessId, "categories:all-attrs");
    }
    return { deleted: true };
};

export const createCategoryAttribute = async (categoryId, data, prisma, businessId = null) => {
    const category = await prisma.category.findUnique({ where: { categoryId } });
    if (!category) throw makeError("Categoría no encontrada.", 404, "CATEGORY_NOT_FOUND");

    const key = String(data.attributeKey || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
    if (!key) throw makeError("La clave del atributo es obligatoria.");

    const attr = await prisma.categoryAttribute.create({
        data: {
            categoryId,
            attributeKey: key,
            attributeLabel: String(data.attributeLabel || key).trim(),
            dataType: data.dataType || "TEXT",
            optionsJson: data.optionsJson || null,
            isSystem: false,
            isRequired: Boolean(data.isRequired),
            isVisible: data.isVisible !== false,
            sortOrder: Number.isFinite(Number(data.sortOrder)) ? Number(data.sortOrder) : 100,
        },
    });
    if (businessId) {
        cacheInvalidate(businessId, "categories");
        cacheInvalidate(businessId, "categories:all-attrs");
    }
    return attr;
};

export const updateCategoryAttribute = async (
    categoryId,
    attributeId,
    data,
    prisma,
    businessId = null,
) => {
    const existing = await prisma.categoryAttribute.findFirst({
        where: { categoryAttributeId: attributeId, categoryId },
    });
    if (!existing) throw makeError("Atributo no encontrado.", 404, "ATTRIBUTE_NOT_FOUND");

    const patch = {};
    if (data.attributeLabel != null && !existing.isSystem) {
        patch.attributeLabel = String(data.attributeLabel).trim();
    }
    if (data.dataType != null && !existing.isSystem) {
        patch.dataType = data.dataType;
    }
    if (data.optionsJson !== undefined && !existing.isSystem) {
        patch.optionsJson = data.optionsJson;
    }
    if (data.isRequired != null && !existing.isSystem) {
        patch.isRequired = Boolean(data.isRequired);
    }
    if (data.isVisible != null) {
        patch.isVisible = Boolean(data.isVisible);
    }
    if (data.sortOrder != null) {
        patch.sortOrder = Number(data.sortOrder) || 0;
    }

    const updated = await prisma.categoryAttribute.update({
        where: { categoryAttributeId: attributeId },
        data: patch,
    });
    if (businessId) {
        cacheInvalidate(businessId, "categories");
        cacheInvalidate(businessId, "categories:all-attrs");
    }
    return updated;
};

export const deleteCategoryAttribute = async (
    categoryId,
    attributeId,
    prisma,
    businessId = null,
) => {
    const existing = await prisma.categoryAttribute.findFirst({
        where: { categoryAttributeId: attributeId, categoryId },
    });
    if (!existing) throw makeError("Atributo no encontrado.", 404, "ATTRIBUTE_NOT_FOUND");
    if (existing.isSystem) {
        throw makeError(
            "Los atributos del sistema no se pueden eliminar. Puedes ocultarlos.",
            400,
            "SYSTEM_ATTRIBUTE_LOCKED",
        );
    }

    await prisma.categoryAttribute.delete({ where: { categoryAttributeId: attributeId } });
    if (businessId) {
        cacheInvalidate(businessId, "categories");
        cacheInvalidate(businessId, "categories:all-attrs");
    }
    return { deleted: true };
};

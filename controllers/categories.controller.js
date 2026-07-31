import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    createCategoryAttribute,
    updateCategoryAttribute,
    deleteCategoryAttribute,
} from "../services/categoriesService.js";

function capitalizeFirstLetter(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function sendError(res, error) {
    const status = error.statusCode ?? 500;
    if (status >= 500) {
        console.error("(categories.controller.js):", error);
    }
    return res.status(status).json({
        message: error.message || "Internal server error",
        code: error.code,
    });
}

export const createCategoryController = async (req, res) => {
    const { categoryName, allowedFor, createdByUserId } = req.body;
    const data = {
        categoryName: capitalizeFirstLetter(categoryName),
        allowedFor,
        createdByUserId: createdByUserId || req.user?.payload?.id,
    };
    try {
        const categoryCreated = await createCategory(data, req.prisma, req.tenantBusinessId);
        res.status(200).json(categoryCreated);
    } catch (error) {
        sendError(res, error);
    }
};

export const getCategoriesController = async (req, res) => {
    try {
        const includeHidden = req.query.includeHiddenAttrs === "true";
        const categories = await getCategories(req.prisma, req.tenantBusinessId, {
            includeHiddenAttrs: includeHidden,
        });
        res.status(200).json(categories);
    } catch (error) {
        sendError(res, error);
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = {};
        if (req.body.categoryName != null) {
            data.categoryName = capitalizeFirstLetter(req.body.categoryName);
        }
        if (req.body.allowedFor != null) data.allowedFor = req.body.allowedFor;
        const updated = await updateCategory(id, data, req.prisma, req.tenantBusinessId);
        res.status(200).json(updated);
    } catch (error) {
        sendError(res, error);
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const result = await deleteCategory(req.params.id, req.prisma, req.tenantBusinessId);
        res.status(200).json(result);
    } catch (error) {
        sendError(res, error);
    }
};

export const createCategoryAttributeController = async (req, res) => {
    try {
        const attr = await createCategoryAttribute(
            req.params.id,
            req.body,
            req.prisma,
            req.tenantBusinessId,
        );
        res.status(201).json(attr);
    } catch (error) {
        sendError(res, error);
    }
};

export const updateCategoryAttributeController = async (req, res) => {
    try {
        const attr = await updateCategoryAttribute(
            req.params.id,
            req.params.attributeId,
            req.body,
            req.prisma,
            req.tenantBusinessId,
        );
        res.status(200).json(attr);
    } catch (error) {
        sendError(res, error);
    }
};

export const deleteCategoryAttributeController = async (req, res) => {
    try {
        const result = await deleteCategoryAttribute(
            req.params.id,
            req.params.attributeId,
            req.prisma,
            req.tenantBusinessId,
        );
        res.status(200).json(result);
    } catch (error) {
        sendError(res, error);
    }
};

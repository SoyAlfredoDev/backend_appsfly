import { createCategory, getCategories } from "../services/categoriesService.js";

export const createCategoryController = async (req, res) => {
    function capitalizeFirstLetter(text) {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    const {
        categoryName,
        allowedFor,
        createdByUserId
    } = req.body
    const data = {
        categoryName: capitalizeFirstLetter(categoryName),
        allowedFor,
        createdByUserId
    }
    try {
        const categoryCreated = await createCategory(data, req.prisma);
        res.status(200).json(categoryCreated)
    } catch (error) {
        console.error("(category.controller.js): Error creating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCategoriesController = async (req, res) => {
    try {
        const categorys = await getCategories(req.prisma);
        res.status(200).json(categorys);
    } catch (error) {
        console.error("(category.controller.js): Error getting categories:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}
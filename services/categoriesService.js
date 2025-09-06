// Create a category
export const createCategory = async (data, prisma) => {
    try {
        const res = await prisma.category.create({ data });
        return res
    } catch (error) {
        console.error("(categorysService.js): Error creating category:", error);
        throw error;
    }
}

// Get all categories
export const getCategories = async (prisma) => {
    try {
        const res = await prisma.category.findMany()
        return res
    } catch (error) {
        console.error("(categorysService.js): Error getting categorys:", error);
        throw error;
    }
}

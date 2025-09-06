// Create a product
export const createProduct = async (data, prisma) => {
    try {
        const res = await prisma.product.create({ data });
        return res
    } catch (error) {
        console.error("(productsService.js): Error creating product:", error);
        throw error;
    }
}

// Get all products
export const getProducts = async (prisma) => {
    try {
        const res = await prisma.product.findMany({
            include: {
                category: {
                    select: {
                        categoryId: true,
                        categoryName: true
                    }
                }
            }
        }
        );
        return res
    } catch (error) {
        console.error("(productsService.js): Error getting products:", error);
        throw error;
    }
}

import { createProduct, getProducts } from "../services/productsService.js";


// Create a product
export const createProductController = async (req, res) => {
    try {

        // >>>>>>>>>>>>> sku no repetido validar
        const {
            name,
            description,
            sku,
            categoryId,
            price,
            unit,
            createdByUserId,
            priceFixed
        } = req.body;

        const data = {
            productName: name.trim().toLowerCase(),
            productDescription: description,
            productSKU: sku,
            categoryId,
            productPrice: Number(price),
            productStatus: "ACTIVE",
            productUnit: unit,
            createdByUserId,
            productPriceFixed: priceFixed
        }

        const product = await createProduct(data, req.prisma);
        res.status(201).json({
            message: 'product registered successfully',
            product: {
                productId: product.productId,
                productName: product.productName,
                productDescription: product.productDescription,
                productSKU: product.productSKU,
                categoryId: product.categoryId,
                productPrice: product.productPrice,
                productStatus: product.productStatus,
                productUnit: product.productUnit,
                productPriceFixed: product.priceFixed
            }
        });
    } catch (error) {
        console.error("(products.controller.js): Error creatting products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get all products
export const getProductsController = async (req, res) => {
    try {
        const products = await getProducts(req.prisma);
        res.status(200).json(products)
    } catch (error) {
        console.error("(products.controller.js): Error getting products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
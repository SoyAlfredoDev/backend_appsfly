import { createProduct, getProducts, getProductWithAnalytics } from "../services/productsService.js";
import { serializeProductWithStock } from "../utils/productStockSerializer.js";

// Create a product
export const createProductController = async (req, res) => {
    try {
        const {
            name,
            description,
            sku,
            categoryId,
            price,
            unit,
            createdByUserId,
            priceFixed,
            allowZeroStock,
            productAllowZeroStock,
            initialStock,
        } = req.body;

        const allowZero =
            allowZeroStock === true ||
            allowZeroStock === "true" ||
            productAllowZeroStock === true ||
            productAllowZeroStock === "true";

        const data = {
            productName: name.trim().toLowerCase(),
            productDescription: description,
            productSKU: sku,
            categoryId,
            productPrice: Number(price),
            productStatus: "ACTIVE",
            productUnit: unit,
            createdByUserId,
            productPriceFixed: priceFixed,
            productAllowZeroStock: allowZero,
            initialStock,
        };

        const product = await createProduct(data, req.prisma);
        const serialized = serializeProductWithStock(product);

        res.status(201).json({
            message: "product registered successfully",
            product: {
                productId: serialized.productId,
                productName: serialized.productName,
                productDescription: serialized.productDescription,
                productSKU: serialized.productSKU,
                categoryId: serialized.categoryId,
                productPrice: serialized.productPrice,
                productStatus: serialized.productStatus,
                productUnit: serialized.productUnit,
                productPriceFixed: serialized.productPriceFixed,
                productAllowZeroStock: serialized.productAllowZeroStock,
                productStock: serialized.productStock,
                quantityOnHand: serialized.quantityOnHand,
            },
        });
    } catch (error) {
        console.error("(products.controller.js): Error creatting products:", error);
        if (error.code === "P2002") {
            return res.status(409).json({ message: "El SKU ya está registrado." });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all products
export const getProductsController = async (req, res) => {
    try {
        const products = await getProducts(req.prisma);
        res.status(200).json(products);
    } catch (error) {
        console.error("(products.controller.js): Error getting products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getProductViewController = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const product = await getProductWithAnalytics(id, req.prisma, page, limit);
        res.status(200).json(product);
    } catch (error) {
        console.error("(products.controller.js): Error getting Product View, error");
        res.status(500).json({ message: "Internal server error" });
    }
};

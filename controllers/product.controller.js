import {
    createProduct,
    getProducts,
    getProductWithAnalytics,
    updateProduct,
    getProductById,
} from "../services/productsService.js";
import { serializeProductWithStock } from "../utils/productStockSerializer.js";

function buildProductData(body) {
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
        productRequiresLabWork,
        requiresLabWork,
        initialStock,
        attributes,
        productStatus,
        codes,
    } = body;

    const allowZero =
        allowZeroStock === true ||
        allowZeroStock === "true" ||
        productAllowZeroStock === true ||
        productAllowZeroStock === "true";

    const requiresLab =
        productRequiresLabWork === true ||
        productRequiresLabWork === "true" ||
        requiresLabWork === true ||
        requiresLabWork === "true";

    return {
        ...(name != null ? { productName: String(name).trim().toLowerCase() } : {}),
        ...(description !== undefined ? { productDescription: description } : {}),
        ...(sku != null ? { productSKU: sku } : {}),
        ...(categoryId != null ? { categoryId } : {}),
        ...(price != null ? { productPrice: Number(price) } : {}),
        ...(unit != null ? { productUnit: unit } : {}),
        ...(createdByUserId != null ? { createdByUserId } : {}),
        ...(priceFixed !== undefined ? { productPriceFixed: priceFixed } : {}),
        ...(allowZeroStock !== undefined || productAllowZeroStock !== undefined
            ? { productAllowZeroStock: allowZero }
            : {}),
        ...(productRequiresLabWork !== undefined || requiresLabWork !== undefined
            ? { productRequiresLabWork: requiresLab }
            : {}),
        ...(productStatus != null ? { productStatus } : {}),
        ...(initialStock !== undefined ? { initialStock } : {}),
        attributes,
        ...(codes !== undefined ? { codes } : {}),
    };
}

function publicProduct(serialized) {
    return {
        productId: serialized.productId,
        productName: serialized.productName,
        productDescription: serialized.productDescription,
        productSKU: serialized.productSKU,
        categoryId: serialized.categoryId,
        category: serialized.category,
        productPrice: serialized.productPrice,
        productStatus: serialized.productStatus,
        productUnit: serialized.productUnit,
        productPriceFixed: serialized.productPriceFixed,
        productAllowZeroStock: serialized.productAllowZeroStock,
        productRequiresLabWork: serialized.productRequiresLabWork,
        productStock: serialized.productStock,
        quantityOnHand: serialized.quantityOnHand,
        attributes: serialized.attributes,
        attributeValues: serialized.attributeValues,
        codes: serialized.codes || [],
    };
}

export const createProductController = async (req, res) => {
    try {
        const data = buildProductData({
            ...req.body,
            productStatus: "ACTIVE",
            createdByUserId: req.body.createdByUserId || req.user?.payload?.id,
        });

        if (!data.productName || !data.productSKU || !data.categoryId) {
            return res.status(400).json({ message: "Nombre, SKU y categoría son obligatorios." });
        }

        const product = await createProduct(data, req.prisma);
        const serialized = serializeProductWithStock(product);

        res.status(201).json({
            message: "product registered successfully",
            product: publicProduct(serialized),
        });
    } catch (error) {
        console.error("(products.controller.js): Error creating products:", error);
        if (error.statusCode === 409 || error.code === "CODE_DUPLICATE") {
            return res.status(409).json({ message: error.message, code: error.code });
        }
        if (error.statusCode && error.statusCode < 500) {
            return res.status(error.statusCode).json({ message: error.message, code: error.code });
        }
        if (error.code === "P2002") {
            return res.status(409).json({ message: "El SKU o código ya está registrado." });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = buildProductData(req.body);
        delete data.initialStock;

        const product = await updateProduct(id, data, req.prisma);
        const serialized = serializeProductWithStock(product);
        res.status(200).json({
            message: "product updated successfully",
            product: publicProduct(serialized),
        });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) {
            console.error("(products.controller.js): Error updating product:", error);
        }
        if (error.code === "P2002" || error.code === "CODE_DUPLICATE") {
            return res.status(409).json({ message: error.message || "El SKU o código ya está registrado.", code: error.code });
        }
        res.status(status).json({ message: error.message || "Internal server error", code: error.code });
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        const product = await getProductById(req.params.id, req.prisma);
        if (!product) return res.status(404).json({ message: "Producto no encontrado." });
        res.status(200).json(serializeProductWithStock(product));
    } catch (error) {
        console.error("(products.controller.js): Error getting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getProductsController = async (req, res) => {
    try {
        const products = await getProducts(req.prisma, {
            page: req.query.page,
            limit: req.query.limit,
            q: req.query.q,
            categoryId: req.query.categoryId,
        });
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
        if (!product) return res.status(404).json({ message: "Producto no encontrado." });
        res.status(200).json(product);
    } catch (error) {
        console.error("(products.controller.js): Error getting Product View", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

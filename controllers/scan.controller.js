import {
    resolveCode,
    listCodesForEntity,
    deleteCode,
    SCAN_ENTITY,
} from "../services/scanCodesService.js";
import { serializeProductWithStock } from "../utils/productStockSerializer.js";

function sendError(res, error) {
    const status = error.statusCode ?? 500;
    if (status >= 500) {
        console.error("(scan.controller.js):", error);
    }
    return res.status(status).json({
        message: error.message || "Internal server error",
        code: error.code,
    });
}

function publicResolvedProduct(product) {
    if (!product) return null;
    const serialized = serializeProductWithStock(product);
    return {
        productId: serialized.productId,
        productName: serialized.productName,
        productSKU: serialized.productSKU,
        productPrice: serialized.productPrice,
        productPriceFixed: serialized.productPriceFixed,
        productUnit: serialized.productUnit,
        productStatus: serialized.productStatus,
        productAllowZeroStock: serialized.productAllowZeroStock,
        productRequiresLabWork: serialized.productRequiresLabWork,
        productStock: serialized.productStock,
        quantityOnHand: serialized.quantityOnHand,
        categoryId: serialized.categoryId,
        category: serialized.category,
        type: "PRODUCT",
    };
}

export const resolveScanCodeController = async (req, res) => {
    try {
        const code = req.query.code ?? req.query.q ?? "";
        const resolved = await resolveCode(code, req.prisma);
        if (!resolved) {
            return res.status(404).json({
                message: "Código no encontrado.",
                code: "CODE_NOT_FOUND",
            });
        }

        if (resolved.entityType === SCAN_ENTITY.PRODUCT && !resolved.product) {
            return res.status(404).json({
                message: "El código apunta a un producto eliminado.",
                code: "PRODUCT_MISSING",
            });
        }

        return res.status(200).json({
            entityType: resolved.entityType,
            entityId: resolved.entityId,
            codeType: resolved.scanCode?.codeType || null,
            codeValue: resolved.scanCode?.codeValue || String(code).trim(),
            product: publicResolvedProduct(resolved.product),
        });
    } catch (error) {
        return sendError(res, error);
    }
};

export const listProductCodesController = async (req, res) => {
    try {
        const codes = await listCodesForEntity(
            SCAN_ENTITY.PRODUCT,
            req.params.id,
            req.prisma,
        );
        res.status(200).json(codes);
    } catch (error) {
        return sendError(res, error);
    }
};

export const deleteScanCodeController = async (req, res) => {
    try {
        const result = await deleteCode(req.params.scanCodeId, req.prisma);
        res.status(200).json(result);
    } catch (error) {
        return sendError(res, error);
    }
};

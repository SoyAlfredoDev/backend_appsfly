import { getPublicSaleReceiptByToken } from "../services/publicSaleReceiptService.js";

export async function getPublicSaleReceiptController(req, res) {
    try {
        const { token } = req.params;
        const receipt = await getPublicSaleReceiptByToken(token);
        res.status(200).json({ receipt });
    } catch (error) {
        const status = error.statusCode || 500;
        if (status >= 500) {
            console.error("(publicSale.controller.js): Error loading public receipt:", error);
        }
        res.status(status).json({
            message: error.message || "No se pudo cargar el comprobante.",
            code: error.code,
        });
    }
}

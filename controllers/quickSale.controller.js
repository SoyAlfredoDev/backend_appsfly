import {
  QuickSaleError,
  createQuickSale,
  getQuickSaleBootstrap,
} from "../services/quickSaleService.js";
import { InsufficientStockError } from "../services/inventory/inventoryService.js";

function sendQuickSaleError(res, error) {
  const status = error.statusCode ?? error.status ?? 500;
  if (status >= 500) {
    console.error("(quickSale.controller.js):", error);
  }
  return res.status(status).json({
    message: error.message || "No se pudo registrar la venta rápida.",
    code: error.code || "QUICK_SALE_FAILED",
  });
}

export const getQuickSaleBootstrapController = async (req, res) => {
  try {
    const bootstrap = await getQuickSaleBootstrap(
      req.prisma,
      req.user.payload.id,
      req.tenantBusinessId,
    );
    return res.status(200).json(bootstrap);
  } catch (error) {
    return sendQuickSaleError(res, error);
  }
};

export const createQuickSaleController = async (req, res) => {
  try {
    const result = await createQuickSale({
      prisma: req.prisma,
      userId: req.user.payload.id,
      businessId: req.tenantBusinessId,
      body: req.body,
    });
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof QuickSaleError || error instanceof InsufficientStockError) {
      return sendQuickSaleError(res, error);
    }
    if (error?.code === "INSUFFICIENT_STOCK") {
      return sendQuickSaleError(res, error);
    }
    return sendQuickSaleError(res, error);
  }
};

import type { NextFunction, Request, Response } from "express";
import { GENERAL_BUSINESS_TYPE } from "../database/generalBusinessType.js";
import { isCreditSalesAllowed, isDeliveryControlEnabled } from "../businessSettingsService.js";
import {
  addGeneralSalePayment,
  createGeneralSale,
  GeneralSaleError,
  listGeneralReceivables,
  parseGeneralPayment,
  parseGeneralSale,
  prismaErrorCode,
} from "./generalSales.js";

export function requireGeneralBusiness(req: Request, res: Response, next: NextFunction) {
  if (req.tenantBusinessType !== GENERAL_BUSINESS_TYPE) {
    return res.status(403).json({
      code: "GENERAL_BUSINESS_REQUIRED",
      message: "Esta operación está disponible para Negocio general.",
    });
  }
  next();
}

export function excludeGeneralBusiness(req: Request, res: Response, next: NextFunction) {
  if (req.tenantBusinessType === GENERAL_BUSINESS_TYPE) {
    return res.status(403).json({
      code: "BUSINESS_OPERATION_UNAVAILABLE",
      message: "Esta operación no está disponible para Negocio general.",
    });
  }
  next();
}

function respondWithError(res: Response, error: unknown) {
  if (error instanceof GeneralSaleError) {
    return res.status(error.statusCode).json({ code: error.code, message: error.message });
  }
  if (prismaErrorCode(error) === "INSUFFICIENT_STOCK" && error instanceof Error) {
    return res.status(409).json({ code: "INSUFFICIENT_STOCK", message: error.message });
  }
  console.error("(generalSalesHttp):", error);
  return res.status(500).json({
    code: "GENERAL_SALES_FAILED",
    message: "No se pudo completar la operación. Intenta nuevamente.",
  });
}

function tenantContext(req: Request) {
  const { prisma, tenantBusinessId: businessId } = req;
  const userId = req.user?.payload?.id;
  if (!prisma || !businessId || !userId) {
    throw new GeneralSaleError(403, "TENANT_REQUIRED", "Selecciona el negocio para continuar.");
  }
  return { prisma, businessId, userId };
}

export async function createGeneralSaleController(req: Request, res: Response) {
  try {
    const { prisma, businessId, userId } = tenantContext(req);
    const input = parseGeneralSale(req.body);
    const [allowCredit, controlDelivery] = await Promise.all([
      isCreditSalesAllowed(businessId),
      isDeliveryControlEnabled(businessId),
    ]);
    const { sale, created } = await createGeneralSale({
      prisma,
      userId,
      input,
      allowCredit,
      controlDelivery,
    });
    return res.status(created ? 201 : 200).json({ sale });
  } catch (error) {
    return respondWithError(res, error);
  }
}

export async function generalPaymentController(req: Request, res: Response, next: NextFunction) {
  if (req.tenantBusinessType !== GENERAL_BUSINESS_TYPE) return next();
  try {
    const { prisma, userId } = tenantContext(req);
    const saleId: unknown = req.body?.saleId;
    if (typeof saleId !== "string" || !saleId.trim() || saleId.length > 100) {
      throw new GeneralSaleError(400, "INVALID_SALE_INPUT", "Selecciona una venta válida.");
    }
    const input = parseGeneralPayment(req.body);
    const { payment, created } = await addGeneralSalePayment(prisma, userId, saleId.trim(), input);
    return res.status(created ? 201 : 200).json({ payment });
  } catch (error) {
    return respondWithError(res, error);
  }
}

export async function generalReceivablesController(req: Request, res: Response) {
  try {
    const { prisma } = tenantContext(req);
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    if (!Number.isSafeInteger(page) || page < 1 || page > 1_000_000 || q.length > 120) {
      throw new GeneralSaleError(
        400,
        "INVALID_RECEIVABLES_FILTER",
        "Revisa el filtro de búsqueda.",
      );
    }
    return res.json(await listGeneralReceivables(prisma, page, q));
  } catch (error) {
    return respondWithError(res, error);
  }
}

import type { Request, Response, NextFunction } from "express";
import { generalPrisma } from "../../dbGeneral.js";
import type { PrismaClient } from "../../src/generated/general/index.js";
const general = generalPrisma as PrismaClient;

/** A tenant admin role alone does not authorize another tenant's payment ID. */
export async function requirePaymentTenant(req: Request, res: Response, next: NextFunction) {
  const id = String(req.params.paymentId || req.body?.subscriptionPaymentId || "");
  const request = req as Request & { tenantBusinessId?: string };
  const payment = await general.subscriptionPayment.findUnique({
    where: { subscriptionPaymentId: id },
  });
  if (!payment || payment.subscriptionBusinessId !== request.tenantBusinessId) {
    res.status(404).json({ message: "Pago no encontrado.", code: "PAYMENT_NOT_FOUND" });
    return;
  }
  next();
}

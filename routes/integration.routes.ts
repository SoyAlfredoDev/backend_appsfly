import { CustomerRutError } from "../services/customers/customerRut.js";
import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { Router, type RequestHandler } from "express";
import { generalPrisma } from "../dbGeneral.js";
import { getPrismaForBusinessId } from "../db.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { ensureTenantRole, requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";
import { currentPlanId } from "../services/billing/planAccessService.js";
import { getSubscriptionsByBusinessIdService } from "../services/subscriptionService.js";
import {
  executeOperation,
  hash,
  inputText,
  IntegrationError,
  object,
  scopes,
  type Scope,
} from "../services/integrations/operations.js";
import { GeneralSaleError, prismaErrorCode } from "../services/sales/generalSales.js";

const router = Router();
const management = "/integration-keys";
const publicFields = {
  id: true,
  name: true,
  scopes: true,
  lastUsedAt: true,
  createdAt: true,
  revokedAt: true,
} as const;

function handle(handler: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    res.set("Cache-Control", "private, no-store");
    try {
      await handler(req, res, next);
    } catch (error) {
      if (error instanceof GeneralSaleError) {
        if (error.statusCode === 429) res.set("Retry-After", "60");
        res.status(error.statusCode).json({ code: error.code, message: error.message });
      } else if (error instanceof CustomerRutError) {
        res.status(error.statusCode).json({
          code: error.code,
          message: error.message,
          customerIds: error.customers.map((customer) => customer.customerId),
        });
      } else if (
        error instanceof Error &&
        "code" in error &&
        (error.code === "DAY_CLOSED" ||
          error.code === "BLOQUEO_CIERRE_PENDIENTE" ||
          error.code === "INSUFFICIENT_STOCK")
      ) {
        res.status(409).json({
          code: error.code,
          message: error.message,
          fechaPendiente: "fechaPendiente" in error ? error.fechaPendiente : null,
        });
      } else {
        console.error("Integration request failed", prismaErrorCode(error));
        res.status(503).json({
          code: "INTEGRATION_UNAVAILABLE",
          message: "No se pudo completar la operación. Reintenta con la misma referencia.",
        });
      }
    }
  };
}

const admin = [authRequired, ensureTenantRole, requireTenantAdmin];
router.get(
  management,
  ...admin,
  handle(async (req, res) => {
    const keys = await generalPrisma.integrationKey.findMany({
      where: { businessId: req.tenantBusinessId! },
      select: publicFields,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    res.json({ keys });
  }),
);

router.post(
  management,
  ...admin,
  handle(async (req, res) => {
    const data = object(req.body);
    const name = inputText(data.name, 80);
    const selected = Array.isArray(data.scopes)
      ? scopes.filter((scope) => (data.scopes as unknown[]).includes(scope))
      : [];
    if (!Array.isArray(data.scopes) || !selected.length || selected.length !== data.scopes.length) {
      throw new IntegrationError(400, "INVALID_SCOPES", "Selecciona los permisos de la llave.");
    }
    const id = randomUUID();
    const secret = `afk_${id}.${randomBytes(32).toString("base64url")}`;
    const key = await generalPrisma.integrationKey.create({
      data: {
        id,
        name,
        scopes: [...selected],
        digest: hash(secret),
        businessId: req.tenantBusinessId!,
        createdBy: req.user!.payload!.id!,
      },
      select: publicFields,
    });
    res.status(201).json({ key, secret });
  }),
);

router.delete(
  `${management}/:id`,
  ...admin,
  handle(async (req, res) => {
    const { count } = await generalPrisma.integrationKey.updateMany({
      where: {
        id: inputText(req.params.id, 40),
        businessId: req.tenantBusinessId!,
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
    if (!count) throw new IntegrationError(404, "KEY_NOT_FOUND", "La llave activa no existe.");
    res.status(204).end();
  }),
);

function invalidKey(): never {
  throw new IntegrationError(401, "INVALID_API_KEY", "La llave no es válida o fue revocada.");
}

async function authorize(authorization: string | undefined, scope: Scope) {
  const match = /^Bearer (afk_([a-f0-9-]{36})\.[A-Za-z0-9_-]{43})$/i.exec(authorization ?? "");
  if (!match) invalidKey();
  const key = await generalPrisma.integrationKey.findUnique({
    where: { id: match[2] },
    include: {
      business: {
        select: {
          businessType: true,
          businessStatus: true,
          businessTimezone: true,
          businessAllowCreditSales: true,
          businessDeliveryControlEnabled: true,
        },
      },
    },
  });
  if (
    !key ||
    key.revokedAt ||
    !timingSafeEqual(Buffer.from(key.digest, "hex"), Buffer.from(hash(match[1]), "hex"))
  )
    invalidKey();
  if (!key.scopes.includes(scope)) {
    throw new IntegrationError(
      403,
      "SCOPE_REQUIRED",
      "La llave no tiene permiso para esta operación.",
    );
  }
  const now = new Date();
  const minute = new Date(Math.floor(now.getTime() / 60_000) * 60_000);
  const count = await generalPrisma.$executeRaw`
    UPDATE "IntegrationKey" SET "lastUsedAt" = ${now}, "windowStart" = ${minute},
      "windowCount" = CASE WHEN "windowStart" = ${minute} THEN "windowCount" + 1 ELSE 1 END
    WHERE "id" = ${key.id} AND "revokedAt" IS NULL
      AND ("windowStart" IS DISTINCT FROM ${minute} OR "windowCount" < 120)
  `;
  if (!count)
    throw new IntegrationError(
      429,
      "RATE_LIMITED",
      "Se alcanzó el límite de solicitudes de la llave.",
    );
  const membership = await generalPrisma.userBusiness.findUnique({
    where: {
      userBusinessUserId_userBusinessBusinessId: {
        userBusinessUserId: key.createdBy,
        userBusinessBusinessId: key.businessId,
      },
    },
    select: { userBusinessRole: true },
  });
  if (membership?.userBusinessRole !== "ADMIN") invalidKey();
  if (
    key.business.businessStatus !== "ACTIVE" ||
    !currentPlanId(await getSubscriptionsByBusinessIdService(key.businessId))
  ) {
    throw new IntegrationError(403, "BUSINESS_NOT_ACTIVE", "El negocio requiere acceso vigente.");
  }
  return key;
}

for (const kind of ["customers", "sales", "payments"] as const) {
  router.post(
    `/integrations/v1/${kind}`,
    handle(async (req, res) => {
      const key = await authorize(req.headers.authorization, `${kind}:write`);
      const prisma = await getPrismaForBusinessId(key.businessId);
      if (!prisma)
        throw new IntegrationError(503, "BUSINESS_UNAVAILABLE", "El negocio no está disponible.");
      const { result, created } = await executeOperation(
        {
          prisma,
          keyId: key.id,
          businessId: key.businessId,
          userId: key.createdBy,
          timezone: key.business.businessTimezone,
          businessType: key.business.businessType,
          allowCredit: key.business.businessAllowCreditSales,
          controlDelivery: key.business.businessDeliveryControlEnabled,
        },
        kind,
        req.body,
        key.scopes.includes("payments:write"),
      );
      res.status(created ? 201 : 200).json({ data: result, replayed: !created });
    }),
  );
}

export default router;

// middlewares/dbSelectorMiddleware.js
import { getPrismaForBusinessId } from "../db.js";
import { resolveTenantMembership } from "../libs/resolveTenantMembership.js";
import { getUserBusinessById } from "../services/userBusinessService.js";

export async function dbSelectorMiddleware(req, res, next) {
  try {
    const userId = req.user?.payload?.id;
    if (!userId) {
      return res.status(400).json({ error: "Falta el userId en la petición" });
    }

    const memberships = await getUserBusinessById(userId);
    const requestedBusinessId =
      req.headers["x-appsfly-business-id"] ||
      req.headers["x-tenant-business-id"];

    const resolved = resolveTenantMembership(memberships, requestedBusinessId);
    if (resolved.error === "NO_MEMBERSHIP") {
      return res.status(403).json({ error: "No tienes un negocio asociado" });
    }
    if (resolved.error === "FORBIDDEN_BUSINESS") {
      return res.status(403).json({
        error: "No tienes acceso a ese negocio.",
        code: "TENANT_FORBIDDEN",
      });
    }

    const membership = resolved.membership;
    req.tenantBusinessId = membership.userBusinessBusinessId;
    req.tenantRole = membership.userBusinessRole;

    const prisma = await getPrismaForBusinessId(req.tenantBusinessId);
    if (!prisma) {
      return res.status(500).json({ error: "No se pudo asignar la base de datos" });
    }
    req.prisma = prisma;
    next();
  } catch (error) {
    console.error("(dbSelectorMiddleware): Error asignando Prisma:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

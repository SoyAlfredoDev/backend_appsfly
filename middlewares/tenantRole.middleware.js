import { getUserBusinessById } from "../services/userBusinessService.js";
import { resolveTenantMembership } from "../libs/resolveTenantMembership.js";

/**
 * Resuelve rol del tenant desde GeneralDB cuando dbSelectorMiddleware no corrió.
 */
export async function ensureTenantRole(req, res, next) {
  if (req.tenantRole) return next();

  try {
    const userId = req.user?.payload?.id;
    if (!userId) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const memberships = await getUserBusinessById(userId);
    if (!memberships?.length) {
      return res.status(403).json({ error: "No tienes un negocio asociado" });
    }

    const requestedBusinessId =
      req.headers["x-appsfly-business-id"] ||
      req.headers["x-tenant-business-id"] ||
      req.params?.businessId ||
      req.body?.subscriptionBusinessId;
    const resolved = resolveTenantMembership(memberships, requestedBusinessId);
    if (resolved.error === "FORBIDDEN_BUSINESS") {
      return res.status(403).json({
        error: "No tienes acceso a ese negocio.",
        code: "TENANT_FORBIDDEN",
      });
    }
    if (!resolved.membership) {
      return res.status(403).json({ error: "No tienes un negocio asociado" });
    }

    const membership = resolved.membership;
    req.tenantBusinessId = membership.userBusinessBusinessId;
    req.tenantRole = membership.userBusinessRole;
    next();
  } catch (error) {
    console.error("(ensureTenantRole):", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

/**
 * Solo ADMIN del negocio (UserBusiness). Requiere req.tenantRole (dbSelector o ensureTenantRole).
 */
export function requireTenantAdmin(req, res, next) {
  if (req.tenantRole !== "ADMIN") {
    return res.status(403).json({
      error: "No tienes permisos de administrador para esta acción.",
      code: "TENANT_FORBIDDEN",
    });
  }
  next();
}

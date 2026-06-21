import { getUserBusinessById } from "../services/userBusinessService.js";

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

        const membership = memberships[0];
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

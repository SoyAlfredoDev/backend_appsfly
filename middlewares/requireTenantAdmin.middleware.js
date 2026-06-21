/**
 * Solo usuarios con rol ADMIN en su negocio (UserBusiness), no super-admins de plataforma.
 * Requiere que dbSelectorMiddleware haya ejecutado antes (req.tenantRole).
 */
export function requireTenantAdmin(req, res, next) {
    if (req.tenantRole !== "ADMIN") {
        return res.status(403).json({
            error: "Solo los administradores del negocio pueden usar el asistente.",
        });
    }
    next();
}

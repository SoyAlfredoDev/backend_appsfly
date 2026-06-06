import userSuperAdmin from "../superAdmin.js";

export function superAdminRequired(req, res, next) {
    const userId = req.user?.payload?.id;
    if (!userId || !userSuperAdmin.includes(userId)) {
        return res.status(403).json({ error: "Acceso denegado. Se requiere rol de super administrador." });
    }
    next();
}

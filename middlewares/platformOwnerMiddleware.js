import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";
import userSuperAdmin from "../superAdmin.js";
import { getPlatformOwnerEmail } from "../platformOwner.js";

const general = new PrismaGeneral();

export async function isUserPlatformOwner(userId) {
    if (!userId || !userSuperAdmin.includes(userId)) {
        return false;
    }

    const user = await general.user.findUnique({
        where: { userId },
        select: { userEmail: true },
    });

    const email = user?.userEmail?.trim().toLowerCase();
    return email === getPlatformOwnerEmail();
}

export async function platformOwnerRequired(req, res, next) {
    try {
        const userId = req.user?.payload?.id;
        const allowed = await isUserPlatformOwner(userId);

        if (!allowed) {
            return res.status(403).json({
                error: "Acceso denegado. Solo el propietario autorizado de la plataforma puede usar esta función.",
            });
        }

        req.platformOwner = { userId, email: getPlatformOwnerEmail() };
        next();
    } catch (error) {
        console.error("(platformOwnerMiddleware):", error);
        return res.status(500).json({ error: "Error al verificar permisos." });
    }
}

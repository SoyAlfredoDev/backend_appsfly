// middlewares/dbSelectorMiddleware.js
import { getPrismaForBusinessId } from "../db.js";
import { getUserBusinessById } from "../services/userBusinessService.js";

export async function dbSelectorMiddleware(req, res, next) {
  try {
    const userId = req.user?.payload?.id;
    if (!userId) {
      return res.status(400).json({ error: "Falta el userId en la petición" });
    }

    const memberships = await getUserBusinessById(userId);
    if (!memberships?.length) {
      return res.status(403).json({ error: "No tienes un negocio asociado" });
    }

    const membership = memberships[0];
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

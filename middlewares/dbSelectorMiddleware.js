// middlewares/dbSelectorMiddleware.js
import { getPrismaForBusiness } from "../db.js";

export async function dbSelectorMiddleware(req, res, next) {
  try {
    const userId = req.user?.payload?.id;
    if (!userId) {
      return res.status(400).json({ error: "Falta el userId en la petición" });
    }
    // Asigna el Prisma correspondiente al negocio del usuario
    const prisma = await getPrismaForBusiness(userId);
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

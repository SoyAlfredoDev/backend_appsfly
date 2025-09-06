// middlewares/dbMiddleware.js
import { getPrismaForBusiness } from "../db.js";

export function dbSelectorMiddleware(req, res, next) {
  // 👇 de dónde obtienes el negocio:
  // puede ser de un header, un query param, un JWT, o un subdominio
  const business = 'negocio1' //req.headers["x-business"];

  if (!business) {
    return res.status(400).json({ error: "Falta el negocio en la petición" });
  }

  try {
    // 👇 aquí asignamos Prisma con la DB correcta
    req.prisma = getPrismaForBusiness(business);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
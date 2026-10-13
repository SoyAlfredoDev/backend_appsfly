import { Router, type Request } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { createRateLimiter } from "../services/auth/rateLimit.js";
import { createSignedUpload, uploadInput } from "../services/media/signedUpload.js";

type TenantRequest = Request & {
  tenantBusinessId?: string;
  tenantRole?: string;
  user?: { payload?: { id?: string } };
};
const router = Router();
const uploadRateLimit = createRateLimiter({ windowMs: 60_000, max: 60 });

router.post(
  "/media/upload-signature",
  authRequired,
  uploadRateLimit,
  dbSelectorMiddleware,
  (req: TenantRequest, res) => {
    const parsed = uploadInput.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({
        code: "MEDIA_UPLOAD_INVALID",
        error: "Selecciona una imagen válida de hasta 10 MB y un destino permitido.",
      });
    const businessId = req.tenantBusinessId;
    const userId = req.user?.payload?.id;
    if (!businessId || !userId)
      return res
        .status(403)
        .json({ code: "TENANT_FORBIDDEN", error: "No se pudo autorizar el negocio." });
    if (
      ["ticket_receipts", "business_logos"].includes(parsed.data.assetType) &&
      req.tenantRole !== "ADMIN"
    ) {
      return res.status(403).json({
        code: "TENANT_FORBIDDEN",
        error: "Se requieren permisos de administrador para este archivo.",
      });
    }
    try {
      const result = createSignedUpload(businessId, userId, parsed.data);
      if (!result)
        return res.status(503).json({
          code: "MEDIA_UPLOAD_NOT_CONFIGURED",
          error: "La subida de imágenes no está configurada en el servidor.",
        });
      res.set("Cache-Control", "no-store");
      return res.status(200).json(result);
    } catch {
      return res.status(500).json({
        code: "MEDIA_UPLOAD_SIGNATURE_FAILED",
        error: "No se pudo autorizar la subida de la imagen.",
      });
    }
  },
);

export default router;

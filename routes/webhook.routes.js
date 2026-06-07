import { Router } from "express";
import { mercadoPagoWebhookController } from "../controllers/webhook.controller.js";

const router = Router();

/** IPN / Webhooks Mercado Pago Chile — GeneralDB (suscripciones SaaS) */
router.post("/webhooks/mercadopago", mercadoPagoWebhookController);

/** Alias legacy — misma lógica, compatibilidad con notification_url previas */
router.post("/subscriptions/mercadopago/webhook", mercadoPagoWebhookController);

export default router;

import type { Request, Response } from "express";
import {
  unsubscribeNewsletterSubscriber,
  verifyNewsletterUnsubscribeToken,
} from "../services/adminEmailCampaign/campaignNewsletterConsent.js";

function renderPage(res: Response, message: string, form = false): Response {
  return res.type("html").send(`<!DOCTYPE html>
<html lang="es">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Suscripción a novedades de AppsFly</title>
<h1>Suscripción a novedades de AppsFly</h1>
<p>${message}</p>
${
  form
    ? '<form method="post"><input type="hidden" name="List-Unsubscribe" value="One-Click"><button type="submit">Cancelar suscripción</button></form>'
    : ""
}
</html>`);
}

async function hasOneClickConfirmation(req: Request): Promise<boolean> {
  if (!req.is("multipart/form-data")) return req.body?.["List-Unsubscribe"] === "One-Click";
  const contentType = req.get("content-type");
  if (!contentType || !Buffer.isBuffer(req.body)) return false;
  try {
    const body = new globalThis.Response(Uint8Array.from(req.body), {
      headers: { "content-type": contentType },
    });
    const fields = await body.formData();
    return fields.get("List-Unsubscribe") === "One-Click";
  } catch {
    return false;
  }
}

export async function newsletterUnsubscribeController(
  req: Request<{ token: string }>,
  res: Response,
): Promise<Response> {
  res.set("Cache-Control", "no-store");
  res.set("Referrer-Policy", "no-referrer");
  try {
    const id = verifyNewsletterUnsubscribeToken(req.params.token);
    if (!id) return renderPage(res.status(400), "Este enlace de baja no es válido.");
    if (req.method === "GET") {
      return renderPage(res, "Confirma que quieres dejar de recibir nuestras novedades.", true);
    }
    if (!(await hasOneClickConfirmation(req))) {
      return renderPage(res.status(400), "No se recibió una confirmación de baja válida.");
    }
    await unsubscribeNewsletterSubscriber(id);
    return renderPage(res, "Tu dirección quedó dada de baja de las novedades de AppsFly.");
  } catch {
    return renderPage(
      res.status(503),
      "Por ahora no podemos procesar tu baja. Inténtalo de nuevo.",
    );
  }
}

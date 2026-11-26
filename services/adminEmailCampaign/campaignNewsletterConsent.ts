import { createHmac, timingSafeEqual } from "node:crypto";
import { generalPrisma as general } from "../../dbGeneral.js";
import { escapeHtml, getBackendBaseUrl } from "../../emails/shared/layout.js";

const subscriberIdPattern = /^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i;

export function normalizeMarketingEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;
  const normalized = email.trim().toLowerCase();
  return normalized.length <= 254 && /^[^\s<>@,]+@[^\s<>@,]+\.[^\s<>@,]+$/.test(normalized)
    ? normalized
    : null;
}

function signSubscriberId(id: string): Buffer {
  const secret = process.env.TOKEN_SECRET?.trim();
  if (!secret) throw new Error("TOKEN_SECRET is required");
  return createHmac("sha256", secret).update("newsletter-unsubscribe:").update(id).digest();
}

export function newsletterUnsubscribeUrl(id: string): string {
  const signature = signSubscriberId(id).toString("base64url");
  return `${getBackendBaseUrl()}/api/newsletter/unsubscribe/${id}.${signature}`;
}

export function verifyNewsletterUnsubscribeToken(token: string): string | null {
  const [id, signature, extra] = token.split(".");
  if (extra !== undefined || !subscriberIdPattern.test(id) || !/^[a-z\d_-]{43}$/i.test(signature)) {
    return null;
  }

  const expected = signSubscriberId(id);
  const actual = Buffer.from(signature, "base64url");
  return actual.length === expected.length && timingSafeEqual(actual, expected) ? id : null;
}

export async function unsubscribeNewsletterSubscriber(id: string): Promise<void> {
  // Delete all legacy duplicate enrollments for the address in the same statement.
  await general.$executeRaw`
    DELETE FROM "newsletterSubscriber"
    WHERE lower(trim(email)) = (
      SELECT lower(trim(email)) FROM "newsletterSubscriber" WHERE "newsletterSubscriberId" = ${id}
    )
  `;
}

export async function listCampaignSuppressions({ includesProspectOptOuts = true } = {}): Promise<
  Set<string>
> {
  const rows: { email: string }[] = await general.$queryRaw`
    SELECT lower(trim(email)) AS email FROM "PlatformEmailProspect"
      WHERE ${includesProspectOptOuts} AND (status = 'UNSUBSCRIBED' OR "unsubscribedAt" IS NOT NULL)
    UNION
    SELECT lower(trim("recipientEmail")) AS email FROM "PlatformEmailCampaignRecipient"
      WHERE "deliveryStatus" = 'BOUNCED'
  `;
  return new Set(rows.map(({ email }) => email));
}

export async function listNewsletterConsent(): Promise<Map<string, string>> {
  const rows = await general.newsletterSubscriber.findMany({
    select: { newsletterSubscriberId: true, email: true },
    orderBy: { createdAt: "asc" },
  });
  const consent = new Map<string, string>();
  for (const row of rows) {
    const email = normalizeMarketingEmail(row.email);
    if (email && !consent.has(email)) consent.set(email, row.newsletterSubscriberId);
  }
  return consent;
}

export async function canDeliverCampaignEmail(
  email: string,
  requiresConsent: boolean,
): Promise<boolean> {
  const [result] = await general.$queryRaw<{ allowed: boolean }[]>`
    SELECT (
      (
        NOT ${requiresConsent} OR EXISTS (
          SELECT 1 FROM "newsletterSubscriber" WHERE lower(trim(email)) = ${email}
        )
      )
      AND NOT EXISTS (
        SELECT 1 FROM "PlatformEmailCampaignRecipient"
        WHERE "deliveryStatus" = 'BOUNCED' AND lower(trim("recipientEmail")) = ${email}
      )
      AND (
        NOT ${requiresConsent} OR NOT EXISTS (
          SELECT 1 FROM "PlatformEmailProspect" WHERE lower(trim(email)) = ${email}
            AND (status = 'UNSUBSCRIBED' OR "unsubscribedAt" IS NOT NULL)
        )
      )
    ) AS allowed
  `;
  return result?.allowed === true;
}

export function addNewsletterUnsubscribe(
  html: string,
  text: string,
  unsubscribeUrl?: string | null,
) {
  if (!unsubscribeUrl) return { html, text, headers: undefined };
  const notice =
    "Recibes este correo porque te suscribiste a las novedades de AppsFly. Tecnología y Servicios AppsFly SpA, Huérfanos 779, depto. 705, Santiago.";
  const footer = `<p style="font-size:13px;color:#475569;text-align:center;padding:12px 20px">${notice} <a href="${escapeHtml(unsubscribeUrl)}">Cancelar suscripción</a>.</p>`;
  return {
    html: /<\/body\s*>/i.test(html)
      ? html.replace(/<\/body\s*>/i, () => `${footer}</body>`)
      : html + footer,
    text: `${text}\n\n${notice}\nCancelar suscripción: ${unsubscribeUrl}`,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  };
}

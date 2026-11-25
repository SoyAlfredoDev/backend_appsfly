import { createHmac, timingSafeEqual } from "node:crypto";

const LINK_LIFETIME_SECONDS = 180 * 24 * 60 * 60;
const TOKEN_PATTERN = /^([A-Za-z0-9_-]{1,100})\.(\d{1,11})\.([A-Za-z0-9_-]{43})$/;

function mac(purpose: string, ...parts: string[]) {
  const secret = process.env.TOKEN_SECRET?.trim();
  if (!secret) throw new Error("TOKEN_SECRET is required");
  return createHmac("sha256", secret).update(JSON.stringify([purpose, ...parts]));
}

export function createAppointmentManagementToken(
  businessId: string,
  appointmentId: string,
  now = Date.now(),
): string {
  const expires = String(Math.floor(now / 1000) + LINK_LIFETIME_SECONDS);
  const signature = mac("appointment-management-v1", businessId, appointmentId, expires).digest(
    "base64url",
  );
  return `${appointmentId}.${expires}.${signature}`;
}

export function appointmentManagementId(
  businessId: string,
  authorization: string | undefined,
  now = Date.now(),
): string | null {
  const match = authorization?.match(/^Bearer ([^\s]+)$/i)?.[1].match(TOKEN_PATTERN);
  if (!match || Number(match[2]) <= Math.floor(now / 1000)) return null;
  const [, appointmentId, expires, signature] = match;
  const expected = mac("appointment-management-v1", businessId, appointmentId, expires).digest(
    "base64url",
  );
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) ? appointmentId : null;
}

export function appointmentIdForRequest(businessId: string, requestId: string): string {
  const bytes = mac("appointment-request-v1", businessId, requestId).digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x80;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join("-");
}

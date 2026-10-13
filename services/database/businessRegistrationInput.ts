import { randomUUID } from "node:crypto";

const fields = [
  "businessName",
  "businessType",
  "businessDocumentType",
  "businessDocumentNumber",
  "businessEmail",
  "businessPhoneNumber",
  "businessCodePhoneNumber",
  "businessCountry",
  "businessCodeWhatsappNumber",
  "businessWhatsappNumber",
  "businessEntity",
  "businessTimezone",
] as const;

/** Do not pass Prisma nested writes, tenant IDs or control-plane state from HTTP. */
export function businessRegistrationInput(body: Record<string, unknown>) {
  const data: Record<string, unknown> = { businessId: randomUUID() };
  for (const field of fields) {
    if (typeof body[field] === "string") data[field] = body[field];
  }
  return data;
}

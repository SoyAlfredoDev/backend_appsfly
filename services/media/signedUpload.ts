import { randomUUID } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const uploadInput = z
  .object({
    assetType: z.enum([
      "customer_profiles",
      "sale_receipts",
      "ticket_receipts",
      "tickets_support",
      "business_logos",
      "appointment_gallery",
      "prescription_images",
    ]),
    contentType: z.enum([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
      "image/heic",
      "image/heif",
    ]),
    fileSize: z.number().int().positive().max(MAX_IMAGE_BYTES),
  })
  .strict();

export function createSignedUpload(
  businessId: string,
  userId: string,
  input: z.infer<typeof uploadInput>,
) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (!cloudName || !apiKey || !apiSecret) return null;
  const params = {
    timestamp: Math.floor(Date.now() / 1000),
    folder: `tenants/${businessId}/${input.assetType}`,
    public_id: randomUUID(),
    overwrite: false,
    allowed_formats: "jpg,jpeg,png,webp,gif,avif,heic,heif",
    context: `businessId=${businessId}|userId=${userId}`,
  };
  return {
    cloudName,
    apiKey,
    params,
    signature: cloudinary.utils.api_sign_request(params, apiSecret),
    maxFileBytes: MAX_IMAGE_BYTES,
  };
}

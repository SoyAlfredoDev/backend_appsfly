import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { getAuthEncryptionKey } from "../config/authEnv.js";

const ALGO = "aes-256-gcm";

function deriveKey(secret) {
    return createHash("sha256").update(secret).digest();
}

/**
 * Cifra credenciales por empresa antes de persistir en generalDB.
 * Requiere AUTH_CREDENTIALS_ENCRYPTION_KEY en producción.
 */
export function encryptCredential(plainText) {
    const text = String(plainText ?? "").trim();
    if (!text) return null;

    const secret = getAuthEncryptionKey();
    if (!secret) {
        return text;
    }

    const iv = randomBytes(12);
    const key = deriveKey(secret);
    const cipher = createCipheriv(ALGO, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return `enc:${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptCredential(stored) {
    const value = String(stored ?? "").trim();
    if (!value) return null;
    if (!value.startsWith("enc:")) return value;

    const secret = getAuthEncryptionKey();
    if (!secret) {
        throw new Error("AUTH_DECRYPTION_KEY_MISSING");
    }

    const [, ivHex, tagHex, dataHex] = value.split(":");
    const key = deriveKey(secret);
    const decipher = createDecipheriv(ALGO, key, Buffer.from(ivHex, "hex"));
    decipher.setAuthTag(Buffer.from(tagHex, "hex"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(dataHex, "hex")),
        decipher.final(),
    ]);
    return decrypted.toString("utf8");
}

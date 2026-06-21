import crypto from "crypto";
import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";

const general = new PrismaGeneral();

const MAX_IMPORT_ROWS = 2000;
const MAX_ERROR_SAMPLES = 100;

export const PROSPECT_IMPORT_TEMPLATE_CSV = [
    "email,nombre,empresa,notas",
    "contacto@empresa.cl,Juan,Óptica Central,Opcional",
    "otro@negocio.cl,Maria,Retail Sur,",
].join("\n");

export const SKIPPED_REASON_LABELS = {
    INVALID_EMAIL: "Correo inválido",
    DUPLICATE_IN_FILE: "Duplicado en el archivo",
    ALREADY_REGISTERED_USER: "Ya es usuario registrado en AppsFly",
    ALREADY_EXISTS: "Ya está en la lista de prospectos",
    ALREADY_UNSUBSCRIBED: "Está dado de baja (no se reimporta)",
    ALREADY_CONVERTED: "Ya se registró como usuario AppsFly",
};

function normalizeEmail(email) {
    return String(email ?? "").trim().toLowerCase();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function splitCsvLine(line) {
    const trimmed = String(line ?? "").trim();
    if (!trimmed) return [];
    const parts = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < trimmed.length; i += 1) {
        const ch = trimmed[i];
        if (ch === '"') {
            inQuotes = !inQuotes;
            continue;
        }
        if (ch === "," && !inQuotes) {
            parts.push(current.trim());
            current = "";
            continue;
        }
        current += ch;
    }
    parts.push(current.trim());
    return parts;
}

function isHeaderRow(parts) {
    const first = normalizeEmail(parts[0]);
    return first === "email" || first === "correo" || first.includes("mail");
}

function recordFromParts(parts) {
    return {
        email: parts[0],
        firstName: parts[1] || null,
        companyName: parts[2] || null,
        notes: parts[3] || null,
    };
}

function recordFromObject(obj) {
    return {
        email: obj.email ?? obj.correo ?? obj.Email ?? "",
        firstName: obj.firstName ?? obj.nombre ?? obj.Nombre ?? null,
        lastName: obj.lastName ?? obj.apellido ?? null,
        companyName: obj.companyName ?? obj.empresa ?? obj.Empresa ?? null,
        notes: obj.notes ?? obj.notas ?? null,
    };
}

/**
 * Convierte texto CSV, líneas o array de objetos a registros normalizados.
 */
export function parseProspectImportInput(input = {}) {
    const records = [];

    if (Array.isArray(input.rows)) {
        for (const row of input.rows) {
            if (typeof row === "string") {
                const parts = splitCsvLine(row);
                if (!parts.length) continue;
                if (isHeaderRow(parts)) continue;
                records.push(recordFromParts(parts));
            } else if (row && typeof row === "object") {
                records.push(recordFromObject(row));
            }
        }
    }

    const text = input.text ?? input.csv ?? "";
    if (text && records.length === 0) {
        const lines = String(text).split(/\r?\n/);
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) continue;
            const parts = splitCsvLine(trimmed);
            if (!parts.length) continue;
            if (isHeaderRow(parts)) continue;
            records.push(recordFromParts(parts));
        }
    }

    if (Array.isArray(input.lines) && records.length === 0) {
        for (const line of input.lines) {
            const trimmed = String(line ?? "").trim();
            if (!trimmed) continue;
            const parts = splitCsvLine(trimmed);
            if (!parts.length) continue;
            if (isHeaderRow(parts)) continue;
            records.push(recordFromParts(parts));
        }
    }

    return records.slice(0, MAX_IMPORT_ROWS);
}

function emptyReport() {
    return {
        totalRows: 0,
        created: 0,
        skipped: 0,
        truncated: false,
        breakdown: {
            invalidEmail: 0,
            duplicateInFile: 0,
            alreadyProspect: 0,
            alreadyRegisteredUser: 0,
            alreadyUnsubscribed: 0,
            alreadyConverted: 0,
        },
        errors: [],
    };
}

export async function bulkImportEmailProspects(input = {}, { source = "import" } = {}) {
    const rawRecords = parseProspectImportInput(input);
    const report = emptyReport();

    if (input.rawCount && input.rawCount > MAX_IMPORT_ROWS) {
        report.truncated = true;
    }

    if (!rawRecords.length) {
        return report;
    }

    const users = await general.user.findMany({ select: { userEmail: true } });
    const registeredEmails = new Set(
        users.map((u) => normalizeEmail(u.userEmail)).filter(Boolean),
    );

    const prospects = await general.platformEmailProspect.findMany({
        select: {
            prospectId: true,
            email: true,
            status: true,
        },
    });
    const prospectByEmail = new Map(
        prospects.map((p) => [normalizeEmail(p.email), p]),
    );

    const seenInFile = new Set();

    for (const raw of rawRecords) {
        report.totalRows += 1;
        const email = normalizeEmail(raw.email);
        const lineLabel = email || String(raw.email ?? "").trim() || `fila ${report.totalRows}`;

        if (!isValidEmail(email)) {
            report.breakdown.invalidEmail += 1;
            report.skipped += 1;
            if (report.errors.length < MAX_ERROR_SAMPLES) {
                report.errors.push({
                    email: lineLabel,
                    reason: "INVALID_EMAIL",
                    message: SKIPPED_REASON_LABELS.INVALID_EMAIL,
                });
            }
            continue;
        }

        if (seenInFile.has(email)) {
            report.breakdown.duplicateInFile += 1;
            report.skipped += 1;
            if (report.errors.length < MAX_ERROR_SAMPLES) {
                report.errors.push({
                    email,
                    reason: "DUPLICATE_IN_FILE",
                    message: SKIPPED_REASON_LABELS.DUPLICATE_IN_FILE,
                });
            }
            continue;
        }
        seenInFile.add(email);

        if (registeredEmails.has(email)) {
            report.breakdown.alreadyRegisteredUser += 1;
            report.skipped += 1;
            if (report.errors.length < MAX_ERROR_SAMPLES) {
                report.errors.push({
                    email,
                    reason: "ALREADY_REGISTERED_USER",
                    message: SKIPPED_REASON_LABELS.ALREADY_REGISTERED_USER,
                });
            }
            continue;
        }

        const existing = prospectByEmail.get(email);
        if (existing) {
            if (existing.status === "CONVERTED") {
                report.breakdown.alreadyConverted += 1;
                if (report.errors.length < MAX_ERROR_SAMPLES) {
                    report.errors.push({
                        email,
                        reason: "ALREADY_CONVERTED",
                        message: SKIPPED_REASON_LABELS.ALREADY_CONVERTED,
                    });
                }
            } else if (existing.status === "UNSUBSCRIBED") {
                report.breakdown.alreadyUnsubscribed += 1;
                if (report.errors.length < MAX_ERROR_SAMPLES) {
                    report.errors.push({
                        email,
                        reason: "ALREADY_UNSUBSCRIBED",
                        message: SKIPPED_REASON_LABELS.ALREADY_UNSUBSCRIBED,
                    });
                }
            } else {
                report.breakdown.alreadyProspect += 1;
                if (report.errors.length < MAX_ERROR_SAMPLES) {
                    report.errors.push({
                        email,
                        reason: "ALREADY_EXISTS",
                        message: SKIPPED_REASON_LABELS.ALREADY_EXISTS,
                    });
                }
            }
            report.skipped += 1;
            continue;
        }

        const created = await general.platformEmailProspect.create({
            data: {
                email,
                firstName: raw.firstName?.trim() || null,
                lastName: raw.lastName?.trim() || null,
                companyName: raw.companyName?.trim() || null,
                notes: raw.notes?.trim() || null,
                source: source?.trim() || "import",
                unsubscribeToken: crypto.randomUUID(),
            },
        });

        prospectByEmail.set(email, created);
        report.created += 1;
    }

    return report;
}

export function buildProspectImportTemplateCsv() {
    return `${PROSPECT_IMPORT_TEMPLATE_CSV}\n`;
}

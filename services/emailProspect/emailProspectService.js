import crypto from "crypto";
import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { getFrontendBaseUrl } from "../../emails/shared/layout.js";
import { getProspectConversionStats } from "./emailProspectConversionService.js";

const general = new PrismaGeneral();

function normalizeEmail(email) {
    return String(email ?? "").trim().toLowerCase();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function buildProspectUnsubscribeUrl(token) {
    return `${getFrontendBaseUrl()}/prospect-unsubscribe/${token}`;
}

export async function listEmailProspects({ status, search, limit = 500 } = {}) {
    const where = {};
    if (status) where.status = status;
    if (search?.trim()) {
        const q = search.trim();
        where.OR = [
            { email: { contains: q, mode: "insensitive" } },
            { firstName: { contains: q, mode: "insensitive" } },
            { lastName: { contains: q, mode: "insensitive" } },
            { companyName: { contains: q, mode: "insensitive" } },
        ];
    }

    const rows = await general.platformEmailProspect.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: Math.min(Number(limit) || 500, 2000),
    });

    return rows.map((row) => ({
        ...row,
        unsubscribeUrl: buildProspectUnsubscribeUrl(row.unsubscribeToken),
    }));
}

export async function getEmailProspectStats() {
    return getProspectConversionStats();
}

export async function createEmailProspect(data) {
    const email = normalizeEmail(data.email);
    if (!isValidEmail(email)) {
        throw new Error("INVALID_EMAIL");
    }

    const existingUser = await general.user.findFirst({
        where: { userEmail: { equals: email, mode: "insensitive" } },
        select: { userId: true },
    });
    if (existingUser) {
        throw new Error("ALREADY_REGISTERED_USER");
    }

    const existing = await general.platformEmailProspect.findUnique({
        where: { email },
    });

    const patch = {
        firstName: data.firstName?.trim() || null,
        lastName: data.lastName?.trim() || null,
        companyName: data.companyName?.trim() || null,
        notes: data.notes?.trim() || null,
    };

    if (existing) {
        if (existing.status === "CONVERTED") {
            throw new Error("ALREADY_CONVERTED");
        }
        if (existing.status === "UNSUBSCRIBED") {
            return general.platformEmailProspect.update({
                where: { prospectId: existing.prospectId },
                data: {
                    ...patch,
                    status: "ACTIVE",
                    unsubscribedAt: null,
                    unsubscribeToken: crypto.randomUUID(),
                    source: data.source?.trim() || existing.source || "manual",
                },
            });
        }
        // Activo: actualiza datos opcionales en lugar de fallar en silencio
        return general.platformEmailProspect.update({
            where: { prospectId: existing.prospectId },
            data: {
                firstName: patch.firstName ?? existing.firstName,
                lastName: patch.lastName ?? existing.lastName,
                companyName: patch.companyName ?? existing.companyName,
                notes: patch.notes ?? existing.notes,
            },
        });
    }

    return general.platformEmailProspect.create({
        data: {
            email,
            ...patch,
            source: data.source?.trim() || "manual",
            unsubscribeToken: crypto.randomUUID(),
        },
    });
}

export {
    bulkImportEmailProspects,
    buildProspectImportTemplateCsv,
    SKIPPED_REASON_LABELS,
    parseProspectImportInput,
} from "./emailProspectImportService.js";

export async function resubscribeEmailProspect(prospectId) {
    return general.platformEmailProspect.update({
        where: { prospectId },
        data: {
            status: "ACTIVE",
            unsubscribedAt: null,
            unsubscribeToken: crypto.randomUUID(),
        },
    });
}

export async function deleteEmailProspect(prospectId) {
    return general.platformEmailProspect.delete({ where: { prospectId } });
}

export async function unsubscribeEmailProspectByToken(token) {
    const prospect = await general.platformEmailProspect.findUnique({
        where: { unsubscribeToken: token },
    });
    if (!prospect) {
        throw new Error("NOT_FOUND");
    }
    if (prospect.status === "UNSUBSCRIBED") {
        return { alreadyUnsubscribed: true, email: prospect.email };
    }

    await general.platformEmailProspect.update({
        where: { prospectId: prospect.prospectId },
        data: {
            status: "UNSUBSCRIBED",
            unsubscribedAt: new Date(),
        },
    });

    return { alreadyUnsubscribed: false, email: prospect.email };
}

export async function getEmailProspectByToken(token) {
    return general.platformEmailProspect.findUnique({
        where: { unsubscribeToken: token },
        select: {
            prospectId: true,
            email: true,
            status: true,
            unsubscribedAt: true,
        },
    });
}

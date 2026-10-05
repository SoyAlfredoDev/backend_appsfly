import { generalPrisma as general } from "../../dbGeneral.js";
import { getPrismaForBusinessId } from "../../db.js";
import { resolveBusinessTimezone } from "../../libs/businessTimezone.js";
import { getFrontendBaseUrl } from "../../emails/shared/layout.js";
import { hasAppointmentsPlan } from "./appointmentPolicy.js";



function isSubscriptionCurrentlyActive(sub) {
    if (!sub) return false;
    if (!["ACTIVE", "CANCELLED"].includes(sub.subscriptionStatus)) return false;
    return new Date(sub.subscriptionEndDate) > new Date();
}

export function buildPublicAppointmentUrl(businessId) {
    return `${getFrontendBaseUrl()}/registarcita/${businessId}`;
}

export function mapBusinessBranding(business) {
    const phone =
        business?.businessReceiptPhone?.trim()
        || [business?.businessCodePhoneNumber, business?.businessPhoneNumber]
            .filter(Boolean)
            .join(" ")
            .trim()
        || null;

    const whatsappDigits = [
        business?.businessCodeWhatsappNumber,
        business?.businessWhatsappNumber,
    ]
        .filter(Boolean)
        .join("")
        .replace(/\D/g, "");

    return {
        businessId: business.businessId,
        name: business.businessName?.trim() || "Empresa",
        logoUrl: business.businessReceiptLogoUrl?.trim() || null,
        email:
            business.businessReceiptEmail?.trim()
            || business.businessEmail?.trim()
            || null,
        phone,
        address: business.businessReceiptAddress?.trim() || null,
        whatsappUrl: whatsappDigits ? `https://wa.me/${whatsappDigits}` : null,
        timezone: resolveBusinessTimezone(business.businessTimezone),
        footerNote: business.businessReceiptFooterNote?.trim() || null,
    };
}

/**
 * Carga negocio + suscripción + prisma tenant.
 * No exige citas habilitadas (para pantallas internas / diagnóstico).
 */
export async function resolveAppointmentBusinessContext(businessId) {
    const business = await general.business.findUnique({
        where: { businessId },
    });

    if (!business) {
        const err = new Error("Negocio no encontrado.");
        err.statusCode = 404;
        err.code = "BUSINESS_NOT_FOUND";
        throw err;
    }

    const subscriptions = await general.subscription.findMany({
        where: { subscriptionBusinessId: businessId },
        orderBy: { subscriptionEndDate: "desc" },
    });
    const hasActiveSubscription = subscriptions.some(isSubscriptionCurrentlyActive);
    const appointmentsPlanAllowed = hasAppointmentsPlan(subscriptions);
    const prisma = await getPrismaForBusinessId(businessId);

    if (!prisma) {
        const err = new Error("No se pudo conectar con la base del negocio.");
        err.statusCode = 503;
        err.code = "TENANT_DB_UNAVAILABLE";
        throw err;
    }

    return {
        business,
        branding: mapBusinessBranding(business),
        hasActiveSubscription,
        appointmentsPlanAllowed,
        isBusinessActive: business.businessStatus === "ACTIVE",
        prisma,
        timezone: resolveBusinessTimezone(business.businessTimezone),
    };
}

/**
 * Gate estricto para superficie pública de agendamiento.
 */
export async function assertPublicAppointmentAccess(businessId) {
    const ctx = await resolveAppointmentBusinessContext(businessId);

    assertAppointmentPlanContext(ctx);

    const settings = await ensureAppointmentSettings(ctx.prisma);
    if (!settings.appointmentsEnabled) {
        const err = new Error("El agendamiento no está disponible para este negocio.");
        err.statusCode = 403;
        err.code = "APPOINTMENTS_DISABLED";
        throw err;
    }

    return { ...ctx, settings };
}

/**
 * Panel y API autenticada: plan Comercial o Profesional vigente.
 * No exige que el link público esté encendido.
 */
export async function assertAppointmentsPlanAccess(businessId) {
    const ctx = await resolveAppointmentBusinessContext(businessId);
    assertAppointmentPlanContext(ctx);
    return ctx;
}

function assertAppointmentPlanContext(ctx) {
    if (!ctx.isBusinessActive || !ctx.hasActiveSubscription) {
        const err = new Error("El agendamiento no está disponible para este negocio.");
        err.statusCode = 403;
        err.code = "APPOINTMENTS_UNAVAILABLE";
        throw err;
    }

    if (!ctx.appointmentsPlanAllowed) {
        const err = new Error(
            "Las citas están disponibles en el Plan Comercial y el Plan Profesional.",
        );
        err.statusCode = 403;
        err.code = "APPOINTMENTS_PLAN_REQUIRED";
        throw err;
    }
}

export function appointmentSettingsWhere(row) {
    if (row?.businessId) {
        return {
            businessId_settingsId: {
                businessId: row.businessId,
                settingsId: row.settingsId || "default",
            },
        };
    }
    return { settingsId: row?.settingsId || "default" };
}

export async function ensureAppointmentSettings(prisma) {
    const existing = await prisma.appointmentSettings.findFirst({
        where: { settingsId: "default" },
        include: {
            weeklyAvailability: {
                orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
            },
        },
    });

    if (existing) return existing;

    return prisma.appointmentSettings.create({
        data: { settingsId: "default" },
        include: {
            weeklyAvailability: {
                orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
            },
        },
    });
}

export function serializeAppointmentLocation(settings, branding) {
    const address =
        settings?.locationAddress?.trim()
        || branding?.address
        || null;
    const latitude = settings?.locationLatitude ?? null;
    const longitude = settings?.locationLongitude ?? null;

    return {
        address,
        latitude,
        longitude,
        mapsUrl: buildMapsUrl({ address, latitude, longitude }),
    };
}

export function buildMapsUrl({ address, latitude, longitude }) {
    if (latitude != null && longitude != null) {
        return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }
    if (address) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
    return null;
}

export function serializeSettings(settings) {
    return {
        appointmentsEnabled: settings.appointmentsEnabled,
        slotDurationMinutes: settings.slotDurationMinutes,
        maxConcurrentPerSlot: settings.maxConcurrentPerSlot ?? 1,
        maxDaysAhead: settings.maxDaysAhead,
        customerNotificationsEnabled: Boolean(settings.customerNotificationsEnabled),
        visitorMessage: settings.visitorMessage,
        galleryImageUrls: (settings.galleryImageUrls || []).filter(Boolean),
        locationAddress: settings.locationAddress,
        locationLatitude: settings.locationLatitude,
        locationLongitude: settings.locationLongitude,
        weeklyAvailability: (settings.weeklyAvailability || []).map((row) => ({
            availabilityId: row.availabilityId,
            dayOfWeek: row.dayOfWeek,
            startTime: row.startTime,
            endTime: row.endTime,
        })),
    };
}

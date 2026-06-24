import { getBusinessByIdService, updateBusinessByIdService } from "./businessService.js";
import { getUserBusinessById } from "./userBusinessService.js";

const SETTINGS_SELECT = {
    businessId: true,
    businessName: true,
    businessDocumentType: true,
    businessDocumentNumber: true,
    businessEmail: true,
    businessPhoneNumber: true,
    businessCodePhoneNumber: true,
    businessCountry: true,
    businessAllowCreditSales: true,
    businessDeliveryControlEnabled: true,
    businessReceiptLogoUrl: true,
    businessReceiptAddress: true,
    businessReceiptPhone: true,
    businessReceiptEmail: true,
    businessReceiptSocial: true,
    businessReceiptFooterNote: true,
};

function trimOrNull(value) {
    const trimmed = value?.trim();
    return trimmed || null;
}

export function serializeBusinessSettings(business) {
    if (!business) return null;

    return {
        businessId: business.businessId,
        businessName: business.businessName,
        businessDocumentType: business.businessDocumentType,
        businessDocumentNumber: business.businessDocumentNumber,
        businessEmail: business.businessEmail,
        businessPhoneNumber: business.businessPhoneNumber,
        businessCodePhoneNumber: business.businessCodePhoneNumber,
        businessCountry: business.businessCountry,
        allowCreditSales: Boolean(business.businessAllowCreditSales),
        deliveryControlEnabled: Boolean(business.businessDeliveryControlEnabled),
        receiptLogoUrl: business.businessReceiptLogoUrl ?? null,
        receiptAddress: business.businessReceiptAddress ?? null,
        receiptPhone: business.businessReceiptPhone ?? null,
        receiptEmail: business.businessReceiptEmail ?? null,
        receiptSocial: business.businessReceiptSocial ?? null,
        receiptFooterNote: business.businessReceiptFooterNote ?? null,
    };
}

export async function assertUserIsBusinessAdmin(userId, businessId) {
    const memberships = await getUserBusinessById(userId);
    const membership = memberships?.find(
        (m) => m.userBusinessBusinessId === businessId,
    );

    if (!membership) {
        const error = new Error("No tienes acceso a este negocio.");
        error.statusCode = 403;
        error.code = "TENANT_FORBIDDEN";
        throw error;
    }

    if (membership.userBusinessRole !== "ADMIN") {
        const error = new Error(
            "Solo el administrador del negocio puede modificar la configuración.",
        );
        error.statusCode = 403;
        error.code = "TENANT_FORBIDDEN";
        throw error;
    }

    return membership;
}

export async function getBusinessSettingsForUser(userId, businessId) {
    await assertUserIsBusinessAdmin(userId, businessId);
    const business = await getBusinessByIdService(businessId);
    if (!business) {
        const error = new Error("Negocio no encontrado.");
        error.statusCode = 404;
        throw error;
    }
    return serializeBusinessSettings(business);
}

export async function updateBusinessSettingsForUser(userId, businessId, payload) {
    await assertUserIsBusinessAdmin(userId, businessId);

    const data = {};

    if (payload.businessName !== undefined) {
        data.businessName = String(payload.businessName).trim();
    }
    if (payload.businessDocumentNumber !== undefined) {
        data.businessDocumentNumber = String(payload.businessDocumentNumber).trim();
    }
    if (payload.allowCreditSales !== undefined) {
        data.businessAllowCreditSales = Boolean(payload.allowCreditSales);
    }
    if (payload.deliveryControlEnabled !== undefined) {
        data.businessDeliveryControlEnabled = Boolean(payload.deliveryControlEnabled);
    }
    if (payload.receiptLogoUrl !== undefined) {
        data.businessReceiptLogoUrl = trimOrNull(payload.receiptLogoUrl);
    }
    if (payload.receiptAddress !== undefined) {
        data.businessReceiptAddress = trimOrNull(payload.receiptAddress);
    }
    if (payload.receiptPhone !== undefined) {
        data.businessReceiptPhone = trimOrNull(payload.receiptPhone);
    }
    if (payload.receiptEmail !== undefined) {
        data.businessReceiptEmail = trimOrNull(payload.receiptEmail);
    }
    if (payload.receiptSocial !== undefined) {
        data.businessReceiptSocial = trimOrNull(payload.receiptSocial);
    }
    if (payload.receiptFooterNote !== undefined) {
        data.businessReceiptFooterNote = trimOrNull(payload.receiptFooterNote);
    }

    const updated = await updateBusinessByIdService(businessId, data);
    return serializeBusinessSettings(updated);
}

export async function isCreditSalesAllowed(businessId) {
    const business = await getBusinessByIdService(businessId);
    return Boolean(business?.businessAllowCreditSales);
}

export async function isDeliveryControlEnabled(businessId) {
    const business = await getBusinessByIdService(businessId);
    return Boolean(business?.businessDeliveryControlEnabled);
}

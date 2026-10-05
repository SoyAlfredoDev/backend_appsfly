import { generalPrisma as general } from "../dbGeneral.js";


const safeBusinessSelect = {
  businessId: true,
  businessName: true,
  businessType: true,
  businessDocumentType: true,
  businessDocumentNumber: true,
  businessEmail: true,
  businessPhoneNumber: true,
  businessCodePhoneNumber: true,
  businessCountry: true,
  businessCodeWhatsappNumber: true,
  businessWhatsappNumber: true,
  businessEntity: true,
  businessStatus: true,
  businessAllowCreditSales: true,
  businessDeliveryControlEnabled: true,
  businessTimezone: true,
  businessReceiptLogoUrl: true,
  businessReceiptAddress: true,
  businessReceiptPhone: true,
  businessReceiptEmail: true,
  businessReceiptSocial: true,
    businessReceiptFooterNote: true,
    businessQuickSalePaymentMethod: true,
    businessQuickSaleDocumentType: true,
  businessDatabaseMode: true,
  businessDatabaseStatus: true,
  businessSchemaVersion: true,
  createdByUserId: true,
  createdAt: true,
  updatedAt: true,
};

export const getBusinessService = async (userId) => {
  try {
    return await general.business.findMany({
      where: {
        UserBusiness: {
          some: { userBusinessUserId: userId },
        },
      },
      select: safeBusinessSelect,
    });
  } catch (error) {
    console.error("Error getting business:", error);
    throw error;
  }
};

export const createBusinessService = async (data) => {
  try {
    const res = await general.business.create({ data, select: safeBusinessSelect });
    return res;
  } catch (error) {
    console.error("(businessService.js): Error creating business:", error);
    throw error;
  }
};

export const updateBusinessByIdService = async (businessId, data) => {
  try {
    const res = await general.business.update({
      where: { businessId },
      data,
      select: safeBusinessSelect,
    });
    return res;
  } catch (error) {
    console.error("Error getting business by ID:", error);
    throw error;
  }
};

export const getConnectionDBServicio = async (businessId) => {
  try {
    const res = await general.business.findUnique({
      where: { businessId },
      select: { businessConnectionDB: true },
    });
    return res ? res.businessConnectionDB : null;
  } catch (error) {
    console.error("Error getting connection DB:", error);
    throw error;
  }
};

export const getBusinessDatabasePlacement = async (businessId) => {
  try {
    return await general.business.findUnique({
      where: { businessId },
      select: {
        businessId: true,
        businessDatabaseMode: true,
        businessDatabaseStatus: true,
        businessDatabaseSecretRef: true,
        businessSchemaVersion: true,
        businessConnectionDB: true,
      },
    });
  } catch (error) {
    console.error("Error getting business database placement:", error);
    throw error;
  }
};

export const getBusinessByIdService = async (businessId, userId = null) => {
  try {
    const res = await general.business.findFirst({
      where: {
        businessId,
        ...(userId ? { UserBusiness: { some: { userBusinessUserId: userId } } } : {}),
      },
      select: safeBusinessSelect,
    });
    return res ? res : null;
  } catch (error) {
    console.error("Error getting business by ID:", error);
    throw error;
  }
};

export const getAdminBusinessByIdService = async (businessId) => {
  try {
    const business = await general.business.findUnique({
      where: { businessId },
      include: {
        createdBy: {
          select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
            userEmail: true,
            userPhoneNumber: true,
            userCodePhoneNumber: true,
          },
        },
        UserBusiness: {
          include: {
            User: {
              select: {
                userId: true,
                userFirstName: true,
                userLastName: true,
                userEmail: true,
                userPhoneNumber: true,
                userCodePhoneNumber: true,
                userLastConnection: true,
              },
            },
          },
        },
        subscriptions: {
          include: {
            plan: {
              select: {
                planId: true,
                planName: true,
                planPrice: true,
                planDuration: true,
              },
            },
          },
          orderBy: { subscriptionEndDate: "desc" },
        },
      },
    });
    if (!business) return null;
    const {
      businessConnectionDB: _connection,
      businessDatabaseSecretRef: _secretRef,
      ...safe
    } = business;
    return safe;
  } catch (error) {
    console.error("(businessService.js): Error getting admin business by id:", error);
    throw error;
  }
};

export const getAdminBusinessesService = async () => {
  try {
    const businesses = await general.business.findMany({
      include: {
        _count: { select: { UserBusiness: true } },
        UserBusiness: {
          include: {
            User: {
              select: {
                userId: true,
                userFirstName: true,
                userLastName: true,
                userEmail: true,
              },
            },
          },
        },
        subscriptions: {
          include: {
            plan: {
              select: { planId: true, planName: true },
            },
          },
          orderBy: { subscriptionEndDate: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return businesses.map(
      ({ businessConnectionDB: _connection, businessDatabaseSecretRef: _secretRef, ...safe }) =>
        safe,
    );
  } catch (error) {
    console.error("(businessService.js): Error getting admin businesses:", error);
    throw error;
  }
};

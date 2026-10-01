import { generalPrisma as general } from "../dbGeneral.js";



// register user-business in generalDB
export const createUserBusinessService = async (data) => {
  try {
    const userBusiness = await general.userBusiness.create({ data });
    return userBusiness;
  } catch (error) {
    console.error(">>>>>> (userBusinessService.js)_ Error creating userbusiness:", error);
    throw error;
  }
};

export const getUserBusinessById = async (userId) => {
  // get user from business table
  try {
    const user = await general.userBusiness.findMany({
      where: {
        userBusinessUserId: userId,
      },
      include: {
        Business: {
          select: {
            businessStatus: true,
            businessProcess: true,
          },
        },
      },
    });
    return user || [];
  } catch (error) {
    console.error("--(usersBusinessService.js): Error getting user in business table:", error);
    throw error;
  }
};

/** Miembros activos de un negocio (GeneralDB UserBusiness + User). */
export const getBusinessMembersService = async (businessId) => {
  try {
    const rows = await general.userBusiness.findMany({
      where: { userBusinessBusinessId: businessId },
      include: {
        User: {
          select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
            userEmail: true,
            userCodePhoneNumber: true,
            userPhoneNumber: true,
            userDocumentType: true,
            userDocumentNumber: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return rows.map((row) => ({
      userId: row.User.userId,
      userFirstName: row.User.userFirstName,
      userLastName: row.User.userLastName,
      userEmail: row.User.userEmail,
      userRole: row.userBusinessRole,
      userCodePhoneNumber: row.User.userCodePhoneNumber,
      userPhoneNumber: row.User.userPhoneNumber,
      userDocumentType: row.User.userDocumentType,
      userDocumentNumber: row.User.userDocumentNumber,
      joinedAt: row.createdAt,
    }));
  } catch (error) {
    console.error("(userBusinessService.js): Error getting business members:", error);
    throw error;
  }
};

export const assertUserBelongsToBusiness = async (userId, businessId) => {
  return general.userBusiness.findFirst({
    where: {
      userBusinessUserId: userId,
      userBusinessBusinessId: businessId,
    },
  });
};

export const canUserViewUser = async (requesterId, targetUserId) => {
  if (requesterId === targetUserId) return true;

  const adminMemberships = await general.userBusiness.findMany({
    where: {
      userBusinessUserId: requesterId,
      userBusinessRole: "ADMIN",
    },
    select: { userBusinessBusinessId: true },
  });
  if (!adminMemberships.length) return false;

  const allowedBusinessIds = adminMemberships.map((row) => row.userBusinessBusinessId);
  const sharedMembership = await general.userBusiness.findFirst({
    where: {
      userBusinessUserId: targetUserId,
      userBusinessBusinessId: { in: allowedBusinessIds },
    },
    select: { userBusinessUserId: true },
  });
  return Boolean(sharedMembership);
};

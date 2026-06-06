const formatOptionalString = (value) => {
  if (value == null || value === "") return null;
  return String(value).trim().toLowerCase();
};

const formatProviderPayload = (body, createdByUserId = undefined) => {
  const data = {
    providerName: formatOptionalString(body.providerName),
    providerDocumentType: formatOptionalString(body.providerDocumentType),
    providerDocumentNumber: formatOptionalString(body.providerDocumentNumber),
    providerAddress: formatOptionalString(body.providerAddress),
    providerCodePhoneNumber: body.providerCodePhoneNumber?.trim() || null,
    providerPhoneNumber: formatOptionalString(body.providerPhoneNumber),
    providerEmail: formatOptionalString(body.providerEmail),
    providerComment: formatOptionalString(body.providerComment),
  };

  if (createdByUserId !== undefined) {
    data.createdByUserId = createdByUserId;
  }

  return data;
};

export const createProvider = async (data, prisma) => {
  try {
    const res = await prisma.provider.create({ data });
    return res;
  } catch (error) {
    console.error("(providersService.js): Error creating provider:", error);
    throw error;
  }
};

export const getProviders = async (prisma) => {
  try {
    const res = await prisma.provider.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { Purchase: true },
        },
      },
    });
    return res;
  } catch (error) {
    console.error("(providersService.js): Error getting providers:", error);
    throw error;
  }
};

export const getProviderById = async (providerId, prisma) => {
  try {
    const res = await prisma.provider.findUnique({
      where: { providerId },
      include: {
        _count: {
          select: { Purchase: true },
        },
      },
    });
    return res;
  } catch (error) {
    console.error("(providersService.js): Error getting provider:", error);
    throw error;
  }
};

export const updateProvider = async (providerId, body, prisma) => {
  try {
    const data = formatProviderPayload(body);
    const res = await prisma.provider.update({
      where: { providerId },
      data,
    });
    return res;
  } catch (error) {
    console.error("(providersService.js): Error updating provider:", error);
    throw error;
  }
};

export const getProviderPurchaseCount = async (providerId, prisma) => {
  return prisma.purchase.count({
    where: { purchaseProviderId: providerId },
  });
};

export const deleteProvider = async (providerId, prisma) => {
  try {
    const purchaseCount = await getProviderPurchaseCount(providerId, prisma);

    if (purchaseCount > 0) {
      const error = new Error(
        "No se puede eliminar el proveedor porque tiene compras registradas.",
      );
      error.statusCode = 400;
      throw error;
    }

    const res = await prisma.provider.delete({
      where: { providerId },
    });
    return res;
  } catch (error) {
    console.error("(providersService.js): Error deleting provider:", error);
    throw error;
  }
};

export { formatProviderPayload };

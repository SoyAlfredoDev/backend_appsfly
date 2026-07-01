const QUOTATION_LIST_INCLUDE = {
    customer: {
        select: {
            customerId: true,
            customerFirstName: true,
            customerLastName: true,
        },
    },
    user: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
    QuotationDetail: {
        select: {
            quotationDetailId: true,
            quotationDetailTotal: true,
            quotationDetailType: true,
        },
    },
};

function mapQuotationListRow(quotation) {
    const totalDetails = quotation.QuotationDetail.reduce(
        (acc, detail) => acc + detail.quotationDetailTotal,
        0,
    );
    const quotationDate = quotation.createdAt.toLocaleDateString('es-CL');
    return {
        ...quotation,
        quotationTotal: totalDetails,
        quotationDate,
    };
}

export const createQuotation = async (data, prisma) => {
    try {
        const res = await prisma.quotation.create({ data });
        return res;
    } catch (error) {
        console.error("(quotationServices.js): Error creating quotation:", error);
        throw error;
    }
};

export const getQuotations = async (prisma) => {
    try {
        const quotationsOriginal = await prisma.quotation.findMany({
            include: QUOTATION_LIST_INCLUDE,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return quotationsOriginal.map(mapQuotationListRow);
    } catch (error) {
        console.error("(quotationServices.js): Error getting quotations:", error);
        throw error;
    }
};

export const getQuotationById = async (id, prisma) => {
    try {
        const res = await prisma.quotation.findUnique({
            where: { quotationId: id },
            include: {
                customer: {
                    select: {
                        customerId: true,
                        customerFirstName: true,
                        customerLastName: true,
                        customerEmail: true,
                        customerDocumentNumber: true,
                    }
                },
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true
                    }
                },
                QuotationDetail: {
                    include: {
                        product: {
                            select: {
                                productId: true,
                                productName: true,
                                productSKU: true,
                                productPrice: true,
                            }
                        },
                        service: {
                            select: {
                                serviceId: true,
                                serviceName: true,
                                serviceSKU: true,
                                servicePrice: true,
                            }
                        },
                    }
                },
            }
        });
        if (!res) return null;
        const totalDetails = res.QuotationDetail.reduce(
            (acc, detail) => acc + detail.quotationDetailTotal,
            0,
        );
        return {
            ...res,
            quotationTotal: totalDetails,
            quotationDate: res.createdAt.toLocaleDateString('es-CL'),
        };
    } catch (error) {
        console.error("(quotationServices.js): Error getting quotation by ID:", error);
        throw error;
    }
};

export const updateQuotationStatus = async (id, status, prisma) => {
    try {
        const res = await prisma.quotation.update({
            where: { quotationId: id },
            data: { quotationStatus: status },
        });
        return res;
    } catch (error) {
        console.error("(quotationServices.js): Error updating quotation status:", error);
        throw error;
    }
};

export const deleteQuotation = async (id, prisma) => {
    try {
        const res = await prisma.quotation.delete({
            where: { quotationId: id }
        });
        return res;
    } catch (error) {
        console.error("(quotationServices.js): Error deleting quotation:", error);
        throw error;
    }
};

export const countQuotationsService = async (prisma) => {
    try {
        const count = await prisma.quotation.count();
        return count;
    } catch (error) {
        console.error("(quotationServices.js): Error counting quotations:", error);
        throw error;
    }
};

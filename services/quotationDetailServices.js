export const createQuotationDetail = async (data, prisma) => {
    try {
        const quotationDetail = await prisma.quotationDetail.create({ data });
        return quotationDetail;
    } catch (error) {
        console.error("(quotationDetailServices.js): Error creating quotation detail:", error);
        throw error;
    }
};

export const getQuotationDetailsByQuotationId = async (quotationId, prisma) => {
    try {
        const res = await prisma.quotationDetail.findMany({
            where: { quotationId },
            include: {
                product: {
                    select: {
                        productId: true,
                        productName: true,
                        productSKU: true
                    }
                },
                service: {
                    select: {
                        serviceId: true,
                        serviceName: true,
                        serviceSKU: true
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.error("(quotationDetailServices.js): Error getting quotation details by ID:", error);
        throw error;
    }
};

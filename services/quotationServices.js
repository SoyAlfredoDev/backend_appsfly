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

function formatQuotationDate(value) {
    if (!value) return "—";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("es-CL");
}

function sumQuotationDetails(details = []) {
    return details.reduce((acc, detail) => acc + (detail.quotationDetailTotal ?? 0), 0);
}

const PRESCRIPTION_SELECT = {
    prescriptionId: true,
    prescriptionDate: true,
    prescriptionType: true,
    prescribedBy: true,
    entryMode: true,
    odSphere: true,
    odCylinder: true,
    odAxis: true,
    odAddition: true,
    oiSphere: true,
    oiCylinder: true,
    oiAxis: true,
    oiAddition: true,
    pdBinocular: true,
};

async function assertPrescriptionBelongsToCustomer(prescriptionId, customerId, prisma) {
    if (!prescriptionId) return;
    const rx = await prisma.prescription.findUnique({ where: { prescriptionId } });
    if (!rx || rx.customerId !== customerId) {
        const error = new Error("La receta no pertenece al cliente de la cotización.");
        error.statusCode = 400;
        throw error;
    }
}

function mapQuotationListRow(quotation) {
    const totalDetails = sumQuotationDetails(quotation.QuotationDetail);
    const quotationDate = formatQuotationDate(quotation.createdAt);
    return {
        ...quotation,
        quotationTotal: totalDetails,
        quotationDate,
    };
}

export const createQuotation = async (data, prisma) => {
    try {
        await assertPrescriptionBelongsToCustomer(
            data.prescriptionId,
            data.quotationCustomerId,
            prisma,
        );
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
                        customerCodePhoneNumber: true,
                        customerPhoneNumber: true,
                    }
                },
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true
                    }
                },
                prescription: {
                    select: PRESCRIPTION_SELECT,
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
        const details = res.QuotationDetail ?? [];
        const totalDetails = sumQuotationDetails(details);
        return {
            ...res,
            QuotationDetail: details,
            quotationTotal: totalDetails,
            quotationDate: formatQuotationDate(res.createdAt),
        };
    } catch (error) {
        console.error("(quotationServices.js): Error getting quotation by ID:", error);
        throw error;
    }
};

export const updateQuotation = async (id, body, prisma) => {
    try {
        const existing = await prisma.quotation.findUnique({
            where: { quotationId: id },
            select: { quotationId: true, quotationCustomerId: true },
        });
        if (!existing) {
            const error = new Error("Cotización no encontrada.");
            error.statusCode = 404;
            throw error;
        }

        const data = {};
        if (body.quotationComment !== undefined) data.quotationComment = body.quotationComment;
        if (body.quotationExpiresAt !== undefined) {
            data.quotationExpiresAt = body.quotationExpiresAt
                ? new Date(body.quotationExpiresAt)
                : null;
        }
        if (body.prescriptionId !== undefined) {
            const prescriptionId = body.prescriptionId || null;
            await assertPrescriptionBelongsToCustomer(
                prescriptionId,
                existing.quotationCustomerId,
                prisma,
            );
            data.prescriptionId = prescriptionId;
        }

        return await prisma.quotation.update({
            where: { quotationId: id },
            data,
            include: {
                prescription: { select: PRESCRIPTION_SELECT },
            },
        });
    } catch (error) {
        console.error("(quotationServices.js): Error updating quotation:", error);
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

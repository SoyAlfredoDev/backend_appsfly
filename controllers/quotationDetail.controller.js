import { createQuotationDetail, getQuotationDetailsByQuotationId } from '../services/quotationDetailServices.js';

export const createQuotationDetailController = async (req, res) => {
    const {
        quotationId,
        quotationDetailId,
        quotationDetailPrice,
        quotationDetailType,
        quotationDetailQuantity,
        quotationCustomerId,
        quotationDetailProductId,
        quotationDetailServiceId
    } = req.body;
    const userId = req.user.payload.id;
    try {
        if (quotationDetailType !== 'PRODUCT' && quotationDetailType !== 'SERVICE') {
            return res.status(400).json({ message: 'It is necessary to select a product or service' });
        }
        const data = {
            quotationDetailId,
            quotationDetailProductId,
            quotationDetailServiceId,
            quotationDetailType,
            quotationDetailQuantity: Number(quotationDetailQuantity),
            quotationDetailPrice: Number(quotationDetailPrice),
            quotationDetailTotal: Number(quotationDetailPrice) * Number(quotationDetailQuantity),
            createdByUserId: userId,
            quotationId,
            quotationCustomerId
        };
        const quotationDetail = await createQuotationDetail(data, req.prisma);
        return res.status(201).json({
            message: 'Quotation detail created successfully',
            quotationDetail
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating quotation detail',
            error: error.message
        });
    }
};

export const getQuotationDetailsByQuotationIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const quotationDetails = await getQuotationDetailsByQuotationId(id, req.prisma);
        return res.status(200).json(quototationDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error fetching quotation details by quotation ID',
            error: error.message
        });
    }
};

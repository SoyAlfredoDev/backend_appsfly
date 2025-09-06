import { createDetailSale, getSaleDetails, getSaleDetailById } from '../services/saleDetailsService.js';

export const createSaleDetailController = async (req, res) => {
    const {
        saleId,
        saleDetailId,
        saleDetailPrice,
        saleDetailType,
        saleDetailQuantity,
        saleCustomerId,
        saleDetailProductId,
        saleDetailServiceId
    } = req.body;
    const userId = req.user.payload.id;
    try {
        if (saleDetailType !== 'PRODUCT' && saleDetailType !== 'SERVICE') {
            return res.status(401).json({ message: 'It is necessary to select a product or service' });
        };
        const data = {
            saleDetailId,
            saleDetailProductId,
            saleDetailServiceId,
            saleDetailType,
            saleDetailQuantity: Number(saleDetailQuantity),
            saleDetailPrice: Number(saleDetailPrice),
            saleDetailTotal: saleDetailPrice * saleDetailQuantity,
            createdByUserId: userId,
            saleId,
            saleCustomerId
        };
        const saleDetail = await createDetailSale(data, req.prisma);
        return res.status(201).json({
            message: 'Sale detail created successfully',
            saleDetail
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating sale detail',
            error: error.message
        });
    }
};

export const getSaleDetailsController = async (req, res) => {
    try {
        const saleDetails = await getSaleDetails(req.prisma);
        return res.status(200).json(saleDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error fetching sale details',
            error: error.message
        });
    }
};

export const getSaleDetailByIdcontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const saleDetails = await getSaleDetailById(id, req.prisma);

        if (!saleDetails) {
            return res.status(404).json({
                message: 'Sale not found'
            });
        }

        return res.status(200).json(saleDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error fetching sale details by id',
            error: error.message
        });
    }
};

export const getSaleDetailController = async (req, res) => {
    const { id } = req.params;
    try {
        const saleDetail = await getSaleDetailById(id, req.prisma);
        if (!saleDetail) {
            return res.status(404).json({ message: 'Sale detail not found' });
        }
        return res.status(200).json(saleDetail);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error fetching sale detail',
            error: error.message
        });
    }
}
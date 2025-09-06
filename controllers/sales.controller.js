import { createSale, getSaleById, getSales, getMonthlySales, getDaySales } from '../services/salesServices.js';

export const createSaleController = async (req, res) => {
    try {
        const { saleId, saleCustomerId, saleTotal, saleTotalPayments, saleComment } = req.body;
        const userId = req.user.payload.id
        const data = {
            saleId,
            saleCustomerId,
            createdByUserId: userId,
            saleTotal: Number(saleTotal),
            saleTotalPayments: Number(saleTotalPayments),
            salePendingAmount: (Number(saleTotal) - Number(saleTotalPayments)),
            saleComment


        };
        const sale = await createSale(data, req.prisma);
        res.status(201).json({
            message: 'Sale created successfully',
            sale
        });
    } catch (error) {
        console.error("(sales.controller.js): Error creating sale:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSalesController = async (req, res) => {
    try {
        const sales = await getSales(req.prisma);
        res.status(200).json(sales);
    } catch (error) {
        console.error("(sales.controller.js): Error fetching sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSaleByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await getSaleById(id, req.prisma);
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json(sale);
    } catch (error) {
        console.error("(sales.controller.js): Error fetching sale by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMonthlySalescontroller = async (req, res) => {
    try {
        const { month, year } = req.params;
        res.status(200).json(await getMonthlySales(Number(month), Number(year), req.prisma));
    } catch (error) {
        console.error("(sales.controller.js): Error getting monthly sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getDaySalesController = async (req, res) => {
    try {
        const { day, month, year } = req.params;
        res.status(200).json(await getDaySales(Number(day), Number(month), Number(year), req.prisma));
    } catch (error) {
        console.error("(sales.controller.js): Error getting day sales:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}




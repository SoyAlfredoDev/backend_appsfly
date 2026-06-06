import { createSale, getSaleById, getSales, getMonthlySales, getDaySales, getSalesByCustomerIdService, countSalesMonthService } from '../services/salesServices.js';
import defineSaleNumber from '../libs/defineSaleNumber.js';

export const createSaleController = async (req, res) => {
    try {
        const { saleId, saleCustomerId, saleTotal, saleTotalPayments, saleComment } = req.body;
        const userId = req.user.payload.id
        const numberSale = await defineSaleNumber(req.prisma);

        const data = {
            saleId,
            saleNumber: numberSale,
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

export const getMonthlySalesNowController = async (req, res) => {
    try {
        const month = new Date().getMonth() + 1; // Months are zero-based
        const year = new Date().getFullYear();

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
};

export const getSalesByCustomerIdController = async (req, res) => {
    try {
        const { customerId } = req.params;
        const salesFound = await getSalesByCustomerIdService(customerId, req.prisma);
        res.status(200).json(salesFound);
    } catch (error) {
        console.error("(sales.controller.js): Error getting sales by customer ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const countSalesMonthController = async (req, res) => {
    try {
        const { month, year } = req.params;
        res.status(200).json(await countSalesMonthService(Number(month), Number(year), req.prisma));
    } catch (error) {
        console.error("(sales.controller.js): Error counting sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




import { createDailySaleService, getDailySalesService } from '../services/dailySalesService.js';
import { getSalesByDate } from '../services/salesServices.js';
import { getPaymentByDateService } from '../services/paymentsService.js';
import { getSaleDetailByDate } from '../services/saleDetailsService.js';

export const createDailySaleController = async (req, res) => {
    try {
        const { dailySalesDay, dailySalesId } = req.body;
        const { prisma, user } = req;

        // Ejecuta consultas en paralelo
        const [salesCount, payments, saleDetails] = await Promise.all([
            getSalesByDate(dailySalesDay, dailySalesDay, prisma),
            getPaymentByDateService(dailySalesDay, dailySalesDay, prisma),
            getSaleDetailByDate(dailySalesDay, dailySalesDay, prisma),
        ]);

        // Totales generales
        const totalSales = Array.isArray(saleDetails)
            ? saleDetails.reduce((acc, s) => acc + (s.saleDetailTotal || 0), 0)
            : 0;

        const totalIncome = Array.isArray(payments)
            ? payments.reduce((acc, p) => acc + (p.paymentAmount || 0), 0)
            : 0;

        // Totales por método de pago
        const paymentMethod0 = payments.filter(p => p.paymentMethod === '0');
        const totalPaymentMethod0 = paymentMethod0.reduce((acc, p) => acc + (p.paymentAmount || 0), 0);

        const paymentMethod1 = payments.filter(p => p.paymentMethod === '1');
        const totalPaymentMethod1 = paymentMethod1.reduce((acc, p) => acc + (p.paymentAmount || 0), 0);

        const paymentMethod2 = payments.filter(p => p.paymentMethod === '2');
        const totalPaymentMethod2 = paymentMethod2.reduce((acc, p) => acc + (p.paymentAmount || 0), 0);

        const paymentMethod3 = payments.filter(p => p.paymentMethod === '3');
        const totalPaymentMethod3 = paymentMethod3.reduce((acc, p) => acc + (p.paymentAmount || 0), 0);

        // Construcción del objeto final
        const data = {
            dailySalesId,
            dailySalesDay,
            dailySalesNumberOfSales: Array.isArray(salesCount) ? salesCount.length : salesCount,
            dailySalesTotalSales: totalSales,
            dailySalesTotalIncome: totalIncome,
            dailySalesDetailIncome: {
                0: totalPaymentMethod0,
                1: totalPaymentMethod1,
                2: totalPaymentMethod2,
                3: totalPaymentMethod3
            },
            createdByUserId: user.payload.id,
        };

        const createdDailySale = await createDailySaleService(data, prisma);
        return res.status(201).json(createdDailySale);

    } catch (error) {
        console.error("Error creating daily sale:", error);
        return res.status(500).json({
            message: "Error creating daily sale",
            error: error.message,
        });
    }
};

export const getDailySalesController = async (req, res) => {
    try {
        const { prisma } = req;
        const dailySales = await getDailySalesService(prisma);
        return res.status(200).json(dailySales);
    } catch (error) {
        console.error("Error getting daily sales:", error);
        return res.status(500).json({
            message: "Error getting daily sales",
            error: error.message,
        });
    }
};

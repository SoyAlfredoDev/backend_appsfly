import { createPayment, getPayments, getPaymentBySaleId } from '../services/paymentsService.js';

export const createPaymentController = async (req, res) => {
    try {
        const { paymentId, saleId, paymentAmount, paymentMethod } = req.body;
        const createdByUserId = req.user.payload.id
        const data = {
            paymentId,
            saleId,
            paymentAmount: Number(paymentAmount),
            paymentMethod: String(paymentMethod),
            createdByUserId
        }
        const payment = await createPayment(data, req.prisma);
        res.status(201).json({
            message: 'payment created successfully',
            payment
        });
    } catch (error) {
        console.error("(payment.controller.js): Error creating payment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPaymentsController = async (req, res) => {
    try {
        const payments = await getPayments(req.prisma);
        res.status(200).json(payments);
    } catch (error) {
        console.error("(payment.controller.js): Error getting payment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPaymentBySaleIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const paymenBySaleId = await getPaymentBySaleId(id, req.prisma);
        if (!paymenBySaleId) {
            return res.status(404).json({ message: "payment not found" });
        }
        res.status(200).json(paymenBySaleId);

    } catch (error) {
        console.error("(sales.controller.js): Error fetching payment by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

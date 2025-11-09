import { createPaymentService, getPaymentsService, getPaymentBySaleIdService, sumPaymentsByPaymentMethodsService } from '../services/paymentsService.js';

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
        const payment = await createPaymentService(data, req.prisma);
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
        const payments = await getPaymentsService(req.prisma);
        res.status(200).json(payments);
    } catch (error) {
        console.error("(payment.controller.js): Error getting payment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPaymentBySaleIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentBySaleId = await getPaymentBySaleIdService(id, req.prisma);
        if (!paymentBySaleId) {
            return res.status(404).json({ message: "payment not found" });
        }
        res.status(200).json(paymentBySaleId);

    } catch (error) {
        console.error("(payment.controller.js): Error fetching payment by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSumPaymentsByPaymentMethodsController = async (req, res) => {
    try {
        const { paymentMethod } = req.params;
        const total = await sumPaymentsByPaymentMethodsService(paymentMethod, req.prisma);
        return res.status(200).json({ total });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


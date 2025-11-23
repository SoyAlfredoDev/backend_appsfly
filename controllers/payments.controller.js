import { createPaymentService, getPaymentsService, getPaymentBySaleIdService, sumPaymentsByPaymentMethodsService } from '../services/paymentsService.js';
import { getSalesByCustomerIdService } from '../services/salesServices.js'

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

export const getPaymentByCustomerIdController = async (req, res) => {
    try {
        const { customerId } = req.params;

        // 1. Obtener las ventas del cliente
        const salesByCustomer = await getSalesByCustomerIdService(customerId, req.prisma);

        if (!salesByCustomer || salesByCustomer.length === 0) {
            return res.status(404).json({ message: "No sales found for this customer" });
        }

        // 2. Obtener pagos por cada venta (PROMESAS)
        const paymentPromises = salesByCustomer.map(sale =>
            getPaymentBySaleIdService(sale.saleId, req.prisma)
        );

        // 3. Esperar todas las promesas
        const paymentsBySale = await Promise.all(paymentPromises);

        // 4. Flatten (por si cada venta tiene varios pagos)
        const allPayments = paymentsBySale.flat();

        // 5. Enviar respuesta
        return res.status(200).json(allPayments);

    } catch (error) {
        console.error("(payment.controller.js): Error getting payment by customerId:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const createPaymentService = async (data, prisma) => {
    try {
        const res = await prisma.payment.create({ data });
        return res
    } catch (error) {
        console.error("(paymentsService.js): Error creating payment:", error);
        throw error;
    }
};

export const getPaymentsService = async (prisma) => {
    try {
        const res = await prisma.payment.findMany();
        return res

    } catch (error) {
        console.error("(paymentsService.js): Error getting payment:", error);

    }
};

export const getPaymentBySaleIdService = async (id, prisma) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                saleId: id
            },
            include: {
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    },
                },
                Sale: {
                    select: {
                        saleId: true,
                        saleNumber: true,
                    },
                }
            }
        });
        return payments || []
    } catch (error) {
        console.error("(paymentsService.js): Error getting payment by saleId:", error);
    }
}

export const getPaymentByDateService = async (startDate, endDate, prisma) => {
    try {
        const start = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}T23:59:59.999Z`);
        const payments = await prisma.payment.findMany({
            where: {
                createdAt: {
                    gte: start,
                    lte: end
                }
            }
        });
        return payments || [];
    } catch (error) {
        console.error("(paymentsService.js): Error getting payment by date:", error);
    }
}

export const sumPaymentsByPaymentMethodsService = async (paymentMethod, prisma) => {
    try {
        const result = await prisma.payment.aggregate({
            where: { paymentMethod: paymentMethod },
            _sum: { paymentAmount: true },
        });
        return result._sum.paymentAmount || 0;
    } catch (error) {
        console.error(`(paymentsService.js): Error getting sum of payments by payment method ${paymentMethod}:`, error);
        throw error;
    }
}

export const getPaymentByCustomerIdService = async (customerId, prisma) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                customerId: customerId
            }
        });
        return payments || [];
    } catch (error) {
        console.error(`(paymentsService.js): Error getting payments by customerId ${customerId}:`, error);
        throw error;
    }
}
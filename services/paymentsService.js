

export const createPayment = async (data, prisma) => {
    try {
        const res = await prisma.payment.create({ data });
        return res
    } catch (error) {
        console.error("(paymentsService.js): Error creating payment:", error);
        throw error;
    }
};

export const getPayments = async (prisma) => {
    try {
        const res = await prisma.payment.findMany();
        return res

    } catch (error) {
        console.error("(paymentsService.js): Error getting payment:", error);

    }
};

export const getPaymentBySaleId = async (id, prisma) => {
    try {
        const payments = await prisma.payment.findMany({
            where: {
                saleId: id
            }
        })
        return payments || []
    } catch (error) {
        console.error("(paymentsService.js): Error getting payment by saleId:", error);
    }
}

// get payments between dates, return an array of payments
export const getPaymentByDate = async (startDate, endDate, prisma) => {
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
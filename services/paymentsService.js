

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
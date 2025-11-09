// services to handle all transactions related operations for the finance module

export const getTransactions = async (prisma) => {
    try {
        const res = await prisma.transactions.findMany();
        return res
    } catch (error) {
        console.error("(financeService.js): Error fetching transactions:", error);
        throw error;
    }
};

export const createTransaction = async (data, prisma) => {
    try {
        const newTransaction = await prisma.transactions.create({ data });
        return newTransaction;
    } catch (error) {
        console.error("(financeService.js): Error creating transaction:", error);
        throw error;
    }
};

export const getTransactionById = async (id, prisma) => {
    try {
        const transaction = await prisma.transactions.findUnique({
            where: { id }
        });
        return transaction;
    } catch (error) {
        console.error("(financeService.js): Error fetching transaction by ID:", error);
        throw error;
    }
};

export const updateTransaction = async (id, data, prisma) => {
    try {
        const updatedTransaction = await prisma.transactions.update({
            where: { id },
            data
        });
        return updatedTransaction;
    } catch (error) {
        console.error("(financeService.js): Error updating transaction:", error);
        throw error;
    }
};

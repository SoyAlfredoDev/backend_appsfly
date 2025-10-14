export const createCashExpense = async (data, prisma) => {
    try {
        const res = await prisma.cashExpense.create({ data });
        return res;
    } catch (error) {
        console.error("(cashExpenseService.js): Error creating cash expense:", error);
        throw error;
    }
};

export const getCashExpenses = async (prisma) => {
    try {
        const res = await prisma.cashExpense.findMany();
        return res;
    } catch (error) {
        console.error("(cashExpenseService.js): Error getting cash expenses:", error);
        throw error;
    }
};

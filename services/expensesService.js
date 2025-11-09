// expensesService.js

// 1. CREATE Expense
export const createExpenseService = async (data, prisma) => {
    try {
        // Creates a new expense record in the database
        const res = await prisma.expense.create({ data });
        return res;
    } catch (error) {
        console.error("(expensesService.js): Error creating expense:", error);
        throw error;
    }
};

// 2. READ All Expenses
export const getExpensesService = async (prisma) => {
    try {
        // Retrieves all expense records from the database
        const res = await prisma.expense.findMany({
            orderBy: { createdAt: 'desc' }, // Orders expenses by date in descending order
            include: {
                user: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.error("(expensesService.js): Error getting expenses:", error);
        throw error;
    }
};

// 3. READ Expense by ID (NEW FUNCTION)
export const getExpenseByIdService = async (id, prisma) => {
    try {
        // Retrieves a single expense record based on its unique ID
        const res = await prisma.expense.findUnique({
            where: { id: id }, // Uses findUnique to get a single record by ID
        });
        return res;
    } catch (error) {
        console.error(`(expensesService.js): Error getting expense with ID ${id}:`, error);
        throw error;
    }
};

// 4. UPDATE Expense
export const updateExpenseService = async (id, data, prisma) => {
    try {
        // Finds the expense by ID and updates its data
        const res = await prisma.expense.update({
            where: { id: id },
            data: data,
        });
        return res;
    } catch (error) {
        console.error(`(expensesService.js): Error updating expense with ID ${id}:`, error);
        throw error;
    }
};

// 5. DELETE Expense
export const deleteExpenseService = async (id, prisma) => {
    try {
        // Finds and deletes the expense record by its ID
        const res = await prisma.expense.delete({
            where: { expenseId: id },
        });
        // Returns the record that was deleted for confirmation
        return res;
    } catch (error) {
        console.error(`(expensesService.js): Error deleting expense with ID ${id}:`, error);
        throw error;
    }
};
export const sumExpensesByPaymentMethod = async (paymentMethod, prisma) => {
    try {
        const result = await prisma.expense.aggregate({
            where: { expensePaymentMethod: paymentMethod },
            _sum: { expenseAmount: true },
        });
        return result._sum.expenseAmount || 0;
    } catch (error) {
        console.error(`(expensesService.js): Error getting sum of expenses by payment method ${paymentMethod}:`, error);
        throw error;
    }
}
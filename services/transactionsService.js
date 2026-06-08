const transactionInclude = {
    user: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
};

export const getTransactions = async (prisma) => {
    try {
        return prisma.transactions.findMany({
            orderBy: { createdAt: "desc" },
            include: transactionInclude,
        });
    } catch (error) {
        console.error("(transactionsService.js): Error fetching transactions:", error);
        throw error;
    }
};

export const getTransactionById = async (id, prisma) => {
    try {
        return prisma.transactions.findUnique({
            where: { transactionId: id },
            include: transactionInclude,
        });
    } catch (error) {
        console.error("(transactionsService.js): Error fetching transaction by ID:", error);
        throw error;
    }
};

export const createTransaction = async (data, prisma) => {
    try {
        return prisma.transactions.create({
            data,
            include: transactionInclude,
        });
    } catch (error) {
        console.error("(transactionsService.js): Error creating transaction:", error);
        throw error;
    }
};

export const getTransactionsSummary = async (prisma) => {
    const rows = await getTransactions(prisma);

    let totalIn = 0;
    let totalOut = 0;
    let cashIn = 0;
    let cashOut = 0;

    for (const row of rows) {
        const { amount, direction } = parseStoredAmount(row.transactionNewValue);
        if (direction === "OUT") {
            totalOut += amount;
            if (row.transactionMethod === "2") cashOut += amount;
        } else {
            totalIn += amount;
            if (row.transactionMethod === "2") cashIn += amount;
        }
    }

    return {
        totalIn,
        totalOut,
        netBalance: totalIn - totalOut,
        cashAvailable: cashIn - cashOut,
        movementCount: rows.length,
    };
};

function parseStoredAmount(value) {
    if (value == null) return { amount: 0, direction: "IN" };
    if (typeof value === "number") {
        return {
            amount: Math.abs(value),
            direction: value >= 0 ? "IN" : "OUT",
        };
    }
    if (typeof value === "object") {
        return {
            amount: Math.abs(Number(value.amount) || 0),
            direction: value.direction === "OUT" ? "OUT" : "IN",
        };
    }
    return { amount: 0, direction: "IN" };
}

import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'
import { getAdminSubscriptionsService } from './subscriptionService.js'
import { getAdminBusinessesService, getAdminBusinessByIdService } from './businessService.js'
import { getPrismaForBusinessId } from '../db.js'

const general = new PrismaGeneral()

export const getKpis = async () => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // 1. Total Users & New Users
        const totalUsers = await general.user.count();
        const newUsers = await general.user.count({
            where: {
                createdAt: {
                    gte: startOfMonth
                }
            }
        });

        // 2. Total Businesses
        const totalBusinesses = await general.business.count();

        // 3. Ticket Stats
        const totalTickets = await general.ticket.count();
        const pendingTickets = await general.ticket.count({ where: { ticketStatus: 'PENDING' } });
        const resolvedTickets = await general.ticket.count({ where: { ticketStatus: 'RESOLVED' } });

        // 4. Revenue (Subscriptions)
        // Assuming Subscription amount is the revenue
        const subscriptions = await general.subscription.findMany({
            where: {
                createdAt: {
                    gte: startOfMonth
                }
            },
            select: {
                subscriptionAmount: true
            }
        });
        const monthlyRevenue = subscriptions.reduce((acc, curr) => acc + curr.subscriptionAmount, 0);

        // 5. Sales Series (Subscriptions per month for the last 6 months)
        // This is a bit complex with Prisma raw query or JS processing. Let's use JS processing for simplicity if data is small, or raw query.
        // For scalability, raw query is better, but let's stick to simple JS for now as we might not have many subscriptions yet.
        // Actually, let's just get the last 6 months of subscriptions.
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        const recentSubscriptions = await general.subscription.findMany({
            where: {
                createdAt: {
                    gte: sixMonthsAgo
                }
            },
            select: {
                createdAt: true,
                subscriptionAmount: true
            }
        });

        const salesSeries = {};
        // Initialize last 6 months
        for (let i = 0; i < 6; i++) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            salesSeries[key] = 0;
        }

        recentSubscriptions.forEach(sub => {
            const d = new Date(sub.createdAt);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            if (salesSeries[key] !== undefined) {
                salesSeries[key] += sub.subscriptionAmount;
            }
        });

        // Convert to array sorted by date
        const salesSeriesArray = Object.entries(salesSeries)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([date, amount]) => ({ date, amount }));


        return {
            totalUsers,
            newUsers,
            totalBusinesses,
            totalTickets,
            pendingTickets,
            resolvedTickets,
            monthlyRevenue,
            salesSeries: salesSeriesArray
        };

    } catch (error) {
        console.error("(adminService.js): Error getting KPIs:", error);
        throw error;
    }
};

export const getSubscriptions = async () => {
    try {
        return await getAdminSubscriptionsService();
    } catch (error) {
        console.error("(adminService.js): Error getting subscriptions:", error);
        throw error;
    }
};

export const getBusinesses = async () => {
    try {
        return await getAdminBusinessesService();
    } catch (error) {
        console.error("(adminService.js): Error getting businesses:", error);
        throw error;
    }
};

async function getTenantOperationalData(businessId) {
    const prisma = await getPrismaForBusinessId(businessId);
    if (!prisma) {
        return {
            available: false,
            totals: null,
            recentMovements: [],
        };
    }

    try {
        const [
            totalSales,
            totalProducts,
            totalExpenses,
            totalCustomers,
            salesVolume,
            recentSales,
            recentExpenses,
            recentTransactions,
        ] = await Promise.all([
            prisma.sale.count(),
            prisma.product.count(),
            prisma.expense.count(),
            prisma.customer.count(),
            prisma.sale.aggregate({ _sum: { saleTotal: true } }),
            prisma.sale.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    saleId: true,
                    saleTotal: true,
                    saleNumber: true,
                    createdAt: true,
                },
            }),
            prisma.expense.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    expenseId: true,
                    expenseAmount: true,
                    expenseDescription: true,
                    createdAt: true,
                },
            }),
            prisma.transactions.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    transactionId: true,
                    transactionType: true,
                    transactionDescription: true,
                    createdAt: true,
                },
            }),
        ]);

        const recentMovements = [
            ...recentSales.map((sale) => ({
                id: sale.saleId,
                type: "VENTA",
                label: sale.saleNumber ? `Venta #${sale.saleNumber}` : "Venta registrada",
                amount: sale.saleTotal,
                date: sale.createdAt,
            })),
            ...recentExpenses.map((expense) => ({
                id: expense.expenseId,
                type: "GASTO",
                label: expense.expenseDescription || "Gasto registrado",
                amount: expense.expenseAmount,
                date: expense.createdAt,
            })),
            ...recentTransactions.map((tx) => ({
                id: tx.transactionId,
                type: tx.transactionType || "TRANSACCIÓN",
                label: tx.transactionDescription || "Movimiento del sistema",
                amount: null,
                date: tx.createdAt,
            })),
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 8);

        return {
            available: true,
            totals: {
                totalSales,
                totalProducts,
                totalExpenses,
                totalCustomers,
                salesVolume: salesVolume._sum.saleTotal ?? 0,
            },
            recentMovements,
        };
    } catch (error) {
        console.error("(adminService.js): Error reading tenant DB:", error);
        return {
            available: false,
            totals: null,
            recentMovements: [],
            error: error.message,
        };
    }
}

export const getBusinessDetail = async (businessId) => {
    const business = await getAdminBusinessByIdService(businessId);
    if (!business) return null;

    const tenant = await getTenantOperationalData(businessId);

    return {
        business,
        tenant,
    };
};

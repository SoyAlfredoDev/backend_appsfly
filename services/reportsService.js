const MAX_INVENTORY_RANGE_DAYS = 366;

/** Mismo criterio de periodo que salesServices.getMonthlySales (hora local del servidor). */
function localMonthRange(month, year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    return { startDate, endDate };
}

function utcYearRange(year) {
    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(year + 1, 0, 1));
    return { startDate, endDate };
}

function parseDateRange(startDate, endDate) {
    const start = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        throw new Error("INVALID_DATE_RANGE");
    }
    if (start > end) {
        throw new Error("INVALID_DATE_ORDER");
    }
    const diffDays = (end - start) / (1000 * 60 * 60 * 24);
    if (diffDays > MAX_INVENTORY_RANGE_DAYS) {
        throw new Error("DATE_RANGE_TOO_LARGE");
    }
    return { start, end };
}

function toNumber(value) {
    if (value == null) return 0;
    return typeof value === "bigint" ? Number(value) : Number(value);
}

export async function getMonthlySalesReport(month, year, prisma) {
    const { startDate, endDate } = localMonthRange(month, year);

    const [summary, sales] = await Promise.all([
        prisma.sale.aggregate({
            _sum: {
                saleTotal: true,
                saleTotalPayments: true,
                salePendingAmount: true,
            },
            _count: { saleId: true },
            where: {
                createdAt: { gte: startDate, lt: endDate },
            },
        }),
        prisma.sale.findMany({
            where: { createdAt: { gte: startDate, lt: endDate } },
            select: {
                saleId: true,
                saleNumber: true,
                saleTotal: true,
                saleTotalPayments: true,
                salePendingAmount: true,
                createdAt: true,
                customer: {
                    select: {
                        customerFirstName: true,
                        customerLastName: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        }),
    ]);

    return {
        reportType: "monthly-sales",
        period: { month, year },
        summary: {
            totalSales: summary._sum.saleTotal ?? 0,
            totalPaid: summary._sum.saleTotalPayments ?? 0,
            totalPending: summary._sum.salePendingAmount ?? 0,
            transactionCount: summary._count.saleId ?? 0,
        },
        rows: sales.map((sale) => ({
            id: sale.saleId,
            number: sale.saleNumber,
            date: sale.createdAt,
            customer: `${sale.customer?.customerFirstName ?? ""} ${sale.customer?.customerLastName ?? ""}`.trim(),
            total: sale.saleTotal,
            paid: sale.saleTotalPayments,
            pending: sale.salePendingAmount,
        })),
    };
}

export async function getYearlySalesReport(year, prisma) {
    const { startDate, endDate } = utcYearRange(year);

    const monthlyRows = await prisma.$queryRaw`
        SELECT
            EXTRACT(MONTH FROM "createdAt")::int AS month,
            COUNT(*)::int AS "transactionCount",
            COALESCE(SUM("saleTotal"), 0)::int AS "totalSales",
            COALESCE(SUM("saleTotalPayments"), 0)::int AS "totalPaid",
            COALESCE(SUM("salePendingAmount"), 0)::int AS "totalPending"
        FROM "Sale"
        WHERE "createdAt" >= ${startDate} AND "createdAt" < ${endDate}
        GROUP BY EXTRACT(MONTH FROM "createdAt")
        ORDER BY month ASC
    `;

    const monthMap = new Map(
        monthlyRows.map((row) => [Number(row.month), row]),
    );

    const rows = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const data = monthMap.get(month);
        return {
            month,
            transactionCount: toNumber(data?.transactionCount),
            totalSales: toNumber(data?.totalSales),
            totalPaid: toNumber(data?.totalPaid),
            totalPending: toNumber(data?.totalPending),
        };
    });

    const summary = rows.reduce(
        (acc, row) => ({
            totalSales: acc.totalSales + row.totalSales,
            totalPaid: acc.totalPaid + row.totalPaid,
            totalPending: acc.totalPending + row.totalPending,
            transactionCount: acc.transactionCount + row.transactionCount,
        }),
        { totalSales: 0, totalPaid: 0, totalPending: 0, transactionCount: 0 },
    );

    return {
        reportType: "yearly-sales",
        period: { year },
        summary,
        rows,
    };
}

export async function getInventoryMovementsReport(
    { startDate, endDate, categoryId },
    prisma,
) {
    const { start, end } = parseDateRange(startDate, endDate);

    const productFilter = categoryId
        ? { categoryId }
        : undefined;

    const saleWhere = {
        createdAt: { gte: start, lte: end },
        saleDetailProductId: { not: null },
        ...(categoryId
            ? { product: { categoryId } }
            : {}),
    };

    const purchaseWhere = {
        createdAt: { gte: start, lte: end },
        purchaseDetailProductId: { not: null },
        ...(categoryId
            ? { product: { categoryId } }
            : {}),
    };

    const [saleMovements, purchaseMovements, productCount] = await Promise.all([
        prisma.saleDetail.findMany({
            where: saleWhere,
            select: {
                saleDetailId: true,
                saleDetailQuantity: true,
                saleDetailTotal: true,
                createdAt: true,
                product: {
                    select: {
                        productSKU: true,
                        productName: true,
                        category: { select: { categoryName: true } },
                    },
                },
                sale: { select: { saleNumber: true } },
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma.purchaseDetail.findMany({
            where: purchaseWhere,
            select: {
                purchaseDetailId: true,
                purchaseDetailQuantity: true,
                purchaseDetailTotal: true,
                createdAt: true,
                product: {
                    select: {
                        productSKU: true,
                        productName: true,
                        category: { select: { categoryName: true } },
                    },
                },
                purchase: { select: { purchaseNumber: true } },
            },
            orderBy: { createdAt: "desc" },
        }),
        productFilter
            ? prisma.product.count({ where: productFilter })
            : prisma.product.count(),
    ]);

    const outboundQty = saleMovements.reduce(
        (sum, row) => sum + row.saleDetailQuantity,
        0,
    );
    const inboundQty = purchaseMovements.reduce(
        (sum, row) => sum + row.purchaseDetailQuantity,
        0,
    );

    const rows = [
        ...saleMovements.map((row) => ({
            id: row.saleDetailId,
            movementType: "SALIDA",
            documentNumber: row.sale?.saleNumber ?? "—",
            date: row.createdAt,
            sku: row.product?.productSKU ?? "—",
            productName: row.product?.productName ?? "—",
            category: row.product?.category?.categoryName ?? "—",
            quantity: row.saleDetailQuantity,
            total: row.saleDetailTotal,
        })),
        ...purchaseMovements.map((row) => ({
            id: row.purchaseDetailId,
            movementType: "ENTRADA",
            documentNumber: row.purchase?.purchaseNumber ?? "—",
            date: row.createdAt,
            sku: row.product?.productSKU ?? "—",
            productName: row.product?.productName ?? "—",
            category: row.product?.category?.categoryName ?? "—",
            quantity: row.purchaseDetailQuantity,
            total: row.purchaseDetailTotal,
        })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
        reportType: "inventory-movements",
        period: { startDate, endDate, categoryId: categoryId || null },
        summary: {
            outboundMovements: saleMovements.length,
            inboundMovements: purchaseMovements.length,
            outboundQuantity: outboundQty,
            inboundQuantity: inboundQty,
            netQuantity: inboundQty - outboundQty,
            productCount,
        },
        rows,
    };
}

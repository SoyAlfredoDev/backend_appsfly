import {
    businessDateRangeBoundsUtc,
    businessMonthBoundsUtc,
    DEFAULT_BUSINESS_TIMEZONE,
    sanitizeTimezone,
    zonedDateTimeToUtc,
} from "../libs/businessTimezone.js";

const MAX_INVENTORY_RANGE_DAYS = 366;

/** Mismo criterio de periodo que salesServices.getMonthlySales (TZ del negocio). */
function localMonthRange(month, year, timeZone = DEFAULT_BUSINESS_TIMEZONE) {
    const { start, endExclusive } = businessMonthBoundsUtc(year, month, timeZone);
    return { startDate: start, endDate: endExclusive };
}

function businessYearBoundsUtc(year, timeZone = DEFAULT_BUSINESS_TIMEZONE) {
    const startDate = zonedDateTimeToUtc(`${year}-01-01`, timeZone);
    const endDate = zonedDateTimeToUtc(`${year + 1}-01-01`, timeZone);
    return { startDate, endDate };
}

function parseDateRange(startDate, endDate, timeZone = DEFAULT_BUSINESS_TIMEZONE) {
    const startKey = String(startDate).slice(0, 10);
    const endKey = String(endDate).slice(0, 10);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(startKey) || !/^\d{4}-\d{2}-\d{2}$/.test(endKey)) {
        throw new Error("INVALID_DATE_RANGE");
    }
    if (startKey > endKey) {
        throw new Error("INVALID_DATE_ORDER");
    }

    const [sy, sm, sd] = startKey.split("-").map(Number);
    const [ey, em, ed] = endKey.split("-").map(Number);
    const diffDays =
        (Date.UTC(ey, em - 1, ed) - Date.UTC(sy, sm - 1, sd)) / (1000 * 60 * 60 * 24);
    if (diffDays > MAX_INVENTORY_RANGE_DAYS) {
        throw new Error("DATE_RANGE_TOO_LARGE");
    }

    const { start, endInclusive } = businessDateRangeBoundsUtc(startKey, endKey, timeZone);
    if (Number.isNaN(start.getTime()) || Number.isNaN(endInclusive.getTime())) {
        throw new Error("INVALID_DATE_RANGE");
    }
    return { start, end: endInclusive };
}

function toNumber(value) {
    if (value == null) return 0;
    return typeof value === "bigint" ? Number(value) : Number(value);
}

export async function getMonthlySalesReport(
    month,
    year,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const { startDate, endDate } = localMonthRange(month, year, timeZone);

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

export async function getYearlySalesReport(
    year,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const { startDate, endDate } = businessYearBoundsUtc(year, timeZone);
    const tz = sanitizeTimezone(timeZone);

    const monthlyRows = await prisma.$queryRawUnsafe(
        `
        SELECT
            EXTRACT(MONTH FROM (("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE $1))::int AS month,
            COUNT(*)::int AS "transactionCount",
            COALESCE(SUM("saleTotal"), 0)::int AS "totalSales",
            COALESCE(SUM("saleTotalPayments"), 0)::int AS "totalPaid",
            COALESCE(SUM("salePendingAmount"), 0)::int AS "totalPending"
        FROM "Sale"
        WHERE "createdAt" >= $2 AND "createdAt" < $3
        GROUP BY EXTRACT(MONTH FROM (("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE $1))
        ORDER BY month ASC
        `,
        tz,
        startDate,
        endDate,
    );

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
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const { start, end } = parseDateRange(startDate, endDate, timeZone);

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

function formatSellerName(user) {
    if (!user) return "Sin vendedor";
    return `${user.userFirstName ?? ""} ${user.userLastName ?? ""}`.trim() || "Sin vendedor";
}

/**
 * Ventas agrupadas por vendedor o detalle de un vendedor en un rango de fechas.
 * @param {{ startDate: string, endDate: string, sellerId?: string | null }} filters
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {string} [timeZone]
 */
export async function getSalesBySellerReport(
    { startDate, endDate, sellerId },
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const { start, end } = parseDateRange(startDate, endDate, timeZone);
    const sellerFilter = sellerId?.trim() || null;

    if (sellerFilter) {
        const seller = await prisma.user.findUnique({
            where: { userId: sellerFilter },
            select: {
                userId: true,
                userFirstName: true,
                userLastName: true,
            },
        });

        if (!seller) {
            throw new Error("INVALID_SELLER");
        }

        const sellerName = formatSellerName(seller);

        const [aggregate, sales] = await Promise.all([
            prisma.sale.aggregate({
                _sum: {
                    saleTotal: true,
                    saleTotalPayments: true,
                    salePendingAmount: true,
                },
                _count: { saleId: true },
                where: {
                    createdByUserId: sellerFilter,
                    createdAt: { gte: start, lte: end },
                },
            }),
            prisma.sale.findMany({
                where: {
                    createdByUserId: sellerFilter,
                    createdAt: { gte: start, lte: end },
                },
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
            reportType: "sales-by-seller",
            viewMode: "detail",
            period: {
                startDate,
                endDate,
                sellerId: sellerFilter,
                sellerName,
            },
            summary: {
                totalSales: aggregate._sum.saleTotal ?? 0,
                totalPaid: aggregate._sum.saleTotalPayments ?? 0,
                totalPending: aggregate._sum.salePendingAmount ?? 0,
                transactionCount: aggregate._count.saleId ?? 0,
                sellerCount: 1,
            },
            rows: sales.map((sale) => ({
                id: sale.saleId,
                number: sale.saleNumber,
                date: sale.createdAt,
                sellerId: sellerFilter,
                sellerName,
                customer: `${sale.customer?.customerFirstName ?? ""} ${sale.customer?.customerLastName ?? ""}`.trim(),
                total: sale.saleTotal,
                paid: sale.saleTotalPayments,
                pending: sale.salePendingAmount,
            })),
        };
    }

    const groups = await prisma.sale.groupBy({
        by: ["createdByUserId"],
        where: { createdAt: { gte: start, lte: end } },
        _sum: {
            saleTotal: true,
            saleTotalPayments: true,
            salePendingAmount: true,
        },
        _count: { saleId: true },
    });

    const userIds = groups.map((group) => group.createdByUserId);
    const users = userIds.length
        ? await prisma.user.findMany({
              where: { userId: { in: userIds } },
              select: {
                  userId: true,
                  userFirstName: true,
                  userLastName: true,
              },
          })
        : [];

    const userMap = new Map(users.map((user) => [user.userId, user]));

    const rows = groups
        .map((group) => {
            const user = userMap.get(group.createdByUserId);
            return {
                sellerId: group.createdByUserId,
                sellerName: formatSellerName(user),
                transactionCount: group._count.saleId ?? 0,
                totalSales: group._sum.saleTotal ?? 0,
                totalPaid: group._sum.saleTotalPayments ?? 0,
                totalPending: group._sum.salePendingAmount ?? 0,
            };
        })
        .sort((a, b) => b.totalSales - a.totalSales);

    const summary = rows.reduce(
        (acc, row) => ({
            totalSales: acc.totalSales + row.totalSales,
            totalPaid: acc.totalPaid + row.totalPaid,
            totalPending: acc.totalPending + row.totalPending,
            transactionCount: acc.transactionCount + row.transactionCount,
            sellerCount: acc.sellerCount + 1,
        }),
        {
            totalSales: 0,
            totalPaid: 0,
            totalPending: 0,
            transactionCount: 0,
            sellerCount: 0,
        },
    );

    return {
        reportType: "sales-by-seller",
        viewMode: "summary",
        period: { startDate, endDate, sellerId: null, sellerName: null },
        summary,
        rows,
    };
}

import { DEFAULT_BUSINESS_TIMEZONE, sanitizeTimezone } from "./businessTimezone.js";

/** Cantidad de ventas en una fecha de negocio (YYYY-MM-DD en TZ del negocio). */
export async function getSaleCountForBusinessDate(
    prisma,
    dailySalesDay,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const tz = sanitizeTimezone(timeZone);
    const rows = await prisma.$queryRawUnsafe(
        `
        SELECT COUNT(*)::int AS count
        FROM "Sale"
        WHERE TO_CHAR(
            ("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE $1,
            'YYYY-MM-DD'
        ) = $2
        `,
        tz,
        dailySalesDay,
    );
    return Number(rows[0]?.count ?? 0);
}

export async function businessDateHasSales(
    prisma,
    dailySalesDay,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    return (await getSaleCountForBusinessDate(prisma, dailySalesDay, timeZone)) > 0;
}

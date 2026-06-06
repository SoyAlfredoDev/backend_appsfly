/** Cantidad de ventas en una fecha de negocio (America/Santiago, YYYY-MM-DD). */
export async function getSaleCountForBusinessDate(prisma, dailySalesDay) {
    const rows = await prisma.$queryRaw`
        SELECT COUNT(*)::int AS count
        FROM "Sale"
        WHERE TO_CHAR(
            ("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE 'America/Santiago',
            'YYYY-MM-DD'
        ) = ${dailySalesDay}
    `;
    return Number(rows[0]?.count ?? 0);
}

export async function businessDateHasSales(prisma, dailySalesDay) {
    return (await getSaleCountForBusinessDate(prisma, dailySalesDay)) > 0;
}

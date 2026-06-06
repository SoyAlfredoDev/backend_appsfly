import { businessDateHasSales } from '../libs/businessSalesDate.js';
import { buildDailyClosurePayload } from './dailySalesClosureService.js';

/**
 * Elimina cierres duplicados y cierres de días sin ventas.
 * Por cada día con ventas conserva el registro más antiguo y recalcula sus totales.
 */
export async function cleanupDailySalesDuplicates(prisma, { dryRun = false } = {}) {
    const allClosures = await prisma.dailySales.findMany({
        orderBy: [{ dailySalesDay: 'asc' }, { createdAt: 'asc' }],
    });

    const byDay = new Map();
    for (const closure of allClosures) {
        const day = String(closure.dailySalesDay ?? '').trim();
        if (!day) continue;
        if (!byDay.has(day)) byDay.set(day, []);
        byDay.get(day).push(closure);
    }

    const deletedDuplicates = [];
    const removedNoSales = [];
    const kept = [];
    const recalculated = [];

    for (const [day, closures] of byDay) {
        const hasSales = await businessDateHasSales(prisma, day);

        if (!hasSales) {
            for (const closure of closures) {
                removedNoSales.push({
                    dailySalesId: closure.dailySalesId,
                    dailySalesDay: day,
                    reason: 'NO_SALES',
                });
                if (!dryRun) {
                    await prisma.dailySales.delete({
                        where: { dailySalesId: closure.dailySalesId },
                    });
                }
            }
            continue;
        }

        const keeper = closures[0];
        const duplicates = closures.slice(1);

        for (const dup of duplicates) {
            deletedDuplicates.push({
                dailySalesId: dup.dailySalesId,
                dailySalesDay: day,
                keptId: keeper.dailySalesId,
                reason: 'DUPLICATE',
            });
            if (!dryRun) {
                await prisma.dailySales.delete({
                    where: { dailySalesId: dup.dailySalesId },
                });
            }
        }

        kept.push({
            dailySalesId: keeper.dailySalesId,
            dailySalesDay: day,
            duplicatesRemoved: duplicates.length,
        });

        if (!dryRun) {
            const payload = await buildDailyClosurePayload(
                day,
                keeper.createdByUserId,
                prisma,
                keeper.dailySalesId,
            );
            await prisma.dailySales.update({
                where: { dailySalesId: keeper.dailySalesId },
                data: {
                    dailySalesNumberOfSales: payload.dailySalesNumberOfSales,
                    dailySalesTotalSales: payload.dailySalesTotalSales,
                    dailySalesTotalIncome: payload.dailySalesTotalIncome,
                    dailySalesDetailIncome: payload.dailySalesDetailIncome,
                },
            });
            recalculated.push(keeper.dailySalesId);
        }
    }

    return {
        dryRun,
        totalBefore: allClosures.length,
        daysProcessed: byDay.size,
        keptCount: kept.length,
        deletedDuplicatesCount: deletedDuplicates.length,
        removedNoSalesCount: removedNoSales.length,
        deletedDuplicates,
        removedNoSales,
        kept,
        recalculated,
    };
}

import { PrismaClient as PrismaBusiness } from '../src/generated/business/index.js';
import { getBusinessService } from '../services/businessService.js';
import { cleanupDailySalesDuplicates } from '../services/dailySalesCleanupService.js';

const dryRun = process.argv.includes('--dry-run');

async function cleanupBusinessDatabase(business) {
    const connection = business.businessConnectionDB;
    if (!connection) {
        return {
            businessId: business.businessId,
            businessName: business.businessName,
            status: 'skipped',
            reason: 'Sin conexión DB',
        };
    }

    const prisma = new PrismaBusiness({
        datasources: { db: { url: connection } },
    });

    try {
        const result = await cleanupDailySalesDuplicates(prisma, { dryRun });
        return {
            businessId: business.businessId,
            businessName: business.businessName,
            status: dryRun ? 'dry-run' : 'cleaned',
            ...result,
        };
    } finally {
        await prisma.$disconnect();
    }
}

async function main() {
    console.log(dryRun ? '🔍 Modo dry-run (sin cambios)\n' : '🧹 Limpiando cierres diarios duplicados...\n');

    const businesses = await getBusinessService();
    const results = [];

    for (const business of businesses) {
        console.log(`→ ${business.businessName ?? business.businessId}`);
        try {
            const result = await cleanupBusinessDatabase(business);
            results.push(result);
            if (result.status === 'skipped') {
                console.log(`  ⚠ ${result.reason}`);
            } else {
                console.log(
                    `  ${dryRun ? 'Detectado' : 'Corregido'}: ${result.deletedDuplicatesCount} duplicado(s), ` +
                    `${result.removedNoSalesCount} sin ventas, ${result.keptCount} día(s) conservado(s) ` +
                    `(antes: ${result.totalBefore} registros)`,
                );
            }
        } catch (error) {
            console.error(`  ❌ Error: ${error.message}`);
            results.push({
                businessId: business.businessId,
                businessName: business.businessName,
                status: 'error',
                error: error.message,
            });
        }
    }

    console.log('\n📊 RESUMEN');
    console.table(
        results.map((r) => ({
            negocio: r.businessName ?? r.businessId,
            estado: r.status,
            antes: r.totalBefore ?? '-',
            duplicados: r.deletedDuplicatesCount ?? '-',
            sinVentas: r.removedNoSalesCount ?? '-',
            conservados: r.keptCount ?? '-',
        })),
    );

    process.exit(0);
}

main().catch((error) => {
    console.error('Error fatal:', error);
    process.exit(1);
});

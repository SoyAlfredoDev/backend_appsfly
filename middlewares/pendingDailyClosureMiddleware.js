import { assertSalesAllowed } from '../services/pendingDailyClosureService.js';

/**
 * Bloquea POST de ventas si hay cierre pendiente o el día ya está cerrado.
 * Requiere dbSelectorMiddleware previo (req.prisma).
 */
export async function pendingDailyClosureMiddleware(req, res, next) {
    try {
        await assertSalesAllowed(req.prisma);
        next();
    } catch (error) {
        res.status(error.statusCode || 403).json({
            error: error.code || 'BLOQUEO_CIERRE_PENDIENTE',
            message: error.message,
            fechaPendiente: error.fechaPendiente ?? null,
        });
    }
}

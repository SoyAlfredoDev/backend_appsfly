import { assertSalesAllowed } from '../services/pendingDailyClosureService.js';
import { DEFAULT_BUSINESS_TIMEZONE } from '../libs/businessTimezone.js';

/**
 * Bloquea POST de ventas si hay cierre pendiente o el día ya está cerrado.
 * Requiere dbSelectorMiddleware previo (req.prisma).
 */
export async function pendingDailyClosureMiddleware(req, res, next) {
    try {
        await assertSalesAllowed(
            req.prisma,
            req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE,
        );
        next();
    } catch (error) {
        if (!error.statusCode) {
            console.error('Error checking daily closure:', error);
            return res.status(500).json({
                error: 'CLOSURE_STATUS_FAILED',
                code: 'CLOSURE_STATUS_FAILED',
                message: 'No se pudo comprobar el estado del cierre diario. Intenta nuevamente.',
            });
        }
        res.status(error.statusCode).json({
            error: error.code || 'BLOQUEO_CIERRE_PENDIENTE',
            code: error.code || 'BLOQUEO_CIERRE_PENDIENTE',
            message: error.message,
            fechaPendiente: error.fechaPendiente ?? null,
        });
    }
}

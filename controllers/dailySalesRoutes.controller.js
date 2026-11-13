import { getDailySalesService, getDailySaleByIdService } from '../services/dailySalesService.js';
import { getPendingClosureStatus, closeAllPendingClosures } from '../services/pendingDailyClosureService.js';
import { createDailyClosureForDate } from '../services/dailySalesClosureService.js';
import { getDailySaleDetailService } from '../services/dailySalesDetailService.js';
import { DEFAULT_BUSINESS_TIMEZONE } from '../libs/businessTimezone.js';

const tzOf = (req) => req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE;

export const createDailySaleController = async (req, res) => {
    try {
        const { dailySalesDay, dailySalesId, countedCash } = req.body;
        const { prisma, user } = req;
        const timeZone = tzOf(req);

        const createdDailySale = await createDailyClosureForDate({
            dailySalesDay,
            dailySalesId,
            createdByUserId: user.payload.id,
            prisma,
            countedCash,
            timeZone,
        });

        return res.status(201).json(createdDailySale);

    } catch (error) {
        if ((error.statusCode || error.status) && error.code) {
            return res.status(error.statusCode ?? error.status).json({
                message: error.message,
                code: error.code,
                type: error.code,
            });
        }
        console.error("Error creating daily sale:", error);
        return res.status(500).json({
            message: "Error creating daily sale",
            code: "DAILY_CLOSURE_FAILED",
        });
    }
};

export const getDailySalesController = async (req, res) => {
    try {
        const { prisma } = req;
        const dailySales = await getDailySalesService(prisma);
        return res.status(200).json(dailySales);
    } catch (error) {
        console.error("Error getting daily sales:", error);
        return res.status(500).json({
            message: "Error getting daily sales",
            error: error.message,
        });
    }
};

export const getClosureStatusController = async (req, res) => {
    try {
        const status = await getPendingClosureStatus(req.prisma, tzOf(req));
        return res.status(200).json(status);
    } catch (error) {
        console.error("Error getting closure status:", error);
        return res.status(500).json({
            message: "Error al verificar el estado de cierre diario",
            error: error.message,
        });
    }
};

export const closeAllPendingClosuresController = async (req, res) => {
    try {
        const { prisma, user } = req;
        const result = await closeAllPendingClosures(
            prisma,
            user.payload.id,
            tzOf(req),
        );

        if (result.closedCount === 0) {
            return res.status(200).json({
                message: 'No hay cierres diarios pendientes.',
                ...result,
            });
        }

        return res.status(201).json({
            message: `Se procesaron ${result.closedCount} cierre(s) pendiente(s).`,
            ...result,
        });
    } catch (error) {
        console.error("Error closing all pending daily sales:", error);
        return res.status(500).json({
            message: "No se pudieron procesar todos los cierres pendientes. Actualiza el historial antes de volver a intentar.",
            code: "DAILY_CLOSURE_BATCH_FAILED",
        });
    }
};

export const getDailySaleDetailController = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await getDailySaleDetailService(id, req.prisma, tzOf(req));

        if (!detail) {
            return res.status(404).json({ message: 'Cierre diario no encontrado' });
        }

        return res.status(200).json(detail);
    } catch (error) {
        console.error('Error getting daily sale detail:', error);
        return res.status(500).json({
            message: 'Error al obtener el detalle del cierre',
            error: error.message,
        });
    }
};

export const getDailySaleByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const { prisma } = req;
        const dailySale = await getDailySaleByIdService(id, prisma);

        if (!dailySale) {
            return res.status(404).json({ message: "Cierre diario no encontrado" });
        }

        return res.status(200).json(dailySale);
    } catch (error) {
        console.error("Error getting daily sale by id:", error);
        return res.status(500).json({
            message: "Error getting daily sale by id",
            error: error.message,
        });
    }
};

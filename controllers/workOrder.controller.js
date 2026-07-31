import {
    getWorkOrders,
    getWorkOrdersBySaleId,
    getWorkOrderById,
    generateWorkOrdersFromSale,
    updateWorkOrder,
    updateWorkOrderStatus,
    receiveWorkOrder,
    deleteWorkOrder,
} from "../services/workOrdersService.js";

export const listWorkOrdersController = async (req, res) => {
    try {
        const workOrders = await getWorkOrders(req.prisma, {
            status: req.query.status,
            saleId: req.query.saleId,
            laboratoryId: req.query.laboratoryId,
            customerId: req.query.customerId,
        });
        res.status(200).json(workOrders);
    } catch (error) {
        console.error("(workOrder.controller.js): list:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const listWorkOrdersBySaleController = async (req, res) => {
    try {
        const workOrders = await getWorkOrdersBySaleId(req.params.saleId, req.prisma);
        res.status(200).json(workOrders);
    } catch (error) {
        console.error("(workOrder.controller.js): by sale:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getWorkOrderByIdController = async (req, res) => {
    try {
        const workOrder = await getWorkOrderById(req.params.id, req.prisma);
        if (!workOrder) {
            return res.status(404).json({ message: "Orden de trabajo no encontrada." });
        }
        res.status(200).json(workOrder);
    } catch (error) {
        console.error("(workOrder.controller.js): get:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const generateWorkOrdersController = async (req, res) => {
    try {
        const { saleId, saleDetailIds, prescriptionId, laboratoryId, notes } = req.body;
        if (!saleId) {
            return res.status(400).json({ message: "saleId es obligatorio." });
        }
        const workOrders = await generateWorkOrdersFromSale(
            {
                saleId,
                saleDetailIds,
                prescriptionId,
                laboratoryId,
                notes,
                createdByUserId: req.user.payload.id,
            },
            req.prisma,
        );
        res.status(201).json({
            message: "Órdenes de trabajo generadas",
            workOrders,
        });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(workOrder.controller.js): generate:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

export const updateWorkOrderController = async (req, res) => {
    try {
        const workOrder = await updateWorkOrder(req.params.id, req.body, req.prisma);
        res.status(200).json(workOrder);
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(workOrder.controller.js): update:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

export const updateWorkOrderStatusController = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "status es obligatorio." });
        }
        const workOrder = await updateWorkOrderStatus(req.params.id, status, req.prisma, {
            userId: req.user.payload.id,
        });
        res.status(200).json(workOrder);
    } catch (error) {
        const statusCode = error.statusCode ?? 500;
        if (statusCode >= 500) console.error("(workOrder.controller.js): status:", error);
        res.status(statusCode).json({ message: error.message, code: error.code });
    }
};

export const receiveWorkOrderController = async (req, res) => {
    try {
        const workOrder = await receiveWorkOrder(req.params.id, req.prisma);
        res.status(200).json(workOrder);
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(workOrder.controller.js): receive:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

export const deleteWorkOrderController = async (req, res) => {
    try {
        await deleteWorkOrder(req.params.id, req.prisma);
        res.status(200).json({ message: "Orden de trabajo eliminada." });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(workOrder.controller.js): delete:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

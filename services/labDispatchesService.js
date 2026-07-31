import { refreshLabDispatchStatus } from "./workOrdersService.js";

const dispatchInclude = {
    laboratory: true,
    sentBy: {
        select: { userId: true, userFirstName: true, userLastName: true },
    },
    createdBy: {
        select: { userId: true, userFirstName: true, userLastName: true },
    },
    WorkOrder: {
        include: {
            customer: {
                select: {
                    customerId: true,
                    customerFirstName: true,
                    customerLastName: true,
                },
            },
            sale: { select: { saleId: true, saleNumber: true } },
            saleDetail: {
                include: {
                    product: { select: { productId: true, productName: true } },
                },
            },
        },
        orderBy: { createdAt: "asc" },
    },
};

export const countLabDispatches = async (prisma) => prisma.labDispatch.count();

export const defineLabDispatchNumber = async (prisma) => {
    const count = await countLabDispatches(prisma);
    const next = Number(count) + 1;
    return `DESP-${String(next).padStart(5, "0")}`;
};

export const getLabDispatches = async (prisma, filters = {}) => {
    const where = {};
    if (filters.status) where.labDispatchStatus = filters.status;
    if (filters.laboratoryId) where.laboratoryId = filters.laboratoryId;

    return prisma.labDispatch.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
            ...dispatchInclude,
            _count: { select: { WorkOrder: true } },
        },
    });
};

export const getLabDispatchById = async (labDispatchId, prisma) => {
    return prisma.labDispatch.findUnique({
        where: { labDispatchId },
        include: dispatchInclude,
    });
};

/**
 * Agrupa OT pendientes de envío del mismo laboratorio en un despacho.
 */
export const createLabDispatch = async (
    { laboratoryId, workOrderIds, labDispatchNotes, createdByUserId },
    prisma,
) => {
    if (!laboratoryId) {
        const error = new Error("laboratoryId es obligatorio.");
        error.statusCode = 400;
        throw error;
    }

    if (!Array.isArray(workOrderIds) || workOrderIds.length === 0) {
        const error = new Error("Debes seleccionar al menos una orden de trabajo.");
        error.statusCode = 400;
        throw error;
    }

    const lab = await prisma.laboratory.findUnique({ where: { laboratoryId } });
    if (!lab) {
        const error = new Error("Laboratorio no encontrado.");
        error.statusCode = 404;
        throw error;
    }

    const orders = await prisma.workOrder.findMany({
        where: { workOrderId: { in: workOrderIds } },
    });

    if (orders.length !== workOrderIds.length) {
        const error = new Error("Una o más órdenes de trabajo no existen.");
        error.statusCode = 400;
        throw error;
    }

    for (const order of orders) {
        if (order.laboratoryId !== laboratoryId) {
            const error = new Error(
                "Todas las OT del despacho deben pertenecer al mismo laboratorio.",
            );
            error.statusCode = 400;
            error.code = "LABORATORY_MISMATCH";
            throw error;
        }
        if (order.workOrderStatus !== "PENDING_SHIPMENT") {
            const error = new Error(
                `La OT ${order.workOrderNumber || order.workOrderId} no está pendiente de envío.`,
            );
            error.statusCode = 400;
            error.code = "INVALID_OT_STATUS_FOR_DISPATCH";
            throw error;
        }
        if (order.labDispatchId) {
            const error = new Error(
                `La OT ${order.workOrderNumber || order.workOrderId} ya pertenece a un despacho.`,
            );
            error.statusCode = 400;
            throw error;
        }
    }

    const labDispatchNumber = await defineLabDispatchNumber(prisma);
    const now = new Date();

    const dispatch = await prisma.$transaction(async (tx) => {
        const created = await tx.labDispatch.create({
            data: {
                labDispatchNumber,
                laboratoryId,
                labDispatchStatus: "SENT",
                sentAt: now,
                sentByUserId: createdByUserId,
                labDispatchNotes: labDispatchNotes?.trim() || null,
                createdByUserId,
            },
        });

        await tx.workOrder.updateMany({
            where: { workOrderId: { in: workOrderIds } },
            data: {
                labDispatchId: created.labDispatchId,
                workOrderStatus: "SENT_TO_LAB",
            },
        });

        return created;
    });

    return getLabDispatchById(dispatch.labDispatchId, prisma);
};

export const receiveWorkOrdersInDispatch = async (
    { labDispatchId, workOrderIds },
    prisma,
) => {
    const dispatch = await getLabDispatchById(labDispatchId, prisma);
    if (!dispatch) {
        const error = new Error("Despacho no encontrado.");
        error.statusCode = 404;
        throw error;
    }

    if (dispatch.labDispatchStatus === "CANCELLED") {
        const error = new Error("El despacho está cancelado.");
        error.statusCode = 400;
        throw error;
    }

    const ids = Array.isArray(workOrderIds) && workOrderIds.length > 0
        ? workOrderIds
        : dispatch.WorkOrder
            .filter((wo) => wo.workOrderStatus === "SENT_TO_LAB")
            .map((wo) => wo.workOrderId);

    if (ids.length === 0) {
        const error = new Error("No hay OT pendientes de recepción en este despacho.");
        error.statusCode = 400;
        throw error;
    }

    const now = new Date();
    await prisma.workOrder.updateMany({
        where: {
            labDispatchId,
            workOrderId: { in: ids },
            workOrderStatus: "SENT_TO_LAB",
        },
        data: {
            workOrderStatus: "RECEIVED",
            receivedAt: now,
        },
    });

    await refreshLabDispatchStatus(labDispatchId, prisma);
    return getLabDispatchById(labDispatchId, prisma);
};

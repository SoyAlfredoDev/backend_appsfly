export const WORK_ORDER_STATUSES = [
    "CREATED",
    "PENDING_SHIPMENT",
    "SENT_TO_LAB",
    "RECEIVED",
    "QUALITY_CONTROL",
    "READY_FOR_DELIVERY",
    "DELIVERED",
];

/** Transiciones permitidas del flujo OT */
const ALLOWED_TRANSITIONS = {
    CREATED: ["PENDING_SHIPMENT"],
    PENDING_SHIPMENT: ["SENT_TO_LAB", "CREATED"],
    SENT_TO_LAB: ["RECEIVED"],
    RECEIVED: ["QUALITY_CONTROL"],
    QUALITY_CONTROL: ["READY_FOR_DELIVERY", "RECEIVED"],
    READY_FOR_DELIVERY: ["DELIVERED", "QUALITY_CONTROL"],
    DELIVERED: [],
};

const workOrderInclude = {
    laboratory: true,
    prescription: {
        select: {
            prescriptionId: true,
            prescriptionDate: true,
            prescriptionType: true,
            prescribedBy: true,
            entryMode: true,
        },
    },
    sale: {
        select: {
            saleId: true,
            saleNumber: true,
            saleDeliveryStatus: true,
        },
    },
    saleDetail: {
        include: {
            product: {
                select: {
                    productId: true,
                    productName: true,
                    productSKU: true,
                    productRequiresLabWork: true,
                },
            },
        },
    },
    customer: {
        select: {
            customerId: true,
            customerFirstName: true,
            customerLastName: true,
            customerDocumentNumber: true,
            customerCodePhoneNumber: true,
            customerPhoneNumber: true,
        },
    },
    labDispatch: {
        select: {
            labDispatchId: true,
            labDispatchNumber: true,
            labDispatchStatus: true,
            sentAt: true,
        },
    },
    createdBy: {
        select: {
            userId: true,
            userFirstName: true,
            userLastName: true,
        },
    },
};

export const countWorkOrders = async (prisma) => prisma.workOrder.count();

export const defineWorkOrderNumber = async (prisma) => {
    const count = await countWorkOrders(prisma);
    const next = Number(count) + 1;
    return `OT-${String(next).padStart(5, "0")}`;
};

export const getWorkOrders = async (prisma, filters = {}) => {
    const where = {};
    if (filters.status) where.workOrderStatus = filters.status;
    if (filters.saleId) where.saleId = filters.saleId;
    if (filters.laboratoryId) where.laboratoryId = filters.laboratoryId;
    if (filters.customerId) where.customerId = filters.customerId;

    return prisma.workOrder.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: workOrderInclude,
    });
};

export const getWorkOrdersBySaleId = async (saleId, prisma) => {
    return prisma.workOrder.findMany({
        where: { saleId },
        orderBy: { createdAt: "asc" },
        include: workOrderInclude,
    });
};

export const getWorkOrderById = async (workOrderId, prisma) => {
    return prisma.workOrder.findUnique({
        where: { workOrderId },
        include: workOrderInclude,
    });
};

/** Sincroniza sale.saleDeliveryStatus según OTs de la venta (óptica). */
export const syncSaleDeliveryFromWorkOrders = async (saleId, prisma, { deliveredByUserId } = {}) => {
    if (!saleId) return null;

    const orders = await prisma.workOrder.findMany({
        where: { saleId },
        select: { workOrderStatus: true },
    });

    if (orders.length === 0) {
        return prisma.sale.update({
            where: { saleId },
            data: {
                saleDeliveryStatus: null,
                saleDeliveredAt: null,
                saleDeliveredByUserId: null,
            },
        });
    }

    const allDelivered = orders.every((o) => o.workOrderStatus === "DELIVERED");
    if (allDelivered) {
        return prisma.sale.update({
            where: { saleId },
            data: {
                saleDeliveryStatus: "DELIVERED",
                saleDeliveredAt: new Date(),
                saleDeliveredByUserId: deliveredByUserId || undefined,
            },
        });
    }

    return prisma.sale.update({
        where: { saleId },
        data: {
            saleDeliveryStatus: "PENDING",
            saleDeliveredAt: null,
            saleDeliveredByUserId: null,
        },
    });
};

export const createWorkOrder = async (data, prisma) => {
    const wo = await prisma.workOrder.create({
        data,
        include: workOrderInclude,
    });
    if (data.saleId) {
        await syncSaleDeliveryFromWorkOrders(data.saleId, prisma, {
            deliveredByUserId: data.createdByUserId,
        });
    }
    return wo;
};

/**
 * Genera una OT por cada línea PRODUCT seleccionada (o por las marcadas productRequiresLabWork).
 */
export const generateWorkOrdersFromSale = async (
    { saleId, saleDetailIds, prescriptionId, laboratoryId, createdByUserId, notes },
    prisma,
) => {
    const sale = await prisma.sale.findUnique({
        where: { saleId },
        include: {
            SaleDetail: {
                include: {
                    product: {
                        select: {
                            productId: true,
                            productName: true,
                            productRequiresLabWork: true,
                        },
                    },
                },
            },
        },
    });

    if (!sale) {
        const error = new Error("Venta no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    let details = sale.SaleDetail.filter((d) => d.saleDetailType === "PRODUCT");

    if (Array.isArray(saleDetailIds) && saleDetailIds.length > 0) {
        const idSet = new Set(saleDetailIds);
        details = details.filter((d) => idSet.has(d.saleDetailId));
    } else {
        const flagged = details.filter((d) => d.product?.productRequiresLabWork);
        if (flagged.length > 0) details = flagged;
    }

    if (details.length === 0) {
        const error = new Error("No hay productos elegibles para generar órdenes de trabajo.");
        error.statusCode = 400;
        error.code = "NO_ELIGIBLE_PRODUCTS";
        throw error;
    }

    const existing = await prisma.workOrder.findMany({
        where: {
            saleId,
            saleDetailId: { in: details.map((d) => d.saleDetailId) },
        },
        select: { saleDetailId: true },
    });
    const alreadyLinked = new Set(existing.map((e) => e.saleDetailId));
    const toCreate = details.filter((d) => !alreadyLinked.has(d.saleDetailId));

    if (toCreate.length === 0) {
        const error = new Error("Ya existen órdenes de trabajo para los productos seleccionados.");
        error.statusCode = 400;
        error.code = "WORK_ORDERS_ALREADY_EXIST";
        throw error;
    }

    if (prescriptionId) {
        const rx = await prisma.prescription.findUnique({ where: { prescriptionId } });
        if (!rx || rx.customerId !== sale.saleCustomerId) {
            const error = new Error("La receta no pertenece al cliente de la venta.");
            error.statusCode = 400;
            throw error;
        }
    }

    if (laboratoryId) {
        const lab = await prisma.laboratory.findUnique({ where: { laboratoryId } });
        if (!lab) {
            const error = new Error("Laboratorio no encontrado.");
            error.statusCode = 404;
            throw error;
        }
    }

    const created = [];
    for (const detail of toCreate) {
        const workOrderNumber = await defineWorkOrderNumber(prisma);
        const initialStatus = laboratoryId ? "PENDING_SHIPMENT" : "CREATED";
        const wo = await prisma.workOrder.create({
            data: {
                workOrderNumber,
                saleId,
                saleDetailId: detail.saleDetailId,
                customerId: sale.saleCustomerId,
                prescriptionId: prescriptionId || null,
                laboratoryId: laboratoryId || null,
                workOrderStatus: initialStatus,
                workOrderNotes: notes || null,
                quantity: detail.saleDetailQuantity || 1,
                createdByUserId,
            },
            include: workOrderInclude,
        });
        created.push(wo);
    }

    await syncSaleDeliveryFromWorkOrders(saleId, prisma, {
        deliveredByUserId: createdByUserId,
    });

    return created;
};

export const updateWorkOrder = async (workOrderId, body, prisma) => {
    const existing = await getWorkOrderById(workOrderId, prisma);
    if (!existing) {
        const error = new Error("Orden de trabajo no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    if (["SENT_TO_LAB", "RECEIVED", "QUALITY_CONTROL", "READY_FOR_DELIVERY", "DELIVERED"].includes(existing.workOrderStatus)) {
        if (body.laboratoryId !== undefined && body.laboratoryId !== existing.laboratoryId) {
            const error = new Error("No se puede cambiar el laboratorio de una OT ya enviada o avanzada.");
            error.statusCode = 400;
            throw error;
        }
    }

    const data = {};

    if (body.prescriptionId !== undefined) data.prescriptionId = body.prescriptionId || null;
    if (body.workOrderNotes !== undefined) data.workOrderNotes = body.workOrderNotes?.trim() || null;
    if (body.workOrderLabNotes !== undefined) data.workOrderLabNotes = body.workOrderLabNotes?.trim() || null;
    if (body.quantity !== undefined) {
        const q = Number(body.quantity);
        if (Number.isFinite(q) && q > 0) data.quantity = q;
    }

    if (body.laboratoryId !== undefined) {
        data.laboratoryId = body.laboratoryId || null;
        if (data.laboratoryId && existing.workOrderStatus === "CREATED") {
            data.workOrderStatus = "PENDING_SHIPMENT";
        }
        if (!data.laboratoryId && existing.workOrderStatus === "PENDING_SHIPMENT" && !existing.labDispatchId) {
            data.workOrderStatus = "CREATED";
        }
    }

    return prisma.workOrder.update({
        where: { workOrderId },
        data,
        include: workOrderInclude,
    });
};

export const assertTransition = (from, to) => {
    const allowed = ALLOWED_TRANSITIONS[from] || [];
    if (!allowed.includes(to)) {
        const error = new Error(`Transición de estado no permitida: ${from} → ${to}.`);
        error.statusCode = 400;
        error.code = "INVALID_STATUS_TRANSITION";
        throw error;
    }
};

export const updateWorkOrderStatus = async (workOrderId, nextStatus, prisma, { userId } = {}) => {
    const existing = await getWorkOrderById(workOrderId, prisma);
    if (!existing) {
        const error = new Error("Orden de trabajo no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    if (!WORK_ORDER_STATUSES.includes(nextStatus)) {
        const error = new Error("Estado de OT inválido.");
        error.statusCode = 400;
        throw error;
    }

    assertTransition(existing.workOrderStatus, nextStatus);

    if (nextStatus === "PENDING_SHIPMENT" && !existing.laboratoryId) {
        const error = new Error("Debes asignar un laboratorio antes de marcar pendiente de envío.");
        error.statusCode = 400;
        throw error;
    }

    if (nextStatus === "SENT_TO_LAB") {
        const error = new Error("El envío a laboratorio se registra mediante un despacho agrupado.");
        error.statusCode = 400;
        error.code = "USE_LAB_DISPATCH";
        throw error;
    }

    const data = { workOrderStatus: nextStatus };
    if (nextStatus === "RECEIVED") data.receivedAt = new Date();
    if (nextStatus === "READY_FOR_DELIVERY") data.readyForDeliveryAt = new Date();
    if (nextStatus === "DELIVERED") data.deliveredAt = new Date();

    const updated = await prisma.workOrder.update({
        where: { workOrderId },
        data,
        include: workOrderInclude,
    });

    if (nextStatus === "RECEIVED" && existing.labDispatchId) {
        await refreshLabDispatchStatus(existing.labDispatchId, prisma);
    }

    if (existing.saleId) {
        await syncSaleDeliveryFromWorkOrders(existing.saleId, prisma, {
            deliveredByUserId: userId,
        });
    }

    return updated;
};

export const receiveWorkOrder = async (workOrderId, prisma) => {
    return updateWorkOrderStatus(workOrderId, "RECEIVED", prisma);
};

export const refreshLabDispatchStatus = async (labDispatchId, prisma) => {
    const orders = await prisma.workOrder.findMany({
        where: { labDispatchId },
        select: { workOrderStatus: true },
    });
    if (orders.length === 0) return null;

    const receivedOrBeyond = new Set([
        "RECEIVED",
        "QUALITY_CONTROL",
        "READY_FOR_DELIVERY",
        "DELIVERED",
    ]);
    const receivedCount = orders.filter((o) => receivedOrBeyond.has(o.workOrderStatus)).length;

    let labDispatchStatus = "SENT";
    if (receivedCount === orders.length) labDispatchStatus = "RECEIVED";
    else if (receivedCount > 0) labDispatchStatus = "PARTIAL_RECEIVED";

    return prisma.labDispatch.update({
        where: { labDispatchId },
        data: { labDispatchStatus },
    });
};

export const deleteWorkOrder = async (workOrderId, prisma) => {
    const existing = await getWorkOrderById(workOrderId, prisma);
    if (!existing) {
        const error = new Error("Orden de trabajo no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    if (!["CREATED", "PENDING_SHIPMENT"].includes(existing.workOrderStatus)) {
        const error = new Error("Solo se pueden eliminar OT en estado Creada o Pendiente de Envío.");
        error.statusCode = 400;
        throw error;
    }

    if (existing.labDispatchId) {
        const error = new Error("La OT está asociada a un despacho y no puede eliminarse.");
        error.statusCode = 400;
        throw error;
    }

    const saleId = existing.saleId;
    const deleted = await prisma.workOrder.delete({ where: { workOrderId } });
    if (saleId) {
        await syncSaleDeliveryFromWorkOrders(saleId, prisma);
    }
    return deleted;
};

/** Bloqueo de entrega de venta: si hay OT, todas deben estar DELIVERED. */
export const assertSaleWorkOrdersAllowDelivery = async (saleId, prisma) => {
    const orders = await prisma.workOrder.findMany({
        where: { saleId },
        select: { workOrderId: true, workOrderNumber: true, workOrderStatus: true },
    });

    if (orders.length === 0) return;

    const pending = orders.filter((o) => o.workOrderStatus !== "DELIVERED");
    if (pending.length > 0) {
        const error = new Error(
            `No se puede marcar la venta como entregada: ${pending.length} orden(es) de trabajo aún no están entregadas al cliente.`,
        );
        error.statusCode = 400;
        error.code = "WORK_ORDERS_PENDING_DELIVERY";
        error.pendingWorkOrders = pending;
        throw error;
    }
};

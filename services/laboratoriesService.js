import { cacheGetOrSet, cacheInvalidate } from "../libs/tenantCache.js";

const LABORATORIES_TTL_MS = 5 * 60_000;

const formatOptionalString = (value) => {
    if (value == null || value === "") return null;
    return String(value).trim();
};

const formatOptionalLower = (value) => {
    if (value == null || value === "") return null;
    return String(value).trim().toLowerCase();
};

export const formatLaboratoryPayload = (body, createdByUserId = undefined) => {
    const data = {
        laboratoryName: formatOptionalString(body.laboratoryName),
        laboratoryDocumentType: formatOptionalLower(body.laboratoryDocumentType),
        laboratoryDocumentNumber: formatOptionalString(body.laboratoryDocumentNumber),
        laboratoryAddress: formatOptionalString(body.laboratoryAddress),
        laboratoryCodePhoneNumber: body.laboratoryCodePhoneNumber?.trim() || null,
        laboratoryPhoneNumber: formatOptionalString(body.laboratoryPhoneNumber),
        laboratoryEmail: formatOptionalLower(body.laboratoryEmail),
        laboratoryComment: formatOptionalString(body.laboratoryComment),
    };

    if (body.laboratoryActive !== undefined) {
        data.laboratoryActive = Boolean(body.laboratoryActive);
    }

    if (createdByUserId !== undefined) {
        data.createdByUserId = createdByUserId;
    }

    return data;
};

export const createLaboratory = async (data, prisma, businessId = null) => {
    const created = await prisma.laboratory.create({ data });
    if (businessId) cacheInvalidate(businessId, "laboratories");
    return created;
};

export const getLaboratories = async (
    prisma,
    { activeOnly = false, businessId = null } = {},
) => {
    const extra = activeOnly ? "active" : "all";
    return cacheGetOrSet(
        businessId,
        "laboratories",
        () =>
            prisma.laboratory.findMany({
                where: activeOnly ? { laboratoryActive: true } : undefined,
                orderBy: { laboratoryName: "asc" },
                include: {
                    _count: { select: { WorkOrder: true, LabDispatch: true } },
                },
            }),
        LABORATORIES_TTL_MS,
        extra,
    );
};

export const getLaboratoryById = async (laboratoryId, prisma) => {
    return prisma.laboratory.findUnique({
        where: { laboratoryId },
        include: {
            _count: { select: { WorkOrder: true, LabDispatch: true } },
        },
    });
};

export const updateLaboratory = async (laboratoryId, body, prisma, businessId = null) => {
    const data = formatLaboratoryPayload(body);
    const updated = await prisma.laboratory.update({ where: { laboratoryId }, data });
    if (businessId) cacheInvalidate(businessId, "laboratories");
    return updated;
};

export const deleteLaboratory = async (laboratoryId, prisma, businessId = null) => {
    const [woCount, dispatchCount] = await Promise.all([
        prisma.workOrder.count({ where: { laboratoryId } }),
        prisma.labDispatch.count({ where: { laboratoryId } }),
    ]);

    if (woCount > 0 || dispatchCount > 0) {
        const error = new Error(
            "No se puede eliminar el laboratorio porque tiene órdenes de trabajo o despachos asociados.",
        );
        error.statusCode = 400;
        throw error;
    }

    const deleted = await prisma.laboratory.delete({ where: { laboratoryId } });
    if (businessId) cacheInvalidate(businessId, "laboratories");
    return deleted;
};

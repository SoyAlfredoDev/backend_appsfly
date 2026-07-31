import {
    createPrescription,
    getPrescriptionsByCustomerId,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
} from "../services/prescriptionsService.js";
import { getCustomerByIdService } from "../services/customersService.js";
import { deleteCloudinaryImageByUrl, deleteCloudinaryImageIfReplaced } from "../services/cloudinaryService.js";
import { parseBusinessDateOnly, DEFAULT_BUSINESS_TIMEZONE } from "../libs/businessTimezone.js";

const MEASUREMENT_FIELDS = [
    "odSphere", "odCylinder", "odAxis", "odAddition", "odPrism", "odBase",
    "oiSphere", "oiCylinder", "oiAxis", "oiAddition", "oiPrism", "oiBase",
    "pdBinocular", "pdOd", "pdOi", "pdNear",
];

const OPTIONAL_STRING_FIELDS = [
    ...MEASUREMENT_FIELDS,
    "prescribedBy",
    "prescriptionType",
    "prescriptionNotes",
    "prescriptionImageUrl",
    "entryMode",
];

const formatOptionalString = (value) => {
    if (value === undefined) return undefined;
    if (value === null) return null;
    const trimmed = String(value).trim();
    return trimmed || null;
};

const formatOptionalDate = (value, timeZone = DEFAULT_BUSINESS_TIMEZONE) =>
    parseBusinessDateOnly(value, timeZone);

const hasManualMeasurements = (data) =>
    MEASUREMENT_FIELDS.some((field) => {
        const value = data[field];
        return value !== undefined && value !== null && String(value).trim() !== "";
    });

const resolveEntryMode = ({ entryMode, prescriptionImageUrl, data }) => {
    const hasImage = Boolean(prescriptionImageUrl);
    const hasManual = hasManualMeasurements(data);
    if (entryMode === "PHOTO" || entryMode === "MANUAL" || entryMode === "MIXED") {
        if (entryMode === "PHOTO" && !hasImage) return null;
        if (entryMode === "MANUAL" && !hasManual) return null;
        if (entryMode === "MIXED" && (!hasImage || !hasManual)) return null;
        return entryMode;
    }
    if (hasImage && hasManual) return "MIXED";
    if (hasImage) return "PHOTO";
    if (hasManual) return "MANUAL";
    return null;
};

const buildPrescriptionPayload = (
    body,
    { requireCreatedBy = false, timeZone = DEFAULT_BUSINESS_TIMEZONE } = {},
) => {
    const data = {};

    for (const field of OPTIONAL_STRING_FIELDS) {
        if (body[field] !== undefined) {
            data[field] = formatOptionalString(body[field]);
        }
    }

    if (body.prescriptionDate !== undefined) {
        data.prescriptionDate = formatOptionalDate(body.prescriptionDate, timeZone);
    }
    if (body.prescriptionExpiresAt !== undefined) {
        data.prescriptionExpiresAt = formatOptionalDate(body.prescriptionExpiresAt, timeZone);
    }

    if (requireCreatedBy) {
        data.createdByUserId = body.createdByUserId;
    } else if (body.createdByUserId !== undefined) {
        data.createdByUserId = body.createdByUserId;
    }

    return data;
};

export const createPrescriptionController = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await getCustomerByIdService(customerId, req.prisma);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        if (!req.body.createdByUserId) {
            return res.status(400).json({ message: "createdByUserId is required" });
        }

        const data = buildPrescriptionPayload(req.body, {
            requireCreatedBy: true,
            timeZone: req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE,
        });
        data.customerId = customerId;

        const entryMode = resolveEntryMode({
            entryMode: data.entryMode,
            prescriptionImageUrl: data.prescriptionImageUrl,
            data,
        });

        if (!entryMode) {
            return res.status(400).json({
                message: "La receta debe incluir una imagen y/o datos de graduación.",
            });
        }
        data.entryMode = entryMode;

        const prescription = await createPrescription(data, req.prisma);
        res.status(201).json({
            message: "Prescription registered successfully",
            prescription,
        });
    } catch (error) {
        console.error("(prescription.controller.js): Error creating prescription:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const listPrescriptionsByCustomerController = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await getCustomerByIdService(customerId, req.prisma);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const prescriptions = await getPrescriptionsByCustomerId(customerId, req.prisma);
        res.status(200).json(prescriptions);
    } catch (error) {
        console.error("(prescription.controller.js): Error listing prescriptions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPrescriptionByIdController = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const prescription = await getPrescriptionById(prescriptionId, req.prisma);
        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }
        res.status(200).json(prescription);
    } catch (error) {
        console.error("(prescription.controller.js): Error getting prescription:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePrescriptionController = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const existing = await getPrescriptionById(prescriptionId, req.prisma);
        if (!existing) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        const data = buildPrescriptionPayload(req.body, {
            timeZone: req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE,
        });
        delete data.createdByUserId;

        const mergedForValidation = { ...existing, ...data };
        const entryMode = resolveEntryMode({
            entryMode: data.entryMode ?? existing.entryMode,
            prescriptionImageUrl: mergedForValidation.prescriptionImageUrl,
            data: mergedForValidation,
        });

        if (!entryMode) {
            return res.status(400).json({
                message: "La receta debe incluir una imagen y/o datos de graduación.",
            });
        }
        data.entryMode = entryMode;

        const prescription = await updatePrescription(prescriptionId, data, req.prisma);
        await deleteCloudinaryImageIfReplaced(
            existing.prescriptionImageUrl,
            data.prescriptionImageUrl !== undefined
                ? data.prescriptionImageUrl
                : existing.prescriptionImageUrl,
        );

        res.status(200).json({
            message: "Prescription updated successfully",
            prescription,
        });
    } catch (error) {
        console.error("(prescription.controller.js): Error updating prescription:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deletePrescriptionController = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const existing = await getPrescriptionById(prescriptionId, req.prisma);
        if (!existing) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        await deletePrescription(prescriptionId, req.prisma);

        if (existing.prescriptionImageUrl) {
            await deleteCloudinaryImageByUrl(existing.prescriptionImageUrl);
        }

        res.status(200).json({ message: "Prescription deleted successfully" });
    } catch (error) {
        console.error("(prescription.controller.js): Error deleting prescription:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

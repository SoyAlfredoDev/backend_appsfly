import {
    createLaboratory,
    getLaboratories,
    getLaboratoryById,
    updateLaboratory,
    deleteLaboratory,
    formatLaboratoryPayload,
} from "../services/laboratoriesService.js";

export const createLaboratoryController = async (req, res) => {
    try {
        if (!req.body.laboratoryName?.trim()) {
            return res.status(400).json({ message: "El nombre del laboratorio es obligatorio." });
        }
        const data = formatLaboratoryPayload(req.body, req.user.payload.id);
        const laboratory = await createLaboratory(data, req.prisma, req.tenantBusinessId);
        res.status(201).json(laboratory);
    } catch (error) {
        console.error("(laboratory.controller.js): create:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getLaboratoriesController = async (req, res) => {
    try {
        const activeOnly = req.query.activeOnly === "true";
        const laboratories = await getLaboratories(req.prisma, {
            activeOnly,
            businessId: req.tenantBusinessId,
        });
        res.status(200).json(laboratories);
    } catch (error) {
        console.error("(laboratory.controller.js): list:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getLaboratoryByIdController = async (req, res) => {
    try {
        const laboratory = await getLaboratoryById(req.params.id, req.prisma);
        if (!laboratory) {
            return res.status(404).json({ message: "Laboratorio no encontrado." });
        }
        res.status(200).json(laboratory);
    } catch (error) {
        console.error("(laboratory.controller.js): get:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateLaboratoryController = async (req, res) => {
    try {
        if (!req.body.laboratoryName?.trim()) {
            return res.status(400).json({ message: "El nombre del laboratorio es obligatorio." });
        }
        const existing = await getLaboratoryById(req.params.id, req.prisma);
        if (!existing) {
            return res.status(404).json({ message: "Laboratorio no encontrado." });
        }
        const laboratory = await updateLaboratory(
            req.params.id,
            req.body,
            req.prisma,
            req.tenantBusinessId,
        );
        res.status(200).json(laboratory);
    } catch (error) {
        console.error("(laboratory.controller.js): update:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteLaboratoryController = async (req, res) => {
    try {
        const existing = await getLaboratoryById(req.params.id, req.prisma);
        if (!existing) {
            return res.status(404).json({ message: "Laboratorio no encontrado." });
        }
        await deleteLaboratory(req.params.id, req.prisma, req.tenantBusinessId);
        res.status(200).json({ message: "Laboratorio eliminado correctamente." });
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).json({ message: error.message });
        }
        console.error("(laboratory.controller.js): delete:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

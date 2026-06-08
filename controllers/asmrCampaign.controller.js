import {
    segmentAsmrCampaign,
    executeAsmrCampaign,
    listAsmrCampaigns,
    getAsmrCampaignSummary,
} from "../services/asmrCampaign/asmrCampaignService.js";

export const segmentAsmrCampaignController = async (req, res) => {
    try {
        const result = await segmentAsmrCampaign(req.prisma, req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error("(asmrCampaign.controller.js): Error segmenting:", error);
        const status = error.statusCode || 500;
        res.status(status).json({ message: error.message || "Internal server error" });
    }
};

export const executeAsmrCampaignController = async (req, res) => {
    try {
        const userId = req.user.payload.id;
        const result = await executeAsmrCampaign(req.prisma, req.body, userId);
        res.status(201).json({
            message:
                "El WhatsApp ha sido creado correctamente, los mensajes han sido enviados correctamente.",
            ...result,
        });
    } catch (error) {
        console.error("(asmrCampaign.controller.js): Error executing:", error);
        const status = error.statusCode || 500;
        res.status(status).json({ message: error.message || "Internal server error" });
    }
};

export const listAsmrCampaignsController = async (req, res) => {
    try {
        const campaigns = await listAsmrCampaigns(req.prisma);
        res.status(200).json(campaigns);
    } catch (error) {
        console.error("(asmrCampaign.controller.js): Error listing:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAsmrCampaignSummaryController = async (req, res) => {
    try {
        const summary = await getAsmrCampaignSummary(req.prisma);
        res.status(200).json(summary);
    } catch (error) {
        console.error("(asmrCampaign.controller.js): Error summary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

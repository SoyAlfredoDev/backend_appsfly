import { createQuotation, getQuotationById, getQuotations, updateQuotationStatus, deleteQuotation } from '../services/quotationServices.js';
import { sendQuotationEmailToCustomer } from '../services/quotationEmailService.js';
import { syncQuotationEmailDeliveryFromResend } from '../services/quotationEmailDeliveryService.js';
import defineQuotationNumber from '../libs/defineQuotationNumber.js';

export const createQuotationController = async (req, res) => {
    try {
        const { quotationId, quotationCustomerId, quotationTotal, quotationComment, quotationExpiresAt } = req.body;
        const userId = req.user.payload.id;
        const numberQuotation = await defineQuotationNumber(req.prisma);

        const total = Number(quotationTotal);

        const data = {
            quotationId,
            quotationNumber: numberQuotation,
            quotationCustomerId,
            createdByUserId: userId,
            quotationTotal: total,
            quotationComment,
            quotationExpiresAt: quotationExpiresAt ? new Date(quotationExpiresAt) : null,
            quotationStatus: "DRAFT"
        };

        const quotation = await createQuotation(data, req.prisma);
        res.status(201).json({
            message: 'Quotation created successfully',
            quotation
        });
    } catch (error) {
        console.error("(quotation.controller.js): Error creating quotation:", error);
        res.status(500).json({
            message: error.message || "Internal server error",
            code: error.code,
        });
    }
};

export const getQuotationsController = async (req, res) => {
    try {
        const quotations = await getQuotations(req.prisma);
        res.status(200).json(quotations);
    } catch (error) {
        console.error("(quotation.controller.js): Error fetching quotations:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getQuotationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        await syncQuotationEmailDeliveryFromResend(
            id,
            req.tenantBusinessId,
            req.prisma,
        ).catch((error) => {
            console.warn("[quotation] Sync entregas Resend:", error.message);
        });

        const quotation = await getQuotationById(id, req.prisma);
        if (!quotation) {
            return res.status(404).json({ message: "Quotation not found" });
        }
        res.status(200).json(quotation);
    } catch (error) {
        console.error("(quotation.controller.js): Error fetching quotation by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateQuotationStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const validStatuses = ["DRAFT", "SENT", "ACCEPTED", "EXPIRED"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const quotation = await updateQuotationStatus(id, status, req.prisma);
        res.status(200).json({
            message: "Quotation status updated successfully",
            quotation
        });
    } catch (error) {
        console.error("(quotation.controller.js): Error updating quotation status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteQuotationController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const quotation = await getQuotationById(id, req.prisma);
        if (!quotation) {
            return res.status(404).json({ message: "Quotation not found" });
        }

        if (quotation.quotationStatus !== "DRAFT") {
            return res.status(400).json({ message: "Only quotations in DRAFT status can be deleted" });
        }

        await deleteQuotation(id, req.prisma);
        res.status(200).json({ message: "Quotation deleted successfully" });
    } catch (error) {
        console.error("(quotation.controller.js): Error deleting quotation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendQuotationEmailController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sendQuotationEmailToCustomer(
            id,
            req.tenantBusinessId,
            req.prisma,
        );
        res.status(200).json({
            message: "Quotation email sent successfully",
            ...result,
        });
    } catch (error) {
        console.error("(quotation.controller.js): Error sending quotation email:", error);
        const status = error.statusCode || 500;
        res.status(status).json({
            message: error.message || "Failed to send quotation email",
            code: error.code,
        });
    }
};

import {
    getPurchaseCertificates,
    getPurchaseCertificatesBySaleId,
    getPurchaseCertificateById,
    createPurchaseCertificateFromSale,
    updatePurchaseCertificate,
    issuePurchaseCertificate,
    voidPurchaseCertificate,
    deletePurchaseCertificate,
} from "../services/purchaseCertificatesService.js";

export const listPurchaseCertificatesController = async (req, res) => {
    try {
        const certificates = await getPurchaseCertificates(req.prisma, {
            saleId: req.query.saleId,
            status: req.query.status,
        });
        res.status(200).json(certificates);
    } catch (error) {
        console.error("(purchaseCertificate.controller.js): list:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const listBySaleController = async (req, res) => {
    try {
        const certificates = await getPurchaseCertificatesBySaleId(
            req.params.saleId,
            req.prisma,
        );
        res.status(200).json(certificates);
    } catch (error) {
        console.error("(purchaseCertificate.controller.js): by sale:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getByIdController = async (req, res) => {
    try {
        const certificate = await getPurchaseCertificateById(req.params.id, req.prisma);
        if (!certificate) {
            return res.status(404).json({ message: "Certificado no encontrado." });
        }
        res.status(200).json(certificate);
    } catch (error) {
        console.error("(purchaseCertificate.controller.js): get:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createFromSaleController = async (req, res) => {
    try {
        const { saleId, comment, issuedDate, responsibleName } = req.body;
        if (!saleId) {
            return res.status(400).json({ message: "saleId es obligatorio." });
        }

        const certificate = await createPurchaseCertificateFromSale(
            {
                saleId,
                createdByUserId: req.user.payload.id,
                businessId: req.tenantBusinessId,
                comment,
                issuedDate,
                responsibleName,
            },
            req.prisma,
        );

        res.status(201).json({
            message: "Certificado de compra creado",
            certificate,
        });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(purchaseCertificate.controller.js): create:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

export const updateController = async (req, res) => {
    try {
        const certificate = await updatePurchaseCertificate(
            req.params.id,
            req.body,
            req.prisma,
        );
        res.status(200).json(certificate);
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(purchaseCertificate.controller.js): update:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

export const issueController = async (req, res) => {
    try {
        const certificate = await issuePurchaseCertificate(
            {
                purchaseCertificateId: req.params.id,
                issuedByUserId: req.user.payload.id,
                businessId: req.tenantBusinessId,
            },
            req.prisma,
        );
        res.status(200).json({
            message: "Certificado emitido",
            certificate,
        });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(purchaseCertificate.controller.js): issue:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

export const voidController = async (req, res) => {
    try {
        const certificate = await voidPurchaseCertificate(req.params.id, req.prisma);
        res.status(200).json({ message: "Certificado anulado", certificate });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(purchaseCertificate.controller.js): void:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

export const deleteController = async (req, res) => {
    try {
        await deletePurchaseCertificate(req.params.id, req.prisma);
        res.status(200).json({ message: "Certificado eliminado." });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(purchaseCertificate.controller.js): delete:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

import {
    EDITABLE_CAMPAIGN_STATUSES,
    PLATFORM_EMAIL_AUDIENCE_TYPES,
    PLATFORM_EMAIL_CAMPAIGN_STATUSES,
    PLATFORM_EMAIL_AUDIENCE_LABELS,
    PLATFORM_EMAIL_STATUS_LABELS,
} from "../services/adminEmailCampaign/adminEmailCampaignConstants.js";
import {
    createPlatformEmailCampaignService,
    deletePlatformEmailCampaignService,
    getCampaignMetadata,
    getPlatformEmailCampaignByIdService,
    listPlatformEmailCampaignsService,
    countAudiencePreviewService,
    updatePlatformEmailCampaignService,
    getCampaignRunDetailService,
} from "../services/adminEmailCampaign/adminEmailCampaignService.js";
import { countSuspendedBusinessAdminRecipients, countPlanExpiringBusinessAdminRecipients, countPlatformProspectRecipients } from "../services/adminEmailCampaign/adminEmailCampaignAudienceService.js";
import {
    ensureSystemEmailCampaigns,
    executePlatformEmailCampaign,
    getCampaignRunStats,
    canRunMonthlyCampaign,
} from "../services/adminEmailCampaign/adminEmailCampaignSendService.js";
import {
    renderCampaignEmail,
    getSamplePreviewRecipient,
} from "../services/adminEmailCampaign/adminEmailCampaignTemplateService.js";
import { SYSTEM_CAMPAIGN_DEFINITIONS } from "../services/adminEmailCampaign/adminEmailCampaignConstants.js";
import {
    normalizeSenderEmail,
    resolveCampaignSenderFrom,
} from "../services/adminEmailCampaign/adminEmailCampaignSenderService.js";

function getUserId(req) {
    return req.user?.payload?.id;
}

function parseAudienceType(value) {
    if (!value || !PLATFORM_EMAIL_AUDIENCE_TYPES.includes(value)) {
        return null;
    }
    return value;
}

function parseStatus(value) {
    if (!value || !PLATFORM_EMAIL_CAMPAIGN_STATUSES.includes(value)) {
        return null;
    }
    return value;
}

function buildCampaignPayload(body, { partial = false } = {}) {
    const payload = {};

    if (!partial || body.campaignName !== undefined) {
        payload.campaignName = String(body.campaignName ?? "").trim();
    }
    if (!partial || body.campaignDescription !== undefined) {
        payload.campaignDescription = body.campaignDescription?.trim() || null;
    }
    if (!partial || body.audienceType !== undefined) {
        const audienceType = parseAudienceType(body.audienceType);
        if (audienceType) payload.audienceType = audienceType;
    }
    if (!partial || body.audienceParams !== undefined) {
        payload.audienceParams =
            body.audienceParams && typeof body.audienceParams === "object"
                ? body.audienceParams
                : null;
    }
    if (!partial || body.emailSubject !== undefined) {
        payload.emailSubject = body.emailSubject?.trim() || null;
    }
    if (!partial || body.emailHtml !== undefined) {
        payload.emailHtml = body.emailHtml?.trim() || null;
    }
    if (!partial || body.emailText !== undefined) {
        payload.emailText = body.emailText?.trim() || null;
    }
    if (!partial || body.messageIntent !== undefined) {
        payload.messageIntent = body.messageIntent?.trim() || null;
    }
    if (!partial || body.senderEmail !== undefined) {
        const raw = body.senderEmail?.trim();
        if (raw) {
            const normalized = normalizeSenderEmail(raw);
            if (!normalized) {
                payload._senderEmailInvalid = true;
            } else {
                payload.senderEmail = normalized;
            }
        } else {
            payload.senderEmail = null;
        }
    }
    if (!partial || body.senderName !== undefined) {
        payload.senderName = body.senderName?.trim() || null;
    }
    if (!partial || body.scheduledAt !== undefined) {
        payload.scheduledAt = body.scheduledAt ? new Date(body.scheduledAt) : null;
    }
    if (!partial || body.campaignStatus !== undefined) {
        const status = parseStatus(body.campaignStatus);
        if (status) payload.campaignStatus = status;
    }

    return payload;
}

export const getEmailCampaignMetadataController = async (req, res) => {
    try {
        const meta = getCampaignMetadata();
        return res.json({
            ...meta,
            statusLabels: PLATFORM_EMAIL_STATUS_LABELS,
            audienceLabels: PLATFORM_EMAIL_AUDIENCE_LABELS,
            systemCampaigns: SYSTEM_CAMPAIGN_DEFINITIONS,
        });
    } catch (error) {
        console.error("(adminEmailCampaign.metadata):", error);
        return res.status(500).json({ message: "No se pudo obtener la metadata." });
    }
};

export const listEmailCampaignsController = async (req, res) => {
    try {
        const campaigns = await listPlatformEmailCampaignsService();
        return res.json(campaigns);
    } catch (error) {
        console.error("(adminEmailCampaign.list):", error);
        return res.status(500).json({ message: "No se pudieron listar las campañas." });
    }
};

export const getEmailCampaignController = async (req, res) => {
    try {
        const campaign = await getPlatformEmailCampaignByIdService(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaña no encontrada." });
        }
        return res.json(campaign);
    } catch (error) {
        console.error("(adminEmailCampaign.get):", error);
        return res.status(500).json({ message: "No se pudo obtener la campaña." });
    }
};

export const createEmailCampaignController = async (req, res) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return res.status(401).json({ message: "Usuario no autenticado." });
        }

        const payload = buildCampaignPayload(req.body);
        if (payload._senderEmailInvalid) {
            return res.status(400).json({
                message: "El correo remitente debe pertenecer al dominio de plataforma configurado.",
            });
        }
        delete payload._senderEmailInvalid;
        if (!payload.campaignName) {
            return res.status(400).json({ message: "El nombre de la campaña es obligatorio." });
        }

        const audienceType =
            parseAudienceType(req.body.audienceType) ?? "ALL_USERS";

        const campaign = await createPlatformEmailCampaignService({
            campaignName: payload.campaignName,
            campaignDescription: payload.campaignDescription ?? null,
            campaignStatus: "DRAFT",
            audienceType,
            audienceParams: payload.audienceParams ?? null,
            emailSubject: payload.emailSubject ?? null,
            emailHtml: payload.emailHtml ?? null,
            emailText: payload.emailText ?? null,
            messageIntent: payload.messageIntent ?? null,
            senderEmail: payload.senderEmail ?? null,
            senderName: payload.senderName ?? null,
            scheduledAt: payload.scheduledAt ?? null,
            createdByUserId: userId,
        });

        return res.status(201).json(campaign);
    } catch (error) {
        console.error("(adminEmailCampaign.create):", error);
        return res.status(500).json({ message: "No se pudo crear la campaña." });
    }
};

export const updateEmailCampaignController = async (req, res) => {
    try {
        const existing = await getPlatformEmailCampaignByIdService(req.params.id);
        if (!existing) {
            return res.status(404).json({ message: "Campaña no encontrada." });
        }

        if (!EDITABLE_CAMPAIGN_STATUSES.includes(existing.campaignStatus)) {
            return res.status(400).json({
                message:
                    "Solo se pueden editar campañas en borrador o programadas.",
            });
        }

        const payload = buildCampaignPayload(req.body, { partial: true });
        if (payload._senderEmailInvalid) {
            return res.status(400).json({
                message: "El correo remitente debe pertenecer al dominio de plataforma configurado.",
            });
        }
        delete payload._senderEmailInvalid;

        if (existing.campaignKey) {
            delete payload.senderEmail;
            delete payload.senderName;
        }

        if (payload.campaignName !== undefined && !payload.campaignName) {
            return res.status(400).json({ message: "El nombre no puede estar vacío." });
        }

        const campaign = await updatePlatformEmailCampaignService(
            req.params.id,
            payload,
        );
        return res.json(campaign);
    } catch (error) {
        console.error("(adminEmailCampaign.update):", error);
        return res.status(500).json({ message: "No se pudo actualizar la campaña." });
    }
};

export const deleteEmailCampaignController = async (req, res) => {
    try {
        const existing = await getPlatformEmailCampaignByIdService(req.params.id);
        if (!existing) {
            return res.status(404).json({ message: "Campaña no encontrada." });
        }

        if (existing.campaignKey) {
            return res.status(400).json({
                message: "Las campañas del sistema no se pueden eliminar.",
            });
        }

        if (existing.campaignStatus !== "DRAFT") {
            return res.status(400).json({
                message: "Solo se pueden eliminar campañas en borrador.",
            });
        }

        await deletePlatformEmailCampaignService(req.params.id);
        return res.json({ ok: true });
    } catch (error) {
        console.error("(adminEmailCampaign.delete):", error);
        return res.status(500).json({ message: "No se pudo eliminar la campaña." });
    }
};

export const previewEmailCampaignAudienceController = async (req, res) => {
    try {
        const audienceType =
            parseAudienceType(req.body?.audienceType) ??
            parseAudienceType(req.query?.audienceType);

        if (!audienceType) {
            return res.status(400).json({ message: "Tipo de audiencia inválido." });
        }

        const estimatedRecipients = await countAudiencePreviewService(audienceType);
        let audienceDetail = null;

        if (audienceType === "SUSPENDED_BUSINESS_ADMINS") {
            audienceDetail = await countSuspendedBusinessAdminRecipients();
        } else if (audienceType === "BUSINESS_ADMINS_PLAN_EXPIRING_5D") {
            audienceDetail = await countPlanExpiringBusinessAdminRecipients(5);
        } else if (audienceType === "BUSINESS_ADMINS_PLAN_EXPIRING_TODAY") {
            audienceDetail = await countPlanExpiringBusinessAdminRecipients(0);
        } else if (audienceType === "PLATFORM_PROSPECTS") {
            audienceDetail = await countPlatformProspectRecipients();
        }

        const audienceNotes = {
            CUSTOM_SEGMENT: "Segmentos personalizados se configurarán próximamente.",
            SUSPENDED_BUSINESS_ADMINS:
                "Administradores de negocios sin plan activo (pantalla suspendida).",
            BUSINESS_ADMINS_PLAN_EXPIRING_5D:
                "Administradores de negocios cuyo plan activo vence en 5 días (calendario Chile).",
            BUSINESS_ADMINS_PLAN_EXPIRING_TODAY:
                "Administradores de negocios cuyo plan activo vence hoy (calendario Chile).",
            PLATFORM_PROSPECTS:
                "Prospectos activos en la lista (no usuarios registrados ni admins suspendidos).",
        };

        return res.json({
            audienceType,
            label: PLATFORM_EMAIL_AUDIENCE_LABELS[audienceType],
            estimatedRecipients,
            audienceDetail,
            note: audienceNotes[audienceType] ?? null,
        });
    } catch (error) {
        console.error("(adminEmailCampaign.previewAudience):", error);
        return res.status(500).json({ message: "No se pudo estimar la audiencia." });
    }
};

export const ensureSystemEmailCampaignsController = async (req, res) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return res.status(401).json({ message: "Usuario no autenticado." });
        }
        const results = await ensureSystemEmailCampaigns(userId);
        return res.json({ results });
    } catch (error) {
        console.error("(adminEmailCampaign.ensureSystem):", error);
        return res.status(500).json({ message: "No se pudieron inicializar campañas." });
    }
};

export const previewEmailCampaignMessageController = async (req, res) => {
    try {
        const campaign = await getPlatformEmailCampaignByIdService(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaña no encontrada." });
        }

        const sampleRecipient = getSamplePreviewRecipient();
        const rendered = renderCampaignEmail(campaign, sampleRecipient);

        return res.json({
            subject: rendered.subject,
            html: rendered.html,
            text: rendered.text,
            sampleRecipient,
            senderFrom: resolveCampaignSenderFrom(campaign),
            senderEmail: campaign.senderEmail,
            senderName: campaign.senderName,
        });
    } catch (error) {
        console.error("(adminEmailCampaign.previewMessage):", error);
        return res.status(500).json({ message: "No se pudo generar la vista previa." });
    }
};

export const getEmailCampaignStatsController = async (req, res) => {
    try {
        const stats = await getCampaignRunStats(req.params.id);
        if (!stats) {
            return res.status(404).json({ message: "Campaña no encontrada." });
        }
        return res.json(stats);
    } catch (error) {
        console.error("(adminEmailCampaign.stats):", error);
        return res.status(500).json({ message: "No se pudieron obtener estadísticas." });
    }
};

export const executeEmailCampaignController = async (req, res) => {
    try {
        const force = Boolean(req.body?.force);
        const result = await executePlatformEmailCampaign(req.params.id, { force });
        return res.json(result);
    } catch (error) {
        if (error.message === "CAMPAIGN_NOT_FOUND") {
            return res.status(404).json({ message: "Campaña no encontrada." });
        }
        if (error.message === "CAMPAIGN_ALREADY_RUNNING") {
            return res.status(409).json({ message: "La campaña ya se está enviando." });
        }
        if (error.message === "NO_RECIPIENTS") {
            return res.status(400).json({
                message: "No hay destinatarios para esta audiencia en este momento.",
            });
        }
        if (error.message === "MONTHLY_COOLDOWN") {
            return res.status(429).json({
                message: error.details?.reason ?? "La campaña mensual aún no puede ejecutarse.",
                ...error.details,
            });
        }
        console.error("(adminEmailCampaign.execute):", error);
        return res.status(500).json({ message: "No se pudo ejecutar la campaña." });
    }
};

export const getEmailCampaignRunController = async (req, res) => {
    try {
        const run = await getCampaignRunDetailService(req.params.runId);
        if (!run) {
            return res.status(404).json({ message: "Ejecución no encontrada." });
        }
        return res.json(run);
    } catch (error) {
        console.error("(adminEmailCampaign.runDetail):", error);
        return res.status(500).json({ message: "No se pudo obtener el detalle del envío." });
    }
};

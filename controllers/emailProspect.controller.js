import {
    bulkImportEmailProspects,
    createEmailProspect,
    deleteEmailProspect,
    getEmailProspectByToken,
    getEmailProspectStats,
    listEmailProspects,
    resubscribeEmailProspect,
    unsubscribeEmailProspectByToken,
    buildProspectImportTemplateCsv,
} from "../services/emailProspect/emailProspectService.js";
import { getProspectOutreachVariantsForAdmin } from "../services/adminEmailCampaign/adminEmailCampaignProspectOutreachVariantsService.js";

export async function listProspectsController(req, res) {
    try {
        const status = req.query.status || undefined;
        const search = req.query.search || undefined;
        const prospects = await listEmailProspects({ status, search });
        const stats = await getEmailProspectStats();
        return res.json({ prospects, stats });
    } catch (error) {
        console.error("(emailProspect.list):", error);
        return res.status(500).json({ message: "No se pudieron listar los prospectos." });
    }
}

export async function createProspectController(req, res) {
    try {
        const prospect = await createEmailProspect(req.body ?? {});
        return res.status(201).json(prospect);
    } catch (error) {
        if (error.message === "INVALID_EMAIL") {
            return res.status(400).json({ message: "Correo inválido." });
        }
        if (error.message === "ALREADY_EXISTS") {
            return res.status(409).json({ message: "Ese correo ya está en la lista de prospectos." });
        }
        if (error.message === "ALREADY_UNSUBSCRIBED") {
            return res.status(409).json({
                message: "Ese correo está dado de baja. Reactívalo desde la lista si corresponde.",
            });
        }
        if (error.message === "ALREADY_REGISTERED_USER") {
            return res.status(409).json({
                message: "Ese correo ya es usuario registrado en AppsFly.",
            });
        }
        if (error.message === "ALREADY_CONVERTED") {
            return res.status(409).json({
                message: "Ese correo ya se registró como usuario desde outreach.",
            });
        }
        console.error("(emailProspect.create):", error);
        return res.status(500).json({ message: "No se pudo agregar el prospecto." });
    }
}

export async function bulkImportProspectsController(req, res) {
    try {
        const body = req.body ?? {};
        const rawCount = Array.isArray(body.lines)
            ? body.lines.length
            : Array.isArray(body.rows)
              ? body.rows.length
              : String(body.text ?? "").split(/\r?\n/).filter((l) => l.trim()).length;

        const result = await bulkImportEmailProspects(body, {
            source: body.source ?? "import",
        });
        if (rawCount > 2000) {
            result.truncated = true;
        }
        return res.json(result);
    } catch (error) {
        console.error("(emailProspect.bulkImport):", error);
        return res.status(500).json({ message: "No se pudo importar la lista." });
    }
}

export async function downloadProspectImportTemplateController(req, res) {
    const csv = buildProspectImportTemplateCsv();
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=\"plantilla-prospectos-appsfly.csv\"",
    );
    return res.send(csv);
}

export async function resubscribeProspectController(req, res) {
    try {
        const prospect = await resubscribeEmailProspect(req.params.id);
        return res.json(prospect);
    } catch (error) {
        console.error("(emailProspect.resubscribe):", error);
        return res.status(500).json({ message: "No se pudo reactivar el prospecto." });
    }
}

export async function deleteProspectController(req, res) {
    try {
        await deleteEmailProspect(req.params.id);
        return res.json({ ok: true });
    } catch (error) {
        console.error("(emailProspect.delete):", error);
        return res.status(500).json({ message: "No se pudo eliminar el prospecto." });
    }
}

export async function getUnsubscribeInfoController(req, res) {
    try {
        const prospect = await getEmailProspectByToken(req.params.token);
        if (!prospect) {
            return res.status(404).json({ message: "Enlace de baja no válido." });
        }
        return res.json({
            email: prospect.email,
            status: prospect.status,
            unsubscribedAt: prospect.unsubscribedAt,
        });
    } catch (error) {
        console.error("(emailProspect.unsubscribeInfo):", error);
        return res.status(500).json({ message: "No se pudo verificar el enlace." });
    }
}

export async function unsubscribeProspectController(req, res) {
    try {
        const result = await unsubscribeEmailProspectByToken(req.params.token);
        return res.json({
            ok: true,
            email: result.email,
            alreadyUnsubscribed: result.alreadyUnsubscribed,
        });
    } catch (error) {
        if (error.message === "NOT_FOUND") {
            return res.status(404).json({ message: "Enlace de baja no válido." });
        }
        console.error("(emailProspect.unsubscribe):", error);
        return res.status(500).json({ message: "No se pudo procesar la baja." });
    }
}

export async function getProspectOutreachVariantsController(req, res) {
    try {
        const data = await getProspectOutreachVariantsForAdmin();
        return res.json(data);
    } catch (error) {
        console.error("(emailProspect.outreachVariants):", error);
        return res.status(500).json({ message: "No se pudieron cargar las variantes de outreach." });
    }
}

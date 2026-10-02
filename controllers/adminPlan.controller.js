import {
    getAllPlansService,
    createPlanService,
    updatePlanService,
    deletePlanService,
    countSubscriptionsByPlanId,
    getPlanById,
} from '../services/planService.js';
import { isTenantDatabaseMode } from '../services/database/tenantDatabasePolicy.js';

export const getAdminPlans = async (req, res) => {
    try {
        const plans = await getAllPlansService({ activeOnly: false });
        return res.json(plans);
    } catch (error) {
        console.error("(adminPlan.controller.js): Error listing plans:", error);
        return res.status(500).json({ message: 'Error al obtener planes.' });
    }
};

export const createAdminPlan = async (req, res) => {
    try {
        const {
            planId,
            planName,
            planDescription = null,
            planPrice,
            planDuration,
            planCurrency = 'CLP',
            planFeatures = [],
            planActive = true,
            planDatabaseMode = 'SHARED',
        } = req.body;

        if (!planName?.trim()) {
            return res.status(400).json({ message: 'El nombre del plan es obligatorio.' });
        }
        if (planPrice === undefined || planPrice === null || Number.isNaN(Number(planPrice))) {
            return res.status(400).json({ message: 'El precio del plan es inválido.' });
        }
        if (!planDuration || Number(planDuration) < 1) {
            return res.status(400).json({ message: 'La duración del plan es inválida.' });
        }
        if (!isTenantDatabaseMode(planDatabaseMode)) {
            return res.status(400).json({ message: 'El modo de base de datos del plan es inválido.' });
        }

        const id = planId?.trim() || `P${Date.now().toString(36).slice(-6).toUpperCase()}`;
        if (id === 'OPT-PRO' && Boolean(planActive)) {
            return res.status(409).json({ code: 'PLAN_PENDING_APPROVAL', message: 'El plan Pro requiere aprobación de precio y límites antes de activarse.' });
        }
        if (planCurrency === 'UF' && Boolean(planActive) && process.env.UF_REPRICE_ENABLED !== 'true') {
            return res.status(409).json({ code: 'UF_BILLING_NOT_READY', message: 'Los cobros UF deben habilitarse antes de activar el plan.' });
        }

        const existing = await getPlanById(id);
        if (existing) {
            return res.status(409).json({ message: 'Ya existe un plan con ese identificador.' });
        }

        const features = Array.isArray(planFeatures)
            ? planFeatures
            : typeof planFeatures === 'string'
              ? planFeatures.split('\n').map((f) => f.trim()).filter(Boolean)
              : [];

        const plan = await createPlanService({
            planId: id,
            planName: planName.trim(),
            planDescription: planDescription?.trim() || null,
            planPrice: Number(planPrice),
            planDuration: Number(planDuration),
            planCurrency,
            planFeatures: features,
            planActive: Boolean(planActive),
            planDatabaseMode,
        });

        return res.status(201).json(plan);
    } catch (error) {
        console.error("(adminPlan.controller.js): Error creating plan:", error);
        return res.status(500).json({ message: 'Error al crear el plan.' });
    }
};

export const updateAdminPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await getPlanById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Plan no encontrado.' });
        }
        if (id === 'OPT-PRO' && req.body.planActive !== undefined && Boolean(req.body.planActive)) {
            return res.status(409).json({ code: 'PLAN_PENDING_APPROVAL', message: 'El plan Pro requiere aprobación de precio y límites antes de activarse.' });
        }
        if ((req.body.planCurrency ?? existing.planCurrency) === 'UF' && Boolean(req.body.planActive ?? existing.planActive) && process.env.UF_REPRICE_ENABLED !== 'true') {
            return res.status(409).json({ code: 'UF_BILLING_NOT_READY', message: 'Los cobros UF deben habilitarse antes de activar el plan.' });
        }

        const payload = {};
        const allowed = [
            'planName',
            'planDescription',
            'planPrice',
            'planDuration',
            'planCurrency',
            'planFeatures',
            'planActive',
            'planDatabaseMode',
        ];

        for (const key of allowed) {
            if (req.body[key] !== undefined) {
                payload[key] = req.body[key];
            }
        }

        if (payload.planName !== undefined) payload.planName = payload.planName.trim();
        if (payload.planPrice !== undefined) payload.planPrice = Number(payload.planPrice);
        if (payload.planDuration !== undefined) payload.planDuration = Number(payload.planDuration);
        if (payload.planFeatures !== undefined) {
            payload.planFeatures = Array.isArray(payload.planFeatures)
                ? payload.planFeatures
                : String(payload.planFeatures)
                      .split('\n')
                      .map((f) => f.trim())
                      .filter(Boolean);
        }
        if (
            payload.planDatabaseMode !== undefined &&
            !isTenantDatabaseMode(payload.planDatabaseMode)
        ) {
            return res.status(400).json({ message: 'El modo de base de datos del plan es inválido.' });
        }

        const plan = await updatePlanService(id, payload);
        return res.json(plan);
    } catch (error) {
        console.error("(adminPlan.controller.js): Error updating plan:", error);
        return res.status(500).json({ message: 'Error al actualizar el plan.' });
    }
};

export const suspendAdminPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { planActive } = req.body;
        const existing = await getPlanById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Plan no encontrado.' });
        }

        if (id === 'OPT-PRO' && planActive !== undefined && Boolean(planActive)) {
            return res.status(409).json({ code: 'PLAN_PENDING_APPROVAL', message: 'El plan Pro requiere aprobación de precio y límites antes de activarse.' });
        }
        if (existing.planCurrency === 'UF' && planActive !== undefined && Boolean(planActive) && process.env.UF_REPRICE_ENABLED !== 'true') {
            return res.status(409).json({ code: 'UF_BILLING_NOT_READY', message: 'Los cobros UF deben habilitarse antes de activar el plan.' });
        }

        const plan = await updatePlanService(id, {
            planActive: planActive !== undefined ? Boolean(planActive) : false,
        });
        return res.json(plan);
    } catch (error) {
        console.error("(adminPlan.controller.js): Error suspending plan:", error);
        return res.status(500).json({ message: 'Error al cambiar el estado del plan.' });
    }
};

export const deleteAdminPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await getPlanById(id);
        if (!existing) {
            return res.status(404).json({ message: 'Plan no encontrado.' });
        }

        const linked = await countSubscriptionsByPlanId(id);
        if (linked > 0) {
            return res.status(409).json({
                message: `No se puede eliminar: ${linked} suscripción(es) vinculada(s). Suspende el plan en su lugar.`,
            });
        }

        await deletePlanService(id);
        return res.status(204).send();
    } catch (error) {
        console.error("(adminPlan.controller.js): Error deleting plan:", error);
        return res.status(500).json({ message: 'Error al eliminar el plan.' });
    }
};

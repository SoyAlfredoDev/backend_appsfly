import {
    createUserGuest,
    userGuestExists,
    userGuestResponseService,
    getUserGuests,
    getUserGuestByBusinessIdService,
    getUserGuestById,
    findPendingInvite,
    assertUserBusinessMembership,
    findUserBusinessMembership,
    findUserByEmail,
} from "../services/userGuestService.js";
import { registerUserBusinessAtBusinessDB } from "../controllers/businessDB/user.controller.js";
import { createUserBusinessService } from "../services/userBusinessService.js";
import { getUserById } from "../services/usersService.js";
import { sendUserInvitationEmail } from "../emails/dispatchers/invitation.dispatcher.js";
import { getFrontendBaseUrl } from "../emails/shared/layout.js";

async function loadInviterContext(userId) {
    const user = await getUserById(userId);
    if (!user) return null;
    const inviterName = [user.userFirstName, user.userLastName].filter(Boolean).join(" ");
    return { user, inviterName };
}

async function dispatchInvitationEmail(invite, inviterName) {
    return sendUserInvitationEmail({
        to: invite.userGuestEmail,
        businessName: invite.Business?.businessName,
        inviterName,
        role: invite.userGuestRole,
        registerUrl: `${getFrontendBaseUrl()}/register`,
    });
}

export const createUserGuestController = async (req, res) => {
    try {
        const {
            userGuestId,
            userGuestEmail,
            userGuestBusinessId,
            userGuestRole,
            userGuestStatus = "PENDIENT",
        } = req.body;
        const userId = req.user.payload.id;

        const email = String(userGuestEmail || "").trim().toLowerCase();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Correo electrónico inválido." });
        }
        if (!userGuestBusinessId) {
            return res.status(400).json({ message: "Negocio no especificado." });
        }
        if (!["ADMIN", "USER"].includes(userGuestRole)) {
            return res.status(400).json({ message: "Rol inválido." });
        }

        const membership = await assertUserBusinessMembership(userId, userGuestBusinessId);
        if (!membership) {
            return res.status(403).json({ message: "No tienes permiso para invitar a este negocio." });
        }

        const existingPending = await findPendingInvite(email, userGuestBusinessId);
        if (existingPending) {
            return res.status(409).json({
                message: "Ya existe una invitación pendiente para este correo en el negocio.",
            });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            const alreadyMember = await findUserBusinessMembership(
                existingUser.userId,
                userGuestBusinessId,
            );
            if (alreadyMember) {
                return res.status(409).json({
                    message: "Este usuario ya pertenece al negocio.",
                });
            }
        }

        const inviterCtx = await loadInviterContext(userId);
        if (!inviterCtx) {
            return res.status(401).json({ message: "Usuario invitador no encontrado." });
        }

        const data = {
            userGuestId,
            userGuestEmail: email,
            userGuestBusinessId,
            userGuestRole,
            userGuestUserId: userId,
            userGuestStatus,
        };

        const userGuest = await createUserGuest(data);
        const inviteWithRelations = await getUserGuestById(userGuest.userGuestId);

        let emailSent = false;
        try {
            await dispatchInvitationEmail(inviteWithRelations, inviterCtx.inviterName);
            emailSent = true;
        } catch (emailError) {
            console.error("[userGuest] Error enviando correo de invitación:", emailError.message);
        }

        return res.status(201).json({ ...userGuest, emailSent });
    } catch (error) {
        console.error(">>>> userGuest.controller.js: Error creating user guest:", error);
        return res.status(500).json({ message: "Error interno al crear la invitación." });
    }
};

export const getMyPendingInvitesController = async (req, res) => {
    try {
        const user = await getUserById(req.user.payload.id);
        if (!user?.userEmail) {
            return res.status(401).json({ message: "Usuario no encontrado." });
        }
        const invites = await userGuestExists(user.userEmail);
        return res.status(200).json(invites);
    } catch (error) {
        console.error(">>>> userGuest.controller.js: Error getting pending invites:", error);
        return res.status(500).json({ message: "Error interno al consultar invitaciones." });
    }
};

/** @deprecated Usar GET /userGuest/pending/me — mantiene compatibilidad con email del usuario autenticado. */
export const userGuestExistsController = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getUserById(req.user?.payload?.id);
        if (!user) {
            return res.status(401).json({ message: "No autorizado." });
        }
        if (email.toLowerCase() !== user.userEmail.toLowerCase()) {
            return res.status(403).json({ message: "No puedes consultar invitaciones de otro correo." });
        }
        const userGuest = await userGuestExists(email);
        return res.status(200).json(userGuest);
    } catch (error) {
        console.error(">>>> userGuest.controller.js: Error checking if user guest exists:", error);
        return res.status(500).json({ message: "Error interno al consultar invitaciones." });
    }
};

async function ensureGeneralUserBusinessLink(userId, businessId, role) {
    const existing = await findUserBusinessMembership(userId, businessId);
    if (existing) return existing;

    try {
        return await createUserBusinessService({
            userBusinessUserId: userId,
            userBusinessBusinessId: businessId,
            userBusinessRole: role,
        });
    } catch (error) {
        if (error?.code === "P2002") {
            return findUserBusinessMembership(userId, businessId);
        }
        throw error;
    }
}

export const userGuestResponseController = async (req, res) => {
    try {
        const { userGuestId, response, userGuestRole } = req.body;
        const userId = req.user.payload.id;

        if (!userGuestId || !["ACCEPTED", "REJECTED"].includes(response)) {
            return res.status(400).json({ message: "Solicitud inválida." });
        }

        const invite = await getUserGuestById(userGuestId);
        if (!invite) {
            return res.status(404).json({ message: "Invitación no encontrada." });
        }
        if (invite.userGuestStatus !== "PENDIENT") {
            return res.status(409).json({
                message: "Esta invitación ya fue respondida.",
                status: invite.userGuestStatus,
            });
        }

        const user = await getUserById(userId);
        if (!user?.userEmail) {
            return res.status(401).json({ message: "Usuario no encontrado." });
        }
        if (user.userEmail.toLowerCase() !== invite.userGuestEmail.toLowerCase()) {
            return res.status(403).json({
                message: "Esta invitación no corresponde a tu cuenta.",
            });
        }

        const role = userGuestRole || invite.userGuestRole;

        if (response === "REJECTED") {
            const updated = await userGuestResponseService(userGuestId, "REJECTED");
            return res.status(200).json(updated);
        }

        const updated = await userGuestResponseService(userGuestId, "ACCEPTED");

        let tenantUser = null;
        try {
            tenantUser = await registerUserBusinessAtBusinessDB(
                userId,
                invite.userGuestBusinessId,
                role,
            );
        } catch (tenantError) {
            console.error("[userGuest] Error registrando usuario en business DB:", tenantError);
            return res.status(500).json({
                message: "No se pudo completar el acceso al negocio. Contacta al administrador.",
            });
        }

        let generalLink = null;
        try {
            generalLink = await ensureGeneralUserBusinessLink(
                userId,
                invite.userGuestBusinessId,
                role,
            );
        } catch (linkError) {
            console.error("[userGuest] Error creando UserBusiness en generalDB:", linkError);
            return res.status(500).json({
                message: "Invitación aceptada parcialmente. Intenta iniciar sesión nuevamente.",
            });
        }

        return res.status(200).json({
            ...updated,
            registeredUserBusiness: tenantUser,
            generalUserBusiness: generalLink,
        });
    } catch (error) {
        console.error(">>>> userGuest.controller.js: Error updating user guest:", error);
        return res.status(500).json({ message: "Error interno al procesar la invitación." });
    }
};

export const deleteUserGuestController = async (req, res) => {
    try {
        const { userGuestId } = req.params;
        const userId = req.user.payload.id;

        const invite = await getUserGuestById(userGuestId);
        if (!invite) {
            return res.status(404).json({ message: "Invitación no encontrada." });
        }

        const membership = await assertUserBusinessMembership(userId, invite.userGuestBusinessId);
        if (!membership) {
            return res.status(403).json({ message: "No tienes permiso para eliminar esta invitación." });
        }

        if (invite.userGuestStatus !== "PENDIENT") {
            return res.status(409).json({ message: "Solo se pueden eliminar invitaciones pendientes." });
        }

        const updated = await userGuestResponseService(userGuestId, "DELETED");
        return res.status(200).json(updated);
    } catch (error) {
        console.error(">>>> userGuest.controller.js: Error deleting user guest:", error);
        return res.status(500).json({ message: "Error interno al eliminar la invitación." });
    }
};

export const resendUserGuestController = async (req, res) => {
    try {
        const { userGuestId } = req.params;
        const userId = req.user.payload.id;

        const invite = await getUserGuestById(userGuestId);
        if (!invite) {
            return res.status(404).json({ message: "Invitación no encontrada." });
        }

        const membership = await assertUserBusinessMembership(userId, invite.userGuestBusinessId);
        if (!membership) {
            return res.status(403).json({ message: "No tienes permiso para reenviar esta invitación." });
        }

        if (!["PENDIENT", "REJECTED"].includes(invite.userGuestStatus)) {
            return res.status(409).json({ message: "Esta invitación no puede reenviarse." });
        }

        const inviterCtx = await loadInviterContext(userId);
        if (!inviterCtx) {
            return res.status(401).json({ message: "Usuario no encontrado." });
        }

        let updated = invite;
        if (invite.userGuestStatus === "REJECTED") {
            updated = await userGuestResponseService(userGuestId, "PENDIENT");
        }

        let emailSent = false;
        try {
            await dispatchInvitationEmail(invite, inviterCtx.inviterName);
            emailSent = true;
        } catch (emailError) {
            console.error("[userGuest] Error reenviando correo:", emailError.message);
            return res.status(502).json({
                message: "No se pudo enviar el correo. Intenta más tarde.",
                invite: updated,
                emailSent: false,
            });
        }

        return res.status(200).json({ ...updated, emailSent: true });
    } catch (error) {
        console.error(">>>> userGuest.controller.js: Error resending invitation:", error);
        return res.status(500).json({ message: "Error interno al reenviar la invitación." });
    }
};

export const getUserGuestsController = async (req, res) => {
    try {
        const userGuests = await getUserGuests();
        return res.status(200).json(userGuests);
    } catch (error) {
        console.error(">>>> userGuest.controller.js: Error getting user guests:", error);
        return res.status(500).json({ message: "Error interno al listar invitaciones." });
    }
};

export const getUserGuestByBusinessIdController = async (req, res) => {
    try {
        const { businessId } = req.params;
        const userId = req.user.payload.id;

        const membership = await assertUserBusinessMembership(userId, businessId);
        if (!membership) {
            return res.status(403).json({ message: "No tienes acceso a este negocio." });
        }

        const userGuest = await getUserGuestByBusinessIdService(businessId);
        return res.status(200).json(userGuest);
    } catch (error) {
        console.error(">>>> userGuest.controller.js: Error getting user guest by business id:", error);
        return res.status(500).json({ message: "Error interno al listar invitaciones del negocio." });
    }
};

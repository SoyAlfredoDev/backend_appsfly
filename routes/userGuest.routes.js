import { Router } from "express";
import {
    createUserGuestController,
    userGuestExistsController,
    userGuestResponseController,
    getUserGuestsController,
    getUserGuestByBusinessIdController,
    getMyPendingInvitesController,
    deleteUserGuestController,
    resendUserGuestController,
    getInvitePreviewController,
} from "../controllers/userGuest.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { ensureTenantRole, requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const userGuestRouter = Router();
const admin = [authRequired, ensureTenantRole, requireTenantAdmin];

userGuestRouter.get("/userGuest/invite/:userGuestId/preview", getInvitePreviewController);
userGuestRouter.post("/userGuest", ...admin, createUserGuestController);
userGuestRouter.get("/userGuest/pending/me", authRequired, getMyPendingInvitesController);
userGuestRouter.get("/userGuest/exists/:email", authRequired, userGuestExistsController);
userGuestRouter.put("/userGuest/update/", authRequired, userGuestResponseController);
userGuestRouter.delete("/userGuest/invitation/:userGuestId", ...admin, deleteUserGuestController);
userGuestRouter.post("/userGuest/invitation/:userGuestId/resend", ...admin, resendUserGuestController);
userGuestRouter.get("/userGuest", ...admin, getUserGuestsController);
userGuestRouter.get("/userGuest/:businessId", ...admin, getUserGuestByBusinessIdController);

export default userGuestRouter;

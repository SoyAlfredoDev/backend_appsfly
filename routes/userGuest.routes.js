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
} from "../controllers/userGuest.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const userGuestRouter = Router();

userGuestRouter.post("/userGuest", authRequired, createUserGuestController);
userGuestRouter.get("/userGuest/pending/me", authRequired, getMyPendingInvitesController);
userGuestRouter.get("/userGuest/exists/:email", authRequired, userGuestExistsController);
userGuestRouter.put("/userGuest/update/", authRequired, userGuestResponseController);
userGuestRouter.delete("/userGuest/invitation/:userGuestId", authRequired, deleteUserGuestController);
userGuestRouter.post("/userGuest/invitation/:userGuestId/resend", authRequired, resendUserGuestController);
userGuestRouter.get("/userGuest", authRequired, getUserGuestsController);
userGuestRouter.get(
    "/userGuest/:businessId",
    authRequired,
    getUserGuestByBusinessIdController,
);

export default userGuestRouter;

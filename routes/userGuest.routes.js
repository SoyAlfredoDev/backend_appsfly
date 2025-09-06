import { Router } from "express";
import { createUserGuestController, userGuestExistsController, userGuestUpdateAcceptController, getUserGuestsController } from "../controllers/userGuest.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const userGuestRouter = Router();

userGuestRouter.post("/userGuest", authRequired, createUserGuestController);
userGuestRouter.get("/userGuest/exists/:email", userGuestExistsController);
userGuestRouter.put("/userGuest/update/:userGuestId", userGuestUpdateAcceptController);
userGuestRouter.get("/userGuest", getUserGuestsController);

export default userGuestRouter;
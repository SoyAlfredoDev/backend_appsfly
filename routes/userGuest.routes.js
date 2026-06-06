import { Router } from "express";
import {
  createUserGuestController,
  userGuestExistsController,
  userGuestResponseController,
  getUserGuestsController,
  getUserGuestByBusinessIdController,
} from "../controllers/userGuest.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const userGuestRouter = Router();

userGuestRouter.post("/userGuest", authRequired, createUserGuestController);
userGuestRouter.get("/userGuest/exists/:email", userGuestExistsController);
userGuestRouter.put(
  "/userGuest/update/",
  authRequired,
  userGuestResponseController,
);
userGuestRouter.get("/userGuest", getUserGuestsController);
userGuestRouter.get(
  "/userGuest/:businessId",
  authRequired,
  getUserGuestByBusinessIdController,
);

export default userGuestRouter;

import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

import { createTicketDetailController } from "../controllers/ticketDetail.controller.js";

const router = Router();
router.post('/ticket-details', authRequired, dbSelectorMiddleware, createTicketDetailController);

export default router;
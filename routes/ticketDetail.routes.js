import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import { createTicketDetailController } from "../controllers/ticketDetail.controller.js";

const router = Router();
router.post('/ticket-details', authRequired, createTicketDetailController);

export default router;
import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

import { createTicketController, getTicketByIdController, getTicketsController } from "../controllers/ticket.controller.js";

const router = Router();

router.post('/tickets', authRequired, dbSelectorMiddleware, createTicketController);
router.get('/tickets', authRequired, getTicketsController);
router.get('/tickets/:id', authRequired, dbSelectorMiddleware, getTicketByIdController);

export default router;
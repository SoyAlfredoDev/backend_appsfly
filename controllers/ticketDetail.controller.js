import { randomUUID } from "crypto";
import { createTicketDetailService } from "../services/ticketDetailService.js";

export const createTicketDetailController = async (req, res) => {
    try {
        const ticketDetailData = req.body;
        const data = {
            ticketDetailId: ticketDetailData.ticketDetailId ?? randomUUID(),
            ...ticketDetailData,
            createdByUserId: req.user.payload.id,
        };
        const newTicketDetail = await createTicketDetailService(data);
        res.status(201).json(newTicketDetail);
    } catch (error) {
        console.error("(ticketDetail.controller):", error);
        res.status(500).json({ error: "Failed to create ticket detail" });
    }
};
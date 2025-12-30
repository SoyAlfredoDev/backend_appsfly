import { createTicketDetailService } from "../services/ticketDetailService.js";

export const createTicketDetailController = async (req, res) => {
    try {
        //ticketId
        const ticketDetailData = req.body;
        const data = {
            ...ticketDetailData,
            createdByUserId: req.user.payload.id

        };
        const newTicketDetail = await createTicketDetailService(data);
        res.status(201).json(newTicketDetail);
    } catch (error) {
        res.status(500).json({ error: "Failed to create ticket detail" });
    }
}
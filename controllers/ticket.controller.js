import { createTicketService, getTicketsService } from "../services/ticketService.js";
import defineTicketNumber from "../libs/defineTicketNumber.js";

export const createTicketController = async (req, res) => {
    try {
        const ticketData = req.body;
        const ticketNumber = await defineTicketNumber();

        const data = {
            ...ticketData,
            ticketStatus: 'PENDING',
            ticketNumber,
            createdByUserId: req.user.payload.id
        };
        const newTicket = await createTicketService(data);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ error: "Failed to create ticket" });
    }
}
export const getTicketsController = async (req, res) => {
    try {
        const tickets = await getTicketsService();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: "Failed to get tickets" });
    }
}
export const getTicketByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await getTicketByIdService(parseInt(id));
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Failed to get ticket by ID" });
    }
}   
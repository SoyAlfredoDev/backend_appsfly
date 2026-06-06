import {
    createTicketService,
    getTicketsService,
    getTicketByIdService,
    updateTicketStatusService,
} from "../services/ticketService.js";
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
        const ticket = await getTicketByIdService(id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error("(ticket.controller): getTicketById", error);
        res.status(500).json({ error: "Failed to get ticket by ID" });
    }
};

const VALID_STATUSES = ["RESOLVED", "IN_PROGRESS", "PENDING", "URGENT"];

export const updateTicketStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { ticketStatus } = req.body;

        if (!ticketStatus || !VALID_STATUSES.includes(ticketStatus)) {
            return res.status(400).json({ error: "Estado de ticket inválido." });
        }

        const ticket = await updateTicketStatusService(id, ticketStatus);
        res.status(200).json(ticket);
    } catch (error) {
        console.error("(ticket.controller): updateTicketStatus", error);
        res.status(500).json({ error: "No se pudo actualizar el ticket." });
    }
};
import {
    getLabDispatches,
    getLabDispatchById,
    createLabDispatch,
    receiveWorkOrdersInDispatch,
} from "../services/labDispatchesService.js";

export const listLabDispatchesController = async (req, res) => {
    try {
        const dispatches = await getLabDispatches(req.prisma, {
            status: req.query.status,
            laboratoryId: req.query.laboratoryId,
        });
        res.status(200).json(dispatches);
    } catch (error) {
        console.error("(labDispatch.controller.js): list:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getLabDispatchByIdController = async (req, res) => {
    try {
        const dispatch = await getLabDispatchById(req.params.id, req.prisma);
        if (!dispatch) {
            return res.status(404).json({ message: "Despacho no encontrado." });
        }
        res.status(200).json(dispatch);
    } catch (error) {
        console.error("(labDispatch.controller.js): get:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createLabDispatchController = async (req, res) => {
    try {
        const { laboratoryId, workOrderIds, labDispatchNotes } = req.body;
        const dispatch = await createLabDispatch(
            {
                laboratoryId,
                workOrderIds,
                labDispatchNotes,
                createdByUserId: req.user.payload.id,
            },
            req.prisma,
        );
        res.status(201).json({
            message: "Despacho a laboratorio registrado",
            dispatch,
        });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(labDispatch.controller.js): create:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

export const receiveLabDispatchController = async (req, res) => {
    try {
        const dispatch = await receiveWorkOrdersInDispatch(
            {
                labDispatchId: req.params.id,
                workOrderIds: req.body.workOrderIds,
            },
            req.prisma,
        );
        res.status(200).json({
            message: "Recepción registrada",
            dispatch,
        });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) console.error("(labDispatch.controller.js): receive:", error);
        res.status(status).json({ message: error.message, code: error.code });
    }
};

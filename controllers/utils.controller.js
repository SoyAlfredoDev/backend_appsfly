import {
    getTotalFromColumnService,
    getCountDataTableService,
    deleteByTableAndIdService
} from "../services/utilsService.js";

export const getTotalFromColumnController = async (req, res) => {
    try {
        const { tableName, columnName } = req.params;
        // Assuming we have a utility function to get the total from a specific table and column
        const total = await getTotalFromColumnService(tableName, columnName, req.prisma);
        if (!total) {
            return res.status(404).json({ error: "Data not found" });
        }
        if (total.error) {
            return res.status(500).json({ error: total.error });
        }
        res.status(200).json({ total });
    } catch (error) {
        console.error("Error getting total from column:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getCountDataTableController = async (req, res) => {
    try {
        const { tableName } = req.params;
        const count = await getCountDataTableService(tableName, req.prisma);
        if (!count) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting count from data table:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteByTableAndIdController = async (req, res) => {
    try {
        const { tableName, id } = req.params;
        const deletedRecord = await deleteByTableAndIdService(tableName, id, req.prisma);
        if (!deletedRecord) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({ message: "Record deleted successfully", deletedRecord });
    } catch (error) {
        console.error("Error deleting record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

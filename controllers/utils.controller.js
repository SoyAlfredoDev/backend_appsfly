import {
    getTotalFromColumnService,
    getCountDataTableService,
    deleteByTableAndIdService
} from "../services/utilsService.js";
import {
    assertUtilityColumn,
    assertUtilityModel,
    toPublicRecord,
    UtilityAccessError,
} from "../services/database/tenantUtilityAccess.js";

function utilityErrorResponse(res, error) {
    if (error instanceof UtilityAccessError) {
        return res.status(403).json({ error: error.message, code: error.code });
    }
    return res.status(500).json({ error: "Internal Server Error", code: "INTERNAL_ERROR" });
}

export const getTotalFromColumnController = async (req, res) => {
    try {
        const { tableName, columnName } = req.params;
        assertUtilityModel(tableName);
        assertUtilityColumn(columnName);
        const total = await getTotalFromColumnService(tableName, columnName, req.prisma);
        if (!total) {
            return res.status(404).json({ error: "Data not found" });
        }
        if (total.error) {
            return res.status(500).json({ error: "Internal Server Error", code: "INTERNAL_ERROR" });
        }
        res.status(200).json({ total });
    } catch (error) {
        console.error("Error getting total from column:", error);
        return utilityErrorResponse(res, error);
    }
};

export const getCountDataTableController = async (req, res) => {
    try {
        const { tableName } = req.params;
        assertUtilityModel(tableName);
        const count = await getCountDataTableService(tableName, req.prisma);
        if (!count && count !== 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting count from data table:", error);
        return utilityErrorResponse(res, error);
    }
};

export const deleteByTableAndIdController = async (req, res) => {
    try {
        const { tableName, id } = req.params;
        assertUtilityModel(tableName);
        const deletedRecord = await deleteByTableAndIdService(tableName, id, req.prisma);
        if (!deletedRecord) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({
            message: "Record deleted successfully",
            deletedRecord: toPublicRecord(deletedRecord),
        });
    } catch (error) {
        console.error("Error deleting record:", error);
        return utilityErrorResponse(res, error);
    }
};

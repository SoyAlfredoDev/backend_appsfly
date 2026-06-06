export const getTotalFromColumnService = async (tableName, columnName, prisma) => {
    try {
        if (!prisma[tableName] || typeof columnName !== "string") {
            throw new Error("Invalid table or column name");
        }

        const result = await prisma[tableName].aggregate({
            _sum: { [columnName]: true }
        });

        return result._sum[columnName] || 0;
    } catch (error) {
        console.error(`(getTotalFromColumnService): Error getting total from ${tableName}.${columnName}:`, error);
        throw new Error("Internal Server Error");
    }
};

export const getCountDataTableService = async (tableName, columnName, prisma) => {
    try {
        const result = await prisma[tableName].count();
        return result;
    } catch (error) {
        console.error(`Error getting count from table: ${tableName}`, error);
        throw new Error("Internal Server Error");
    }
};

export const deleteByTableAndIdService = async (tableName, id, prisma) => {
    try {
        const model = prisma[tableName];
        if (!model) {
            throw new Error(`Invalid table name: ${tableName}`);
        }

        // Intentamos eliminar usando "id"
        let deletedRecord;
        try {
            deletedRecord = await model.delete({
                where: { id: id }
            });
        } catch (err) {
            // Si falla, intentamos con `${tableName}Id`
            try {
                deletedRecord = await model.delete({
                    where: { [`${tableName}Id`]: id }
                });
            } catch (innerErr) {
                throw innerErr;
            }
        }

        return deletedRecord;

    } catch (error) {
        console.error(
            `(deleteRecordByTableAndIdService): Error deleting record from ${tableName} with id ${id}:`,
            error
        );
        throw new Error("Failed to delete record");
    }
};

export const getSumaFromTableByConditions = async (tableName, columnSum, conditions, prisma) => {
    try {
        if (!prisma[tableName] || !Array.isArray(conditions) || conditions.length === 0) {
            throw new Error("Invalid table or conditions");
        }

        const result = await prisma[tableName].aggregate({
            _sum: { [columnSum]: true },
            where: {
                AND: conditions
            }
        });

        return result._sum[columnSum] || 0;
    } catch (error) {
        console.error(`(getSumaFromTableByConditions): Error getting sum from ${tableName} by conditions:`, error);
        throw new Error("Internal Server Error");
    }
};

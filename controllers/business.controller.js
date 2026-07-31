import { createBusinessService, updateBusinessByIdService, getBusinessService, getBusinessByIdService } from "../services/businessService.js";
import { createNeonDatabaseService, getConnectionStringAndTest } from "../services/neonDataBaseService.js";
import { registerUserBusinessServiceBusinessDB } from '../services/businessDB/userBusiness.js';
import { createUserBusinessService } from '../services/userBusinessService.js';
import { getUserById } from '../services/usersService.js'
import { runPrismaMigrate } from '../prisma/runMigrate.js'
import { getPrismaForBusinessId } from "../db.js";
import { seedOpticsCatalog } from "../libs/opticsCatalogSeed.js";
import { cacheInvalidate } from "../libs/tenantCache.js";

export const createBusinessController = async (req, res) => {
    const userId = req.user.payload.id;
    const businessData = req.body;
    businessData.createdByUserId = userId;
    let businessConnectionDB;

    // Estado del proceso
    const status = {
        createdDBneon: false,
        stringConnectionDB: false,
        migratedDB: false,
        createdBusiness: false,
        createdRelationUserBusinessGeneralDB: false,
        createdUserBusinessDB: false,
        lastError: null
    };

    let newBusiness = null;

    try {
        // --- 1. Crear base de datos en Neon ---
        try {
            const newDatabase = await createNeonDatabaseService(businessData.businessId);
            if (!newDatabase) throw new Error("Service returned null/false.");
            status.createdDBneon = true;
        } catch (error) {
            status.lastError = `1. DB Creation failed: ${error.message}`;
            console.error(status.lastError);
        }

        // --- 2. Generar cadena de conexión y migrar ---
        if (status.createdDBneon) {
            try {
                businessConnectionDB = await getConnectionStringAndTest(businessData.businessId);
                if (!businessConnectionDB) throw new Error("Service returned null/false connection string.");

                status.stringConnectionDB = true;
                businessData.businessConnectionDB = businessConnectionDB;

                const migrateResult = await runPrismaMigrate(businessConnectionDB);
                if (!migrateResult) throw new Error("Migration failed.");

                status.migratedDB = true;

            } catch (error) {
                status.lastError = `2. Connection or migration failed: ${error.message}`;
                console.error(status.lastError);
            }
        }

        // --- 3. Crear negocio en la DB general ---
        try {
            newBusiness = await createBusinessService(businessData);
            if (!newBusiness) throw new Error("Service returned null/false business record.");

            status.createdBusiness = true;
            businessData.businessId = newBusiness.id || businessData.businessId;

        } catch (error) {
            status.lastError = `3. Business record creation failed: ${error.message}`;
            console.error(status.lastError);
        }

        // --- 4. Crear relación user-business + crear usuario en DB del negocio ---
        if (status.createdBusiness) {
            try {
                // 4.1 Relación user-business en DB general
                const relationPayload = {
                    userBusinessUserId: userId,
                    userBusinessBusinessId: businessData.businessId,
                    userBusinessRole: 'ADMIN'
                };

                const userGeneralDB = await getUserById(userId);
                const newUserBusiness = await createUserBusinessService(relationPayload);

                if (!newUserBusiness)
                    throw new Error('User-business relationship failed.');

                status.createdRelationUserBusinessGeneralDB = true;

                // 4.2 Crear usuario dentro de la DB del negocio
                const userPayloadForBusinessDB = {
                    userId: userId,
                    userFirstName: userGeneralDB.userFirstName,
                    userLastName: userGeneralDB.userLastName,
                    userEmail: userGeneralDB.userEmail,
                    userCodePhoneNumber: userGeneralDB.userCodePhoneNumber,
                    userPhoneNumber: userGeneralDB.userPhoneNumber,
                    userDocumentType: userGeneralDB.userDocumentType,
                    userDocumentNumber: userGeneralDB.userDocumentNumber,
                    userRole: 'ADMIN'
                };

                const userBusinessDB = await registerUserBusinessServiceBusinessDB(
                    userPayloadForBusinessDB,
                    businessConnectionDB
                );

                if (!userBusinessDB)
                    throw new Error("Could not create user inside business DB.");

                status.createdUserBusinessDB = true;

                // 4.3 Seed catálogo óptica (categorías sistema + atributos)
                if (String(businessData.businessType || "").toLowerCase() === "optics") {
                    try {
                        const tenantPrisma = await getPrismaForBusinessId(businessData.businessId);
                        if (tenantPrisma) {
                            await seedOpticsCatalog(tenantPrisma, userId);
                            cacheInvalidate(businessData.businessId, "categories");
                            cacheInvalidate(businessData.businessId, "categories:all-attrs");
                            status.opticsCatalogSeeded = true;
                        }
                    } catch (seedErr) {
                        console.error("(createBusiness): optics catalog seed failed:", seedErr);
                        status.opticsCatalogSeeded = false;
                        status.lastError = `optics seed: ${seedErr.message}`;
                    }
                }

            } catch (error) {
                status.lastError = `4. User/relationship creation failed: ${error.message}`;
                console.error(status.lastError);
            }
        }

        // --- 5. Determinar estado final ---
        const businessStatus =
            status.createdDBneon &&
                status.stringConnectionDB &&
                status.migratedDB &&
                status.createdBusiness &&
                status.createdRelationUserBusinessGeneralDB &&
                status.createdUserBusinessDB
                ? "ACTIVE"
                : "PENDING";

        // --- 6. Guardar estado final del proceso en la DB general ---
        if (newBusiness || businessData.businessId) {
            await updateBusinessByIdService(businessData.businessId, {
                businessProcess: status,
                businessStatus
            });
        }


        // --- 7. Respuestas ---
        if (businessStatus === "ACTIVE") {
            return res.status(201).json(newBusiness);
        }

        if (newBusiness) {
            return res.status(202).json({
                message: "Business created but one or more setup steps failed. Status is PENDING.",
                business: newBusiness,
                processStatus: status
            });
        }

        return res.status(500).json({
            error: "Critical failure: Failed to create core business record.",
            processStatus: status
        });

    } catch (criticalError) {
        console.error("CRITICAL UNEXPECTED ERROR:", criticalError);

        res.status(500).json({
            error: "Internal Server Error during execution.",
            message: criticalError.message || "An unknown error occurred.",
            processStatus: status
        });
    }
};
export const getBusinessController = async (req, res) => {
    try {
        const businesses = await getBusinessService();
        res.status(200).json(businesses);
    } catch (error) {
        console.error("Error in getBusinessController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getConnectionDBController = async (req, res) => {
    try {
        const { businessId } = req.params;
        const businessConnectionDB = await getConnectionDBServicio(businessId);
        res.status(200).json({ businessConnectionDB });
    } catch (error) {
        console.error("Error in getConnectionDBController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getBusinessByIdController = async (req, res) => {
    try {
        const { businessId } = req.params;
        const business = await getBusinessByIdService(businessId);
        res.status(200).json(business);
    } catch (error) {
        console.error("Error in getBusinessByIdController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const countBusinessController = async (req, res) => {
    try {
        const business = await getBusinessService();
        res.status(200).json(business.length);

    } catch (error) {
        console.log(error)

    }
}

// db.js
import { PrismaClient as prismaBusiness } from "./src/generated/business/index.js";
import { getConnectionDBServicio } from "./services/businessService.js";
import { getUserBusinessById } from './services/userBusinessService.js';

// Cache de instancias Prisma por businessId
const prismaClients = {};

export async function getPrismaForBusinessId(businessId) {
    try {
        if (prismaClients[businessId]) {
            return prismaClients[businessId];
        }
        const url = await getConnectionDBServicio(businessId);
        if (!url) return null;
        const client = new prismaBusiness({
            datasources: { db: { url } },
        });
        prismaClients[businessId] = client;
        return client;
    } catch (error) {
        console.error("(getPrismaForBusinessId):", error);
        return null;
    }
}

// Crea o reutiliza PrismaClient para un negocio
export async function getPrismaForBusiness(userId) {
    try {
        const userBusiness = await getUserBusinessById(userId);
        if (!userBusiness || !userBusiness[0]) {
            throw new Error(`No se encontró relación entre usuario y negocio para userId=${userId}`);
        };
        const businessId = userBusiness[0].userBusinessBusinessId;
        // Si ya existe una conexión activa, la reutilizamos
        if (prismaClients[businessId]) {
            return prismaClients[businessId];
        };
        const url = await getConnectionDBServicio(businessId);
        if (!url) throw new Error(`No existe URL de base de datos para el negocio ${businessId}`);
        const client = new prismaBusiness({
            datasources: { db: { url } },
        });
        prismaClients[businessId] = client;
        return client;
    } catch (error) {
        console.error("(getPrismaForBusiness):", error);
        throw new Error(`Error obteniendo Prisma para usuario ${userId}: ${error.message}`);
    }
}

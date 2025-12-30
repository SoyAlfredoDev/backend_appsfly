// Create a provider
export const createProvider = async (data, prisma) => {
    try {
        const res = await prisma.Provider.create({ data });
        return res
    } catch (error) {
        console.error("(providersService.js): Error creating provider:", error);
        throw error;
    }
}

// Get all providers
export const getProviders = async (prisma) => {
    try {
        const res = await prisma.Provider.findMany();
        return res
    } catch (error) {
        console.error("(providersService.js): Error getting providers:", error);
        throw error;
    }
}

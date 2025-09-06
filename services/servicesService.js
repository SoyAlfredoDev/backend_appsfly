// Create a service
export const createService = async (data, prisma) => {
    try {
        const res = await prisma.service.create({ data });
        return res
    } catch (error) {
        console.error("(servicesService.js): Error creating service:", error);
        throw error;
    }
}

// Get all services
export const getServices = async (prisma) => {
    try {
        const res = await prisma.service.findMany({
            include: {
                category: {
                    select: {
                        categoryId: true,
                        categoryName: true
                    }
                }
            }
        });
        return res
    } catch (error) {
        console.error("(servicesService.js): Error getting services:", error);
        throw error;
    }
}

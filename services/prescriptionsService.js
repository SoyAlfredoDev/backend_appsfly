export const createPrescription = async (data, prisma) => {
    try {
        return await prisma.prescription.create({ data });
    } catch (error) {
        console.error("(prescriptionsService.js): Error creating prescription:", error);
        throw error;
    }
};

export const getPrescriptionsByCustomerId = async (customerId, prisma) => {
    try {
        return await prisma.prescription.findMany({
            where: { customerId },
            orderBy: { createdAt: "desc" },
            include: {
                createdBy: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("(prescriptionsService.js): Error listing prescriptions:", error);
        throw error;
    }
};

export const getPrescriptionById = async (prescriptionId, prisma) => {
    try {
        return await prisma.prescription.findUnique({
            where: { prescriptionId },
            include: {
                createdBy: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error("(prescriptionsService.js): Error getting prescription:", error);
        throw error;
    }
};

export const updatePrescription = async (prescriptionId, data, prisma) => {
    try {
        return await prisma.prescription.update({
            where: { prescriptionId },
            data,
        });
    } catch (error) {
        console.error("(prescriptionsService.js): Error updating prescription:", error);
        throw error;
    }
};

export const deletePrescription = async (prescriptionId, prisma) => {
    try {
        return await prisma.prescription.delete({
            where: { prescriptionId },
        });
    } catch (error) {
        console.error("(prescriptionsService.js): Error deleting prescription:", error);
        throw error;
    }
};

export const countPrescriptionsByCustomerId = async (customerId, prisma) => {
    try {
        return await prisma.prescription.count({ where: { customerId } });
    } catch (error) {
        console.error("(prescriptionsService.js): Error counting prescriptions:", error);
        throw error;
    }
};

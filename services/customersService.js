// Create a customer
export const createCustomer = async (data, prisma) => {
    try {
        const res = await prisma.Customer.create({ data });
        return res;
    } catch (error) {
        console.error("(customersService.js): Error creating customer:", error);
        throw error;
    }
};

// Get all customers
export const getCustomers = async (prisma) => {
    try {
        return prisma.customer.findMany({
            orderBy: [
                { customerFirstName: 'asc' },
                { customerLastName: 'asc' }
            ]
        });
    } catch (error) {
        console.error("(customersService.js): Error getting customers:", error);
        throw error;
    }
};

// Get customers by RUT
export const getCustomersByRut = async (rut, prisma) => {
    try {
        return await prisma.customer.findMany({
            where: {
                customerDocumentNumber: rut
            }
        });
    } catch (error) {
        console.error("(customersService.js): Error getting customers by rut:", error);
        throw error;
    }
};


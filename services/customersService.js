import { normalizePagination, paginatedResult } from "../libs/pagination.js";

// Create a customer
export const createCustomer = async (data, prisma) => {
    try {
        const res = await prisma.customer.create({ data });
        return res;
    } catch (error) {
        console.error("(customersService.js): Error creating customer:", error);
        throw error;
    }
};

function buildCustomerSearchWhere(q) {
    const query = typeof q === "string" ? q.trim() : "";
    if (!query) return {};
    return {
        OR: [
            { customerFirstName: { contains: query, mode: "insensitive" } },
            { customerLastName: { contains: query, mode: "insensitive" } },
            { customerDocumentNumber: { contains: query, mode: "insensitive" } },
            { customerEmail: { contains: query, mode: "insensitive" } },
            { customerPhoneNumber: { contains: query, mode: "insensitive" } },
        ],
    };
}

/**
 * Listado paginado de clientes.
 * Opciones: page, limit, q (búsqueda).
 */
export const getCustomers = async (prisma, options = {}) => {
    try {
        const {
            page,
            limit,
            q,
            defaultLimit = 50,
            maxLimit = 200,
        } = options;

        const { skip, take, page: safePage, limit: safeLimit } = normalizePagination({
            page,
            limit,
            defaultLimit,
            maxLimit,
        });

        const where = buildCustomerSearchWhere(q);

        const [total, rows] = await Promise.all([
            prisma.customer.count({ where }),
            prisma.customer.findMany({
                where,
                orderBy: [
                    { customerFirstName: "asc" },
                    { customerLastName: "asc" },
                ],
                skip,
                take,
            }),
        ]);

        return paginatedResult(rows, total, safePage, safeLimit);
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


// Delete a customer by ID
export const deleteCustomerByIdService = async (id, prisma) => {
    try {
        return await prisma.customer.delete({
            where: { customerId: id }
        });
    } catch (error) {
        console.error("(customersService.js): Error deleting customer by ID:", error);
        throw error;
    }
};

// Get a customer by ID
export const getCustomerByIdService = async (id, prisma) => {
    try {
        return await prisma.customer.findUnique({
            where: { customerId: id }
        });
    } catch (error) {
        console.error("(customersService.js): Error getting customer by ID:", error);
        throw error;
    }
};

// Update a customer
export const updateCustomer = async (id, data, prisma) => {
    try {
        const res = await prisma.customer.update({
            where: { customerId: id },
            data
        });
        return res;
    } catch (error) {
        console.error("(customersService.js): Error updating customer:", error);
        throw error;
    }
};

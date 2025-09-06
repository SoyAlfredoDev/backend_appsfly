import { createCustomer, getCustomers, getCustomersByRut } from '../services/customersService.js'

export const createCustomerController = async (req, res) => {
    try {
        const { id,
            customerFirstName,
            customerLastName,
            customerEmail,
            customerCodePhoneNumber,
            customerPhoneNumber,
            customerDocumentType,
            customerDocumentNumber,
            customerComment,
            createdByUserId
        } = req.body

        const formatString = (str) => str?.trim()?.toLowerCase() || null;

        const data = {
            customerFirstName: formatString(customerFirstName),
            customerLastName: formatString(customerLastName),
            customerEmail: formatString(customerEmail),
            customerCodePhoneNumber,
            customerPhoneNumber,
            customerDocumentType,
            customerDocumentNumber,
            customerComment,
            createdByUserId
        };


        const customer = await createCustomer(data, req.prisma)
        res.status(201).json({
            message: 'customer registered successfully',
            customer: {
                customerId: customer.customerId,
                customerFirstName: customer.customerFirstName,
                customerLastName: customer.customerLastName,
                customerEmail: customer.customerEmail,
                customerCodePhoneNumber: customer.customerCodePhoneNumber,
                customerPhoneNumber: customer.customerPhoneNumber
            }
        });

    } catch (error) {
        console.error("(customer.controller.js): Error creating customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCustomerController = async (req, res) => {
    try {
        const customers = await getCustomers(req.prisma)
        res.status(200).json(customers)
    } catch (error) {
        console.error("(customer.controller.js): Error getting customers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const validateRutExists = async (req, res) => {
    try {
        const { rut } = req.params;
        const rutFound = await getCustomersByRut(rut, req.prismaa);
        let exists
        if (rutFound > 0) {
            exists = true
        } else {
            exists = false
        }
        console.log(exists, rutFound)
        return res.status(200).json({ exists: exists });
    } catch (error) {
        console.error("(customer.controller.js): error validating if the rut exists:", error);
        res.status(500).json({ error: "Error validating RUT" });
    }
};

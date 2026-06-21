import { createCustomer, getCustomers, getCustomersByRut, deleteCustomerByIdService, getCustomerByIdService, updateCustomer } from '../services/customersService.js'
import { getSalesByCustomerIdService } from '../services/salesServices.js'
import { getSaleDetailByCustomerIdService } from '../services/saleDetailsService.js'
import { deleteCloudinaryImageByUrl, deleteCloudinaryImageIfReplaced } from '../services/cloudinaryService.js'

export const createCustomerController = async (req, res) => {
    try {
        const {
            customerFirstName,
            customerLastName,
            customerEmail,
            customerCodePhoneNumber,
            customerPhoneNumber,
            customerDocumentType,
            customerDocumentNumber,
            customerComment,
            customerImageUrl,
            createdByUserId
        } = req.body

        const formatString = (str) => str?.trim()?.toLowerCase() || null;
        const formatOptionalUrl = (url) => {
            const trimmed = url?.trim();
            return trimmed || null;
        };

        const data = {
            customerFirstName: formatString(customerFirstName),
            customerLastName: formatString(customerLastName),
            customerEmail: formatString(customerEmail),
            customerCodePhoneNumber,
            customerPhoneNumber,
            customerDocumentType,
            customerDocumentNumber,
            customerComment,
            customerImageUrl: formatOptionalUrl(customerImageUrl),
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
                customerPhoneNumber: customer.customerPhoneNumber,
                customerImageUrl: customer.customerImageUrl,
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
        const rutFound = await getCustomersByRut(rut, req.prisma);
        let exists
        if (rutFound > 0) {
            exists = true
        } else {
            exists = false
        }

        return res.status(200).json({ exists: exists });
    } catch (error) {
        console.error("(customer.controller.js): error validating if the rut exists:", error);
        res.status(500).json({ error: "Error validating RUT" });
    }
};

export const deleteCustomerByIdController = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await getCustomerByIdService(customerId, req.prisma);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const customerHasSales = await getSalesByCustomerIdService(customerId, req.prisma);
        const customerHasSaleDetails = await getSaleDetailByCustomerIdService(customerId, req.prisma);
        if (customerHasSales.length > 0 || customerHasSaleDetails.length > 0) {
            return res.status(400).json({ message: "Cannot delete customer with existing sales" });
        }

        await deleteCustomerByIdService(customerId, req.prisma);

        if (customer.customerImageUrl) {
            await deleteCloudinaryImageByUrl(customer.customerImageUrl);
        }

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.error("(customer.controller.js): Error deleting customer by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCustomerByIdController = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await getCustomerByIdService(customerId, req.prisma);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        console.error("(customer.controller.js): Error getting customer by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateCustomerController = async (req, res) => {
    try {
        const { customerId } = req.params;
        const {
            customerFirstName,
            customerLastName,
            customerEmail,
            customerCodePhoneNumber,
            customerPhoneNumber,
            customerDocumentType,
            customerDocumentNumber,
            customerComment,
            customerImageUrl,
        } = req.body;

        const formatString = (str) => str?.trim()?.toLowerCase() || null;
        const formatOptionalUrl = (url) => {
            const trimmed = url?.trim();
            return trimmed || null;
        };

        const data = {
            customerFirstName: formatString(customerFirstName),
            customerLastName: formatString(customerLastName),
            customerEmail: formatString(customerEmail),
            customerCodePhoneNumber,
            customerPhoneNumber,
            customerDocumentType,
            customerDocumentNumber,
            customerComment,
            customerImageUrl: formatOptionalUrl(customerImageUrl),
        };

        const existingCustomer = await getCustomerByIdService(customerId, req.prisma);
        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const updatedCustomer = await updateCustomer(customerId, data, req.prisma);
        await deleteCloudinaryImageIfReplaced(existingCustomer.customerImageUrl, data.customerImageUrl);
        res.status(200).json({
            message: 'Customer updated successfully',
            customer: updatedCustomer
        });

    } catch (error) {
        console.error("(customer.controller.js): Error updating customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
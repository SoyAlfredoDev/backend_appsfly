import { createCustomer, getCustomers, getCustomersByRut, deleteCustomerByIdService, getCustomerByIdService, updateCustomer } from '../services/customersService.js'
import { getSalesByCustomerIdService } from '../services/salesServices.js'
import { getSaleDetailByCustomerIdService } from '../services/saleDetailsService.js'
import { countPrescriptionsByCustomerId } from '../services/prescriptionsService.js'
import { deleteCloudinaryImageByUrl, deleteCloudinaryImageIfReplaced } from '../services/cloudinaryService.js'
import { parseBusinessDateOnly, DEFAULT_BUSINESS_TIMEZONE } from '../libs/businessTimezone.js'

const formatOptionalDate = (value, timeZone = DEFAULT_BUSINESS_TIMEZONE) =>
    parseBusinessDateOnly(value, timeZone);

const formatOptionalString = (value) => {
    if (value === undefined) return undefined;
    if (value === null) return null;
    const trimmed = String(value).trim();
    return trimmed || null;
};

/** Nombre requerido; resto opcional. Apellido vacío → "" (columna no nullable en BD). */
const formatRequiredName = (str) => {
    const trimmed = str?.trim()?.toLowerCase();
    return trimmed || null;
};

const formatOptionalName = (str) => {
    if (str === undefined) return undefined;
    const trimmed = str?.trim()?.toLowerCase();
    return trimmed || "";
};

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
            customerBirthDate,
            createdByUserId
        } = req.body

        const formatOptionalUrl = (url) => {
            const trimmed = url?.trim();
            return trimmed || null;
        };

        const firstName = formatRequiredName(customerFirstName);
        if (!firstName) {
            return res.status(400).json({ message: "El nombre es obligatorio." });
        }

        const data = {
            customerFirstName: firstName,
            customerLastName: formatOptionalName(customerLastName) ?? "",
            customerEmail: formatOptionalString(customerEmail)?.toLowerCase() ?? null,
            customerCodePhoneNumber,
            customerPhoneNumber,
            customerDocumentType,
            customerDocumentNumber: formatOptionalString(customerDocumentNumber),
            customerComment,
            customerImageUrl: formatOptionalUrl(customerImageUrl),
            customerBirthDate: formatOptionalDate(
                customerBirthDate,
                req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE,
            ),
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
        const customers = await getCustomers(req.prisma, {
            page: req.query.page,
            limit: req.query.limit,
            q: req.query.q,
        });
        res.status(200).json(customers);
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

        const prescriptionCount = await countPrescriptionsByCustomerId(customerId, req.prisma);
        if (prescriptionCount > 0) {
            return res.status(400).json({ message: "Cannot delete customer with existing prescriptions" });
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
            customerBirthDate,
        } = req.body;

        const formatOptionalUrl = (url) => {
            const trimmed = url?.trim();
            return trimmed || null;
        };

        const firstName = formatRequiredName(customerFirstName);
        if (customerFirstName !== undefined && !firstName) {
            return res.status(400).json({ message: "El nombre es obligatorio." });
        }

        const data = {
            customerFirstName: firstName,
            customerLastName: formatOptionalName(customerLastName),
            customerEmail:
                customerEmail !== undefined
                    ? (formatOptionalString(customerEmail)?.toLowerCase() ?? null)
                    : undefined,
            customerCodePhoneNumber,
            customerPhoneNumber,
            customerDocumentType,
            customerDocumentNumber:
                customerDocumentNumber !== undefined
                    ? formatOptionalString(customerDocumentNumber)
                    : undefined,
            customerComment,
            customerImageUrl: formatOptionalUrl(customerImageUrl),
            customerBirthDate: formatOptionalDate(
                customerBirthDate,
                req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE,
            ),
        };

        Object.keys(data).forEach((key) => {
            if (data[key] === undefined) delete data[key];
        });

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
import { createService, getServices } from "../services/servicesService.js";

// Create a service
export const createServiceController = async (req, res) => {
    try {
        // >>>>>>>>>>>>> sku no repetido validar
        const {
            name,
            description,
            sku,
            categoryId,
            price,
            unit,
            priceFixed
        } = req.body;
        const data = {
            serviceName: name,
            serviceDescription: description,
            serviceSKU: sku,
            categoryId,
            createdByUserId: req.user.payload.id,
            servicePrice: Number(price),
            serviceUnit: unit,
            serviceStatus: "ACTIVE",
            servicePriceFixed: Boolean(priceFixed)
        };
        const service = await createService(data, req.prisma)
        res.status(201).json({
            message: 'service registered successfully',
            service: {
                serviceId: service.serviceId,
                serviceName: service.serviceName,
                serviceDescription: service.serviceDescription,
                serviceSKU: service.serviceSKU,
                categoryId: service.categoryId,
                servicePrice: service.servicePrice,
                serviceStatus: service.serviceStatus,
                serviceUnit: service.serviceUnit,
                servicePriceFixed: service.servicePriceFixed
            }
        });
    } catch (error) {
        console.error("(services.controller.js): Error creating service:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all services
export const getServicesController = async (req, res) => {
    try {
        const services = await getServices(req.prisma);
        res.status(200).json(services)
    } catch (error) {
        console.error("(services.controller.js): Error getting services:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
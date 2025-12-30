import { createProvider, getProviders } from "../services/providersService.js";

// Create a provider
export const createProviderController = async (req, res) => {
    try {
        const {
            providerName,
            providerDocumentType,
            providerDocumentNumber,
            providerAddress,
            providerCodePhoneNumber,
            providerPhoneNumber,
            providerEmail,
            providerComment
        } = req.body;

        const data = {
            providerName: providerName.trim().toLowerCase(),
            providerDocumentType: providerDocumentType.trim().toLowerCase(),
            providerDocumentNumber: providerDocumentNumber.trim().toLowerCase(),
            providerAddress: providerAddress.trim().toLowerCase(),
            providerCodePhoneNumber: providerCodePhoneNumber.trim().toLowerCase(),
            providerPhoneNumber: providerPhoneNumber.trim().toLowerCase(),
            providerEmail: providerEmail.trim().toLowerCase(),
            providerComment: providerComment.trim().toLowerCase(),
            createdByUserId: req.user.payload.id
        }
        const provider = await createProvider(data, req.prisma);
        res.status(201).json(provider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all providers
export const getProvidersController = async (req, res) => {
    try {
        const providers = await getProviders(req.prisma);
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
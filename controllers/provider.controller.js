import {
  createProvider,
  getProviders,
  deleteProvider,
  getProviderById,
  updateProvider,
  formatProviderPayload,
} from "../services/providersService.js";

export const createProviderController = async (req, res) => {
  try {
    const { providerName, providerDocumentNumber } = req.body;

    if (!providerName?.trim() || !providerDocumentNumber?.trim()) {
      return res.status(400).json({
        message: "Nombre y número de documento son obligatorios.",
      });
    }

    const data = formatProviderPayload(req.body, req.user.payload.id);
    const provider = await createProvider(data, req.prisma);
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProvidersController = async (req, res) => {
  try {
    const providers = await getProviders(req.prisma);
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProviderByIdController = async (req, res) => {
  try {
    const provider = await getProviderById(req.params.id, req.prisma);

    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado." });
    }

    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProviderController = async (req, res) => {
  try {
    const { providerName, providerDocumentNumber } = req.body;

    if (!providerName?.trim() || !providerDocumentNumber?.trim()) {
      return res.status(400).json({
        message: "Nombre y número de documento son obligatorios.",
      });
    }

    const existing = await getProviderById(req.params.id, req.prisma);
    if (!existing) {
      return res.status(404).json({ message: "Proveedor no encontrado." });
    }

    const provider = await updateProvider(req.params.id, req.body, req.prisma);
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProviderController = async (req, res) => {
  try {
    const existing = await getProviderById(req.params.id, req.prisma);
    if (!existing) {
      return res.status(404).json({ message: "Proveedor no encontrado." });
    }

    const provider = await deleteProvider(req.params.id, req.prisma);
    res.status(200).json({
      message: "Proveedor eliminado correctamente.",
      provider,
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

import { createBusiness } from "../services/businessService.js";

export const createBusinessController = async (req, res) => {
    try {
        const businessData = req.body;
        const newBusiness = await createBusiness(businessData);
        res.status(201).json(newBusiness);
    } catch (error) {
        console.error("Error creating business:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

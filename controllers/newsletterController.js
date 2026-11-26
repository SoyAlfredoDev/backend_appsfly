import { normalizeMarketingEmail } from "../services/adminEmailCampaign/campaignNewsletterConsent.js";
import * as newsletterService from '../services/newsletterService.js';

export const subscribe = async (req, res) => {
    try {
        const email = normalizeMarketingEmail(req.body?.email);
        if (!email) {
            return res.status(400).json({ message: "Ingresa un correo válido.", code: "INVALID_EMAIL" });
        }
        const subscriber = await newsletterService.subscribe(email);
        res.status(201).json(subscriber);
    } catch (error) {
        if (error.code === 'P2002') {
             return res.status(400).json({ message: "Email already subscribed" });
        }
        res.status(500).json({ message: error.message });
    }
};

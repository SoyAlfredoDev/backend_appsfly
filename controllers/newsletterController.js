import * as newsletterService from '../services/newsletterService.js';

export const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
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

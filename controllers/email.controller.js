import { sendEmail } from '../emails/core/sendEmail.js';

export const sendEmailController = async (req, res) => {
    try {
        const { to, subject, html, text } = req.body;

        if (!to || !subject || (!html && !text)) {
            return res.status(400).json({ message: 'Missing required fields: to, subject, and (html or text)' });
        }

        const result = await sendEmail({ to, subject, html, text });

        res.status(200).json({
            message: 'Email sent successfully',
            data: result
        });
    } catch (error) {
        console.error('Email controller error:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

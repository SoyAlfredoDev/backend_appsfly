import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html, text }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'AppsFly <no-reply@appsfly.app>',
            to,
            subject,
            html,
            text
        });

        if (error) {
            console.error('Error sending email:', error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Resend service error:', error);
        throw error;
    }
};


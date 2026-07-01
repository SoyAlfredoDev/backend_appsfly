import { Resend } from "resend";
import dotenv from "dotenv";
import { getDefaultSenderFrom } from "./emailFrom.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html, text, from, replyTo }) => {
    try {
        const payload = {
            from: from?.trim() || getDefaultSenderFrom(),
            to,
            subject,
            html,
            text,
        };

        if (replyTo?.trim()) {
            payload.reply_to = replyTo.trim();
        }

        const { data, error } = await resend.emails.send(payload);

        if (error) {
            console.error("Error sending email:", error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error("Resend service error:", error);
        throw error;
    }
};

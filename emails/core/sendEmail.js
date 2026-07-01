import { Resend } from "resend";
import dotenv from "dotenv";
import { getDefaultSenderFrom } from "./emailFrom.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html, text, from, replyTo, attachments, tags }) => {
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

        if (attachments?.length) {
            payload.attachments = attachments.map((file) => ({
                filename: file.filename,
                content: Buffer.isBuffer(file.content)
                    ? file.content.toString("base64")
                    : file.content,
            }));
        }

        if (tags && typeof tags === "object" && Object.keys(tags).length > 0) {
            payload.tags = Object.entries(tags).map(([name, value]) => ({
                name,
                value: String(value),
            }));
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

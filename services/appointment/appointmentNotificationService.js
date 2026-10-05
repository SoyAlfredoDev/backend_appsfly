import { sendEmail } from "../../emails/core/sendEmail.js";
import { getFrontendBaseUrl } from "../../emails/shared/layout.js";
import { buildAppointmentEmail } from "../../emails/users/appointments/appointmentEmail.template.js";

export function formatAppointmentWhen(startsAt, timeZone) {
    const date = startsAt instanceof Date ? startsAt : new Date(startsAt);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("es-CL", {
        timeZone: timeZone || "America/Santiago",
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

/**
 * Avisa al visitante y, en una solicitud nueva, también al negocio.
 * Un fallo de correo no deshace la cita.
 */
export async function deliverAppointmentNotice({
    enabled,
    kind,
    appointment,
    businessName,
    businessLogoUrl = null,
    businessEmail = null,
    timezone,
    notifyBusiness = false,
}) {
    if (!enabled || !kind || !appointment) return;

    const customerEmail = appointment.customerEmail?.trim() || null;
    const shopEmail = businessEmail?.trim() || null;
    const recipients = [];
    if (customerEmail) recipients.push({ to: customerEmail, audience: "customer" });
    if (notifyBusiness && shopEmail && shopEmail !== customerEmail) {
        recipients.push({ to: shopEmail, audience: "business" });
    }
    if (!recipients.length) return;

    const customerName = [appointment.firstName, appointment.lastName].filter(Boolean).join(" ").trim();
    const phoneLabel = [appointment.phoneCode, appointment.phoneNumber].filter(Boolean).join(" ").trim();
    const contentBase = {
        kind,
        businessName,
        businessLogoUrl,
        customerName,
        whenLabel: formatAppointmentWhen(appointment.startsAt, timezone),
        phoneLabel: phoneLabel || null,
        notes: appointment.notes || null,
        panelUrl: `${getFrontendBaseUrl()}/appointments`,
    };

    await Promise.all(
        recipients.map(async ({ to, audience }) => {
            try {
                const message = buildAppointmentEmail({ ...contentBase, audience });
                await sendEmail({
                    to,
                    subject: message.subject,
                    html: message.html,
                    text: message.text,
                    replyTo: audience === "customer" ? shopEmail : undefined,
                });
            } catch (error) {
                console.error("(appointments): no se pudo enviar el aviso", error);
            }
        }),
    );
}

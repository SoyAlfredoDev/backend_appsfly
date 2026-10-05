import { escapeHtml, wrapBusinessEmailLayout } from "../../shared/layout.js";

const KIND_COPY = {
    requested: {
        customerSubject: "Recibimos tu solicitud de cita",
        customerLead: "Recibimos tu solicitud. El negocio la revisará y te avisará por este correo si queda confirmada.",
        businessSubject: "Nueva solicitud de cita",
        businessLead: "Un cliente pidió una hora desde tu link público.",
    },
    confirmed: {
        customerSubject: "Tu cita quedó confirmada",
        customerLead: "Tu hora quedó confirmada.",
        businessSubject: "Cita confirmada",
        businessLead: "Se confirmó una cita.",
    },
    cancelled: {
        customerSubject: "Tu cita fue cancelada",
        customerLead: "Esta cita fue cancelada. Si necesitas otra hora, puedes volver a usar el link de agendamiento.",
        businessSubject: "Cita cancelada",
        businessLead: "Se canceló una cita.",
    },
    rescheduled: {
        customerSubject: "Tu cita cambió de horario",
        customerLead: "Tu cita quedó en un horario nuevo.",
        businessSubject: "Cita reagendada",
        businessLead: "Una cita cambió de horario.",
    },
    completed: {
        customerSubject: "Tu cita fue atendida",
        customerLead: "Marcamos tu cita como atendida.",
        businessSubject: "Cita atendida",
        businessLead: "Una cita fue marcada como atendida.",
    },
};

function paragraph(text) {
    return `<p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:#374151;font-family:Arial,Helvetica,sans-serif;">${text}</p>`;
}

/**
 * @param {{
 *   audience: "customer" | "business",
 *   kind: "requested" | "confirmed" | "cancelled" | "rescheduled" | "completed",
 *   businessName: string,
 *   businessLogoUrl?: string | null,
 *   customerName: string,
 *   whenLabel: string,
 *   phoneLabel?: string | null,
 *   notes?: string | null,
 *   panelUrl?: string | null,
 * }} input
 */
export function buildAppointmentEmail({
    audience,
    kind,
    businessName,
    businessLogoUrl = null,
    customerName,
    whenLabel,
    phoneLabel = null,
    notes = null,
    panelUrl = null,
}) {
    const copy = KIND_COPY[kind] || KIND_COPY.requested;
    const business = businessName?.trim() || "el negocio";
    const isBusiness = audience === "business";
    const subjectBase = isBusiness ? copy.businessSubject : copy.customerSubject;
    const subject = `${subjectBase} — ${business}`;
    const lead = isBusiness ? copy.businessLead : copy.customerLead;

    const detailRows = [
        ["Cliente", customerName],
        ["Horario", whenLabel],
        phoneLabel ? ["Teléfono", phoneLabel] : null,
        notes ? ["Comentario", notes] : null,
    ].filter(Boolean);

    const details = detailRows
        .map(
            ([label, value]) =>
                `<p style="margin:0 0 6px;font-size:14px;line-height:1.5;color:#021f41;font-family:Arial,Helvetica,sans-serif;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`,
        )
        .join("");

    const panel = isBusiness && panelUrl
        ? paragraph(
            `<a href="${escapeHtml(panelUrl)}" style="color:#047857;font-weight:700;text-decoration:none;">Abrir el panel de citas</a>`,
        )
        : "";

    const bodyHtml = [
        paragraph(escapeHtml(lead)),
        details,
        panel,
    ].join("");

    const textLines = [
        lead,
        customerName ? `Cliente: ${customerName}` : null,
        whenLabel ? `Horario: ${whenLabel}` : null,
        phoneLabel ? `Teléfono: ${phoneLabel}` : null,
        notes ? `Comentario: ${notes}` : null,
        isBusiness && panelUrl ? `Panel: ${panelUrl}` : null,
    ].filter(Boolean);

    return {
        subject,
        text: textLines.join("\n"),
        html: wrapBusinessEmailLayout({
            title: subject,
            preheader: lead,
            bodyHtml,
            businessName: business,
            businessLogoUrl,
        }),
    };
}

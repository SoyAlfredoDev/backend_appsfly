export function mapLastEventToDeliveryStatus(lastEvent) {
    switch (lastEvent) {
        case "delivered":
        case "opened":
        case "clicked":
            return "DELIVERED";
        case "bounced":
        case "complained":
        case "suppressed":
            return "BOUNCED";
        case "failed":
            return "FAILED";
        case "sent":
        case "queued":
        case "scheduled":
        case "delivery_delayed":
            return "SENT";
        default:
            return null;
    }
}

export function parseResendBounceMessage(data) {
    const bounce = data?.bounce;
    if (!bounce) return data?.error ?? "Rechazado por el proveedor";
    const parts = [bounce.type, bounce.message].filter(Boolean);
    return parts.join(": ") || "Rechazado por el proveedor";
}

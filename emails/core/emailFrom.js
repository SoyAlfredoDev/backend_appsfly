const DEFAULT_DOMAIN = "appsfly.app";

export function getPlatformEmailDomain() {
    const fromEnv = process.env.PLATFORM_EMAIL_DOMAIN?.trim().toLowerCase();
    return fromEnv || DEFAULT_DOMAIN;
}

export function getDefaultSenderFrom() {
    const fromEnv = process.env.PLATFORM_EMAIL_DEFAULT_FROM?.trim();
    if (fromEnv) return fromEnv;
    const domain = getPlatformEmailDomain();
    return `AppsFly <no-reply@${domain}>`;
}

export function formatSenderFrom(senderName, senderEmail) {
    const email = senderEmail?.trim().toLowerCase();
    if (!email) return getDefaultSenderFrom();
    const name = (senderName?.trim() || "AppsFly").replace(/[<>]/g, "");
    return `${name} <${email}>`;
}

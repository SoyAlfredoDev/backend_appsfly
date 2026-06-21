const DEFAULT_PLATFORM_OWNER_EMAIL = "soyalfredo.dev@gmail.com";

export function getPlatformOwnerEmail() {
    const fromEnv = process.env.PLATFORM_OWNER_EMAIL?.trim().toLowerCase();
    return fromEnv || DEFAULT_PLATFORM_OWNER_EMAIL;
}

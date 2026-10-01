/**
 * On Vercel each isolate should open a single Prisma connection.
 * Direct Neon URLs still work; pooled URLs should be configured in the project env.
 */
export function serverlessDatabaseUrl(url: string | undefined): string | null {
  if (process.env.VERCEL !== "1") return null;
  const trimmed = url?.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (!parsed.searchParams.has("connection_limit")) {
      parsed.searchParams.set("connection_limit", "1");
    }
    if (!parsed.searchParams.has("pool_timeout")) {
      parsed.searchParams.set("pool_timeout", "10");
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

const CONNECTION_URL = /postgres(?:ql)?:\/\/\S+/gi;

export function publicBootError(error) {
  const message = String(error?.message ?? "Unknown error")
    .replace(CONNECTION_URL, "postgresql://***")
    .slice(0, 800);

  return {
    code: "API_BOOT_FAILED",
    name: error?.name || "Error",
    message,
  };
}

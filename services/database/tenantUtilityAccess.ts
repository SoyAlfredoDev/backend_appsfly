const MODEL_NAME = /^[A-Za-z][A-Za-z0-9]*$/;
const COLUMN_NAME = /^[A-Za-z][A-Za-z0-9_]*$/;
const BLOCKED_MODELS = new Set(["user", "taxdocument", "taxdocumentauditlog"]);
const RESERVED_MODELS = new Set(["constructor", "prototype", "tostring", "valueof"]);
const SENSITIVE_FIELD = /password|secret|token|connection|credential/i;

export class UtilityAccessError extends Error {
  readonly code: "UTILITY_MODEL_FORBIDDEN" | "UTILITY_COLUMN_FORBIDDEN";

  constructor(code: UtilityAccessError["code"], message: string) {
    super(message);
    this.name = "UtilityAccessError";
    this.code = code;
  }
}

export function assertUtilityModel(tableName: string): void {
  const normalized = tableName.trim();
  const key = normalized.toLowerCase();
  if (!MODEL_NAME.test(normalized) || BLOCKED_MODELS.has(key) || RESERVED_MODELS.has(key)) {
    throw new UtilityAccessError(
      "UTILITY_MODEL_FORBIDDEN",
      "Ese recurso no se puede consultar así.",
    );
  }
}

export function assertUtilityColumn(columnName: string): void {
  if (!COLUMN_NAME.test(columnName) || SENSITIVE_FIELD.test(columnName)) {
    throw new UtilityAccessError("UTILITY_COLUMN_FORBIDDEN", "Esa columna no se puede consultar.");
  }
}

export function toPublicRecord(record: unknown): unknown {
  if (!record || typeof record !== "object" || Array.isArray(record)) return record;
  const copy: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (SENSITIVE_FIELD.test(key)) continue;
    copy[key] = value;
  }
  return copy;
}

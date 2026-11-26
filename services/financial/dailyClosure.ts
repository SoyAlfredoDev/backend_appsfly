import { CashBookError, parseCountedCash } from "./cashBook.js";
import { sanitizeTimezone } from "../../libs/businessTimezone.js";

export function closureToday(timeZone: string, now = new Date()): string {
  return now.toLocaleDateString("en-CA", { timeZone: sanitizeTimezone(timeZone) });
}

export function parseClosureDay(value: unknown, timeZone: string): string {
  const day = typeof value === "string" ? value.trim() : "";
  const parsed = new Date(`${day}T00:00:00.000Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(day) ||
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== day ||
    day > closureToday(timeZone)
  ) {
    throw new CashBookError(400, "INVALID_DATE", "Ingresa una fecha de cierre válida hasta hoy.");
  }
  return day;
}

export function resolveClosureCashCount(
  day: string,
  timeZone: string,
  countedCash: unknown,
  withoutCashCount: unknown,
): number | null {
  const count = parseCountedCash(countedCash);
  if (withoutCashCount !== undefined && typeof withoutCashCount !== "boolean") {
    throw new CashBookError(
      400,
      "CLOSURE_COUNT_MODE_INVALID",
      "Selecciona una opción de arqueo válida.",
    );
  }
  if (withoutCashCount) {
    if (day >= closureToday(timeZone)) {
      throw new CashBookError(
        400,
        "CLOSURE_COUNT_REQUIRED",
        "Ingresa el efectivo contado para cerrar el día actual.",
      );
    }
    if (count !== null) {
      throw new CashBookError(
        400,
        "CLOSURE_COUNT_MODE_INVALID",
        "Elige entre guardar un conteo y cerrar sin arqueo.",
      );
    }
    return null;
  }
  if (count === null) {
    throw new CashBookError(
      400,
      "CLOSURE_COUNT_REQUIRED",
      "Ingresa el efectivo contado o elige Cerrar sin arqueo si la fecha es anterior a hoy.",
    );
  }
  return count;
}

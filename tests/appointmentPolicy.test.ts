import { describe, expect, it } from "vitest";

import { createPublicAppointmentSchema } from "../services/appointment/appointmentSchemas.js";
import { buildAppointmentEmail } from "../emails/users/appointments/appointmentEmail.template.js";
import { withAppointmentWriteLock } from "../services/appointment/appointmentService.js";
import {
  appointmentNoticeKind,
  hasAppointmentsPlan,
  isSlotOpen,
  normalizeConcurrentSlots,
  statusAfterTimeChange,
} from "../services/appointment/appointmentPolicy.js";

const now = new Date("2026-10-03T12:00:00.000Z");

function subscription(
  planId: string,
  status: string,
  endDate: string,
): {
  subscriptionPlanId: string;
  subscriptionStatus: string;
  subscriptionEndDate: string;
} {
  return {
    subscriptionPlanId: planId,
    subscriptionStatus: status,
    subscriptionEndDate: endDate,
  };
}

describe("appointment plan access", () => {
  it("gives the Pro trial access and keeps Start out", () => {
    expect(
      hasAppointmentsPlan([subscription("P001", "ACTIVE", "2026-12-01T00:00:00.000Z")], now),
    ).toBe(true);
    expect(
      hasAppointmentsPlan([subscription("P005", "ACTIVE", "2026-12-01T00:00:00.000Z")], now),
    ).toBe(false);
  });

  it("allows an active commercial or professional plan", () => {
    expect(
      hasAppointmentsPlan([subscription("P002", "ACTIVE", "2026-12-01T00:00:00.000Z")], now),
    ).toBe(true);
    expect(
      hasAppointmentsPlan([subscription("P003", "CANCELLED", "2026-12-01T00:00:00.000Z")], now),
    ).toBe(true);
  });

  it("ignores an expired paid plan and still allows a paid plan beside a trial", () => {
    expect(
      hasAppointmentsPlan([subscription("P002", "ACTIVE", "2026-09-01T00:00:00.000Z")], now),
    ).toBe(false);
    expect(
      hasAppointmentsPlan(
        [
          subscription("P001", "ACTIVE", "2026-12-01T00:00:00.000Z"),
          subscription("P003", "ACTIVE", "2026-11-01T00:00:00.000Z"),
        ],
        now,
      ),
    ).toBe(true);
  });
});

describe("appointment slots", () => {
  it("opens a slot only while the concurrent limit has room", () => {
    expect(isSlotOpen(0, 1)).toBe(true);
    expect(isSlotOpen(1, 1)).toBe(false);
    expect(isSlotOpen(1, 2)).toBe(true);
    expect(isSlotOpen(2, 2)).toBe(false);
    expect(normalizeConcurrentSlots("nope")).toBe(1);
    expect(normalizeConcurrentSlots(40)).toBe(20);
  });

  it("keeps the current status when the time changes", () => {
    expect(statusAfterTimeChange("CONFIRMED")).toBe("CONFIRMED");
    expect(statusAfterTimeChange("PENDING")).toBe("PENDING");
  });

  it("chooses the customer notice from the change that happened", () => {
    expect(appointmentNoticeKind({ startsAtChanged: true, status: "CONFIRMED" })).toBe(
      "rescheduled",
    );
    expect(appointmentNoticeKind({ startsAtChanged: false, status: "CANCELLED" })).toBe(
      "cancelled",
    );
    expect(appointmentNoticeKind({ startsAtChanged: false, status: null })).toBeNull();
  });
});

describe("public appointment email", () => {
  it("accepts a booking without email and rejects an invalid one", () => {
    const parsed = createPublicAppointmentSchema.parse({
      firstName: "Ana",
      lastName: "Soto",
      phoneNumber: "912345678",
      contactConsent: true,
      startsAt: "2026-10-04T15:00:00.000Z",
    });
    expect(parsed.customerEmail).toBeNull();

    const invalid = createPublicAppointmentSchema.safeParse({
      firstName: "Ana",
      lastName: "Soto",
      phoneNumber: "912345678",
      contactConsent: true,
      customerEmail: "no-es-correo",
      startsAt: "2026-10-04T15:00:00.000Z",
    });
    expect(invalid.success).toBe(false);
  });
});

describe("appointment email", () => {
  it("tells the customer the new time and tells the business where to review it", () => {
    const customer = buildAppointmentEmail({
      audience: "customer",
      kind: "rescheduled",
      businessName: "Óptica Norte",
      customerName: "Ana Soto",
      whenLabel: "lunes, 6 de octubre, 11:30",
    });
    expect(customer.subject).toContain("cambió de horario");
    expect(customer.text).toContain("lunes, 6 de octubre, 11:30");
    expect(customer.text).toContain("Ana Soto");

    const business = buildAppointmentEmail({
      audience: "business",
      kind: "requested",
      businessName: "Óptica Norte",
      customerName: "Ana Soto",
      whenLabel: "lunes, 6 de octubre, 11:30",
      panelUrl: "https://appsfly.cl/appointments",
    });
    expect(business.text).toContain("https://appsfly.cl/appointments");
    expect(business.subject).toContain("Nueva solicitud");
  });
});

describe("appointment write lock", () => {
  it("books inside the transaction after taking the tenant lock", async () => {
    const tx = { id: "tx" };
    const prisma = {
      $transaction: async (work: (client: typeof tx) => Promise<string>) => work(tx),
      $executeRaw: async () => 1,
    };
    const seen: unknown[] = [];

    const result = await withAppointmentWriteLock(
      {
        $transaction: async (
          work: (client: { $executeRaw: () => Promise<number> }) => Promise<string>,
        ) =>
          work({
            $executeRaw: async () => {
              seen.push("lock");
              return 1;
            },
          }),
      },
      "biz-1",
      async (client: { $executeRaw: () => Promise<number> }) => {
        seen.push(client);
        return "booked";
      },
    );

    expect(result).toBe("booked");
    expect(seen[0]).toBe("lock");
    expect(prisma.$executeRaw).toBeTypeOf("function");
  });
});

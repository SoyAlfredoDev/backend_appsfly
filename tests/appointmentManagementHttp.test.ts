import { randomUUID } from "node:crypto";
import express from "express";
import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Appointment, Prisma } from "../src/generated/business/index.js";

const mocks = vi.hoisted(() => ({
  getTenant: vi.fn(),
  business: vi.fn(),
  subscriptions: vi.fn(),
  email: vi.fn(),
}));

vi.mock("../db.js", () => ({ getPrismaForBusinessId: mocks.getTenant }));
vi.mock("../dbGeneral.js", () => ({
  generalPrisma: {
    business: { findUnique: mocks.business },
    subscription: { findMany: mocks.subscriptions },
  },
}));
vi.mock("../emails/core/sendEmail.js", () => ({ sendEmail: mocks.email }));

import publicRoutes from "../routes/publicAppointment.routes.js";
import {
  appointmentIdForRequest,
  createAppointmentManagementToken,
} from "../services/appointment/appointmentManagementToken.js";

const app = express();
app.use(express.json());
app.use(publicRoutes);

const path = "/public/appointments/negocio-a";
const privatePath = `${path}/manage`;
const originalTime = "2026-11-25T15:30:00.000Z";
const newTime = "2026-11-25T16:00:00.000Z";
const validPayload = () => ({
  firstName: "Ana",
  lastName: "Demo",
  phoneNumber: "900000001",
  contactConsent: true,
  startsAt: originalTime,
  clientRequestId: randomUUID(),
});

const appointments = new Map<string, Appointment>();
const settings = {
  appointmentsEnabled: true,
  customerNotificationsEnabled: true,
  slotDurationMinutes: 30,
  maxConcurrentPerSlot: 1,
  maxDaysAhead: 30,
  weeklyAvailability: [{ dayOfWeek: 3, startTime: "10:00", endTime: "19:00" }],
};

const tenant = {
  $executeRaw: vi.fn().mockResolvedValue(1),
  appointmentSettings: { findFirst: vi.fn(async () => settings) },
  appointment: {
    findUnique: vi.fn(async ({ where }: { where: { appointmentId: string } }) => {
      return appointments.get(where.appointmentId) ?? null;
    }),
    findMany: vi.fn(async ({ where }: { where: Prisma.AppointmentWhereInput }) => {
      const blocked = where.status as { in: Appointment["status"][] };
      const exclusion = where.appointmentId as { not?: string } | undefined;
      return [...appointments.values()].filter(
        (a) => blocked.in.includes(a.status) && a.appointmentId !== exclusion?.not,
      );
    }),
    create: vi.fn(async ({ data }: { data: Omit<Appointment, "createdAt" | "updatedAt"> }) => {
      const row = { ...data, staffNotes: "Interno", createdAt: new Date(), updatedAt: new Date() };
      appointments.set(data.appointmentId, row);
      return row;
    }),
    update: vi.fn(
      async ({ where, data }: { where: { appointmentId: string }; data: Partial<Appointment> }) => {
        const row = appointments.get(where.appointmentId);
        if (!row) throw new Error("Missing appointment fixture");
        const changed = { ...row, ...data };
        appointments.set(where.appointmentId, changed);
        return changed;
      },
    ),
  },
};
let transactionQueue = Promise.resolve();
const prisma = {
  ...tenant,
  $transaction<T>(run: (tx: typeof tenant) => Promise<T>) {
    const result = transactionQueue.then(() => run(tenant));
    transactionQueue = result.then(
      () => undefined,
      () => undefined,
    );
    return result;
  },
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-25T11:00:00.000Z"));
  vi.stubEnv("TOKEN_SECRET", "test-only-appointment-signing-key");
  appointments.clear();
  transactionQueue = Promise.resolve();
  settings.appointmentsEnabled = true;
  mocks.getTenant.mockResolvedValue(prisma);
  mocks.subscriptions.mockResolvedValue([
    { subscriptionPlanId: "P006", subscriptionStatus: "ACTIVE", subscriptionEndDate: "2027-01-01" },
  ]);
  mocks.business.mockImplementation(async ({ where }: { where: { businessId: string } }) => ({
    businessStatus: "ACTIVE",
    businessName: "Óptica de demostración",
    businessId: where.businessId,
    businessTimezone: "America/Santiago",
    businessEmail: "negocio@example.invalid",
  }));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe("public appointment HTTP workflow", () => {
  it("returns the business timezone, permits booking without email and delivers only one business notice on replay", async () => {
    const page = await request(app).get(path).expect(200);
    expect(page.body).toMatchObject({
      timezone: "America/Santiago",
      customerNotificationsEnabled: true,
      emailRequired: false,
    });

    const payload = validPayload();
    const first = await request(app).post(path).send(payload).expect(201);
    expect(first.headers["cache-control"]).toBe("private, no-store");
    expect(first.body).toMatchObject({
      timezone: "America/Santiago",
      appointment: { status: "PENDING", customerEmail: null, startsAt: originalTime },
    });
    expect(typeof first.body.managementToken).toBe("string");
    const replay = await request(app).post(path).send(payload).expect(200);
    expect(replay.body.appointment.appointmentId).toBe(first.body.appointment.appointmentId);
    expect(tenant.appointment.create).toHaveBeenCalledTimes(1);
    expect(mocks.email).toHaveBeenCalledTimes(1);
    expect(mocks.email.mock.calls[0][0]).toMatchObject({ to: "negocio@example.invalid" });
    expect(mocks.email.mock.calls[0][0].text).not.toContain("#gestionar=");
  });

  it("rejects reuse of a request ID with a different email and blocks another request for a full slot", async () => {
    const payload = validPayload();
    await request(app).post(path).send(payload).expect(201);
    const conflict = await request(app)
      .post(path)
      .send({ ...payload, customerEmail: "distinto@example.invalid" })
      .expect(409);
    expect(conflict.body.code).toBe("APPOINTMENT_REQUEST_CONFLICT");
    const full = await request(app).post(path).send(validPayload()).expect(409);
    expect(full.body.code).toBe("SLOT_UNAVAILABLE");
  });

  it("keeps the management token private, scopes it to the tenant and omits personal data", async () => {
    const booking = await request(app)
      .post(path)
      .send({ ...validPayload(), customerEmail: "cliente@example.invalid", notes: "Privado" })
      .expect(201);
    const token = booking.body.managementToken as string;
    await request(app).get(privatePath).expect(404);
    await request(app)
      .get("/public/appointments/negocio-b/manage")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
    const response = await request(app)
      .get(privatePath)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(response.headers["cache-control"]).toBe("private, no-store");
    expect(response.headers.vary).toContain("Authorization");
    expect(response.body).toMatchObject({
      appointment: { startsAt: originalTime, status: "PENDING" },
      canCancel: true,
      canReschedule: true,
    });
    expect(Object.keys(response.body.appointment).sort()).toEqual([
      "appointmentId",
      "endsAt",
      "startsAt",
      "status",
    ]);
    const customer = mocks.email.mock.calls.find(([mail]) => mail.to === "cliente@example.invalid");
    expect(customer?.[0].text).toContain(`#gestionar=${token}`);
  });

  it("requires a new confirmation for a moved appointment and safely repeats cancel", async () => {
    const booking = await request(app).post(path).send(validPayload()).expect(201);
    const { appointmentId } = booking.body.appointment;
    appointments.get(appointmentId)!.status = "CONFIRMED";
    const auth = `Bearer ${booking.body.managementToken}`;
    const changed = await request(app)
      .patch(privatePath)
      .set("Authorization", auth)
      .send({ action: "reschedule", startsAt: newTime })
      .expect(200);
    expect(changed.body.appointment).toMatchObject({
      appointmentId,
      startsAt: newTime,
      status: "PENDING",
    });
    await request(app)
      .patch(privatePath)
      .set("Authorization", auth)
      .send({ action: "reschedule", startsAt: newTime })
      .expect(200);
    expect(tenant.appointment.update).toHaveBeenCalledTimes(1);
    settings.appointmentsEnabled = false;
    const closed = await request(app)
      .patch(privatePath)
      .set("Authorization", auth)
      .send({ action: "reschedule", startsAt: originalTime })
      .expect(409);
    expect(closed.body.code).toBe("APPOINTMENT_CHANGE_NOT_AVAILABLE");
    const canceled = await request(app)
      .patch(privatePath)
      .set("Authorization", auth)
      .send({ action: "cancel" })
      .expect(200);
    expect(canceled.body).toMatchObject({
      appointment: { status: "CANCELLED" },
      canCancel: false,
      canReschedule: false,
    });
    await request(app)
      .patch(privatePath)
      .set("Authorization", auth)
      .send({ action: "cancel" })
      .expect(200);
    expect(tenant.appointment.update).toHaveBeenCalledTimes(2);
  });

  it("rejects tampered and expired links and disallows changes after a booking starts", async () => {
    const booking = await request(app).post(path).send(validPayload()).expect(201);
    const { appointmentId } = booking.body.appointment;
    const token = booking.body.managementToken as string;
    const tampered = token.slice(0, -1) + (token.endsWith("A") ? "B" : "A");
    await request(app).get(privatePath).set("Authorization", `Bearer ${tampered}`).expect(404);
    const expired = createAppointmentManagementToken("negocio-a", appointmentId, 0);
    await request(app).get(privatePath).set("Authorization", `Bearer ${expired}`).expect(404);
    vi.setSystemTime(new Date(originalTime));
    const readOnly = await request(app)
      .get(privatePath)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(readOnly.body).toMatchObject({ canCancel: false, canReschedule: false });
    await request(app)
      .patch(privatePath)
      .set("Authorization", `Bearer ${token}`)
      .send({ action: "cancel" })
      .expect(409);
  });

  it("derives different appointment IDs when businesses reuse the same request key", () => {
    const requestId = randomUUID();
    expect(appointmentIdForRequest("negocio-a", requestId)).not.toBe(
      appointmentIdForRequest("negocio-b", requestId),
    );
  });
});

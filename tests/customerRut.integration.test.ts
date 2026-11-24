import { randomUUID } from "node:crypto";
import express from "express";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import customerRoutes from "../routes/customers.routes.js";
import {
  createCustomerController,
  updateCustomerController,
  validateRutExists,
} from "../controllers/customer.controller.js";
import { PrismaClient } from "../src/generated/business/index.js";
import { executeOperation } from "../services/integrations/operations.js";
import { requireValidCustomerRut } from "../services/customers/customerRut.js";

it("acepta formatos chilenos equivalentes y rechaza un dígito verificador incorrecto", () => {
  expect(requireValidCustomerRut("12.345.678-5")).toBe("12345678-5");
  expect(requireValidCustomerRut(" 12 345 678 5 ")).toBe("12345678-5");
  expect(() => requireValidCustomerRut("12.345.678-4")).toThrow("dígito verificador");
  expect(() => requireValidCustomerRut("x123456785")).toThrow("dígito verificador");
});

it("la búsqueda de RUT exige autenticación en la ruta real", async () => {
  const app = express();
  app.use(express.json(), customerRoutes);
  await request(app).post("/customers/rut-lookup").send({ rut: "12345678-5" }).expect(401);
});

const url = process.env.TEST_CUSTOMER_RUT_DATABASE_URL;
const isolated =
  !!url && new URL(url).hostname === "127.0.0.1" && new URL(url).pathname === "/af_rut_test";

describe.skipIf(!isolated)("alta y consulta de RUT contra PostgreSQL local", () => {
  const userId = randomUUID();
  const businessId = randomUUID();
  let prisma: PrismaClient;
  const app = express();
  const rut = "12345678-5";
  const create = (document: string, type = "rut") => ({
    customerFirstName: "Ficha prueba",
    customerDocumentType: type,
    customerDocumentNumber: document,
    createdByUserId: userId,
  });

  beforeAll(async () => {
    prisma = new PrismaClient({ datasourceUrl: url });
    await prisma.user.create({
      data: {
        userId,
        userFirstName: "QA",
        userLastName: "RUT",
        userEmail: `${userId}@example.invalid`,
        userRole: "ADMIN",
      },
    });
    app.use(express.json(), (req, _res, next) => {
      req.prisma = prisma;
      req.tenantBusinessId = businessId;
      next();
    });
    app.post("/customers/rut-lookup", validateRutExists);
    app.post("/customers", createCustomerController);
    app.put("/customers/:customerId", updateCustomerController);
  });

  afterAll(async () => {
    if (!prisma) return;
    await prisma.integrationOperation.deleteMany({ where: { keyId: userId } });
    await prisma.customer.deleteMany({ where: { createdByUserId: userId } });
    await prisma.user.deleteMany({ where: { userId } });
    await prisma.$disconnect();
  });

  it("distingue ausencia, ficha existente, formas históricas y evita una carrera con la API", async () => {
    const lookup = (input: string) =>
      request(app).post("/customers/rut-lookup").send({ rut: input });
    expect((await lookup("12.345.678-5").expect(200)).body).toEqual({
      rut,
      exists: false,
      customers: [],
    });
    await lookup("12.345.678-0").expect(400);

    const first = request(app).post("/customers").send(create("12.345.678-5"));
    const second = executeOperation(
      {
        prisma,
        businessId,
        keyId: userId,
        userId,
        timezone: "America/Santiago",
        businessType: "general",
        allowCredit: false,
        controlDelivery: false,
      },
      "customers",
      {
        externalId: userId,
        firstName: "Ficha prueba API",
        documentType: "RUT",
        documentNumber: "123456785",
      },
      false,
    )
      .then((r) => ({ status: r.created ? 201 : 200 }))
      .catch((error: { statusCode: number }) => ({ status: error.statusCode }));
    const results = await Promise.all([first, second]);
    expect(results.map(({ status }) => status).sort()).toEqual([201, 409]);

    const match = (await lookup("123456785").expect(200)).body;
    expect(match.customers).toHaveLength(1);
    const id: string = match.customers[0].customerId;
    expect(await prisma.customer.count({ where: { createdByUserId: userId } })).toBe(1);

    await prisma.customer.update({
      where: { customerId: id },
      data: { customerDocumentType: "RUT", customerDocumentNumber: "12.345.678-5" },
    });
    const manualConflict = await request(app)
      .post("/customers")
      .send(create("123456785"))
      .expect(409);
    expect(manualConflict.body).toMatchObject({
      code: "CUSTOMER_RUT_EXISTS",
      customers: [{ customerId: id }],
    });
    const other = await request(app)
      .post("/customers")
      .send(create("123456785", "passport"))
      .expect(201);
    await request(app)
      .put(`/customers/${other.body.customer.customerId}`)
      .send({ customerDocumentType: "rut" })
      .expect(409);
    await request(app)
      .put(`/customers/${id}`)
      .send({ customerFirstName: "Nombre corregido" })
      .expect(200);
    expect((await lookup("12 345 678 - 5").expect(200)).body.customers[0]).toMatchObject({
      customerId: id,
      customerFirstName: "nombre corregido",
    });
  }, 25_000);
});

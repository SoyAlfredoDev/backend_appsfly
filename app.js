import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import saleDetailsRoutes from "./routes/saleDetails.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import businessRoutes from "./routes/business.routes.js";
import userBusinessRoutes from "./routes/userBussiness.routes.js";
import userGuestRoutes from "./routes/userGuest.routes.js";
import dailySalesRoutes from "./routes/dailySales.routes.js";
import transactionsRoutes from "./routes/transactions.routes.js";
import expensesRoutes from "./routes/expenses.routes.js";
import utilsRoutes from "./routes/utils.routes.js";
import subscriptionsRoutes from "./routes/subscriptions.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import ticketDetailRoutes from "./routes/ticketDetail.routes.js";
import emailRoutes from "./routes/email.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import planRoutes from "./routes/plan.routes.js";
import providersRoutes from "./routes/providers.routes.js";
import purchasesRoutes from "./routes/purchases.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import asmrCampaignRoutes from "./routes/asmrCampaign.routes.js";
import assistantRoutes from "./routes/assistant.routes.js";
import adminEmailCampaignRoutes from "./routes/adminEmailCampaign.routes.js";
import adminNotificationRoutes from "./routes/adminNotification.routes.js";
import emailProspectRoutes from "./routes/emailProspect.routes.js";
import agentTaskRoutes from "./routes/agentTask.routes.js";
import taxDocumentsRoutes from "./routes/taxDocuments.routes.js";
import { resendWebhookController } from "./controllers/resendWebhook.controller.js";

import dotenv from "dotenv";

dotenv.config();

const appEnv = process.env.APP_ENV || process.env.NODE_ENV || "development";
/** En Vercel, NODE_ENV suele ser production aunque APP_ENV no esté definido. */
const isProduction =
  appEnv === "production" ||
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL === "1";

const app = express();

app.use(cookieParser());
app.post(
    "/api/webhooks/resend",
    express.raw({ type: "application/json" }),
    resendWebhookController,
);
app.use(express.json());
console.log(">>>>> ENVIRONMENT:", isProduction ? "Production" : "Development", {
  appEnv,
  nodeEnv: process.env.NODE_ENV,
  vercel: process.env.VERCEL,
});

const productionOrigins = [
  "https://appsfly.app",
  "https://frontend-appsfly.vercel.app",
  "https://www.appsfly.app",
  "https://appsfly.netlify.app",
  "https://api.appsfly.app",
];

const isVercelPreviewOrigin = (origin) =>
  /^https:\/\/frontend-appsfly(-[a-z0-9-]+)?\.vercel\.app$/i.test(origin);

const isAllowedProductionOrigin = (origin) =>
  !origin ||
  productionOrigins.includes(origin) ||
  isVercelPreviewOrigin(origin);

const isLocalDevOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

app.use(
  cors({
    origin: isProduction
      ? (origin, callback) => {
          if (isAllowedProductionOrigin(origin)) {
            callback(null, origin || productionOrigins[1]);
          } else {
            callback(new Error(`CORS bloqueado para origen: ${origin}`));
          }
        }
      : (origin, callback) => {
          if (!origin || isLocalDevOrigin(origin) || isAllowedProductionOrigin(origin)) {
            callback(null, origin || "http://localhost:5173");
          } else {
            callback(new Error(`CORS bloqueado para origen: ${origin}`));
          }
        },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-AppsFly-Business-Id",
    ],
    optionsSuccessStatus: 204,
  }),
);

app.use(morgan("dev"));

app.use("/api", authRoutes);
app.use("/api", customersRoutes);
app.use("/api", usersRoutes);
app.use("/api", productsRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", servicesRoutes);
app.use("/api", saleDetailsRoutes);
app.use("/api", salesRoutes);
app.use("/api", paymentsRoutes);
app.use("/api", businessRoutes);
app.use("/api", userBusinessRoutes);
app.use("/api", userGuestRoutes);
app.use("/api", dailySalesRoutes);
app.use("/api", transactionsRoutes);
app.use("/api", expensesRoutes);
app.use("/api", utilsRoutes);
app.use("/api", subscriptionsRoutes);
app.use("/api", webhookRoutes);
app.use("/api", ticketRoutes);
app.use("/api", ticketDetailRoutes);
app.use("/api", emailRoutes);
app.use("/api", newsletterRoutes);
app.use("/api", adminRoutes);
app.use("/api", planRoutes);
app.use("/api", purchasesRoutes);
app.use("/api", providersRoutes);
app.use("/api", reportsRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", asmrCampaignRoutes);
app.use("/api", assistantRoutes);
app.use("/api", adminEmailCampaignRoutes);
app.use("/api", adminNotificationRoutes);
app.use("/api", emailProspectRoutes);
app.use("/api", agentTaskRoutes);
app.use("/api", taxDocumentsRoutes);

export default app;

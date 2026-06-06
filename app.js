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
import ticketRoutes from "./routes/ticket.routes.js";
import ticketDetailRoutes from "./routes/ticketDetail.routes.js";
import emailRoutes from "./routes/email.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import planRoutes from "./routes/plan.routes.js";
import providersRoutes from "./routes/providers.routes.js";
import purchasesRoutes from "./routes/purchases.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

import dotenv from "dotenv";

dotenv.config();

const appEnv = process.env.APP_ENV || process.env.NODE_ENV || "development";
const isProduction = appEnv === "production";

const app = express();

app.use(cookieParser());
app.use(express.json());
console.log(">>>>> ENVIRONMENT:", isProduction ? "Production" : "Development");

const productionOrigins = [
  "https://appsfly.app",
  "https://frontend-appsfly.vercel.app",
  "https://www.appsfly.app",
  "https://appsfly.netlify.app",
];

const isLocalDevOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

app.use(
  cors({
    origin: isProduction
      ? productionOrigins
      : (origin, callback) => {
          if (!origin || isLocalDevOrigin(origin)) {
            callback(null, origin || "http://localhost:5173");
          } else {
            callback(new Error(`CORS bloqueado para origen: ${origin}`));
          }
        },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    optionsSuccessStatus: 200,
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
app.use("/api", ticketRoutes);
app.use("/api", ticketDetailRoutes);
app.use("/api", emailRoutes);
app.use("/api", newsletterRoutes);
app.use("/api", adminRoutes);
app.use("/api", planRoutes);
app.use("/api", purchasesRoutes);
app.use("/api", providersRoutes);
app.use("/api", reportsRoutes);

export default app;

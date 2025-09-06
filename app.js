import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import servicesRoutes from "./routes/services.routes.js"
import saleDetailsRoutes from "./routes/saleDetails.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import paymentsRoutes from "./routes/payments.routes.js"
import businessRoutes from "./routes/business.routes.js";
import userBusinessRoutes from "./routes/userBussiness.routes.js";
import userGuestRoutes from "./routes/userGuest.routes.js";



const app = express();

app.use(cookieParser());
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://appsfly.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(morgan('dev'));
app.use('/api', authRoutes);
app.use('/api', customersRoutes);
app.use('/api', usersRoutes);
app.use('/api', productsRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', servicesRoutes);
app.use('/api', saleDetailsRoutes);
app.use('/api', salesRoutes);
app.use('/api', paymentsRoutes);
app.use('/api', businessRoutes);
app.use('/api', userBusinessRoutes);
app.use('/api', userGuestRoutes);

export default app;
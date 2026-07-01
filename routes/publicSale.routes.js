import { Router } from "express";
import { getPublicSaleReceiptController } from "../controllers/publicSale.controller.js";

const router = Router();

router.get("/public/sales/receipt/:token", getPublicSaleReceiptController);

export default router;

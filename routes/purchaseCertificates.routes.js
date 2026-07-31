import { Router } from "express";
import {
    listPurchaseCertificatesController,
    listBySaleController,
    getByIdController,
    createFromSaleController,
    updateController,
    issueController,
    voidController,
    deleteController,
} from "../controllers/purchaseCertificate.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

router.get("/purchase-certificates", ...auth, listPurchaseCertificatesController);
router.post("/purchase-certificates", ...auth, createFromSaleController);
router.get("/purchase-certificates/:id", ...auth, getByIdController);
router.put("/purchase-certificates/:id", ...auth, updateController);
router.patch("/purchase-certificates/:id/issue", ...auth, issueController);
router.patch("/purchase-certificates/:id/void", ...auth, voidController);
router.delete("/purchase-certificates/:id", ...auth, deleteController);
router.get("/sales/:saleId/purchase-certificates", ...auth, listBySaleController);

export default router;

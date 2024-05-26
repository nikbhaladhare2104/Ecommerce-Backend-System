import { Router } from "express";
import {
  placeOrder,
  getOrders,
  checkout,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/place-order", authMiddleware, placeOrder);
router.get("/get-orders", authMiddleware, getOrders);
router.post("/checkout", authMiddleware, checkout);

export default router;

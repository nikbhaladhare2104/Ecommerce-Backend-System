import { Router } from "express";
import {
  userProductOrders,
  weeklyOrders,
  popularProducts,
} from "../controllers/analyticsController.js";

const router = Router();

router.get("/user-product-orders", userProductOrders);
router.get("/weekly-orders", weeklyOrders);
router.get("/popular-products", popularProducts);

export default router;

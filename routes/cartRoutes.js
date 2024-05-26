import { Router } from "express";
const router = Router();
import { addToCartValidationRules, validate } from "../utils/validation.js";
import { addToCart, viewCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post(
  "/add-to-cart",
  addToCartValidationRules(),
  validate,
  authMiddleware,
  addToCart
);
router.get("/get-cart", authMiddleware, viewCart);

export default router;

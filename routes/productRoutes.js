import { Router } from "express";
const router = Router();
import { createProductValidationRules, validate } from "../utils/validation.js";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

router.post(
  "/create-product",
  createProductValidationRules(),
  validate,
  createProduct
);
router.get("/get-products", getProducts);

export default router;

import { Router } from "express";
import {
  signupValidationRules,
  loginValidationRules,
  validate,
} from "../utils/validation.js";
import { signup, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signupValidationRules(), validate, signup);
router.post("/login", loginValidationRules(), validate, login);

export default router;

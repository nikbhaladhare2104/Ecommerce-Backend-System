import { body, validationResult } from "express-validator";

const signupValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
  ];
};

const loginValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

// We dont need to add this into our routes but for simplicity and correctness, we will add it here
const createProductValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Product name is required"),
    body("description")
      .notEmpty()
      .withMessage("Product description is required"),
    body("price")
      .notEmpty()
      .withMessage("Product price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
    body("stock")
      .notEmpty()
      .withMessage("Product stock is required")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
  ];
};

// We dont need to add this into our routes but for simplicity and correctness, we will add it here
const addToCartValidationRules = () => {
  return [
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("quantity")
      .notEmpty()
      .withMessage("Quantity is required")
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive integer"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export {
  signupValidationRules,
  loginValidationRules,
  createProductValidationRules,
  addToCartValidationRules,
  validate,
};

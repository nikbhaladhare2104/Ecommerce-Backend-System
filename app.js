import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

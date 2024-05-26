import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export async function placeOrder(req, res) {
  const userId = req.user._id;
  try {
    // Retrieve the latest order for the user from the order collection
    const latestOrder = await Order.findOne({ userId }).sort({ createdAt: -1 });
    // const latestOrder = await Order.findOne({ userId });
    if (!latestOrder) {
      return res.status(400).json({ message: "No order found for the user" });
    }
    // Access the data from the latest order
    const { products, totalPrice } = latestOrder;

    // Optionally, we  can perform additional processing here, Like:
    // 1 Payment Processing
    // 2 Shipping
    // 3 Stock Management

    // Update the status of the latest order to "placed"
    await Order.updateOne(
      { _id: latestOrder._id },
      { $set: { status: "Placed" } }
    );

    res
      .status(201)
      .json({ message: "Order placed successfully", products, totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
}

export async function getOrders(req, res) {
  const userId = req.user._id;
  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
}

export async function checkout(req, res) {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res.status(400).json({ message: "No items in cart" });
    }
    const totalPrice = cart.products.reduce(
      (acc, product) => acc + product.quantity * product.productId.price,
      0
    );
    const newOrder = new Order({
      userId,
      products: cart.products,
      totalPrice,
      status: "Pending",
    });
    await newOrder.save();
    await Cart.deleteOne({ userId });
    res
      .status(201)
      .json({ message: "Checkout successful", orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: "Error during checkout", error });
  }
}

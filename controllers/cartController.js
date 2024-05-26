import Cart from "../models/cartModel.js";

export async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  // console.log(req.user);

  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    res.json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
}

export async function viewCart(req, res) {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
}

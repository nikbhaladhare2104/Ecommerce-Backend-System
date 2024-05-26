import Product from "../models/productModel.js";

export async function createProduct(req, res) {
  const { name, description, price, stock } = req.body;
  try {
    const newProduct = new Product({ name, description, price, stock });
    await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      productId: newProduct._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
}

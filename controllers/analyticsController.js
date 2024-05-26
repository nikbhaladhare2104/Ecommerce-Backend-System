import Order from "../models/orderModel.js";

export async function userProductOrders(req, res) {
  try {
    const orders = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: { userId: "$userId", productId: "$products.productId" },
          totalQuantity: { $sum: "$products.quantity" },
          totalValue: {
            $sum: { $multiply: ["$products.quantity", "$products.price"] },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          userId: "$_id.userId",
          username: { $arrayElemAt: ["$user.username", 0] },
          productId: "$_id.productId",
          productName: { $arrayElemAt: ["$product.name", 0] },
          totalQuantity: 1,
          totalValue: 1,
        },
      },
    ]);

    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user product orders", error });
  }
}

export async function weeklyOrders(req, res) {
  const startDate = new Date("2024-01-01");
  const endDate = new Date("2024-03-31");

  try {
    const orders = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: { week: { $week: "$createdAt" } },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id.week": 1 } },
    ]);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weekly orders", error });
  }
}

export async function popularProducts(req, res) {
  try {
    const products = await Order.aggregate([
      { $unwind: "$products" },
      { $group: { _id: "$products.productId", totalOrders: { $sum: 1 } } },
      { $match: { totalOrders: { $gte: 5 } } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          productId: "$_id",
          productName: { $arrayElemAt: ["$product.name", 0] },
          totalOrders: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular products", error });
  }
}

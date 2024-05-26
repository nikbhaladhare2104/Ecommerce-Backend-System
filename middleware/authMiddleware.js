import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;

// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   // const token = req.header("Authorization")?.replace("Bearer ", "");
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).json({ message: "Invalid token." });
//   }
// };

// export default authMiddleware;

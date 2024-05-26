import { connect } from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

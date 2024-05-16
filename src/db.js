import moongose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await moongose.connect(config.DB);
    console.log("Database connected successfully");
  } catch (error) {
    colors.error(error);
  }
};

export default connectDB;

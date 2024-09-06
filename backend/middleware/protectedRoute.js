import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.jwt;

    // Check if no token is provided
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is invalid, handle it
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Ivalid Token" });
    }

    // Find the user from the decoded token's userId, exclude password
    const user = await User.findById(decoded.userId).select("-password");

    // If user does not exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log("Error in ProtectRoute middleware", error.message);

    // Handle token verification errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // General internal server error
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default protectRoute;

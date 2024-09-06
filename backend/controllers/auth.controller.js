import bcrypt from "bcryptjs";
import {
  userSignupSchema,
  userLoginSchema,
} from "../validation/user.validate.js";

import generateTokenAndCookie from "../utilis/generateToken.js";
import User from "../models/user.model.js";

// Signup Controller
export const signup = async (req, res) => {
  const { body } = req;
  try {
    // Validate the incoming request body using the userSignupSchema
    const { error, value } = userSignupSchema.validate(body);
    
    // If validation fails, send a 400 Bad Request response with the error details
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Check if a user with the provided username already exists in the database
    const user = await User.findOne({ username: value.username })
    
    // If the username already exists, return an error response
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // Hash the user's password before saving it in the database
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(value.password, salt);

    // Assign a profile picture URL based on the user's gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${value.username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${value.username}`;

    // Create a new user instance with the provided data
    const newUser = new User({
      username: value.username,
      fullname: value.fullname,
      password: hashPassword, // Store the hashed password
      gender: value.gender,
      profilePic: value.gender === "male" ? boyProfilePic : girlProfilePic, // Assign profile pic based on gender
    });

    // If the new user is successfully created, generate a JWT token and set it in the cookie
    if (newUser) {
      generateTokenAndCookie(newUser._id, res);

      // Save the new user to the database
      await newUser.save();

      // Return a success response with the new user's data
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      // If there's an issue with the user data, return a 400 error
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    // Log any errors and return a 500 Internal Server Error response
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { body } = req;
  try {
    // Validate the incoming request body using the userLoginSchema
    const { error, value } = userLoginSchema.validate(body);

    // If validation fails, return a 400 error with details
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Find the user by username in the database
    const user = await User.findOne({ username: value.username });

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(
      value.password,
      user?.password || ""
    );

    // If user is not found or password is incorrect, return a 400 error
    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    // If login is successful, generate a token and set it in the cookie
    generateTokenAndCookie(user._id, res);

    // Send a success response with the user's data
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    // Log any errors and return a 500 Internal Server Error response
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Logout Controller
export const logout = (req, res) => {
  try {
    // Clear the JWT cookie by setting it to an empty string and setting the expiration to 0
    res.cookie("jwt", "", { maxAge: 0 });
    
    // Send a success response indicating the user has logged out
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    // Log any errors and return a 500 Internal Server Error response
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

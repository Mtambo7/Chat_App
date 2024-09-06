import mongoose from "mongoose";

// Define the schema for a user in the system
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    fullname: {
      type: String, // Full name must be a string
      required: true, // Full name is required
    },
    // Unique username for the user
    username: {
      type: String, // Username must be a string
      required: true, // Username is required
      unique: true, // Each username must be unique
    },
    // Hashed password for the user
    password: {
      type: String, // Password must be a string
      required: true, // Password is required
      minlength: 6, // Minimum password length is 6 characters
    },
    // Gender of the user, restricted to "male" or "female"
    gender: {
      type: String, // Gender must be a string
      required: true, // Gender is required
      enum: ["male", "female"], // Can only be "male" or "female"
    },
    // URL for the user's profile picture
    profilePic: {
      type: String, // Profile picture URL must be a string
      default: "", // Default is an empty string if no picture is provided
    },
  },
  // Automatically adds `createdAt` and `updatedAt` timestamps
  { timestamps: true }
);

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

export default User; // Export the User model

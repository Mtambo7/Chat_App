import mongoose from "mongoose";

// Define the schema for a message in a conversation
const messageSchema = mongoose.Schema(
  {
    // ID of the user sending the message
    senderId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User", // Links to the User collection
      required: true, // Must be provided
    },
    // ID of the user receiving the message
    receiverId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User", // Links to the User collection
      required: true, // Must be provided
    },
    // The actual message content
    message: {
      type: String, // The message text
      required: true, // Must be provided
    },
  },
  // Adds `createdAt` and `updatedAt` timestamps automatically
  { timestamps: true }
);

// Create the Message model based on the schema
const Message = mongoose.model("Message", messageSchema);

export default Message; // Export the Message model


import mongoose from "mongoose";

// Schema for a conversation between participants
const convarsationSchema = new mongoose.Schema(
  {
    // Array of users participating in the conversation
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
    // Array of messages in the conversation
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message", // Reference to the Message model
        default: [],
      },
    ],
  },
  // Automatically add createdAt and updatedAt timestamps
  { timestamps: true }
);

// Create and export the Conversation model
const Convarsation = mongoose.model("Convarsation", convarsationSchema);

export default Convarsation;

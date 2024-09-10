import Convarsation from "../models/convarsation.model.js"; // Import the Convarsation model
import Message from "../models/message.model.js"; // Import the Message model
import { getReceiverSocketId, io } from "../socket/socket.js";


// Controller to handle sending a message
export const sendMessage = async (req, res) => {
  // Destructure the request body to extract message content,
  // params for receiverId, and user object for senderId
  const {
    body: { message }, // The message content sent in the request body
    params: { id: receiverId }, // The receiver's ID from the request parameters (e.g., route /message/:id)
    user: { _id: senderId }, // The sender's ID from the authenticated user (req.user)
  } = req;

  try {
    // Find an existing conversation between the sender and receiver
    let convarsation = await Convarsation.findOne({
      participants: { $all: [senderId, receiverId] }, // Check if both sender and receiver are part of the conversation
    });

    // If no conversation exists, create a new one with both participants
    if (!convarsation) {
      convarsation = await Convarsation.create({
        participants: [senderId, receiverId], // Create a new conversation with sender and receiver
      });
    }

    // Create a new message with the senderId, receiverId, and message content
    const newMessage = new Message({
      senderId, // ID of the user sending the message
      receiverId, // ID of the user receiving the message
      message, // Actual message content
    });

    // If the message is successfully created, add its ID to the conversation's message list
    if (newMessage) {
      convarsation.message.push(newMessage._id); // Push the new message's ID into the conversation's messages array
    }

    // Save the updated conversation and the new message to the database in parallel
    await Promise.all([convarsation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // Respond to the client with the newly created message, along with a 201 status code
    res.status(201).json(newMessage); // Return the message in the response body with a 201 status (created)
  } catch (error) {
    // If any error occurs, log the error and respond with a 500 internal server error
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" }); // Send a 500 response with an error message
  }
};

export const getMessages = async (req, res) => {
  // Extract userToChatId from request params and senderId from the authenticated user
  const {
    params: { id: userToChatId }, // ID of the user to chat with (from the route)
    user: { _id: senderId }, // ID of the authenticated user (sender)
  } = req;

  try {
    // Find the conversation that includes both the sender and the user they want to chat with
    const convarsation = await Convarsation.findOne({
      participants: { $all: [senderId, userToChatId] }, // Look for a conversation with both participants
    }).populate("message"); // Populate the messages field with actual message data

    // If no conversation exists, return an empty array as response
    if (!convarsation) {
      return res.status(200).json([]); // No conversation, so respond with an empty array
    }

    // Extract the messages from the conversation
    const message = convarsation.message;

    // Respond with the messages in the conversation
    res.status(200).json(message);
  } catch (error) {
    // If any error occurs, log the error and respond with a 500 internal server error
    console.log("Error in getMessages controller", error.message); // Log the error message for debugging
    res.status(500).json({ success: false, message: "Internal server error" }); // Send a 500 response with an error message
  }
};

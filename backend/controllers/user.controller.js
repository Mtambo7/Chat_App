import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  const {
    user: { _id: loggedInUserId },
  } = req;

  try {
      const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
      
      res.status(200).json(filterUsers)
  } catch (error) {
    // Log any errors and return a 500 Internal Server Error response
    console.log("Error in getUserForSidebar controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

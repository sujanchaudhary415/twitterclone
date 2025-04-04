import messageModel from "./../models/message.model.js";
import cloudinary from "./../config/cloudinary.js";

export const getMessages = async (req, res) => {
  try {
    const userToChatId = req.params.id; // Use params instead of body
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by timestamp

    res.json({ messages });
  } catch (error) {
    console.error("Error getting messages", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { image, text, receiverId } = req.body; // Extract receiverId properly
    const senderId = req.user._id;

    let imageUrl = null;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,  
      image: imageUrl,
    });

    await newMessage.save();
    res.json({ message: newMessage });

  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).json({ message: "Server Error" });
  }
};

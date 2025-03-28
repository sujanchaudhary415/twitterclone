import { validationResult } from "express-validator";
import cloudinary from "./../config/cloudinary.js";
import postModel from "./../models/post.model.js";

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { caption } = req.body;
    const image = req.file;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const result = await cloudinary.uploader.upload(image.path, {
      resourceType: "image",
    });

    const newPost = new postModel({
      caption,
      image: result.secure_url,
      createdBy: req.user._id,
    });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const fetchPost = async (req, res, next) => {
  try {
    const posts = await postModel
      .find()
      .populate("createdBy", "name email profilePic")
      .populate("comments.createdBy", "name email profilePic")
      .sort({ createdAt: -1 }); // Sort by latest post
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const fetchPostByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id; // Get user ID from the request (assuming authentication)

    const posts = await postModel
      .find({ createdBy: userId }) // Find all posts created by the user
      .populate("createdBy", "name email profilePic") // Populate createdBy with user details
      .populate("comments.createdBy", "name email profilePic")
      .sort({ createdAt: -1 }); // Sort by latest post

    if (!posts.length) {
      // Check if posts array is empty
      return res.status(404).json({ error: "No posts found for this user" });
    }

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!postId || !comment) {
      return res
        .status(400)
        .json({ error: "Post ID and comment are required" });
    }

    // Add comment using findByIdAndUpdate
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { text: comment, createdBy: user._id } },
      },
      { new: true } // Return updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const user = req.user; // Ensure user is extracted from auth middleware

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasLiked = post.likes.includes(user._id);

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      hasLiked ? { $pull: { likes: user._id } } : { $push: { likes: user._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      post: updatedPost,
      message: hasLiked ? "Like removed" : "Post liked",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


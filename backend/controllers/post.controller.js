import { validationResult } from "express-validator";
import cloudinary from './../config/cloudinary.js';
import postModel from './../models/post.model.js';

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
    if(!image)
    {
        return res.status(400).json({error: "No image provided"});
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

export const fetchPost=async(req, res, next) =>{
  try {
     const posts=await postModel.find().populate("createdBy","name email profilePic")
     res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
    
  }
}

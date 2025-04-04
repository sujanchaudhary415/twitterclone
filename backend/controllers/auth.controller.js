import { validationResult } from "express-validator";
import userModel from "./../models/auth.model.js";
import createUser from "./../services/auth.services.js";
import cloudinary from "./../config/cloudinary.js";

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password, proffession, location } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      proffession,
      location,
    });
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const checkAuth = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("error in checking authentication", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      throw new Error("Profile picture is required");
    }
    const uploadResponse = cloudinary.uploader.upload(profilePic);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profilePic: (await uploadResponse).secure_url },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("error in updating profile", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userModel.find({}).select("-password");
    res.json(user);
  } catch (error) {
    console.error("error in getting user", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getLoggedInUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("error in getting logged in user", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const follow = async (req, res, next) => {
  try {
    const { userId } = req.body; // ID of the user to follow/unfollow
    const loggedInUser = req.user._id; // ID of the logged-in user

    const userToFollow = await userModel.findById(userId);
    const currentUser = await userModel.findById(loggedInUser);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already followed
    const isFollowing = userToFollow.followers.includes(loggedInUser);

    if (isFollowing) {
      // Unfollow user
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== loggedInUser.toString()
      );
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userId.toString()
      );
      await userToFollow.save();
      await currentUser.save();
      return res.json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      userToFollow.followers.push(loggedInUser);
      currentUser.following.push(userId);
      await userToFollow.save();
      await currentUser.save();
      return res.json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.error("Error in follow/unfollow action:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



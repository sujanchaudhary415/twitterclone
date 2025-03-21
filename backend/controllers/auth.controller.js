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

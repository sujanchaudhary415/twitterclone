import userModel from "./../models/auth.model.js";
import jwt  from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

import express from "express";
import { body } from "express-validator";
import {
  getLoggedInUser,
  getUser,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "./../middleware/user.middleware.js";
import { checkAuth } from "./../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  body("name").isString().withMessage("Name is required"),
  body("email").isString().withMessage("Email is required"),
  body("password").isString().withMessage("Password is required"),
  body("location").isString().withMessage("Location is required"),
  body("proffession").isString().withMessage(" Proffession is required"),
  signup
);

authRouter.post(
  "/login",
  body("email").isString().withMessage("Email is required"),
  body("password").isString().withMessage("Password is required"),
  login
);

authRouter.post("/logout", logout);
authRouter.get("/check", protectRoute, checkAuth);
authRouter.put("/updateProfile", protectRoute, updateProfile);
authRouter.get("/getUser", getUser);
authRouter.get("/me",protectRoute,getLoggedInUser);

export default authRouter;

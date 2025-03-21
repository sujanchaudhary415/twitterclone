import express from "express";
import { body } from "express-validator";
import { protectRoute } from "./../middleware/user.middleware.js";
import { createPost, fetchPost } from "./../controllers/post.controller.js";
import upload from "../middleware/multer.js";

const postRouter = express.Router();

postRouter.post(
  "/create",
  upload.single("image"),
  body("caption").isString().withMessage("caption is required"),
  protectRoute,
  createPost
);

postRouter.get("/get", protectRoute, fetchPost);

export default postRouter;

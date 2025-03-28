import express from "express";
import { body } from "express-validator";
import { protectRoute } from "./../middleware/user.middleware.js";
import { addComment, createPost, fetchPost, fetchPostByUserId, likePost } from "./../controllers/post.controller.js";
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
postRouter.get('/getByUserId', protectRoute, fetchPostByUserId);
postRouter.post("/addComment", protectRoute,addComment);
postRouter.post("/like", protectRoute,likePost)

export default postRouter;

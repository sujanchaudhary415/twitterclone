import { sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "./../middleware/user.middleware.js";
import express from "express";
import { getMessages } from "./../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/send", protectRoute, sendMessage);
messageRouter.get("/receive/:id", protectRoute, getMessages);

export default messageRouter;
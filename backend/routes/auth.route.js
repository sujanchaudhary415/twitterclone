import express from 'express';
import { body } from 'express-validator';
import { login, signup } from '../controllers/auth.controller.js';
import { protectRoute } from './../middleware/user.middleware.js';
import { checkAuth } from './../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register',
    body("name").isString().withMessage("Name is required"),
    body("email").isString().withMessage("Email is required"),
    body("password").isString().withMessage("Password is required")
    ,signup);

authRouter.post('/login',
    body("email").isString().withMessage("Email is required"),
    body("password").isString().withMessage("Password is required")
    ,login
)

authRouter.get("/check",protectRoute,checkAuth);


export default authRouter;
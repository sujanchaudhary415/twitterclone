import express from 'express';
import { body } from 'express-validator';
import { signup } from './../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register',
    body("name").isString().withMessage("Name is required"),
    body("email").isString().withMessage("Email is required"),
    body("password").isString().withMessage("Password is required")
    ,signup);


export default authRouter;
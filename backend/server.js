import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import postRouter from './routes/post.route.js';
import messageRouter from './routes/message.route.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// Routes
app.use('/api/auth',authRouter);
app.use('/api/posts',postRouter);
app.use('/api/messages',messageRouter)

app.listen(4000,()=>{
    console.log("Server started at http://localhost:4000");
    connectDB()
})
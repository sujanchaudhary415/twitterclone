import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import authRouter from './routes/auth.route.js';


dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/api/auth',authRouter)

app.listen(4000,()=>{
    console.log("Server started at http://localhost:4000");
    connectDB()
})
import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './database/connectToDB.js';
import adminRoute from './routes/adminRoutes.js';
import couponRoute from './routes/couponRoutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from 'path';

const app = express();
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
}));

dotenv.config();

connectToDB();

app.use('/api/admin', adminRoute);
app.use('/api', couponRoute);

app.use(express.static(path.join(__dirname , '/frontend/dist')));

app.get("*" , (req , res)=>{
    res.sendFile(path.join(__dirname , "frontend" , "dist" , "index.html"));
})

app.listen('3000', () => {
    console.log('Server is running on port 3000');
})
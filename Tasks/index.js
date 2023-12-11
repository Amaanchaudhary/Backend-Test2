import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './Routes/index.js';

const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/" , (req , res) => {
    res.send("Welcome to port 8001 task")
})

app.use("/api/v1" , router);

app.listen(8001 , () => console.log("App is running on 8001"));
mongoose.connect(process.env.MONGOURL).then(() => console.log("Database Connected"));



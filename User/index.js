import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from "mongoose";
import cors from 'cors';
import router from "./Routes/index.js";
// import connect from 'nats'

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());

// let natsConnection;

// const natsOptions = {
//     servers : ['nats://localhost:4222'],
// };

// const publishEvent = async (subject , data) => {
//     if(!natsConnection){
//         natsConnection = await connect(natsOptions);
//         console.log("Connected to nats server");
//     }
//     try{
//         natsConnection.publish(subject , data);
//         console.log("Event publish successfully");
//         await natsConnection.flush();
//     }catch(error){
//         console.log("Error publish event:" , error)
//     }
// }

// app.get("/hello", async (req, res) => {
//     const CompletedTask = {
//         EventName : "Assignment"
//     }
//     try{
//         await publishEvent(TASK_COMPLETED , JSON.stringify(CompletedTask))
//     }catch(error){
//         console.error("Error publish event :" , error)
//     }
//     res.send(true);  
// })



app.get("/" , (req , res) => {
    res.send("Welcome to backend server user");
})

app.use("/api/v1" , router)


app.listen(8000 , () => console.log("App is running on port 8000"));  
mongoose.connect(process.env.MONGOURL).then(() => console.log("Database Connected")); 
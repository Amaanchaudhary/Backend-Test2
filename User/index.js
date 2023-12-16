import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from "mongoose";
import cors from 'cors';
import router from "./Routes/index.js";
import {connect} from 'nats'

const app = express();
dotenv.config();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());


const natsOptions = {
    servers: ['nats://localhost:4222'],
  };
  
  const handleTaskCompletedEvent = (msg) => {
    const eventData = JSON.parse(msg.data);
    console.log(`User ${eventData.EventName}`);
  };
  
  const subscribeToTaskCompletedEvent = async () => {
    try { 
      const nc = await connect(natsOptions); 
      console.log('Connected to NATS server.');
      const subscription = nc.subscribe('TASK_COMPLETED', (err, msg) => {
        try {
          handleTaskCompletedEvent(msg);
          console.log('Received TASK_COMPLETED event');
        } catch (error) {
          console.error('Error handling TASK_COMPLETED event:', error);
        }
      });
      // subscription.unsubscribe();
    } catch (error) {
      console.error('Error connecting to NATS server:', error);
    }
  };
  
  subscribeToTaskCompletedEvent().catch((err) => {
    console.error('Error:', err.message);
  });


app.get("/" , (req , res) => {
    res.send("Welcome to backend server user");
})

app.use("/api/v1" , router)


app.listen(8000 , () => console.log("App is running on port 8000"));  
mongoose.connect(process.env.MONGOURL).then(() => console.log("Database Connected")); 
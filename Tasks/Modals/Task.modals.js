import mongoose, { Schema } from "mongoose";

const task = new Schema({
    description : String,
    priority : String,
    dueDate : String,
    completed : Boolean,
    userID : String
})

export default mongoose.model("Task" , task)
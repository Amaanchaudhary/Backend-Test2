import mongoose, { Schema } from "mongoose";

const task = new Schema({
    description: String,
    priority: String,
    dueDate: String,
    completed: {
        type: String,
        enum: ["true", "false"],
        default: 'false'
    },
    userID: String
})

export default mongoose.model("Task", task)
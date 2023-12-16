import TaskModals from '../Modals/Task.modals.js'

import {connect} from 'nats'

const natsOptions = {
    servers: ['nats://localhost:4222'],
};

let natsConnection;

const publishEvent = async (subject, data) => {
    if (!natsConnection) {
        natsConnection = await connect(natsOptions);
        console.log("Connected to nats server");
    }
    try {
        natsConnection.publish(subject, data);
        console.log("Event publish successfully");
        await natsConnection.flush(); 
    } catch (error) {
        console.log("Error publish event:", error)
    }
}


// app.get("/hello", async (req, res) => {
// const CompletedTask = {
//     EventName : "Assignment"
// }
// try{
//     await publishEvent('TASK_COMPLETED' , JSON.stringify(CompletedTask))
// }catch(error){
//     console.error("Error publish event :" , error)
// }
// res.send(true);  
// })

export const Assign = async (req, res) => {
    try {
        const { description, priority, dueDate, completed, userID } = req.body
        // console.log(dueDate);
        if (!description || !priority || !dueDate || !userID) return res.status(401).json({ success: false, message: "All Fields are Mandatory" })

        const task = new TaskModals({
            description,
            priority,
            dueDate,
            completed,
            userID
        })

        await task.save();

        return res.status(200).json({ success: true, message: "Task Assigned Successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const { taskID, description, priority, dueDate, completed, userID } = req.body
        // console.log(req.body);
        if (!taskID || !description || !priority || !dueDate || !completed || !userID) return res.status(401).json({ success: false, message: "All Fields are Mandatory" })

        const updatedData = await TaskModals.findByIdAndUpdate(taskID, { description, priority, dueDate, completed, userID })

        if (!updatedData) return res.status(401).json({ success: false, message: "Check the data you send" })

        return res.status(200).json({ success: true, message: "Task Updated Successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const fetch = async (req, res) => {
    try {
        const { userID } = req.body
        // console.log(req.body);
        if (!userID) return res.status(401).json({ success: false, message: "All Fields are Mandatory" })

        const task = await TaskModals.find({ userID })

        if (!task) return res.status(401).json({ success: false, message: "Check the data you send" })

        return res.status(200).json({ success: true, message: "Tasks Fetched Successfully", task })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const taskCompleted = async (req, res) => {
    try {
        const { taskID } = req.body
        // console.log(req.body);
        if (!taskID) return res.status(401).json({ success: false, message: "Task ID is Mandatory" })

        const completedTask = await TaskModals.findByIdAndUpdate(taskID, { completed: true })

        if (!completedTask) return res.status(401).json({ success: false, message: "Check the data you send" })
        
        const CompletedTask = {
            EventName: "Assignment"
        }

        await publishEvent('TASK_COMPLETED', JSON.stringify(CompletedTask))

        return res.status(200).json({ success: true, message: `Task ${taskID} Marked as Completed Successfully` , completedTask })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}


export const FetchAndSort = async (req, res) => {
    try {
        const { completed, priority, dueDate } = req.body
        // console.log(completed);
        if (!completed || !priority || !dueDate) return res.status(401).json({ success: false, message: "All Fields are Mandatory" })

        const task = await TaskModals.find({ completed, priority }).sort({ dueDate })

        if (!task) return res.status(401).json({ success: false, message: "Check the data you send" })
        console.log(task)
        return res.status(200).json({ success: true, message: "Tasks Fetched Successfully", task })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

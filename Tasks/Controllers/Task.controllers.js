import TaskModals from '../Modals/Task.modals.js'

export const Assign = async (req , res ) => {
    try{
        const {description , priority , dueDate , completed , userID} = req.body
        console.log('hello');

        if(!description , !priority , !dueDate , !completed , !userID) return res.status(401).json({success : false , message : "All Fields are Mandatory"}) 

        const task  = new TaskModals({
            description,
            priority,
            dueDate,
            completed,
            userID
        })

        await task.save();

        return res.status(200).json({success : true , message : "Task Assigned Successfully"})

    }catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}
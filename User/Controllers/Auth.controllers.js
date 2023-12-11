import UserModals from "../Modals/User.modals.js"

export const Create = async (req, res) => {
    // res.send("Login")
    try {        
        const { username, email, type , id } = req.body
        if (!username || !email || !type || !id) return res.status(401).json({ success: false, message: "All fields are mandatory" })

        const user = new UserModals({
            username,
            email,
            type
        })
        
        await user.save()
        return res.status(201).json({success : true , message : "Created Successfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}

export const Delete = async (req , res ) => {
    try{
        const {adminID , deleteId} = req.body
        console.log('hello');

        if(!deleteId) return res.status(401).json({success : false , message : "deleteId Id is Mandatory"}) 

        const deleted  = await UserModals.findByIdAndDelete(deleteId)

        if(!deleted) return  res.status(401).json({success : false , message : "deleteId Id is wrong"}) 

        return res.status(200).json({success : true , message : "Deleted Successfull"})

    }catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error })
    }
}

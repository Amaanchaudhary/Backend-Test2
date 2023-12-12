import UserModals from "../Modals/User.modals.js";

export const checkadmin = async (req, res, next) => {
    try {
        const { adminID : id } = req.body 
        console.log(id , "Admin Id");
        if(!id) return res.status(401).json({ success: false, message: "Admin Id is mandatory" })

        const user = await UserModals.findById({_id : id})

        if(!user) return res.status(401).json({success : false , message : "Admin ID is wrong"})

        // console.log(user , "users data");

        if (user.type == "admin"){
            next();
        } else {
            return res.status(404).json({ message: "Only Admin can create and delete", success: false });
        }
    } catch (error) {
        return res.status(500).json({success : false , message : error.message});
    }
}
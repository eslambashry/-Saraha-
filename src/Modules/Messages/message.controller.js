import { msgModel } from "../../../DB/Models/message.model.js"
import { userModel } from "../../../DB/Models/user.model.js"


//======================Send Message=====================
export const SendMessage = async(req,res,next) =>{

    const  {content, sendTo} = req.body
    const isUserExist = await userModel.findById(sendTo)
    if(!isUserExist){
        return res.status(400).json({message: "User Not Found"})
    }
    const message = new msgModel({content, sendTo})
    await message.save()
    return res.status(201).json({message:'Done', message})
} 

//========================get user message==================
export const getAllMessage = async(req,res,next)=>{
    const {_id} = req.authUser
    const messages = await msgModel.find({sendTo: _id})
    if(messages.length){
        return res.status(201).json({message:'Done',messages})
    }
    return res.status(201).json({message:"Empty Inbox"})

}
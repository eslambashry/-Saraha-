import jwt from 'jsonwebtoken'
import { userModel } from "../../DB/Models/user.model.js"

export const isAuth = () =>{
    return async(req,res,next)=>{
        const {authorization} = req.headers
        if(!authorization){
            return res.status(400).json({message:'Please Login First'})
        }
        if(!authorization.startsWith('Saraha')){
            return res.status(400).json({message:'In-valid Token Prefix'})
        }
        const splitToken = authorization.split(' ')[1]
        const decodedData = jwt.verify(splitToken,process.env.SIGN_IN_TOKEN_SECRET)
        if(!decodedData || !decodedData._id){
            return res.status(400).json({message:'In-valid Token'})
        }
        const findUser = await userModel.findById(decodedData._id,'username email')
        if(!findUser){
        return res.status(400).json({message:'Please Sign UP'})
    }
        req.authUser = findUser
        next()
    } 
}
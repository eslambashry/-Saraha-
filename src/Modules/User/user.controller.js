
import { userModel } from "../../../DB/Models/user.model.js";
import bcrypt, { hashSync } from 'bcrypt'
import { asynchandler } from "../../units/errorhandling.js";
import jwt  from 'jsonwebtoken'
import { sendEmailServices } from "../../servecis/sendEmailservices.js";

//====================== Sign Up ==================
export const SignUp = async(req,res,next)=>{

    const {test} = req.query
        const{ username, email, password, gender } = req.body
        
        const isExist = await userModel.findOne({email})
       
        if(isExist){
            return res.status(400).json({message: 'Email is already exist'})
        }
        
        //confirmed email

        const token = jwt.sign({email}, 'confirmToken', {expiresIn: '1h'})
        const confirmedLink = `http://localhost:3000/user/confirmEmail/${token}`

        const message = `<a href=${confirmedLink} > Click To Confirm Your Email </a>`


     const isEmailSent = await sendEmailServices({
            message,
            to: email,
            subject: 'Confirmation Email',
        })
        if(!isEmailSent){
        return res.status(500).json({message:"please try again later"})
        }
        //hashing password
       
        const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS /* => 12 */) /* hash without await vs hashSync with await */
       
        const userInstance = userModel({username, email, password:hashedPassword, gender})
       
        await userInstance.save()
        res.status(201).json({message: "Done", userInstance}) 

}


//===================== Confirm Email ====================

export const confirmEmail = async(req,res,next)=>{
    const {token} = req.params
    const decodedData = jwt.verify(token, 'confirmToken')
    const confirmedCheck = await userModel.findOne({email: decodedData.email})
    if(confirmedCheck.isConfirmed){
        res.status(400).json({message: "Your Email Is Already Confirmed"})
    }
    const user = await userModel.findOneAndUpdate(
        {email: decodedData.email},
        {isConfirmed: true},
        {new:true},
        )
        res.status(200).json({message: 'Congirmed Done Please Try To LogIn <3', user})
} 


//====================== Sign In ==================
export const SignIn = asynchandler(async(req,res,next) => {
        const {email, password} = req.body
        
        const isUserExist = await userModel.findOne({email, isConfirmed:true})

        if(!isUserExist){
            return res.status(400).json({message: 'Invalid Login credeantial (email)'})
        }



        const passwordMatch = bcrypt.compareSync(password, isUserExist.password)
            if(!passwordMatch){
            return res.status(400).json({message: 'Invalid Login credeantial (Password)'})
        }
            const usertoken = jwt.sign({useremail:email, _id:isUserExist._id}, /* secret key => */  process.env.SIGN_IN_TOKEN_SECRET,
            // { expiresIn: '1h' }
            )
            return res.status(200).json({message:'LogIn Success', usertoken})
})

//================== Update Profile ===============
export const UpdateProfile = async(req,res,next)=>{

   
        const {_id} = req.authUser
        const {userId} = req.params
        const {username} = req.body

        const userExist = await userModel.findById(userId)

        // console.log({
        //    userid: userExist._id.toString(),
        //    loggedInId
        // })

        if(!userExist){
            return res.status(400).json({message: 'in-valid user ID'})
        }
         if(userExist._id.toString() !== _id){  // toString() To parsing _id To String to can compare each other
            return res.status(401).json({message: 'Unauthorized To Take This Action'})
        }
        const user = await userModel.findByIdAndUpdate(
            {_id: userId},
            {username},
            {new: true},
            )
        if(user.modifiedCount){
            return res.status(200).json({message: 'Done', user})
        }

       return res.status(400).json({message: 'Update Fail'})

}

//=================== get user ====================
export const GetUser = async(req,res,next)=>{

    const {_id} = req.authUser 

    console.log({authUser: req.authUser})
    const user = await userModel.findById(_id, 'email username')
    if(user){
    res.status(200).json({message:"Done", UserData: user})
    }

    res.status(404).json({message:"Invalied Id"})
}

//=================== token ====================
export const verifyToken = async(req, res, next) =>{
    // const {token} = req.body /*  */
    // const {token} = req.headers
    const {authorization} = req.headers
    console.log(authorization)
    console.log(authorization.split(' ')[1])
    const decodedData = jwt.verify(authorization.split(' ')[1], 'testToken')
    res.json({message:'Done', decodedData})
}
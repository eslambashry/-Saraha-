
import { Router } from "express";
import { isAuth } from "../../middelware/auth.js";
import { validationCoreFunction } from "../../middelware/validation.js";
import { asynchandler } from "../../units/errorhandling.js";
const router = Router()
import * as us from './user.controller.js'
import { signInSchema, signUpSchema } from "./userValidation.js";


// function passed (){
//     return(req,res,next) => {
//         let flag = true
//         if(flag){
//             return next()
//         }
//         return res.status(400).json({message: 'Middelware Fail'})

//     }
// }

router.post('/',validationCoreFunction(signUpSchema),asynchandler(us.SignUp))
router.get('/confirmEmail/:token',asynchandler(us.confirmEmail)) /* => المفروض انك بتسرش علي الرسالة من غير متبقي صاحب الرسالة   */
router.post('/login',validationCoreFunction(signInSchema),us.SignIn)
router.patch('/:userId',asynchandler(us.UpdateProfile))
router.get('/',isAuth() ,asynchandler(us.GetUser)) /* => المفروض انك بتسرش علي الرسالة من غير متبقي صاحب الرسالة   */


// router.get('/:_id',passed(),asynchandler(us.GetUser))
// router.post('/token',asynchandler(us.verifyToken))




export default router



import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    
    {
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['Female','Male','Not Specification'],
        default:'Not Spacified'
    },
    isConfirmed:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
)

export const userModel = mongoose.model('User', userSchema)
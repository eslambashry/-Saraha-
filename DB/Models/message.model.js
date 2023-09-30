import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema (
    {
        content:{
            type:String,
            required:true,
        },
        sendTo:{
            type:Schema.Types.ObjectId,
            ref:'user'
        }
},
{timestamps:true}
)

export const msgModel = mongoose.model('Message', messageSchema)
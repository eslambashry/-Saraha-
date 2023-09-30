import mongoose from "mongoose";
export const connectionDB = async() =>{
    return await mongoose.connect(process.env.DB_CONNECTION_URL)
    .then((res)=>console.log("Data Base Connection Success"))
    .catch((err)=>console.log("Data Base connection Fail",err))
}  
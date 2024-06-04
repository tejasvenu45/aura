import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Message = mongoose.model("Message", messageSchema)
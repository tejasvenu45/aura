import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    answer:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Answer"
        }
    ]

},{timestamps:true})

export const Question = mongoose.model("Question", questionSchema)
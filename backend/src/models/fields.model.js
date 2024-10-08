import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
    label:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    required:{
        type:Boolean,
        required:true
    },
    options:[
        {
            type:String
        }
    ],
    url:{
        type: String
    }
},{timestamps:true})

const formTemplateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    teamsize: {
        type:Number,
        required:true
    },
    responses:[
        {
            type: mongoose.Schema.Types.Mixed,
            required:true
        }
    ],
    fields:[fieldSchema]
},{timestamps:true})

export const Events = mongoose.model("Events", formTemplateSchema)
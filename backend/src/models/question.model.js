import mongoose, {Schema} from "mongoose";

const questionSchema = new Schema(
    {
        question:{
            type: String,
            required: true
        },
        owner:{
            type: new Schema.Types.ObjectId,
            ref: "User"
        },
        answer:{
            type: new Schema.Types.ObjectId,
            ref: "Answer"
        }
    },{timestamps:true}
)

export const Question = mongoose.model("Question", questionSchema)
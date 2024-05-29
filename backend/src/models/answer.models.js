import mongoose, {Schema} from "mongoose";

const answerSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    owner: {
        type: new Schema.Types.ObjectId,
        ref: "User"
    },
    question: {
        type: new Schema.Types.ObjectId,
        ref: "Question"
    }
},{timestamps:true})

export const Answer = mongoose.model("Answer", answerSchema)
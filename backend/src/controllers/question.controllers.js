import { Question } from "../models/question.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const askQuestion = asyncHandler( async(req,res) => {
    console.log("In askQuestion");

    const {question} = req.body;

    console.log("Obtained question ", question);
    if(!question){
        console.log("Enter question")
    }

    const putQuestion = await Question.create({question, author: req.user._id})

    if(!putQuestion){
        console.log("Did not receive question");
    }
    console.log(putQuestion);

    const getQuestion = await Question.findById(putQuestion._id)

    // console.log("Added and fetched ", getQuestion);

    return res  
    .status(200)
    .json(getQuestion)
} )

const getQuestionsPublic = asyncHandler( async(req,res) => {
    const questions = await Question.find({}).populate("answer")

    if(!questions){
        console.log("Questions not found");
        res.status(404)
    }
    console.log(questions);

    return res.  
    status(200)
    .json(questions)
} )

export { askQuestion,getQuestionsPublic }
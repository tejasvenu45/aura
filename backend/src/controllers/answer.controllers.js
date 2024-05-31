import { Answer } from "../models/answer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Question } from "../models/question.models.js";

const answerTo = asyncHandler( async(req,res) => {
    console.log("In answer controller");

    const {answer} = req.body
    const question_id = req.params.id

    if(!answer || !question_id){
        console.log("Not received answer");
        console.log("Not received question");
        res.send("Not received answer")
    }
    console.log(answer);

    const addAnswer = await Answer.create({answer, author:req.user._id, question:question_id})

    if(!addAnswer){
        res.send("Answer not added!")
    }
    console.log("The answer ", addAnswer);

    const getAnswer = await Answer.findById(addAnswer._id)
    const question = await Question.findById(question_id)
    question.answer.push(getAnswer._id)
    await question.save()

    if(!getAnswer){
        res.send("Could not find it").status(404)
    }
    console.log(getAnswer);

    return res 
    .status(200)
    .json(getAnswer)
} )

export {answerTo}
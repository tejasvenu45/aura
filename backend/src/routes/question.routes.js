import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middelwares.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { askQuestion,getQuestionsPublic } from "../controllers/question.controllers.js";

const questionRouter = Router()

questionRouter.route("/questionPublic").post(verifyJWT, asyncHandler( async(req,res) => {
    console.log("In /question");
    const received = await askQuestion(req,res)
    console.log(received);
    res.json(askQuestion)
} ))

questionRouter.route("/getQuestions").get(verifyJWT, asyncHandler( async(req,res) => {
    console.log("In /getQuestions");
    const received = await getQuestionsPublic(req,res)
    console.log(received)
    res.json(received);
} ))

export {questionRouter}
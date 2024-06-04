import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middelwares.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPrivate, sendMessage } from "../controllers/message.controllers.js";

const messageRouter = Router()

messageRouter.route("/message/:id").post( verifyJWT, asyncHandler( async(req,res) => {
    console.log("In /message");
    const received = await sendMessage(req,res)
    res.json(received)
} ) )

messageRouter.route("/message/:id").get( verifyJWT, asyncHandler( async(req,res) => {
    console.log("In get /message");
    const received = await getPrivate(req,res)
    res.json(received)
} ) )

export {messageRouter}
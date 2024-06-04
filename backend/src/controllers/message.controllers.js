import { Message } from "../models/message.model.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendMessage = asyncHandler( async(req,res) => {
    console.log("In sendMessage");

    const {message} = req.body

    if(!message){
        console.log("Write the message");
        return res.send("Message not found")
    }

    console.log("Message is received ", message);

    const referUser = await User.findById(req.params.id)

    if(!referUser){
        console.log("User doesn't exist!");
        return res.send("User doesnt exist").status(404)
    }

    if(!referUser.isAdmin){
        console.log("Not an admin!");
        return res.send("User is not an admin!")
    }

    const addMessage = await Message.create({message, author:req.user._id,receiver:req.params.id})

    if(!addMessage){
        console.log("Message not added");
        return res.send("message not added!")
    }

    const getMessage = await Message.findById(addMessage._id)

    console.log("Message added and fetched ", getMessage);

    return res
    .status(200)
    .json(getMessage)

} )

const getPrivate = asyncHandler( async(req,res) => {
    const authorMessages = await Message.find({author:req.user._id, receiver: req.params.id})
    const receivedMessages = await Message.find({author: req.params.id, receiver: req.user._id})

    const userArray = authorMessages.map( (ele) => {
        const message = ele.message
        const timestamp = ele.timestamps
        const sendObj = {id: 0, message, timestamp }
        return JSON.stringify(sendObj);
    } )

    const adminArray = receivedMessages.map( (ele) => {
        const message = ele.message
        const timestamp = ele.timestamps
        const sendObj = {id:1, message, timestamp}
        return JSON.stringify(sendObj)
    } )

    const response = {userArray, adminArray}

    return res.status(200).json(response)
} )

export { sendMessage,getPrivate }
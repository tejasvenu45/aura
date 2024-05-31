import { User } from "../models/user.models.js";
import { Question } from "../models/question.models.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler( async ( req,res,next ) => {
    const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer", "")

    if(!token){
        console.log("Not received token");
    }

    const receivedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    console.log("VerifyJWT",receivedtoken);

    const user = await User.findById(receivedtoken._id).select("-password -refreshtoken")

    if(!user){
        console.log("User not found");
    }

    req.user = user
    next()
} )

const checkAdmin = asyncHandler( async(req,res,next) => {
    if(req.user.isAdmin){
        next()
    }
    else{
        res.send("Not an Admin!")
    }
}  )



export { verifyJWT,checkAdmin }
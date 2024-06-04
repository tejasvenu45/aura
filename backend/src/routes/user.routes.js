import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUser,loginUser,logoutUser, getUserDetails } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middelwares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/register").post( upload.single("profile"), asyncHandler( async (req,res) => {
    console.log("In /register");
    const received = await registerUser(req,res)
    console.log(received);
    res.json(received)
} ) )

router.route("/login").post( asyncHandler( async (req,res) => {
    console.log("In /login");
    const received = await loginUser(req,res)
    console.log(received);
    res.json(received)
} ) )

router.route("/logout").post(verifyJWT, asyncHandler( async (req,res) => {
    console.log("In /logout");
    const received = await logoutUser(req,res)
    console.log(received);
    res.json(received)
}) )

router.route("/user").get(verifyJWT, asyncHandler( async (req, res) => {
    console.log("In /user")
    const user = await getUserDetails(req, res)
    console.log(user)
    res.json(user)
}))

export { router }
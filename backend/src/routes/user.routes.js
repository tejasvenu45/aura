import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUser,loginUser,logoutUser,userResponseToForm,getForm, imageUploadInForm } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middelwares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

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

router.route("/getUser").get(verifyJWT, asyncHandler( async (req,res) => {
    console.log("In /getUser get");
    const received = await getUser(req,res)
    console.log(received);
    res.json(received)
} ))

router.route("/response/:formId").get( verifyJWT, asyncHandler( async (req,res) => {
    console.log("In /response GET");
    const received = await getForm(req,res)
    console.log(received);
} ) )

router.route("/response/:formId").post(verifyJWT, asyncHandler( async (req,res) => {
    console.log("In /response post");
    const received = await userResponseToForm(req,res)
    console.log(received);
    res.json(received)
} ))

router.route("/response/imageUploadInResponse/:formId").post( verifyJWT, upload.single("image"), asyncHandler( async(req,res) => {
    console.log("In /reponse/ImageUpload");
    const received = await imageUploadInForm(req,res)
    console.log(received);
    res.json(received)
    
} ) )


export { router }
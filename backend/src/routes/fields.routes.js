import { adminForm, getEvents } from "../controllers/fields.controllers.js";
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { checkAdmin, verifyJWT } from "../middlewares/auth.middelwares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const fieldRouter = Router() 

fieldRouter.route("/create-form").post(verifyJWT, checkAdmin, upload.single("image"), asyncHandler( async(req,res) => {
    console.log("in /create-form POST");
    const received = adminForm(req,res)
    console.log(received);
    res.json(received)
} ) )

fieldRouter.route("/getEvents").get(asyncHandler(async (req, res) => {
    console.log("In /getEvents route");
    const received = await getEvents(req, res)
    console.log(received)
}))

export { fieldRouter }
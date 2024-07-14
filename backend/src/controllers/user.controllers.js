import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import { Events } from "../models/fields.model.js";

const registerUser = asyncHandler( async (req,res) => {

    console.log("In registerUser");

    const { username, email, fullname, password } = req.body;
    console.log("Received info ", username, email, fullname, password);

    if(
        [username, email, fullname, password].some( (field) => field.trim === "" )
    ){
        console.log("Fields not entered!");
        return res.send("All fields not entered").status(400)
    }

    const ifUser = await User.findOne({
        $or: [{username}, {email}]
    })
    console.log("After ifUser");

    if(ifUser){
        console.log("User already exists!");
        return res.send("User already exists!").status(409)
    }

    const profileLocalPath = req?.file?.path
    let userCreated, profile

    if(!profileLocalPath){
        console.log("Profile path not received");
    }
    else{
        console.log("Profile path received ", profileLocalPath);

        profile = await uploadOnCloudinary(profileLocalPath)

        if(!profile){
            console.log("Cloudinary not received!");
        }
        console.log("Cloudinary received ", profile.url);
    }
    
    userCreated = await User.create({username, email, fullname, password, profile: profile?.url || ""})

    console.log("After userCreated");
    console.log(userCreated);

    const checkUser = await User.findById(userCreated._id).select("-password -refreshtoken")

    if(!checkUser){
        return res.send("User not created").status(500)
    }

    console.log("User is created and fetched ", checkUser);

    return res
    .json(checkUser)
    .status(200)

} )

const loginUser = asyncHandler( async (req,res) => {
    console.log("In loginUser ");

    const { username, password } = req.body;

    console.log("Received info ", req.body);

    if(!username && !password){
        console.log("Enter all the details!");
        return res.send("Enter all details!")
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const isValidEmail = emailRegex.test(username);
    let checkUser, email

    if(isValidEmail){
        email = username
        checkUser = await User.findOne({email})
    }
    else{
        checkUser = await User.findOne({username})
    }

    console.log("User ",checkUser);
    
    if(!checkUser){
        console.log("User info wrong!");
        return res.send("User not found").status(404)
    }

    const checkPassword = await checkUser.isPasswordCorrect(password)

    if(!checkPassword){
        console.log("Password wrong");
        return res.send("Wrong password").status(400)
    }

    const accesstoken = await checkUser.generateAccessToken()
    const refreshtoken = await checkUser.generateRefreshToken()

    if(!accesstoken || !refreshtoken){
        console.log("Tokens not produced!");
    }

    console.log(accesstoken, refreshtoken);

    checkUser.refreshtoken = refreshtoken
    await checkUser.save()

    const options={
        secure: true,
        httpOnly: true
    }

    const loggedInUser = await User.findById(checkUser._id).select("-password -refreshtoken")

    console.log("User is logged in ", loggedInUser);

    const successMessage = {"success":"User is logged in"}

    return res.
    status(200)
    .cookie("accesstoken", accesstoken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .json(successMessage)

} )

const logoutUser = asyncHandler( async(req,res) => {
    const loggedOut = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshtoken:null}
        },
        {
            new: true
        }
    )

    console.log("The logged out user ", loggedOut);

    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .status(200)
    .clearCookie("accesstoken",options)
    .clearCookie("refreshtoken",options)
    .json(loggedOut)
} )

const getUser = asyncHandler( async(req,res) => {
    const user = await User.findById(req.user._id)

    if(!user){
        console.log("User not found");
        return res.send("User not found").status(404)
    }

    console.log(user);

    return res
    .status(200)
    .json(user)
} )


const userResponseToForm = asyncHandler( async( req,res ) => {
    console.log("In userResponseToForm");

    const { formId } = req.params
    const { responses } = req.body

    console.log(formId, responses);

    if(!(formId && responses)){
        console.log("Respond to a form or respond!");
        return res.send("Incomplete info")
    }


    const Form = await Events.findById(formId)

    Form.responses.push(responses)

    await Form.save()

    console.log("Responses added ", Form);

    return res
    .status(200)
    .send("Success")
    .json(Form)
} )

const getForm = asyncHandler( async (req,res) => {
    const {formId} = req.params

    const form = await Events.findById( formId )

    return res
    .status(200)
    .json(form)
} )

export { registerUser,loginUser,logoutUser,getUser,userResponseToForm,getForm }
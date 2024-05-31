import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    fullname:{
        type: String,
        required: true,
        index: true
    },
    password:{
        type: String,
        required: true,
        min: [7, "minimum 7 characters! received {VALUE}"]    
    },
    refreshtoken:{
        type: String
    },
    profile:{
        type: String //cloudinary url
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

userSchema.pre("save", async function hashPassword(next){
    if(!this.isModified("password")){next()}

    this.password = await bcryptjs.hash(this.password, bcryptjs.genSaltSync(10))
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return bcryptjs.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
import User from "../model/User.js";
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// hash passwords for passwords 
async function hashPassword(password) {
    const salt = 10;
    try {
        const hash = await bcrypt.hash(password.toString(), salt);
        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
}
export const registerUserCtrl = asyncHandler(async(req,res) =>{
    
    const {fullname,email,password} = req.body;
    // check user exists
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("User already exists");
    } 
    //hash password 
   const hashedPassword = await hashPassword(password);
   // create new user
    const user = await User.create({
        fullname,
        email,
        password:hashedPassword,
    });
    res.status(201).json({
        status:'success',
        message:'User registered successfully',
        data:user
    });
   });



export const loginUserCtrl = asyncHandler(async(req, res) =>{
   
    const {email, password} = req.body;
// check user exists
const userFound = await User.findOne({email});
if(!userFound){
    throw new Error("User not found");
} 
// check password
const isMatch = await bcrypt.compare(password.toString(), userFound.password);
if(!isMatch){
    throw new Error("Invalid login credentials");
}
res.json({
    status:'success',
    message:'User logged in successfully',
    userFound,
    token:generateToken(userFound?._id)
});



});

export const getUserProfile = asyncHandler(async(req, res) =>{
    const token = getTokenFromHeader(req);
    // verify token
    const verified = verifyToken(token);
    res.json({
        msg:"welcome"
    })
});



export default registerUserCtrl;
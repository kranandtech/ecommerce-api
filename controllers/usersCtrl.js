import User from "../model/User.js";
import bcrypt from "bcrypt";

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
export const registerUserCtrl = async(req,res) =>{
    
    const {fullname,email,password} = req.body;
    // check user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.json({
            msg:"User already exists"
        });
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
}

export default registerUserCtrl;
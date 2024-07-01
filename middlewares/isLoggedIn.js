import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
export const isLoggedIn = (req, res, next) =>{
    // get token from header    
    const token = getTokenFromHeader(req);   
     // verify token
    const decodedUser = verifyToken(token);
    
    if(!decodedUser){
        throw new Error("Token expired, Please log in again");
    }
    else{
        // save the user into req object
        req.userAuthId = decodedUser?.id;
        next();
    }
    
}
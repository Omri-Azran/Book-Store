import UserModel from "../models/user.model.js";
import Jwt from "jsonwebtoken";

const AuthenticateToken =  async function(req, res, next){
    try{
        const Auth = req.header("Authorization") //return null or bearer <token>
        if(!Auth){
            throw new Error();
        } 

        const Token = Auth.replace("Bearer ", "")
        if(!Token) { 
            throw new Error()
        }
        
        const data = Jwt.verify(Token, process.env.SECERT_TOKEN)
        
        const User = await UserModel.findOne({ _id: data._id, token: Token })
        if(!User){
            throw new Error()
        }

        req.user = User;
        req.token = Token;

        next();
    } catch(err){
        res.send("not good: " + err)
    }
}

export default AuthenticateToken
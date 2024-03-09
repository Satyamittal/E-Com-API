import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken' ;
export class UserController
{
    signUp(req,res){
        console.log(req.body) ;
        const {name,email,password,type} = req.body ;
        const user = UserModel.signUp(name,email,password,type) ;
        res.status(201).send(user) ;
    }
    signIn(req,res){
        const user = UserModel.signIn(req.body.email, req.body.password) ;
        if(!user)
        {
            return res.status(400).send("Invalid Credentials !") ;
        }
        // 1. create a token
        const token = jwt.sign({userId: user.id,email: user.email},"@Satyam4006m",{expiresIn: '1h'})
        // 2. send a token: this token can be encoded in = jwt.io
        return res.status(200).send(token);
    }

}
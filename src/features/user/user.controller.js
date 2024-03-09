import { UserModel } from "./user.model.js";

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
        return res.status(200).send("LogIn is successful");
    }

}
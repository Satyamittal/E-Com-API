import ApplicationError from "../../error-handler/applicationError.js";
import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken' ;
import { UserRepository } from "./user.repository.js";
export class UserController
{
    constructor()
    {
        this.userRepository = new UserRepository() ;
    }

    async signUp(req,res){
        console.log(req.body) ;
        const {name,email,password,type} = req.body ;
        try{
            const user = new UserModel(name,email,password,type) ;
            await this.userRepository.signUp(user) ;
            res.status(201).send(user) ;
        }catch(err)
        {
            throw new ApplicationError("something went wrong !",500);
        }
    }
    async signIn(req,res,next){
        try{

            const user = await this.userRepository.signIn(req.body.email, req.body.password) ;
            if(!user)
            {
                return res.status(400).send("Invalid Credentials !") ;
            }
            // 1. create a token
            const token = jwt.sign({userId: user.id,email: user.email},"@Satyam4006m",{expiresIn: '1h'})
            // 2. send a token: this token can be encoded in = jwt.io
            return res.status(200).send(token);
        }catch(err)
        {
            console.log(err);
            throw new ApplicationError("something went wrong !",500);

        }
    }

}
import ApplicationError from "../../error-handler/applicationError.js";
import { UserModel } from "./user.model.js";
import jwt from 'jsonwebtoken' ;
import { UserRepository } from "./user.repository.js";
import bcrypt from 'bcrypt' ;
export class UserController
{
    constructor()
    {
        this.userRepository = new UserRepository() ;
    }

    async signUp(req,res){
        console.log(req.body) ;
        const {name,email,password,type} = req.body ;
        // 12 is number of salt rounds to create a data
        const hashedPassword = await bcrypt.hash(password,12)
        try{
            const user = new UserModel(name,email,hashedPassword,type) ;
            await this.userRepository.signUp(user) ;
            res.status(201).send(user) ;
        }catch(err)
        {
            throw new ApplicationError("something went wrong !",500);
        }
    }
    async signIn(req,res,next){ 

        
        try{
            // First we have to check , whether mail exists or not. If not there is no sense in password matching
            const user = await this.userRepository.findByEmail(req.body.email) ;
            console.log(user) ;
            if( user )
            {
                // if user exists , then compare passwords
                const result = await bcrypt.compare(req.body.password,user.password) ;
                // if passwords matches,create a token 
                if(result)
                {
                    //3. create a token
                    const token = jwt.sign({userId: user._id,email: user.email},process.env.JWT_Secret,{expiresIn: '1h'})
                    // 4. send a token: this token can be encoded in = jwt.io
                    return res.status(200).send(token);
                }else{
                    return res.status(400).send("Invalid Credentials !") ;
                }
            }
            else
            {
                // if not exists
                return res.status(400).send("Invalid Credentials !") ;
            }
            }
        catch(err)
        {
            console.log(err);
            throw new ApplicationError("something went wrong !",500);

        }
    }

}
// This is setup using mongoose
import mongoose from 'mongoose' ;
import { userSchema } from './user.schema.js';
import ApplicationError from '../../error-handler/applicationError.js'

// created model from schema in which we do all CRUD operations
const UserModel = mongoose.model('User',userSchema) ;

export  class UserRepository

{
    async signUp(user)
    {
        try
        {
            // create an instance of model
            const newUser = new UserModel(user) ;
            await newUser.save() ;
            return newUser ; 
        }catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went Wrong !") ;
        }
    }

    async signIn(email,password)
    {
        try
        {   
            return await UserModel.findOne({email,password}) ;

        }catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went Wrong !") ;
        }
    }

    async findByEmail(email)
    {
        try
        {
            return await UserModel.findOne({email:email}) ;
        }
        catch(err)
        {
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }
}
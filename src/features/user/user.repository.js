import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";

export class UserRepository
{
    async signUp(newUser)
    {
        // always put dataBase operations in try-catch block, because these are async operations
        // such that these may not pass by application level middle-wares , so always put async opr
        // in try catch block
        try
        {
            // Get the dataBase
            const db = getDb() ;
            // Get the collection
            const collection = db.collection("users") ;
            await collection.insertOne(newUser) ;
            return newUser ;
        }
        catch(err)
        {
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }

    async signIn(email,password)
    {
        try
        {
            // Get the dataBase
            const db = getDb() ;
            // Get the collection
            const collection = db.collection("users") ;
            // find the document
            return await collection.findOne({email:email,password:password}) ;
        }
        catch(err)
        {
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }

    async findByEmail(email)
    {
        try
        {
            // Get the dataBase
            const db = getDb() ;
            // Get the collection
            const collection = db.collection("users") ;
            // find the document
            return await collection.findOne({email:email}) ;
        }
        catch(err)
        {
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }
}
import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";

export class UserModel
{
    constructor(name,email,password,type,id)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

     static async signUp(name,email,password,type)
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
            const newUser = new UserModel(name,email,password,type);
            await collection.insertOne(newUser) ;
            return newUser ;
        }
        catch(err)
        {
            throw new ApplicationError("Something Went wrong",500) ;
        }


    }
    static signIn(email,password)
    {
        const findUser = userArray.find(user => user.email == email && user.password == password) ;
        return findUser;
    }
    static get()
    {
        return userArray ;
    }
}


let userArray = [
    {
        id:1,
        name: "Seller",
        email:"seller@gmail.com",
        password: "123",
        type: "Seller" 
    },
    {
        id:2,
        name: "Customer",
        email:"customer@gmail.com",
        password: "123456",
        type: "Customer" 
    },
]
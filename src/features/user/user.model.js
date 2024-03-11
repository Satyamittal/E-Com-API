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
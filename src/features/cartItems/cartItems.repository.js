import ApplicationError from "../../error-handler/applicationError.js";
import { getDb } from "../../config/mongodb.js";
import {ObjectId, ReturnDocument} from 'mongodb'

export default class CartItemsRepository
{
    constructor()
    {
        this.collection = "cartItems" ;
    }

    async add(productID,userID,quantity)
    {
        try
        {
            const db = getDb() ;
            const collection = db.collection(this.collection) ;

            const id = await this.getNextCounter(db) ;
            console.log("Id : ",id) ;
            // find the document
            // either insert or upadate
            // insertion
            await collection.updateOne({productID: new ObjectId(productID),userID: new ObjectId(userID)},
            {
                $setOnInsert:{_id:id} ,
                $inc:{
                    quantity: quantity
                }
            },
            {
                upsert: true
            }) ;
        }catch(err)
        {
            console.log(err)
            throw new ApplicationError("Something went wrong !",500);
        }
    }

    async get(userID)
    {
        try
        {
            const db = getDb() ;
            const collection = db.collection(this.collection) ;

            return await collection.find({userID:new ObjectId(userID)}).toArray() ;
        }catch(err)
        {
            console.log(err)
            throw new ApplicationError("Something went wrong !",500);
        }
    }
    async delete(userId ,cartItemsId)
    {
        try
        {
            const db = getDb() ;
            const collection = db.collection(this.collection) ;

            const result = await collection.deleteOne({_id:new ObjectId(cartItemsId),userID:new ObjectId(userId)}) ;
            return result.deletedCount > 0 ;
        }catch(err)
        {
            console.log(err)
            throw new ApplicationError("Something went wrong !",500); 
        }
    }

    async getNextCounter(db)
    {
        try
        {
            const counter = await db.collection("counters").findOneAndUpdate(
                {
                    _id:"cartItemId"
                },
                {
                    $inc:{value:1} 
                },
                {
                    returnDocument:'after'
                }
            )
            console.log(counter) ;
            return counter.value ;
        }catch(err)
        {
            console.log("error") ;
        }
    }
}
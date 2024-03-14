import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";
import {ObjectId} from 'mongodb' ;

class ProductRepository
{
    constructor()
    {
        this.collection = "products" ;
    }
    async add(newProduct)
    {
        try{
            // 1. get the database
            const db = getDb() ;
            const collection = db.collection(this.collection) ;
            await collection.insertOne(newProduct) ;
            console.log(newProduct) ;
            return newProduct ;
        }catch(err)
        {
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }

    async getAll()
    {
        try{
            const db = getDb() ;
            const collection = db.collection(this.collection) ;
            const products = await collection.find().toArray();
            return products;

        }catch(err) 
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }
    async get(id)
    {
        try{
            const db = getDb() ;
            const collection = db.collection(this.collection) ;
            return await collection.findOne({_id:new ObjectId(id)}) ;

        }catch(err) 
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        } 
    }

    async filter(minPrice,maxPrice,category)
    {
        try
        {
            const db = getDb() ;
            const collection = db.collection(this.collection) ;

            let filterExpression = {} ;

            if(minPrice)
            {
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice)
            {
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            }
            if(category)
            {
                filterExpression.category = category ;
            }

            return await collection.find(filterExpression).toArray() ;
        }catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }

    async rate(userId,productId,rating)
    {
        try
        {
            const db = getDb() ;
            const collection = db.collection(this.collection) ;

            await collection.updateOne({
                _id: new ObjectId(productId),
            },
            {
                $push:{ratings:{userId,rating}} ,
            })
        }
        catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }
}


export default ProductRepository ;
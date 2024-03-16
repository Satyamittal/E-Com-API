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

            // Shows only specified data to user
            return await collection.find(filterExpression).project({name:1,price: 1,_id:0}).toArray() ;
            // return await collection.find(filterExpression).toArray() ;
        }catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }
/*
    async rate(userId,productId,rating)
    {
        try
        {
            const db = getDb() ;
            const collection = db.collection(this.collection) ;

            // 1. Find the product
            const product = await collection.findOne({_id: new ObjectId(productId)});
            console.log(product) ;
            // 2. Find the rating
            const userRating =  product?.ratings?.find(r=>r.userId == userId) ;
            console.log(userRating) ;
            if(userRating)
            {
                // 3. Update the rating if it exists
                await collection.updateOne({
                    _id: new ObjectId(productId), 
                    "ratings.userId":new ObjectId(userId) 
                },{
                    $set: {
                        // $ is the place holder holds the first value that matches the above parameters
                        // In that parameters , we want to set attribute "rating"
                        "ratings.$.rating": rating
                    }
                });
                const userRating2 =  product?.ratings?.find(r=>r.userId == userId) ;
                console.log(userRating2) ;
            }else{
                // if not exists then update it 
                await collection.updateOne({
                    _id: new ObjectId(productId),
                },
                {
                    $push:{ratings:{userId: new ObjectId(userId),rating}} ,
                })
            }
        }
        catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }
    */
   /**Alternate */
   async rate(userId,productId,rating)
   {
       try
       {
        const db = getDb() ;
        const collection = db.collection(this.collection) ;

        // removes existing entry
        await collection.updateOne({
            _id: new ObjectId(productId),
        },
        {
            $pull:{ratings:{userId: new ObjectId(userId)}} ,
        })


        // Add's a new entry
        await collection.updateOne({
            _id: new ObjectId(productId),
        },
        {
            $push:{ratings:{userId: new ObjectId(userId),rating}} ,
        })
       }
       catch(err)
       {
           console.log(err) ;
           throw new ApplicationError("Something Went wrong",500) ;
       }
   }

   async averageProductPricePerCategory()
   {
        try
        {
            const db = getDb() ;
            return await db.collection(this.collection)
                    .aggregate([
                        {
                            // Stage:- 1 Get price per category
                            $group:
                            {
                                _id:"$category",
                                averagePrice:{$avg:"$price"}
                            }
                        }
                    ]).toArray() ;
        }catch(err)
        {
            console.log(err);
            throw new ApplicationError("Something Went wrong",500) ;
        }
   }
}


export default ProductRepository ;
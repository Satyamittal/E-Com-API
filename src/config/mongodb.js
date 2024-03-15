
import { MongoClient } from "mongodb";

// either you specify data-base with base URL here or while calling "client.db(databaseName)".
const url = process.env.DB_URL ;

let client ;

export const connectToMongoDB =() =>
{
    MongoClient.connect(url)
        .then(clientInstance=>
            {
                client = clientInstance ;
                console.log("MongoDB is connected") ;
                createCounter(client.db("ecomDb")) ;
                createIndexes(client.db("ecomDb"));
            })
        .catch(err=>
            {
                console.log(err) ;
            });
}

export const getDb = ()=>
{
    return client.db("ecomDb") ;
}


const createCounter = async(db)=>
{
    const existingCounter = await db.collection("counters").findOne({_id:'cartItemId'});
    if(!existingCounter)
    {
        await db.collection("counters").insertOne({_id:'cartItemId',value: 0});
    }

}

const createIndexes = async(db)=>
{
    try
    {
        await db.collection("products").createIndex({price:1});
        await db.collection("products").createIndex({name:1,category:-1});
        await db.collection("products").createIndex({desc:"text"});
    }catch(err)
    {
        console.log(err);
    }
    console.log("Indexes are created !") ;
}
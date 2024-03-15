
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
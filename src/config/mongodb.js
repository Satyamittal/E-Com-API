
import { MongoClient } from "mongodb";

// either you specify data-base with base URL here or while calling "client.db(databaseName)".
const url = 'mongodb://localhost:27017' ;

let client ;

export const connectToMongoDB =() =>
{
    MongoClient.connect(url)
        .then(clientInstance=>
            {
                client = clientInstance ;
                console.log("MongoDB is connected") ;
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

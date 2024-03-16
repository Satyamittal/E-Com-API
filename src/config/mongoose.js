import mongoose from 'mongoose' ;

import dotenv from "dotenv" ;

dotenv.config() ;

const url = process.env.DB_Url ;
export const connectUsingMongoose = async ()=>
{
    try
    {
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology:true
            });
            console.log("MongoDb connected using Mongoose") ;
    }
    catch(err)
    {
        console.log("error in connecting to database") ;
        console.log(err) ;
    }
}
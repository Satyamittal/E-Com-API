
import { server } from "./index.js";
import connectToMongoDB from "./src/config/mongodb.js";



server.listen(3400,function(err)
{
    if( err ) return console.log(err) ;
    console.log("Server is listening on port: 3400") ;
    // as soon as server starts running connect to database
    connectToMongoDB() ;
});
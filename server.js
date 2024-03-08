
import { server } from "./index.js";



server.listen(3400,function(err)
{
    if( err ) console.log(err) ;
    else console.log("Server is listening on port: 3400") ;
});
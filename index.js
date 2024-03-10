import express from "express";
import { productRouter } from "./src/features/product/product.router.js";
import { cartRouter } from "./src/features/cartItems/cartItems.router.js";
import { orderRouter } from "./src/features/order/order.router.js";
import { userRouter } from "./src/features/user/user.router.js";
import multer from 'multer' ;
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import swagger from "swagger-ui-express";
import apiDocs from './swagger.3.0.json'assert{type:'json'};

import bodyParser from 'body-parser';

const server = express() ;

// CORS Policy configuration
server.use((req,res,next)=>
{
    // for giving access to all clients in value , you specified '*' .
    res.header('Access-Control-Allow-Origin','http://localhost:5501') ;
    // for giving access to this client to sent all headers
    res.header('Access-Control-Allow-Headers','Authorization');
    // for giving access to client , which requests he can access
    res.header('Access-Control-Allow-Methods', '*');

    // return ok if preflight request (client will not send actual request till server respons to this)
    if(req.method == "OPTIONS")
    {
        return res.sendStatus(200); 
    }
    next() ;
})
// put JSON data into req.body => JSON objects have both "keys" and "values" strings.
server.use(bodyParser.json()) ;

// put form data into req.body 
const upload = multer();
server.use(upload.none()) ;

// all requests related to products should go to product router
server.use('/api/products',jwtAuth,productRouter) ;
server.use('/api/users',userRouter) ;
server.use('/api/cartItems',jwtAuth,cartRouter) ;
server.use('/api-docs',swagger.serve ,swagger.setup(apiDocs)) ;

// we are not specifying a path here, so that it always execute
// And placing in end, such that if above controllers not executed then it will be
server.use((req,res)=>
{
    res.status(404).send("APi not found !") ; 
})

/*
server.use('/api/order',orderRouter) ;
*/



 
export {server} ;
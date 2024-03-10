import express from "express";
import { productRouter } from "./src/features/product/product.router.js";
import { cartRouter } from "./src/features/cartItems/cartItems.router.js";
import { orderRouter } from "./src/features/order/order.router.js";
import { userRouter } from "./src/features/user/user.router.js";
import multer from 'multer' ;
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import swagger from "swagger-ui-express";
import apiDocs from './swagger.json'assert{type:'json'};

import bodyParser from 'body-parser';

const server = express() ;

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

/*
server.use('/api/order',orderRouter) ;
*/



 
export {server} ;
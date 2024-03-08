import express from "express";
import { productRouter } from "./src/features/product/product.router.js";
import { cartRouter } from "./src/features/cart/cart.router.js";
import { orderRouter } from "./src/features/order/order.router.js";
import { userRouter } from "./src/features/user/user.router.js";


const server = express() ;

// all requests related to products should go to product router
server.use('/api/products',productRouter) ;
/*
server.use('/api/cart',cartRouter) ;
server.use('/api/order',orderRouter) ;
server.use('/api/user',userRouter) ;
*/




export {server} ;
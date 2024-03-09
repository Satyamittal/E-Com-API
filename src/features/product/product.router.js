
// manage route/paths to product controllers

import express from "express";
import ProductController from "./product.controller.js";
import {upload }from '../../middlewares/fileupload.middleware.js'

const productRouter = express.Router();

const productController = new ProductController() ;
 
// localhost:port/api/products/
productRouter.get('/' ,productController.getAllProducts) ;
productRouter.post('/' ,upload.single('imageUrl'), productController.addProduct) ;

// Exchanging Line Number 17 and 18 causes filter function to not work.
// Because id route is called upon writing filter also...
productRouter.get('/filter',productController.filterProducts) ;
productRouter.get('/:id' , productController.getOneProduct) ;  

// query parameter = >
// localhost:3400/api/products/filter?minPrice=10&maxPrice=100&category=Category1
// productRouter.get('/filter',productController.filterProducts) ;



export {productRouter} ;
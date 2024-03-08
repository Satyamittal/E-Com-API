
// manage route/paths to product controllers

import express from "express";
import ProductController from "./product.controller.js";
import {upload }from '../../middlewares/fileupload.middleware.js'

const productRouter = express.Router();

const productController = new ProductController() ;

// localhost:port/api/products/
productRouter.get('/' ,productController.getAllProducts) ;
productRouter.post('/' ,upload.single('imageUrl'), productController.addProduct) ;



export {productRouter} ;
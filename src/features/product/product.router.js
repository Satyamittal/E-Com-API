
// manage route/paths to product controllers

import express from "express";
import ProductController from "./product.controller.js";

const productRouter = express.Router();

const productController = new ProductController() ;

// localhost:port/api/products/
productRouter.get('/' ,productController.getAllProducts) ;
productRouter.post('/' ,productController.addProduct) ;



export {productRouter} ;
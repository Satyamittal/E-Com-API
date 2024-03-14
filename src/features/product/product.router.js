
// manage route/paths to product controllers

import express from "express";
import ProductController from "./product.controller.js";
import {upload }from '../../middlewares/fileupload.middleware.js'

const productRouter = express.Router();

const productController = new ProductController() ;
 
// localhost:port/api/products/
productRouter.post('/rate' ,(req,res)=>
{
    productController.rateProduct(req,res) ;
}) ;
productRouter.get('/' , (req,res)=>
{
    productController.getAllProducts(req,res) ;
}) ;
productRouter.post('/' ,upload.single('imageUrl'), (req,res)=>
{
    productController.addProduct(req,res) ;
}) ;

// Exchanging Line Number 17 and 18 causes filter function to not work.
// Because id route is called upon writing filter also...
productRouter.get('/filter',(req,res)=> 
{
    productController.filterProducts(req,res) ;
}) ;
productRouter.get('/:id' ,  (req,res)=>
{
    productController.getOneProduct(req,res) ;
}) ;  

// query parameter = >
// localhost:3400/api/products/filter?minPrice=10&maxPrice=100&category=Category1
// productRouter.get('/filter',productController.filterProducts) ;



export {productRouter} ;
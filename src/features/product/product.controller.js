import ProductModel from "./product.model.js";
export default class ProductController
{
    getAllProducts(req,res)
    {
        var products = ProductModel.GetAll() ;
        res.status(200).send(products) ;
    }
    addProduct(req,res)
    {

    }
    rateProduct(req,res)
    {
        
    }
    getOneProduct(req,res)
    {
        
    }
}
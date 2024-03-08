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
      
        const {name,price,sizes} = req.body ;
        const newProduct = 
        {
            name,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl: req.file.filename 
        };
        const createRecord = ProductModel.add(newProduct) ;
        // res.status(201).send(createRecord) ;
        console.log(createRecord) ;
        
    }
    rateProduct(req,res)
    {
        
    }
    getOneProduct(req,res)
    {
        
    }
}
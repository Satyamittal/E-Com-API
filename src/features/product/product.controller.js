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
        res.status(201).send(createRecord) ;
        // console.log(createRecord) ;
        
    }
    rateProduct(req,res)
    {
        
    }
    getOneProduct(req,res)
    {
        const id = req.params.id;
        const product = ProductModel.getProduct(id) ;
        if(!product)
        {
            return res.status(404).send("Product not found !");
        }
        return res.status(200).send(product);
    }
    filterProducts(req,res)
    { 
        console.log("filter function activated !") ;
        
        const minPrice = req.query.minPrice ;
        const maxPrice = req.query.maxPrice ;
        const category = req.query.category ; 

        console.log(minPrice,maxPrice,category) ;

        const result = ProductModel.filter(minPrice,maxPrice,category) ;
         res.status(200).send(result) ;
    }
}
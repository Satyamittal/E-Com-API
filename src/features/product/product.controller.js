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
        const {userId,productId,rating } = req.querya ;
        // this is returnig only error , which is handled using application level error handling
        ProductModel.rateProduct(userId,productId,rating);

        
        return res.status(200).send("Rating has been added");
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
        const {minPrice,maxPrice,category} = req.query ;
        const result = ProductModel.filter(minPrice,maxPrice,category) ;
        console.log(result) ;
        return res.status(200).send(result) ;
    }
}
import ApplicationError from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController
{
    constructor() 
    {
        this.productRepository = new ProductRepository() ;
    }
    async getAllProducts(req,res)
    {
        try{
            const products = await this.productRepository.getAll() ;
            res.status(200).send(products) ;
        }catch(err)
        {
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }
    async addProduct(req,res)
    {
        try{

              const {name,price,sizes} = req.body ;
            //   console.log(req.body) ;
              const newProduct = new ProductModel(name,null,parseFloat(price),req.file.filename,"seller",sizes.split(',')) ;
      
              const createRecord = await this.productRepository.add(newProduct) ;
              console.log(createRecord) ;
              res.status(201).send(createRecord) ;

        }catch(err) 
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        }
        // console.log(createRecord) ;
        
    }
    async rateProduct(req,res)
    {
        const userId = req.userId ;
        // console.log(userId) ;
        const {productId,rating } = req.body ;
        // this is returnig only error , which is handled using application level error handling
        await this.productRepository.rate(userId,productId,rating);

        
        return res.status(200).send("Rating has been added");
    }
    async getOneProduct(req,res)
    {
        try{
            const id = req.params.id;
            console.log('Get One product : with id: ',id);
            const product = await this.productRepository.get(id) ;
            if(!product)
            {
                return res.status(404).send("Product not found !");
            }
            return res.status(200).send(product);

        }catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }
    async filterProducts(req,res)
    {
        try
        {
            const {minPrice,maxPrice,category} = req.query ;
            const result = await this.productRepository.filter(minPrice,maxPrice,category) ;
            console.log(result) ;
            return res.status(200).send(result) ;
        }
        catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;
        }
    }

    async averagePrice(req,res,next)
    {
        try
        {
            const result = await this.productRepository.averageProductPricePerCategory() ;
            res.status(200).send(result) ;

        }catch(err)
        {
            console.log(err) ;
            throw new ApplicationError("Something Went wrong",500) ;           
        }
    }
}
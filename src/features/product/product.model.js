import {UserModel} from '../user/user.model.js';
export default class ProductModel{
    constructor(id, name, desc, price, imageUrl, category, sizes){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
    }

    static add(product)
    {
      product.id = products.length + 1 ;
      products.push(product) ;
      return product ;
    }

    static GetAll(){
        return products;
    }
    static getProduct(id)
    {
        const product = products.find((i) => i.id == id );
        return product;
    }
    static filter(minPrice,maxPrice,category)
    {
      console.log(minPrice,maxPrice,category);
      const result = products.filter((product)=>{
        return(
          product.price >= minPrice && product.price <= maxPrice &&
          product.category == category
        )
      });
      
      return result;
    }

    static rateProduct(userId,productId,rating)
    {
      // 1. Validate User and product
      const user = UserModel.get().find(user=> user.id == userId);
      if(!user)
      {
        return 'User not found';
      }

      // Validate product
      const product = products.find(product=>product.id ==productId);
      if(!product)
      {
        return "Product not found";
      }

      // Check if there are any product ratings
      if(!product.ratings)
      {
        product.ratings = [];
        product.ratings.push({userId: userId,rating: rating});
      }
      else{
        // check if user rating is already available
        const existingRatingIndex =product.ratings.findIndex(r=> r.userId == userId);
        if(existingRatingIndex >=0 )
        {
          product.ratings[existingRatingIndex] =  {userId: userId,rating: rating} ;
        }
        else
        {
          // if no existing rating
          product.ratings.push({userId: userId,rating: rating})
        }
      }

    }
} 

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];
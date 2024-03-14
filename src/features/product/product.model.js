import ApplicationError from '../../error-handler/applicationError.js';
import {UserModel} from '../user/user.model.js';
export default class ProductModel{
    constructor( name, desc, price, imageUrl, category, sizes,id){
        this._id=id;
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

    static rateProduct(userId,productId,rating)
    {
      // 1. Validate User and product
      const user = UserModel.get().find(user=> user.id == userId);
      if(!user)
      {
        throw new ApplicationError('User not found',400);
      }

      // Validate product
      const product = products.find(product=>product.id ==productId);
      if(!product)
      {
        throw new ApplicationError('Product not found',400);
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
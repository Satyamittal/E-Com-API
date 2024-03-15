import ApplicationError from "../../error-handler/applicationError.js";
import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";
export class CartItemsController {

    constructor()
    {
        this.cartItemsRepository = new CartItemsRepository() ;
    }


    async add(req, res) {
        try
        {
            const { productID, quantity } = req.body;
            const userID = req.userId;
            await this.cartItemsRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated");
        }catch(err)
        {
            console.log(err);
            throw new ApplicationError("SOmething went wrong !" ,500) ;
        }
    } 

    async get(req, res){

        try
        {
            const userID = req.userId;
            const items = await this.cartItemsRepository.get(userID);
            return res.status(200).send(items);
        }
        catch(err)
        {
            console.log(err);
            throw new ApplicationError("Something went wrong !",500);
        }
    }
    async delete(req,res)
    {
        try
        {
            const userId = req.userId ;
            const cartItemId = req.params.id ;
            
            const isDeleted = await this.cartItemsRepository.delete(userId,cartItemId) ;
            if(!isDeleted)
            {
                return res.status(404).send("Item not found") ;
            }
            else
            {
                return res.status(200).send("cart item is removed")
            }
        }catch(err)
        {
            console.log(err);
            throw new ApplicationError("Something went wrong !",500);
        }
    }

    
}
import CartItemModel from "./cartItems.model.js";

export class CartItemsController {
    add(req, res) {
        const { productID, quantity } = req.query;
        const userID = req.userId;
        CartItemModel.add(productID, userID, quantity);
        res.status(201).send("Cart is updated");
    }

    get(req, res){
        const userID = req.userId;
        const items = CartItemModel.get(userID);
        return res.status(200).send(items);

    }
}
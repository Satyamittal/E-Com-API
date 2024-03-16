import mongoose from 'mongoose' ;


export const productSchema = new mongoose.Schema
({
        name: String,
        price: Number,
        category: String,
        desc: String,
        inStock: Number

}); 
import mongoose from 'mongoose' ;


export const userSchema = new mongoose.Schema
({
        name: 
        {
            type: String,
            maxLength: [25,"Name can't be greater than 25 character's"]
        },
        
        email: 
        { 
            type: String,
            unique:true,
            required: true,
            match:[/ .+\@.+\.. /,"please enter a valid email"]
        },
// we can always explore more from mongoose website
        password: 
        {
            type: String,
            // validator: function(value)
            // {
            //     // return 
            // } ,
            // message: "password should be between 8-10 characters and one special character" 
        },
        
        type: 
        { 
            type: String,
            enum:['Customer','Seller']
        } 

}); 


/*

if(err instance of mongoose.Error.ValidationError)
{

}



*/
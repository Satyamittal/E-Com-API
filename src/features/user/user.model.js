
export class UserModel
{
    constructor(name,email,password,type,id)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id;
    }

    static signUp(name,email,password,type)
    {
        const newUser = new UserModel(name,email,password,type);
        newUser.id = userArray.length + 1 ;
        userArray.push(newUser) ;
        return newUser ;
    }
    static signIn(email,password)
    {
        const findUser = userArray.find(user => user.email == email && user.password == password) ;
        return findUser;
    }
    static get()
    {
        return userArray ;
    }
}


let userArray = [
    {
        id:1,
        name: "Seller",
        email:"seller@gmail.com",
        password: "123",
        type: "Seller" 
    },
    {
        id:2,
        name: "Customer",
        email:"customer@gmail.com",
        password: "123456",
        type: "Customer" 
    },
]
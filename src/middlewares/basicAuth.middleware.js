import { UserModel } from "../features/user/user.model.js";

const basiAuthorizer = (req,res,next)=>
{
    // 1.check if authorization header is empty
    const authHeader = req.headers["authorization"];

    if(!authHeader)
    {
        return res.status(401).send("No authorization details are found")
    }
    console.log(authHeader) ;

    // 2. Extract credentials [Basic hfbahbfafafbkasbfkasbf]
    const base64Credentials = authHeader.replace("Basic ","");
    console.log(base64Credentials) ;

    // 3. decode credentials
    const decodeCreds = Buffer.from(base64Credentials,'base64').toString('utf8');
    console.log(decodeCreds) ; // [username:password]

    const creds = decodeCreds.split(':') ;

    const user = UserModel.get().find(user=> user.email == creds[0] && user.password == creds[1]) ;
    if(user) next() ;
    else{
        res.status(401).send("Invalid credentials !")
    }
}
export default basiAuthorizer ;
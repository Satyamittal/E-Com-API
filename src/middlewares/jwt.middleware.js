import jwt from 'jsonwebtoken' ;

const jwtAuth = (req,res,next)=>
{   
    // 1. Read the token
    const token = req.headers["authorization"];

    // 1. if(token =  not exists ) { return error }
    if(!token)
    {
        return res.status(401).send('Unauthorized');
    }

    // 2. else { if( token = valid ) }
    try
    {
        const payload = jwt.verify(token,"@Satyam4006m");
        console.log(payload) ;
    }

    // 3. return error
    catch(err)
    {
        return res.status(401).send('Unauthorized');
    }

    // next 
    next();
}

export default jwtAuth;

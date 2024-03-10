import fs from 'fs' ;

const fsPromise = fs.promises ;

async function log(logData)
{
    try
    {
        logData = `\n ${new Date().toString()} - ${logData}` ;
        await fsPromise.appendFile('log.txt' ,logData) ;
    }
    catch(err)
    {
        console.log(err) ;
    }
}

const loggerMiddleware = async(req,res,next) =>
{
    // 1.Log request body 
    console.log(JSON.stringify(req.body));
    
    if(req.url.includes('signin'))
    {
        const logdata =`${req.url} - ${JSON.stringify(req.body)}` ;
        await log(logdata) ;
    }
    next() ;
}
export default loggerMiddleware ;

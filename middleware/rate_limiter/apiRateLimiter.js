const redisClient = require('../../redis/client').client
const {verifyToken , signToken } = require('../../utils/jwt/rateLimiter')
const logger = require('../../utils/winston/logger')


const limit = 5;


const apiRateLimiter = ()=>async(req,res,next)=>{
    if(!req.get('Access-Token') ){ 
        try {
            const TOKEN = signToken()
            await redisClient.set(TOKEN,JSON.stringify({requests:2}));
            req.token = TOKEN;
            logger.console({token:TOKEN})
            next();
        }
        catch(err){
            console.log(err)
            logger.error(err)
            return res.status(502).send('Internal Server Error!');
        }
    }
    else {
        try{
            let TOKEN = req.get('Access-Token');
            const verified = verifyToken(TOKEN)
            if(!verified){
                TOKEN = signToken()
                await redisClient.set(TOKEN,JSON.stringify({requests:2}));
                req.token = TOKEN;
                logger.console({token:TOKEN})
                next();
            }
            const data = await redisClient.get(TOKEN)
            const r = JSON.parse(data);
            if(r.requests>limit){
                logger.error('Api limit exceeded!')
                return res.status(302).json({error:'Limit exceeded'})
            }
            else {
                await redisClient.set(TOKEN,JSON.stringify({requests:r.requests+1}));
            }
            next();
        }
        catch(err){
            console.log(err)
            logger.error(err)
            return res.status(502).send('Internal Server Error!');
        }
    
    }
}

module.exports = apiRateLimiter;

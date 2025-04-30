const cors = require('cors');

const configureCors = () => {
    return cors({
        origin: (origin,callback)=>{
            const allowedOrigins = [
                '*'
            ]
            if(!origin || allowedOrigins.indexOf(origin)!==-1){
                callback(null,true)
            }
            else{
                callback(new Error("Cors not allowed",false))
            }
        },
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Access-Version',
            'Access-Token'
        ],
        exposedHeaders: [
            'X-Content-Range',
            'Content-Range',
            'X-Forwarded-For'
        ],
        credentials: true,
        preflightContinue: false,
        maxAge: 600
    });
};

module.exports = configureCors;

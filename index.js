const cluster = require('node:cluster');
const numCpus = require('node:os').availableParallelism();
const process = require('node:process');
const express = require('express');
const configureCors = require('./cors/config')
const ApiError = require('./error/apiError')
const apiV1Router = require('./routes/api/v1')
const redisClient = require('./redis/client')
const gqlServer = require('./graphql/server')




if( cluster.isPrimary ){
    
    let active = numCpus;
    for(let i=0;i<numCpus;i++){
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal)=>{
        active--;
        if(active===0){
            process.exit(0);
        }
    });

}
else {

    const app = express();

    app.use(configureCors())
    app.use(express.json());

    app.use('/api/v1',apiV1Router)

    redisClient.connectClient();

    gqlServer()
   
    app.get('/',(req,res)=>{
        res.status(200).send('OK')
    })

    app.listen('8000');
}
const redis = require('redis');

const PORT =  6379

const client = redis.createClient({
    host: 'localhost',
    port: PORT
})

client.on('error',err=>{})


const connectClient=async()=>{
    try{
        await client.connect()
        .catch(err=>{
            console.error(err)
        })
        await client.set("PORT",6379)
        console.log("Connected to Redis --name docker -h localhost -p ",PORT)
    }
    catch(err) {
        console.log(err);
        try {
            await client.quit();
        } catch (err) {
            console.log("Error: failed to quit redis")
        }
    }
}

module.exports = { client , connectClient }

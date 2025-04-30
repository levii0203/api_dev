const jwt = require('jsonwebtoken')


const SAMPLE_DATA = {
    data: 'Hello'
}

const PRIVATE_KEY = 'FFF';


const signToken=()=>{
    const token = jwt.sign(SAMPLE_DATA,PRIVATE_KEY,{algorithm:'HS256',expiresIn:'30s'});
    return token;
}

const verifyToken = (token) => {
    try {
        jwt.verify(token, PRIVATE_KEY);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = { signToken , verifyToken }
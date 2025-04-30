const { json } = require("express");

const apiVersionHeader = (version)=>(req,res,next)=>{
    if(req.get('Access-Version')===version){
        next();
    }
    else {
        return res.status(200).json({
            success:true,
            error:'invalid request'
        })
    }
}

const apiVersionUrl = (version)=>(rq,res,next)=>{
    if(req.path.startsWith(`/api/${version}`)){
        next();
    }
    else{
        return res.status(200).json({
            success:true,
            error:'invalid request'
        })
    }
}

const apiVersionContentType = (version)=>(req,res,next)=>{
    const contentType = req.get('Content-Type')
    if(contentType && contentType.includes(`application/vnd.api.${version}+json`)){
        next()
    }
    else {
        return res.status(200).json({
            success:false,
            error:'invalid request'
        })
    }
}

module.exports = { apiVersionContentType , apiVersionHeader, apiVersionUrl } 
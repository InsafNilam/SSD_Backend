const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const auth = asyncHandler(async(req,res,next)=>{
    const bearerHeader = req.headers.authorization
    let token;

    if(typeof bearerHeader !== 'undefined' && bearerHeader.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET,(err, user)=>{
            if(err) res.status(403).json({err : err});
            req.user = user
            return next();
        })
    }else{
        res.status(403).json({msg:'Token is not Valid'});
    }
})

module.exports = auth;
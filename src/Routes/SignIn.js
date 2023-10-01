const express =require('express');
const router= express.Router();
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

router.post('/sign-in', (req,res)=>{

    const {email , role, password} = req.body;

    User.findOne({email, role})
    .then(user =>{
        if(!user) return res.status(401).json({success:false, msg : 'User does not exist'});

        //Validate User
        bcrypt.compare(password, user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(401).json({success: false, msg : 'Incorrect password'});
            const payload = {
                id:user.id,
            }
            jwt.sign(payload, process.env.REACT_APP_JWT_SECRET, {expiresIn:"1d"},(err,token)=>{
                if(err) res.status(400).json({err: err})
                return res.status(200).json({
                    success: true,
                    msg: "Login Successfull",
                    token: token
                })
            })
        }
        );
    }).catch(e => console.log(e))
})

module.exports = router;
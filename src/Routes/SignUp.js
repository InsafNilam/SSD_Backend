const express =require('express');
const router= express.Router();
const bcrypt =require('bcrypt');
const User = require('../Models/User');
const auth = require('../MiddleWare/auth');

// User Sign Up
router.post('/sign-up', auth, async (req,res)=>{

    const username= req.body.username;
    const email= req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password,saltPassword);

    await User.findOne({email})
    .then((user) =>{
        if(user) return res.status(401).json({ msg : 'User already exists'});
        const newUser = new User({
            username,
            password,
            email,
            role,
        });

    newUser.password=securePassword;
    
    newUser.save().then((user)=>{
        return res.status(200).send({
                success: true,
                msg: "Registeration Successfull",
                id:user.id,
                name:user.username,
                email:user.email,
                role: user.role
            })
        }).catch(e => console.log(e));
    }).catch(e => console.log(e))
})

module.exports = router;
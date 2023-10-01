const express = require('express');
const { isValidObjectId } = require('mongoose');
const bcrypt =require('bcrypt');
const auth = require('../MiddleWare/auth');
const upload = require("../MiddleWare/upload");
const router= express.Router();
const User = require('../Models/User');

// Upload File
router.post('/upload', upload.single('file'), (req, res)=>{
    console.log(req.body.description)
    if(req.file === undefined){
        return res.json({msg: 'Select a file to Continue'});
    }
    return res.json({msg: "File has been uploaded"});
})

// Delete User Details
router.delete('/delete-user/:id', auth, (req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No User Details with given id : ${req.params.id}`);
    
    User.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err) res.send(doc);
        else console.log("Error in Deleting User Details :" +JSON.stringify(err,undefined,2));
    })
})
// Update User Details
router.put('/update-user/:id', auth, async (req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No User Details with given id : $(req.params.id)`);
    
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password,saltPassword);

    const app = {
        username : req.body.username,
        password : securePassword,
        email: req.body.email,
    }
	
    User.findByIdAndUpdate(req.params.id,{$set : app},{new:true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating User Details :" +JSON.stringify(err,undefined,2));
    });
})

// Get User Details
router.get('/users', auth, (req,res)=>{
	User.find((err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving User Details :'+JSON.stringify(err,undefined,2));
    })
})
// Get User Details By ID
router.get('/user',auth ,(req,res)=>{
    if(!isValidObjectId(req.user.id)) return res.status(400).send(`No User Details with given id : ${req.user.id}`);

	User.findById((req.user.id),(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving User Details :'+JSON.stringify(err,undefined,2));
    })
})

module.exports = router;
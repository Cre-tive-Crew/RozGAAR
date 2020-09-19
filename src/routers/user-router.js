const express= require('express')
const User = require('../models/user-model')
const router = express.Router()
const authCheck= require('../middleware/authCheck')

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/user-worker' ,authCheck, async (req,res)=>{
     const user = await User.findOne({googleID : req.user.googleID})
     user.email=req.body.email
     user.address=req.body.address
     user.contact1=req.body.contact1
     if(req.body.contact2)
     user.contact2=req.body.contact2
     user.type=false
     await user.save()
    console.log(user)
    res.redirect('/users/profile')
})

router.post('/user-recruiter' ,authCheck, async (req,res)=>{
    const user = await User.findOne({googleID : req.user.googleID})
    user.email=req.body.email
    user.address=req.body.address
    user.contact1=req.body.contact1
    if(req.body.contact2)
    user.contact2=req.body.contact2
    user.type=true
    await user.save()
   console.log(user)
   res.redirect('/users/profile')
})

router.get('/users/profile' , authCheck ,(req,res)=>{
    if(!req.user.contact1)
    res.render('profile-form',{user:req.user})
    else
    res.render('profile',{user:req.user})
 })

module.exports=router
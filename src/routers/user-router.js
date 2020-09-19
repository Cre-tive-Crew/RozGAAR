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

router.get('/users/profile' , authCheck ,(req,res)=>{
    res.render('profile',{user:req.user});
 })

module.exports=router
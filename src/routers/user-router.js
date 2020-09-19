const express= require('express')
const User = require('../models/user-model')
const Job = require('../models/job-model')
const router = express.Router()
const authCheck= require('../middleware/authCheck')
const profileCheck =require('../middleware/profileCheck')

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
     user.type="worker"
     const jobs = ['painter','gardener','maid','watchman']
     jobs.forEach((job)=>{
         if(job in req.body && !user.jobTypes.includes(job)) user.jobTypes.push(job)
     })
     await user.save()
    res.redirect('/users/profile')
})

router.post('/user-recruiter' ,authCheck, async (req,res)=>{
    const user = await User.findOne({googleID : req.user.googleID})
    user.email=req.body.email
    user.address=req.body.address
    user.contact1=req.body.contact1
    if(req.body.contact2)
    user.contact2=req.body.contact2
    user.type="recruiter"
    req.user=user
    await user.save()
    res.redirect('/users/profile')
})


router.get('/users/profile/update' , authCheck ,(req,res)=>{
    res.render('profile-form',{user:req.user})
})

router.get('/users/profile' , authCheck ,profileCheck ,(req,res)=>{
   res.render('profile',{user:req.user})
})

router.get('/users/jobs', authCheck , profileCheck , async (req,res)=>{
     const jobs = await Job.find({ownerID : req.user.googleID})    
     res.render('myjobs',{ user:req.user , jobs:jobs})
});

router.get('/users/dashboard', authCheck , profileCheck , async (req,res)=>{
    
    if(req.user.type == "worker"){
        const jobs = await Job.find({})
        res.render('dashboard',{ jobs:jobs ,user:req.user})
     }
     else{
        const users = await User.find({  type:'worker'})
        res.render('dashboard',{ users:users ,user:req.user})
     }
});

router.get('/users/newjobs',authCheck ,(req,res)=>{
    res.render('job-form', {user:req.user})
})

module.exports=router
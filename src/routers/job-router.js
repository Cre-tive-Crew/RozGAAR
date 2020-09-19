const express= require('express')
const Job = require('../models/job-model')
const router = express.Router()


router.post('/users/newjobs/jobs' , async (req,res)=>{
     
    console.log(req.body)

    await Job.findOne( { jobType:req.body.jobType , ownerID:req.user.googleID } ) .then((currentJob)=>{
        if(currentJob)
             res.redirect('/users/jobs') 
        else {
            new Job({
                jd:req.body.jd,
                jobType:req.body.jobType,    
                ownerID:req.user.googleID  
             }).save().then( 
                res.redirect('/users/jobs')    
             ) 
        }
    })
})

router.get('/jobs',async (req,res)=>{
    const jobTypes = req.body.jobTypes
    try {
        const alljobs=await Job.find({})
        const jobs = alljobs.filter((job)=> jobTypes.includes(job.jobType))
        res.status(200).send(jobs)
        
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports=router

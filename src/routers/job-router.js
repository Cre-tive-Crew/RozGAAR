const express= require('express')
const Job = require('../models/job-model')
const router = express.Router()

router.post('/jobs',async (req,res)=>{
    const job = new Job(req.body)
    try {
        await job.save()
        res.status(201).send(job)
    }
    catch(e){
        res.status(400).send(e)
    }
    
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

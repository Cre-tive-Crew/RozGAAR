const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jd:String,      //job description
    jobType:String,
    // job_poster:{
    //     type: mongoose.Schema.Types.ObjectId
    // },
    ownerID : String 
});

const Job = mongoose.model('job',jobSchema);

module.exports = Job;


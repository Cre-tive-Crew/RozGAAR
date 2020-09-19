const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jd:String,      //job description
    jobType:{
        type:Number
    },
    job_poster:{
        type: mongoose.Schema.Types.ObjectId
    }
});

const Job = mongoose.model('job',jobSchema);

module.exports = Job;


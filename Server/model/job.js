const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    }
}, { timestamps: true });

let Job=mongoose.model('Job',jobSchema,'job')
module.exports=Job

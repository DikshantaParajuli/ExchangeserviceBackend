var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let JobSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true
    },
      experience: {
        type: String,
        required: true
    },
    
 email: {
        type: String,
        required: true
    },
},
    {
    timestamps: true
    });

var Job = mongoose.model('Job', JobSchema);
module.exports = Job;
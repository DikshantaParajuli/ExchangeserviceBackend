var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let BlogSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        type: String,
        required: true
    }
},
    {
    timestamps: true
    });

var Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
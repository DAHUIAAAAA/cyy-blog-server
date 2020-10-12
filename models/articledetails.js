const 
    mongoose = require('./db.js')
    Schema = mongoose.Schema

const articledetails = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create_time: {
        type: Number,
        default: new Date().getTime()
    },
    last_modified_time: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('articledetails', articledetails)
const 
    mongoose = require('./db.js')
    Schema = mongoose.Schema

const articlelist = new Schema({
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
    desc: {
        type: String,
        required: true
    },
    create_time: {
        type: Number,
        required: true
    },
    last_modified_time: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('articlelist', articlelist)
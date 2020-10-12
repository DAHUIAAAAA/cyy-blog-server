const 
    mongoose = require('./db.js')
    Schema = mongoose.Schema

const codes = new Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    nextRequestTime: {
        type: Number,
        required: true
    },
    expireTime: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('codes', codes)
const 
    mongoose = require('./db.js')
    Schema = mongoose.Schema

const user = new Schema({
    u_id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    last_modified_time: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('user', user)
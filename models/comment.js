const 
    mongoose = require('./db.js')
    Schema = mongoose.Schema

const comment = new Schema({
    // 文章的id
    a_id: {
        type: Number,
        required: true
    },
    // 评论的id
    c_id: {
        type: Number,
        required: true,
        default: 1
    },
    // 用户id
    u_id: {
        type: Number,
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
    message: {
        type: String,
        required: true
    },
    replies: {
        type: Array
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

module.exports = mongoose.model('comment', comment)
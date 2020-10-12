const 
    mongoose = require('./db.js')
    Schema = mongoose.Schema

const columArticle = new Schema({
    title: {
        type: String,
        required: true
    },
    a_id: {
        type: String,
        required: true
    },
    col_id: {
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

module.exports = mongoose.model('columArticle', columArticle)
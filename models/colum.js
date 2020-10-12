const 
    mongoose = require('./db.js')
    Schema = mongoose.Schema

const colum = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
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

module.exports = mongoose.model('colum', colum)
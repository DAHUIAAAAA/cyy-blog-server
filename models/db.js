const 
    mongoose = require('mongoose'),
    db = require('../config/key.js').mongoUrl

mongoose.connect(db,{ useNewUrlParser: true })

mongoose.connection.on("error",function(err) {
    console.error("数据库连接失败:" + err)
})

mongoose.connection.on("open", function() {
    console.log("数据库连接成功")
})

mongoose.connection.on("disconnected",function() {
    console.log("数据库断开")
})

module.exports = mongoose
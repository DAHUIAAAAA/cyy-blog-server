const
    Koa = require('koa'),
    app = new Koa(),
    path = require('path'),
    cors = require('koa2-cors'),
    static = require('koa-static'),
    router = require('./routes'),
    koaBody = require('koa-body'),
    config = require('./config/key'),
    { check } = require('./controllers/check')

app.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024 // 文件上传大小
    }
}))

app.use(static(
    path.join(__dirname, './public/')
))

app.use(cors())

app.use(check)

app
    .use(router.routes())
    .use(router.allowedMethods())



app.listen(config.port, function () {
    console.log("Serve is running...")
})


const
    fs = require('fs'),
    path = require('path'),
    colum = require('../models/colum'),
    columArticle = require('../models/columArticle'),
    config = require('../config/key')

const uploadImg = async (ctx, next) => {
    //图片上传
    const file = ctx.request.files.avatar
    //创建可读流
    const reader = fs.createReadStream(file.path)
    // 重写文件名
    let fileName = file.name.split('.')
    fileName = +new Date() + '.' + fileName[fileName.length - 1]

    let filePath = path.join(__dirname, '../public/imgs/') + `/${fileName}`
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream)
    ctx.body = {
        imgUrl: `http://${config.host}:${config.port}/imgs/${fileName}`
    }
}

const createColum = async (ctx, next) => {
    const body = ctx.request.body,
        create_time = +new Date()

    await new colum({ ...body, create_time }).save()

    ctx.body = {
        code: 0,
        msg: '上传成功'
    }
}

const getColums = async (ctx, next) => {
    const colums = await colum.find({})
    ctx.body = { colums }
}

const getEachColum = async (ctx, next) => {
    const time = ctx.params.time
    const res = await columArticle.find({ col_id: time })
    ctx.status = 200
    ctx.body = {
        code: 0,
        articles: res
    }
}


const addArticleToColum = async (ctx, next) => {
    try {
        const { articles } = ctx.request.body,
            { col_id } = ctx.request.body

        let allArticle = await columArticle.find({ col_id })

        allArticle.forEach(item => {
            if (articles[item.a_id]) {
                delete articles[item.a_id]
            }
        })

        let newArticles = []
        for (let key in articles) {
            newArticles[newArticles.length] = {}
            newArticles[newArticles.length - 1].a_id = key
            newArticles[newArticles.length - 1].col_id = col_id
            newArticles[newArticles.length - 1].title = articles[key]
            newArticles[newArticles.length - 1].create_time = +new Date()
        }

        if (newArticles.length) {
            await columArticle.insertMany(newArticles)
                .then(() => {
                    ctx.body = {
                        code: 0,
                        msg: '添加成功'
                    }
                })
        }

    } catch (err) {
        ctx.body = {
            code: 500,
            msg: err
        }
    }
}

module.exports = {
    uploadImg,
    createColum,
    getColums,
    getEachColum,
    addArticleToColum
}
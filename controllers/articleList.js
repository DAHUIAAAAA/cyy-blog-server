const articlelist = require('../models/articlelist')
const articledetails = require('../models/articledetails')

const upLoadArticleList = async (ctx, next) => {
    // 上传到数据库
    try {
        const body = ctx.request.body
        const date = new Date(),
            time = date.getTime().toString(),
            year = date.getFullYear().toString(),
            month = (date.getMonth() + 1).toString(),
            day = date.getDate().toString(),
            fullTime = `${year}-${month}-${day}`

        await new articledetails({ ...body, create_time: time, time: fullTime }).save()
        await new articlelist({ ...body, create_time: time, time: fullTime }).save()
        ctx.status = 200
        ctx.body = body
    }
    catch (error) {
        ctx.status = 500
        ctx.body = {
            error_code: 500,
            message: error
        }
    }
}

// 获取分页内容
const getArticleList = async (ctx, next) => {
    try {
        const time = ctx.query.time != 1 ? { create_time: { '$lt': ctx.query.time } } : {},
            length = ctx.query.length ? ctx.query.length : 6;
        const body = await articlelist.find(time).limit(+length).sort({ 'create_time': -1 })
        ctx.status = 200
        ctx.body = body
    }
    catch (error) {
        ctx.status = 500
        ctx.body = {
            error_code: 500,
            message: error
        }
    }
}

const deleteArticle = async (ctx, next) => {
    try {
        const { create_time } = ctx.request.body
        await articlelist.deleteOne({ create_time })
        await articledetails.deleteOne({ create_time })
        ctx.status = 200
        ctx.body = {
            code: 0,
            msg: '删除成功'
        }
    } catch (err) {
        ctx.status = 500
        ctx.body = {
            error_code: 500,
            msg: err
        }
    }
}

// 编辑博客
const updateArticle = async (ctx, next) => {

    try {
        const { create_time } = ctx.request.body,
            body = ctx.request.body,
            last_modified_time = new Date().getTime()

        if (body.desc || body.tags) {
            await articlelist.updateOne({ create_time }, { $set: { ...body, last_modified_time } })
        }

        await articledetails.updateOne({ create_time }, { $set: { ...body, last_modified_time } })

        ctx.body = {
            code: 0,
            msg: '更新成功'
        }

    } catch (err) {

        ctx.body = {
            code: 1,
            msg: err
        }
    }
}

const searchArticle = async (ctx, next) => {
    try {

        const key = ctx.query.key,
            reg = /^[0-9]*$/

        let result

        if (reg.test(key)) {
            result = await articlelist.find({ create_time: key })
        } else {
            result = await articlelist.find({title: { $regex: key }})
        }

        ctx.body = {
            code: 0,
            result
        }

    } catch (err) {
        ctx.body = {
            code: 500,
            msg: '服务器错误'
        }
    }
}

module.exports = {
    upLoadArticleList,
    getArticleList,
    deleteArticle,
    updateArticle,
    searchArticle
} 
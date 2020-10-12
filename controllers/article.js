const articledetails = require('../models/articledetails')

// 获取每篇文章内容
const getEachArticle = async (ctx, next) => {
    try {
        const body = await articledetails.find({ create_time: ctx.params.time })
        ctx.status = 200
        ctx.body = body[0]
    }
    catch (error) {
        ctx.status = 500
        ctx.body = {
            error_code: 500,
            message: error
        }
    }
}


module.exports = {
    getEachArticle
} 
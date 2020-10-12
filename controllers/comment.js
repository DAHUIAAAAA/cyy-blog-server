const comment = require('../models/comment'),
    user = require('../models/user')

/**
 * 上传评论
 */
const upLoadComment = async (ctx, next) => {
    try {
        const body = ctx.request.body
        const date = new Date(),
            time = date.getTime().toString()

        const userMsg = await user.find({ u_id: body.u_id }),
            nickname = userMsg[0].nickname,
            avatar = userMsg[0].avatar

        const responseBody = {
            ...body,
            nickname,
            avatar,
            replies: [],
            c_id: time,
            create_time: time
        }

        await new comment(responseBody).save()

        ctx.status = 200

        ctx.body = responseBody

    }
    catch (error) {
        ctx.status = 500
        ctx.body = {
            error_code: 500,
            message: error
        }
    }
}

/**
 * 获取评论内容
 */
const getComment = async (ctx, next) => {
    try {
        const a_id = ctx.query.aid,
            time = ctx.query.time

        let body = null

        if (time == 1) {
            body = await comment.find({ a_id }).sort({ c_id: -1 })
        } else {
            body = await comment
                .find({ a_id })
                .find({ c_id: { $lt: time } })
                .sort({ c_id: -1 })
        }


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

/**
 * 上传评论
 */
const upLoadReply = async (ctx, next) => {
    // 上传到数据库
    try {
        const
            body = ctx.request.body,
            a_id = body.a_id,
            c_id = body.c_id,
            u_id = body.u_id,
            message = body.message,
            date = new Date(),
            create_time = date.getTime(),
            r_id = create_time

        const userMsg = await user.find({ u_id }),
            { nickname } = userMsg[0],
            { avatar } = userMsg[0]

        const responseBody = {
            ...body,
            nickname,
            avatar,
            message,
            r_id,
            create_time
        }


        await comment.update({ a_id, c_id }, {
            $push: {
                replies: responseBody
            }
        })

        ctx.status = 200

        ctx.body = responseBody
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
    upLoadComment,
    getComment,
    upLoadReply
} 
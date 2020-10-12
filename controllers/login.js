const jwt = require('jsonwebtoken'),
    user = require('../models/user'),
    { privateKey } = require('../config/key'),
    md5 = require('md5-node')

/**
 * 登录
 */
const login = async (ctx, next) => {
    try {

        const body = ctx.request.body,
            userMsg = await user.find({ email: body.email })

        let checkUser = null

        if (userMsg.length) {
            checkUser = md5(md5(body.password)) === userMsg[0].password
        } else {
            checkUser = false
        }

        if (checkUser) {

            const token = jwt.sign(
                { email: body.email, password: body.password},
                privateKey,
                { expiresIn: '15d' }
            )

            ctx.status = 200
            ctx.body = {
                code: 0,
                nickname: userMsg[0].nickname,
                u_id: userMsg[0].u_id,
                avatar: userMsg[0].avatar,
                token,
                msg: '登录成功'
            }

        } else if (!userMsg.length) {

            ctx.status = 200
            ctx.body = {
                code: 1,
                msg: '用户不存在'
            }
        } else {
            ctx.status = 200
            ctx.body = {
                code: 2,
                msg: '密码不正确'
            }
        }

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
    login
}
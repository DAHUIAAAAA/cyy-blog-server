const user = require('../models/user'),
    codes = require('../models/codes'),
    nodeMailer = require('nodemailer'),
    md5 = require('md5-node')
/**
 * 验证邮箱是否存在
 */
const getUser = async (ctx, next) => {
    try {

        const type = ctx.query.type,
            msg = ctx.query.msg,
            data = await user.find({ [`${type}`]: msg })

        if (data.length) {
            ctx.body = { [`${type}`]: false }
        } else {
            ctx.body = { [`${type}`]: true }
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

/**
 * 注册
 */
const register = async (ctx, next) => {

    try {

        const body = ctx.request.body,
            now = u_id = + new Date(),
            { email, password } = body,
            _code = body.code

        if (!_code) {
            ctx.body = {
                code: 501,
                msg: '尚未填写验证码'
            }
            return
        }

        const item = await codes.findOne({ email })

        if (item.code != _code) {
            ctx.body = {
                code: 502,
                msg: '验证码不正确'
            }
            return
        }

        if (item.expireTime < now) {
            ctx.body = {
                code: 503,
                msg: '验证码超时，请重新发送'
            }
            return
        }

        await new user({
            ...body,
            password: md5(md5(password)),
            u_id
        }).save()

        await codes.deleteOne({ email })

        ctx.status = 200
        ctx.body = {
            code: 0,
            u_id
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

const sendCode = async (ctx, next) => {

    const { email } = ctx.request.body

    const emailCode = await codes.findOne({ email })

    let now = + new Date()

    // 已经发送过一次验证码，重发验证码没有到下一次请求时间
    if (emailCode && (emailCode.nextRequestTime > now)) {
        ctx.body = {
            code: 501,
            msg: '请求过于频繁'
        }
        return
    }

    // 配置
    const config = {
        get user() {
            return '925669268@qq.com'
        },
        get pass() {
            return 'yqqjpaorssntbfdc'
        },
        get code() {
            return () => Math.random().toString().slice(-6)
        },
        get now() {
            return () => + new Date()
        }
    }

    const transportOptions = {
        service: 'QQ',
        auth: {
            user: config.user,
            pass: config.pass
        }
    }

    // 发送验证码
    const code = config.code()

    const sendMailOptions = {
        from: `认证邮件<${config.user}>`,
        to: email,
        subject: '嘤嘤怪的博客用户认证',
        html: `<p>注册验证码是${code}</p>`
    }

    let transporter = nodeMailer.createTransport(transportOptions)

    try {

        const info = await transporter.sendMail(sendMailOptions)


        if (info) {

            now = config.now()

            if (emailCode) {

                await codes.updateOne({ email }, {
                    code,
                    nextRequestTime: now + 60 * 1000,
                    expireTime: now + 60 * 5 * 1000
                })

            } else {

                const store = {
                    email,
                    code,
                    nextRequestTime: now + 60 * 1000,
                    expireTime: now + 60 * 5 * 1000
                }

                await new codes(store).save()
            }

            ctx.body = {
                code: 0,
                msg: '验证码发送成功'
            }
        }

    } catch (err) {
        ctx.body = {
            code: 502,
            msg: '验证码发送失败，请重新尝试'
        }
    }
}

module.exports = {
    getUser,
    register,
    sendCode
}
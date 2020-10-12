const Promise = require('bluebird'),
    jwt = require('jsonwebtoken'),
    verify = Promise.promisify(jwt.verify),
    { privateKey, paths } = require('../config/key')

async function check(ctx, next) {

    const path = ctx.request.path

    let pathNeedCheck = false


    for (let i = 0; i < paths.length; i++) {
        if (path.indexOf(paths[i]) !== -1) {
            pathNeedCheck = true
            break
        }
    }

    if (pathNeedCheck) {
        
        const token = ctx.request.headers['authorization'],
            { exp } = await verify(token, privateKey),
            now = parseInt(new Date().getTime() / 1000)

        if (now < exp) {
            await next()
        } else {
            ctx.status = 200
            ctx.body = {
                code: 1,
                msg: 'token已过期'
            }
        }
    } else {
        await next()
    }

}

async function checkToken(ctx, next) {
    ctx.status = 200
    ctx.body = {
        code: 0,
        msg: 'token未过期'
    }
}

module.exports = {
    check,
    checkToken
}
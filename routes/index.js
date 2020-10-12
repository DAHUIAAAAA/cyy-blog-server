const 
    Router = require('koa-router'),
    article = require('./article'),
    comment = require('./comment'),
    register = require('./register'),
    login = require('./login'),
    colum = require('./colum')

const
    allRouter = new Router()

allRouter
    .use(article.routes())
    .use(comment.routes())
    .use(register.routes())
    .use(login.routes())
    .use(colum.routes())

module.exports = allRouter
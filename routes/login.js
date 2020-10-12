// 用户注册
const
    Router = require('koa-router'),
    router = new Router({
        prefix: '/api'
    })

// 引入处理函数
const { login } = require('../controllers/login'),
    { checkToken } = require('../controllers/check')

// 注册
router.post('/login', login)

// 检验token是否过期
router.get('/check', checkToken)

module.exports = router
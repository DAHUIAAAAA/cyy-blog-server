// 用户注册
const 
    Router = require('koa-router'),
    router = new Router({
        prefix: '/api'
    })

// 引入处理函数
const register = require('../controllers/register')

// 文章内容
router.get('/getUser', register.getUser)
router.post('/register', register.register)
router.post('/code/send', register.sendCode)

module.exports = router
// 获取评论、回复内容，发表评论和回复
const
    Router = require('koa-router'),
    router = new Router({
        prefix: '/api'
    })

// 引入评论模块的路由
const comment = require('../controllers/comment')


/* 
上传文章评论
上传数据格式:
    {
        a_id: ...,
        u_id: ...,
        avatar: ...,
        message: ...
    }
*/
router.post('/comment/list/upload', comment.upLoadComment)

/* 
获取文章所有评论
/comment/list/12343434xxx
*/
router.get('/comment/list/', comment.getComment)

/* 
上传回复
上传数据格式:
    {
        a_id: ...,
        c_id: ...,
        u_id: ...,
        avatar: ...,
        message: ...
    }
*/
router.post('/reply/list/upload', comment.upLoadReply)

module.exports = router
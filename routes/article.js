// 文章上传、获取文章列表、获取文章内容
const 
    Router = require('koa-router'),
    router = new Router({
        prefix: '/api'
    })

// 引入文章的路由
const article = require('../controllers/article')
const articleList = require('../controllers/articleList')

// 文章内容
router.get('/article/each/:time', article.getEachArticle)

// 文章列表
router.post('/article/list/upload', articleList.upLoadArticleList)
router.get('/article/list',articleList.getArticleList)

// 更新文章
router.put('/article/update', articleList.updateArticle)

// 删除文章
router.delete('/article/delete', articleList.deleteArticle)

// 搜索文章
router.get('/article/search', articleList.searchArticle)

module.exports = router
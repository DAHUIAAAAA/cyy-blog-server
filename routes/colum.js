// 图片上传
const
    Router = require('koa-router'),
    router = new Router({
        prefix: '/api'
    })

// 上传图片的路由
const colum = require('../controllers/colum')

// 上传图片
router.post('/imgs/upload', colum.uploadImg)

// 创建专栏
router.post('/colum/create', colum.createColum)

// 获取专栏列表
router.get('/colum/all', colum.getColums)

// 获取单个专栏
router.get('/colum/each/:time', colum.getEachColum)

// 向专栏中添加文章
router.put('/colum/add',colum.addArticleToColum)

module.exports = router
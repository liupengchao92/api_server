//导入express
const express = require('express')

//创建路由对象
const router = express.Router()

//导入文章分类列表Handler
const catesHandler  = require('../router_handler/artcate')


//获取文章分类类别
router.get('/cates',catesHandler.getArticleCates)


//向外共享router对象
module.exports = router
//导入express
const express = require('express')

const expressJoi = require('@escook/express-joi')

//创建路由对象
const router = express.Router()

//导入文章分类列表Handler
const catesHandler  = require('../router_handler/artcate')


//导入验证规则的对象
const { add_cate_schema,delete_cate_schema,get_cate_schema } = require('../schema/artcate')



//获取文章分类类别
router.get('/cates',catesHandler.getArticleCates)

//新增文章分类
router.post('/addcates',expressJoi(add_cate_schema), catesHandler.addArticleCate)

//删除文章分类
router.post('/deletecates',expressJoi(delete_cate_schema), catesHandler.deleteArticleCateById)

//根据ID获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), catesHandler.getArticleCateById)

//向外共享router对象
module.exports = router
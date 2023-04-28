//1.导入express模块
const express = require('express')

//2.创建路由对象
const router = express.Router()

//导入路由逻辑处理模块
const userHandler = require('../router_handler/user')

//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

//导入需要验证规则对象
const {reg_login_schema} = require('../schema/user')

//注册新用户
router.post('/reguser',expressJoi(reg_login_schema), userHandler.regUser)

//登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

//信息
router.get('/info',userHandler.info)

//将路由对象共享出去
module.exports = router


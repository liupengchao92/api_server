//1.导入express模块
const express = require('express')

//2.创建路由对象
const router = express.Router()

//
const userHandler = require('../router_handler/user')


//注册新用户
router.post('/reguser',userHandler.regUser)

//登录
router.post('/login',userHandler.login)

router.get('/info',userHandler.info)

//将路由对象共享出去
module.exports = router


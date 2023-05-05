
//导入Express模块
const express = require('express')

//创建用户信息路由模块
const router = express.Router()

//导入验证表单的中间件
const expressJoi = require('@escook/express-joi')

//导入用户信息操作模块
const router_handler = require('../router_handler/userinfo')

//导入用户信息验证规则对象
const { update_userinfo_schema,update_password_schema,update_avatar_schema } = require('../schema/user')

//获取用户的基本信息
router.get('/userinfo', router_handler.getUserInfo)

//更新用户信息
router.post('/update/userinfo', expressJoi(update_userinfo_schema), router_handler.updateUserInfo)

//重置用户密码
router.post('/update/psw',expressJoi(update_password_schema),router_handler.updatePassword)

//修改用户头像
router.post('/update/avatar',router_handler.updateAvatar)

//向外共享用户信息路由模块
module.exports = router
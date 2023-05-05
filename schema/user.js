//导入用户信息验证模块
const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

//用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()

//密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//注册和登录表单的验证规则对象
module.exports.reg_login_schema = {
    //表示对req.body中的数据进行验证
    body: {
        username,
        password
    }
}

//用户ID的验证规则
const id = joi.number().integer().min(1).required()

//用户昵称的验证规则
const nickname = joi.string().required()

//邮箱的验证规则
const email = joi.string().email().required()

//更新用户信息表单的验证规则对象
module.exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    },
}

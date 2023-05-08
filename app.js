//1.导入expess模块
const express = require('express')

//2.创建express的服务器示例
const app = express()

//3.导入cors中间件
const cors = require('cors')

//4.将cors 注册为全局中间件
app.use(cors())

//5.配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

//导入配置文件
const config = require('./config')

//响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//配置解析Token的中间件
const expressJWT = require('express-jwt')

//使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//, /^\/user\//] }))


//导入并注册用户模块
const userRouter = require('./router/user')
app.use('/user', userRouter)

//导入并注册用户信息模块
const infoRouter = require('./router/userinfo')
app.use('/my', infoRouter)

//导入并注册文章分类模块
const artCatesRouter = require('./router/artcate')
app.use('/my/article',artCatesRouter)

//导入并注册文章模块
const articlesRouter = require('./router/articles')
app.use('/my/article',articlesRouter)


//导入验证校验模块
const joi = require('joi')

//全局错误中间件
app.use(function (err, req, res, next) {

    //身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

    //数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)

    console.log(err.message)
    //未知错误
    res.cc(err)

})


//指定端口号并启动服务器
app.listen(3007, function () {

    console.log('api server running at http://127.0.0.1')

})
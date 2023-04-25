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

//6.响应数据的中间件
app.use(function (req, res, next) {

    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status=1) {
        res.send({
            //状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message:err instanceof Error ? err.message : err
        })
    }
    
    //执行下一步
    next()
})


//导入并注册用户模块
const userRouter = require('./router/user')
app.use('/user', userRouter)


//指定端口号并启动服务器
app.listen(3007, function () {

    console.log('api server running at http://127.0.0.1')

})
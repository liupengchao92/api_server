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


//导入并注册用户模块
const userRouter = require('./router/user')
app.use('/user',userRouter)




//指定端口号并启动服务器
app.listen(3007, function () {

    console.log('api server running at http://127.0.0.1')

})
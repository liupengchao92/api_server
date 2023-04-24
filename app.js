//1.导入expess模块
const express = require('express')

//创建express的服务器示例
const app = express()

//指定端口号并启动服务器
app.listen(3007,function(){

    console.log('api server running at http://127.0.0.1')
})
//导入数据操作模块
const db = require('../db/index')

//导入加密模块
const bcrypt = require('bcryptjs')

//导入jsonwebtoken来生成 Token
const jwt = require('jsonwebtoken')

//导入配置文件
const config = require('../config')


//注册
module.exports.regUser = function (req, res) {

    //接收表单数据
    const userinfo = req.body

    if (!userinfo.username || !userinfo.password) {

        return res.cc('用户名或者密码为空！')

    }

    //定义查询SQ语句
    const sqlStr = 'select * from ev_users  where username=?'
    //查询数据库
    db.query(sqlStr, userinfo.username, function (err, results) {

        if (err) return res.cc(err.message)

        if (results.length > 0) {


            return res.cc('用户名被占用，请更换其它用户名！')
        }

        //对密码进行bcrype加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        //定义插入用户的SQL语句
        const insertSql = 'insert into ev_users set?'

        db.query(insertSql, userinfo, function (err, results) {

            if (err) return res.cc(err.message)

            if (results.affectedRows !== 1) {

                return res.cc('注册用户失败，请稍后重试！')
            }

            return res.cc(0, '注册成功！')
        })
    })

}

//登录
module.exports.login = function (req, res) {

    const userInfo = req.body

    const sqlStr = 'select * from ev_users where username = ?'

    db.query(sqlStr, userInfo.username, function (err, results) {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('您输入的用户名不存在！')

        //判断输入的密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)

        if (!compareResult) return res.cc('您输入的密码不正确')

        //通过 ES6 的高级语法，快速剔除 密码 和 头像 的值：
        const user = { ...results[0], password: '', user_pic: '' }

        //生成Token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h' //token有效时长为10个小时
        })

        //将生成的token响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            //为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer' + tokenStr
        })

    })

}


module.exports.info = function (req, res) {

    res.send("info Ok")
}
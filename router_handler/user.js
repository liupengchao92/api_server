
//导入数据操作模块
const db = require('../db/index')

//导入加密模块
const bcrypt = require('bcryptjs')


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
    })

    //对密码进行bcrype加密，返回值是加密之后的密码字符串
    userinfo.password = bcrypt.hashSync(userinfo.password,10)

    //定义插入用户的SQL语句
    const insertSql ='insert into ev_users set?'

    db.query(insertSql,userinfo,function(err,results){

        if (err) return res.cc(err.message)

        if (results.affectedRows !== 1) {
        
            return res.cc('注册用户失败，请稍后重试！')
        }

        return res.cc(0,'注册成功！')
    })

}

module.exports.login = function (req, res) {

    res.send("login Ok")
}

module.exports.info = function (req, res) {

    res.send("info Ok")
}
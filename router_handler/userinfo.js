
//导入数据库操作模块
const db = require('../db/index')

//获取用户信息
module.exports.getUserInfo = function (req, res) {

    const userInfo = req.user

    const sqlStr = 'select * from ev_users where id = ?'

    db.query(sqlStr, userInfo.id, function (err, results) {

        //执行SQL语句失败
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('获取用户信息失败')

        //返回用户信息
        res.send({
            status: 0,
            data: results[0]
        })
    })
}

//更新用户信息
module.exports.updateUserInfo = function (req, res) {

    const sqlStr = 'update ev_users set ? where id = ?'

    console.log(req.body)

    db.query(sqlStr, [req.body, req.body.id], function (err, results) {

        if (err) return res.cc(err)

        console.log(results)

        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

        return res.cc('修改用户基本信息成功',0)

    })
}
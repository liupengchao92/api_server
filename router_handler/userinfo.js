
//导入数据库操作模块
const db = require('../db/index')

const bcrypt = require('bcryptjs')

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

    db.query(sqlStr, [req.body, req.user.id], function (err, results) {

        if (err) return res.cc(err)

        console.log(results)

        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

        return res.cc('修改用户基本信息成功', 0)

    })
}

//重置用户密码
module.exports.updatePassword = function (req, res) {

    const sqlStr = 'select * from ev_users where id = ?'

    db.query(sqlStr, req.user.id, function (err, results) {

        //执行SQL发生错误
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('用户不存在')

        //用户存在，判断提交的密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)

        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        if (!compareResult) return res.cc('原密码错误！')

        const sqlStr1 = 'update ev_users set password =? where id = ?'

        db.query(sqlStr1, [newPwd, req.user.id], (err, results) => {

            //执行SQL发生错误
            if (err) return res.cc(err)

            console.log(results)

            if (results.affectedRows !== 1) return res.cc('修改密码失败！')

            return res.cc('更新密码成功', 0)

        })

    })
}

//修改用户头像
module.exports.updateAvatar = function (req, res) {

    const sqlStr = 'select * from ev_users where id =?'

    db.query(sqlStr, req.user.id, function (err, results) {

        //执行SQL异常
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('用户不存在！')

        const sqlStr1 = 'update ev_users set user_pic = ? where id = ?'

        db.query(sqlStr1, [req.body.avatar, req.user.id], (err, results) => {
            //执行SQL异常
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('修改头像失败')

            return res.cc('修改头像成功！', 0)

        })
    })
}


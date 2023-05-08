
//导入数据库操作对象
const { error } = require('@hapi/joi/lib/base')
const db = require('../db/index')

//获取分类列表
module.exports.getArticleCates = function (req, res) {

    const sqlStr = 'select * from ev_article_cate  where is_delete = 0 order by id asc'

    db.query(sqlStr, function (err, results) {

        //执行SQL发生异常
        if (err) return res.cc(err)

        //返回查询的数据
        res.send({
            status: 0,
            message: '获取分类列表成功',
            data: results,
        })
    })
}

//新增文章分类
module.exports.addArticleCate = function (req, res) {

    const sqlStr = 'select * from ev_article_cate where name = ? or alias = ?'

    //查询是否存在分类
    db.query(sqlStr, [req.body.name, req.body.alias], function (error, results) {

        //执行 SQL 语句失败
        if (error) return res.cc(error)

        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        //插入的SQL
        const sqlStr1 = 'insert into ev_article_cate (name,alias) values (?,?)'
        //执行SQL
        db.query(sqlStr1, [req.body.name, req.body.alias], function (error, results) {
            //执行 SQL 语句失败
            if (error) return res.cc(error)

            if (results.affectedRows !== 1) return res.cc('添加分类失败')

            return res.cc('添加分类成功', 0)

        })
    })
}

//根据Id删除文章分类
module.exports.deleteArticleCateById = function (req, res) {

    const sqlStr = 'update ev_article_cate set is_delete = 1  where id = ?'

    db.query(sqlStr, req.body.id, function (error, results) {

        //执行 SQL 语句失败
        if (error) return res.cc(error)

        if (results.affectedRows !== 1) return res.cc('删除分类失败')

        return res.cc('删除分类成功', 0)

    })
}

//根据Id获取文章分类
module.exports.getArticleCateById = function (req, res) {

    console.log(req.params)

    const sqlStr = 'select * from ev_article_cate where id = ?'

    db.query(sqlStr, req.params.id, (error, results) => {

        //执行SQL发生错误
        if (error) return res.cc(error)

        if (results.length !== 1) return res.cc('查询分类不存在')

        //返回查询的数据
        return res.send(
            {
                status:0,
                data:results[0]
            }
        )
    })
}

//导入数据库操作对象
const db = require('../db/index')


//获取分类列表
module.exports.getArticleCates = function (req, res) {

    const sqlStr = 'select * from ev_article_cate  where is_delete = 0 order by id asc'

    db.query(sqlStr,function(err,results){
        
        //执行SQL发生异常
        if(err) return res.cc(err)

        //返回查询的数据
        res.send({
            status:0,
            data:results
        })
    })
}

//导入处理路径的path核心模块
const path = require('path')

//导入数据库操作对象
const db = require('../db/index')
const { error } = require('console')

//添加新的文章
module.exports.addArticles = function (req, res) {

    console.log(req.file)

    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

    //表单数据合法处理下面流程

    const articleInfo = {
        //标题、内容、状态、所属的分类Id
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        //文章发布时间
        pub_date: new Date(),
        //文章作者的Id
        author_id: req.user.id,
    }

    //发布文章的SQL
    const sql = 'insert into ev_articles set ?'

    db.query(sql,articleInfo,(error,results) =>{

        //执行SQL失败
        if(error) return res.cc(error)

        if(results.affectedRows !==1) return res.cc('发布文章失败！')

        //发布文章成功
        res.cc('发布文章成功',0)

    })

}
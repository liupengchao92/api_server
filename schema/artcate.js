//导入验证模块
const joi = require('joi')

// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()

// 定义分类名称的校验规则
const name = joi.string().required()

// 定义分类别名 的校验规则
const alias = joi.string().alphanum().required()

//校验规则对象
module.exports.add_cate_schema  = {
    body:{
        name,
        alias,
    }
}

//校验规则对象
module.exports.delete_cate_schema  = {
    body:{
        id,
    }
}

//校验规则对象
module.exports.get_cate_schema  = {
    params:{
        id,
    }
}

//校验规则对象
module.exports.update_cate_schema  = {
    body:{
        id,
        name,
        alias,
    }
}
//获取分页列表  地址：/admin/product/baseTrademark/{page}/{limit}  请求get
import request from '@/utils/request'

export const reqbasetrademark=(page,limit)=>{
    return request({
        url:`/admin/product/baseTrademark/${page}/${limit}`,
        method:'get',
    })
}

//新增品牌  地址：/admin/product/baseTrademark/save  请求post   携带两个参数，一个品牌的名称，一个是logo

//修改品牌  地址：/admin/product/baseTrademark/update 请求put 携带三个参数，品牌的名字，品牌的logo

export const reqbaseTrademarksave=(trademark)=>{
    if (trademark.id) {
        return request({
            url:'/admin/product/baseTrademark/update',
            method:'put',
            data:trademark
        })
    }else{
        return request({
            url:'/admin/product/baseTrademark/save',
            method:'post',
            data:trademark,
        })
    }
}
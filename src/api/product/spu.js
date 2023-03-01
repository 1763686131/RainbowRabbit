import request from '@/utils/request'

//获取列表  请求地址：/admin/product/{page}/{limit} 请求方式：get  
export const reqgetproduct=(page,limit,category31d)=>{
    return request({
        url:`/admin/product/${page}/${limit}?category3Id=${category31d}`,
        method:'get',
        
    })
}
 
//获取基本信息  地址：/admin/product/getSpuById/{spuId}  请求方式：get
export const reqgetspubyid =(spuId)=>{
    return request({
        url:`/admin/product/getSpuById/${spuId}`,
        method:'get',
    })
}

//获取品牌接口  地址：/admin/product/baseTrademark/getTrademarkList  请求方式：get
export const reqtrademarklist=()=>{
    return request({
        url:`/admin/product/baseTrademark/getTrademarkList`,
        method:'get',
    })
}

//获取图标接口 /admin/product/spuImageList/{spuId}  请求方式：get
export const reqspuimagelist=(spuId)=>{
    return request({
        url:`/admin/product/spuImageList/${spuId}`,
        method:'get',
    })
}

//获取品牌的销售属性 /admin/product/baseSaleAttrList   get
export const reqbasesaleattrlist=()=>{
    return request({
        url:'/admin/product/baseSaleAttrList',
        method:'get',
    })
}

//修改or新增SPU接口  修改地址：/admin/product/updateSpuInfo  请求方式：post
//      新增地址：/admin/product/saveSpuInfo   请求方式：post

export const reqaddspuinfo=(data)=>{
    if (data.id) {
        return request({
            url:'/admin/product/updateSpuInfo',
            method:'post',
            data,
        })
    }else{
        return request({
            url:'/admin/product/saveSpuInfo',
            method:'post',
            data,
        })
    }
}

//删除接口  地址：/admin/product/deleteSpu/{spuId} 请求方式 DELETE
export const deletespuid=(spuId)=>{
    return request({
        url:`/admin/product/deleteSpu/${spuId}`,
        method:'delete',
    })
}
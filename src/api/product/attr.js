import request from '@/utils/request'



//获取一级分类接口， 地址：/admin/product/getCategory1  请求get
export const reqcategory1=()=>{
    return request({
        url:'/admin/product/getCategory1',
        method:'get',
    })
}

//获取二级接口，  地址：/admin/product/getCategory2/{category1Id} 请求get
export const reqcategory2=(category1Id)=>{
    return request({
        url:`/admin/product/getCategory2/${category1Id}`,
        method:'get',
    })
}

//获取三级接口，  地址：/admin/product/getCategory3/{category2Id}  请求get
export const reqCategory3=(category2Id)=>{
    return request({
        url:`/admin/product/getCategory3/${category2Id}`,
        method:'get',
    })
}

//获取商品属性接口，  地址：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  请求get
export const reqattrInfoList=(category1Id,category2Id,category3Id)=>{
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get',
    })
}

//商品添加｜修改接口 地址：/admin/product/saveAttrInfo 请求post   携带参数 data
export const reqAttrInfo=(data)=>{
    return request({
        url:'/admin/product/saveAttrInfo',
        method:'post',
        data:data,
    })
}

//删除栏目   地址：/admin/product/deleteAttr/{attrId} 请求DELETE  携带参数：ID  deleteAttr
export const reqdeleteAttr=(attrId)=>{
    return request({
        url:`/admin/product/deleteAttr/${attrId}`,
        method:'DELETE',
    })
}

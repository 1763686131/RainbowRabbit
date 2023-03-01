import request from '@/utils/request'


//请求图片接口   地址：/admin/product/spuImageList/{spuId}   get请求
export const reqspuImageList=(spuId)=>{
    return request({
        url:`/admin/product/spuImageList/${spuId}`,
        method:'get',
    })
}


//销售属性接口   地址：/admin/product/spuSaleAttrList/{spuId}  get请求
export const reqspuSaleAttrList=(spuId)=>{
    return request({
        url:`/admin/product/spuSaleAttrList/${spuId}`,
        method:'get'
    })
}


//基础属性接口   地址：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get请求
export const reqattrInfoList=(category1Id,category2Id,category3Id)=>{
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get'
    })
}

//提交接口  地址：/admin/product/saveSkuInfo  post请求
export const reqsaveSkuInfo=(data)=>{
    return request({
        url:'/admin/product/saveSkuInfo',
        method:'post',
        data,
    })
}

//获取sku目录详情接口  地址：/admin/product/findBySpuId/{spuId}   get请求
export const reqfindBySpuId=(spuId)=>{
    return request({
        url:`/admin/product/findBySpuId/${spuId}`,
        method:'get'
    })
}

/*         sku组件            */
/*                           */
/*                           */
/*                           */
/*                           */
/*                           */
/*                           */
/*                           */
/*                           */
/*                           */

//获取sku的展示  地址：/admin/product/list/{page}/{limit}    get请求

export const reqpage=(page,limit)=>{
    return request({
        url:`/admin/product/list/${page}/${limit}`,
        method:'get'
    })
}

//上架  地址：/admin/product/onSale/{skuId}  get请求


export const reqonSale=(skuId)=>{
    return request({
        url:`/admin/product/onSale/${skuId}`,
        method:'get',
    })
}



//下架  地址：/admin/product/cancelSale/{skuId}  get请求

export const reqcancelSale=(skuId)=>{
    return request({
        url:`/admin/product/cancelSale/${skuId}`,
        method:'get'
    })
}

//获取商品详情  地址：/admin/product/getSkuById/{skuId}  get请求
export const reqgetSkuById=(skuId)=>{
    return request({
        url:`/admin/product/getSkuById/${skuId}`,
        method:'get'
    })
}
<!--  -->
<template>
  <div class="">
    <el-form ref="form" label-width="80px">
      <el-form-item label="Sku名称"> {{spuName}} </el-form-item>
      <el-form-item label="Sku名称">
        <el-input v-model="skuinfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuinfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuinfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuinfo.skuDesc" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline='true'  label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
          <el-select v-model="attr.attrIdandeattrvalueid" placeholder="请选择">
            <el-option :label="attrson.valueName" :value="`${attr.id}+${attrson.id}`" v-for="attrson in attr.attrValueList" :key="attrson.id"></el-option>
          </el-select>
        </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" value="" label-width="80px">
          <el-form-item :label="item.saleAttrName" v-for="item in saleAttrList" :key="item.id">
            <el-select v-model="item.attrIdAndspuId" placeholder="请选择">
              <el-option :label="item2.saleAttrValueName" :value="`${item.id}+${item2.id}`" v-for="item2 in item.spuSaleAttrValueList" :key="item2.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border="" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column
            prop="prop"
            type="selection"
            width="55"
            
          >
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
             <el-button type="primary" v-if="row.isDefault==0" @click="moren(row)">设置默认</el-button>
            <el-button v-if="!row.isDefault==0">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitSkuinfo()">确定</el-button>
        <el-button @click="$emit('skufrominfo'),Object.assign(_data,$options.data())">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skufrom",
  data() {
    return {
      spuImageList: [], //暂存图片数据
      saleAttrList: [], //暂存销售属性数据
      attrInfoList: [], //暂存平台属性数据
      spuName:'',
      skuinfo: {
        spuId: 0,
        skuName:'',
        tmId: 0,
        category3Id:0,
        price: 0,
        weight: "",//重量
        skuDesc:'',//描述
        skuAttrValueList: [//平台属性
          // {
          //   // attrId: 0,
          //   // skuId: 0,
          // },
        ],
        skuDefaultImg: "",
        skuImageList: [
          // {
          // 
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
    
          //   spuImgId: 0,
          // },
        ],
        skuSaleAttrValueList: [//销售属性
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],

        
      },
      imageList:[]//处理好的多选图片暂存区
    };
  },
  methods: {
    async getdata(row, category11d, category21d) {
      this.skuinfo.category3Id=row.category3Id
      this.spuName=row.spuName
      this.skuinfo.spuId=row.id
      this.skuinfo.tmId=row.tmId
      //获取图片数据
      let res = await this.$API.sku.reqspuImageList(row.id);
      if (res.code == 200) {
         res.data.forEach(item => {
            item.isDefault=0
          });
          this.spuImageList = res.data;
      }
      //销售属性接口
      let res1 = await this.$API.sku.reqspuSaleAttrList(row.id);
      if (res1.code == 200) {
        this.saleAttrList = res1.data;
      }
      //基础属性接口
      let res2 = await this.$API.sku.reqattrInfoList(
        category11d,
        category21d,
        row.category3Id
      );
      if (res2.code == 200) {
        this.attrInfoList = res2.data;
      }
    },
    handleSelectionChange(val){
          this.imageList=val
    },
    //默认按钮
    moren(row){
      this.spuImageList.forEach(item=>{
        item.isDefault=0
      })
      row.isDefault=1
      this.skuinfo.skuDefaultImg=row.imgUrl
    },
    //提交按钮
     async submitSkuinfo(){
      const{attrInfoList,saleAttrList,imageList}=this
      this.skuinfo.skuAttrValueList=attrInfoList.reduce((prev,item)=>{
        if (item.attrIdandeattrvalueid) {
        let [attrId,valueId] = item.attrIdandeattrvalueid.split('+')
          prev.push({attrId,valueId})
        }
        return prev
      },[])
      this.skuinfo.skuSaleAttrValueList=saleAttrList.reduce((prev,item)=>{
        if (item.attrIdAndspuId) {
           const [saleAttrId,saleAttrValueId]=item.attrIdAndspuId.split('+')
          prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
      },[])
      this.skuinfo.skuImageList=imageList.map(item=>{
        let arr={
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id,
        }
        return arr
      })
      //发请求提交数据
     let res=await this.$API.sku.reqsaveSkuInfo(this.skuinfo)
     if (res.code==200) {
      this.$message({
          message: '恭喜你，提交成功',
          type: 'success'
      })
      this.$emit('skufrominfo')
      Object.assign(this._data,this.$options.data())
     }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
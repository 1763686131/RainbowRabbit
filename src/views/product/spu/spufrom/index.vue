<!--  -->
<template>
  <div class="">
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="spu名称">
        <el-input v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            :label="mark.tmName"
            :value="mark.id"
            v-for="mark in marklist"
            :key="mark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input v-model="spu.description" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload
          action="dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuimage"
          :on-success="updateinmage"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="options" :placeholder="`未添加${uparrid.length}项销售属性`">
          <el-option
            v-for="item in uparrid"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}+${item.name}`"
          >
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!options" @click="addarrtlist">添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="120">
          </el-table-column>
          <el-table-column prop="arrtrlist" label="属性名称列表" width="width">
            <template slot-scope="{ row,$index }">
              <!-- 显示与删除的操作  -->
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                :ref="$index"
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row,$index)"
                >+ 添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="addspuinfos()">保存</el-button>
        <el-button @click="quxiao">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spufrom",
  data() {
    return {
      options: "",//收集的销售属性
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        //spu基本信息
        category3Id: 0, //三级联动的ID
        description: "", //描述
        spuName:"", //spu的名称
        tmId: '', //品牌的ID
        spuImageList: [
          //收集图片的信息
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          // {
          //   // baseSaleAttrId: 0,
          //   // id: 0,
          //   // saleAttrName: "",
          //   // spuId: 0,
          //   spuSaleAttrValueList: [
          //     //平台属性与属性值的收集
          //     // {
          //     //   baseSaleAttrId: 0,
          //     //   id: 0,
          //     //   isChecked: "string",
          //     //   saleAttrName: "string",
          //     //   saleAttrValueName: "string",
          //     //   spuId: 0,
          //     // },
          //   ],
          // },
        ],
      },
      marklist: [], //销售属性
      spuimage: [], //先展示，//收集图片删除和添加的信息,
      arrtrlist: [], //品牌列表,共三个
      inputValue:'',//收集的小标签
    };
  },
  methods: {
    // file 是删除的那张图片，filelist是照片墙删除过后还剩余的图片
    handleRemove(file, fileList) {
      this.spuimage=fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传成功的回调
    updateinmage(response, file, fileList){
      this.spuimage=fileList
    },
    //父组件通过ref传过来的row
    async getinfo(row) {
      //获取spu商品基础信息
      let res = await this.$API.spu.reqgetspubyid(row.id);
      if (res.code == 200) {
        this.spu = res.data;
      }
      //获取品牌接口
      let res1 = await this.$API.spu.reqtrademarklist();
      if (res1.code == 200) {
        this.marklist = res1.data;
      }
      //获取图标接口
      let res2 = await this.$API.spu.reqspuimagelist(row.id);
      if (res2.code == 200) {
        res2.data.forEach((item) => {
          (item.name = item.imgName), (item.url = item.imgUrl);
        });
        this.spuimage = res2.data;
      }
      //获取销售属性
      let res3 = await this.$API.spu.reqbasesaleattrlist();
      if (res3.code == 200) {
        this.arrtrlist = res3.data;
      }
    },
    //显示input和button的回调
    showInput(row,index) {
      // this.inputVisible = true;set("inputVisible",true)
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue','')
      this.$nextTick(()=>{
        this.$refs[index].focus()
      })
    },
    //标签消失光标消失
    handleInputConfirm(row) {
      row.inputVisible=false
      const {baseSaleAttrId,inputValue}=row
      //判断为空触发
      if (inputValue.trim()=='') return
      //判断输入的值相等触发
      let ww=row.spuSaleAttrValueList.some(item=>{
        return item.saleAttrValueName==inputValue
      })
      if (ww) return this.$message('输入不能相同')

      let arr={
        baseSaleAttrId,
        saleAttrValueName:inputValue,
      }
      row.spuSaleAttrValueList.push(arr)
    },
    // 添加销售属性
    addarrtlist(){
      let [baseSaleAttrId,saleAttrName]=this.options.split('+')
      let arrtid= {
            baseSaleAttrId,
            saleAttrName,
            spuSaleAttrValueList: [
            ],
      }
      this.spu.spuSaleAttrList.push(arrtid)
      this.options=''
    },
    //保存按钮
    async addspuinfos(){
      let arr= this.spuimage.map(item=>{
        item.imgName=item.name
        item.imgUrl = item.response ? item.response.data : item.url
        return item
      })
      this.spu.spuImageList=arr
      let res=await this.$API.spu.reqaddspuinfo(this.spu)
      if (res.code==200) {
        this.$message({
          message: '恭喜你，保存成功',
          type: 'success'
        })
        this.$emit('changespu',1)
        Object.assign(this._data,this.$options.data())
        
      }
    },
    //取消按钮
    quxiao(){
      this.$emit('changespu')
      Object.assign(this._data,this.$options.data())
    },
    // 父组件添加spu的回调
    async getaddarrinfo(id){
      //获取三级id
      this.spu.category3Id=id
       //获取品牌接口 
      let res1 = await this.$API.spu.reqtrademarklist();
      if (res1.code == 200) {
        this.marklist = res1.data;
      }
      //获取销售属性
      let res3 = await this.$API.spu.reqbasesaleattrlist();
      if (res3.code == 200) {
        this.arrtrlist = res3.data;
      }
    }
  },
  //计算属性
  computed:{
    //计算当前未选择的版本，先过滤出已经有的，然后在对比
    uparrid(){
      return this.arrtrlist.filter(item=>{
        return this.spu.spuSaleAttrList.every(item1=>{
          return item.name !=item1.saleAttrName
        })
      })
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style lang="less">
/* @import url(); 引入css类 */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
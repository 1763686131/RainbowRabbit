<!--  -->
<template>
  <div class="">
    <el-card class="box-card" style="margin:20px 0">
        <category3Id @categoryidall="categoryidall" :show="!isshowt"></category3Id>
         </el-card>
    <el-card class="box-card">
      <!-- 修改｜提交表单 -->
     <div v-show="isshowt">
       <el-button type="primary" icon="el-icon-plus" @click="addattr" :disabled="category31d?false:true">添加</el-button>
      <el-table :data="foList" border="" style="width: 100%; margin-top:20px;">
        <el-table-column prop="prop" label="序号" width="80" type="index" align="center">
        </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150">
        </el-table-column>
        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{row}">
            <el-tag type="success" v-for="item in row.attrValueList" :key="item.id" style="margin-left:20px;">{{item.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="180">
          <template slot-scope="{row,}">
             <el-button type="warning" icon="el-icon-edit" size="mini"  @click="checkoutattr(row)">修改</el-button>
              <el-popconfirm
              :title="`确定要删除?`"  @onConfirm="deleteAttr(row)">
              <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference" style="margin:0 5px">删除</el-button>
            </el-popconfirm>
            
          </template>
        </el-table-column>
      </el-table>
     </div>
     <!-- 添加表单 -->
     <div v-show="!isshowt">
    <el-form ref="form" label-width="80px" :model="attinfo">
      <el-form-item label="属性名">
        <el-input style="width:180px" placeholder="请输入属性名" v-model="attinfo.attrName"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" icon="el-icon-plus" @click="addattname" :disabled="!attinfo.attrName" >添加属性名</el-button>
    <el-button @click="isshowt=true">取消</el-button>
    <el-table
      style="width: 100%;margin:20px 0;" border="" :data="attinfo.attrValueList">
      <el-table-column prop="prop" label="序号" width="80" type="index" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="属性名名称" width="width">
        <template slot-scope="{row,$index}">
          <el-input :ref="$index" placeholder="请输入属性名" v-model="row.valueName" v-if="row.flag" @blur="overrow(row)" @keyup.native.enter="overrow(row)"></el-input>
          <span v-else @click="showspan(row,$index)" style="display: block;">{{row.valueName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prop"  label="操作" width="180">
        <template slot-scope="{row,$index}">
            <el-popconfirm
              :title="`确定要删除？${row.valueName}`"  @onConfirm="deletevalueName($index)">
              <el-button slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="saveattinfo" :disabled="attinfo.attrValueList.length<1">保存</el-button>
    <el-button @click="isshowt=true">取消</el-button>
     </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash的深拷贝
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: "attr",
  data() {
    return {
      category11d:'',
      category21d:'',
      category31d:'',
      foList:[],
      isshowt:true,
      attinfo:{
        attrName: "",//属性名
        attrValueList:[//属性值
        
        ],
        categoryId: 0,//三级分类ID
        categoryLevel: 3,//服务器区分在第几级
      }
 
  }
    
  },
  methods:{
    //添加属性里面的删除按钮
    deletevalueName(index){
      this.attinfo.attrValueList.splice(index,1)
    },
    //展示修改后的标签 //传入两个值，第一个是点击的对象，第二个是点击的索引值
    showspan(row,index){
      row.flag=true
      this.$nextTick(()=>{
        this.$refs[index].focus()
      })
      
    },
    //填写表单失去焦点触发
    overrow(row){
      
      //如果属性为空触发
      if (row.valueName.trim()=='') {
        this.$message('请输入正确的字符')
        return 
      }
      let oo= this.attinfo.attrValueList.some(item=>{
        if (row!==item) {
          return item.valueName==row.valueName
        }
      })
      if(oo) return this.$message('不要输入相同的字符')
      row.flag=false
    },
    //修改按钮
    checkoutattr(row){ 
      this.isshowt=false
      this.attinfo=cloneDeep(row)
      this.attinfo.attrValueList.forEach(item => {
        //里面的属性是对象，值的名字，值。
        this.$set(item,'flag',false)
      });
    },
    //添加按钮
    addattr(){
     this.isshowt=false,
     this.attinfo={
        attrName: "",//属性名
        attrValueList:[//属性值
        
        ],
        categoryId: this.category31d,//三级分类ID
        categoryLevel: 3,//服务器区分在第几级
      }
    },
    //添加属性值按钮
    addattname(){
      this.attinfo.attrValueList.push({
            attrId:this.attinfo.id,//如果添加属性在添加属性值，id为undefined,如果是修改属性值，就会有ID
            valueName: "",
            flag:true,
          })
          this.$nextTick(()=>{
            this.$refs[this.attinfo.attrValueList.length-1].focus()
          })
          
    },
    //子组件的自定以事件，传回来的是三级ID的参数
    categoryidall(id,{k}){
     if (k==1) {
      this.category11d=id
      this.category21d=''
      this.category31d=''
     }else if(k==2){
      this.category21d=id
      this.category31d=''
     }else{
      this.category31d=id
      this.getdata()
     }
    },
    async getdata(){
      const {category11d,category21d,category31d}=this
      let res=await this.$API.attr.reqattrInfoList(category11d,category21d,category31d)
      if (res.code==200) {
        this.foList=res.data
      }
    },
    //保存按钮 reqAttrInfo
    async saveattinfo(){
      //过滤数组，返回是一个新的数组
     this.attinfo.attrValueList=this.attinfo.attrValueList.filter(item=>{
        //如果数组里面有个属性不为空
        if (item.valueName!=='') {
          delete item.flag//删除flag这个属性
          return true  //返回为true
        }
      })
      try {
        //发请求
        let res=await this.$API.attr.reqAttrInfo(this.attinfo)
        this.isshowt=true //视图切换回去
        this.getdata() 
        this.$message({
          type: 'success',
          message:'保存成功！'
        })
      } catch (error) {
        
      }
    },
    //删除栏目按钮
    async deleteAttr(row){
      try {
        let res=await this.$API.attr.reqdeleteAttr(row.id)
        this.getdata()
        this.$message({
          type: 'success',
          message:'删除成功',
        })
      } catch (error) {
        
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
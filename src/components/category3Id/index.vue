<!-- 三级联动 -->
<template>
  <div class="">
    <el-form :inline="true" value="" class="demo-form-inline" :model="cffrom" :disabled="show">
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择" v-model="cffrom.category11Id" @change="category2Id"> 
          <el-option :label="categorylist.name" :value="categorylist.id" v-for="categorylist in list1" :key="categorylist.id">{{categorylist.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择" v-model="cffrom.category22Id" @change="category3Id">
          <el-option :label="list.name" :value="list.id" v-for="list in list2" :key="list.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择" v-model="cffrom.category33Id"  @change="category4Id">
          <el-option :label="item.name" :value="item.id" v-for="item in list3" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:['show'],
  name: "category3Id",
  data() {
    return {
      //得到所有数据
      list1:[],
      list2:[],
      list3:[],

      //收集所有分类的ID
      cffrom:{
        category11Id:'',
        category22Id:'',
        category33Id:'',
      }
      
    };
  },
  methods:{
    //获取1级的数据
    async category1Id(){
      let res=await this.$API.attr.reqcategory1()
      if (res.code==200) {
        this.list1=res.data
      }

    },
    //获取2级的数据
    async category2Id(){
      this.list2=[]
      this.list3=[]
      this.cffrom.category22Id=''
      this.cffrom.category33Id=''
      const {category11Id} = this.cffrom
      this.$emit('categoryidall',category11Id,{k:1})
      let res= await this.$API.attr.reqcategory2(category11Id)
      if (res.code==200) {
        this.list2=res.data
       
      }
    },
    //获取3级的数据
    async category3Id(){
       this.list3=[]
      this.cffrom.category33Id=''
      const{category22Id}=this.cffrom
      this.$emit('categoryidall',category22Id,{k:2},)
      let res=await this.$API.attr.reqCategory3(category22Id)
      if (res.code==200) {
        this.list3=res.data
      }
    },
    //三级分类触发事件
    category4Id(){
      const {category33Id}=this.cffrom
      this.$emit('categoryidall',category33Id,{k:3},)
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.category1Id()
  },
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
</style>
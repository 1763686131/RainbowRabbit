<!--  -->
<template>
<div class="">
    <el-card class="box-card" style="margin:20px 0">
        <category3Id @categoryidall="categoryidall" :show="!isshowt"></category3Id>
         </el-card>
    <el-card class="box-card"></el-card>
</div>
</template>

<script>
export default {
  name: "spu",
  data() {
    return {
        //显示或隐藏
        isshowt:true,
        category11d:'',
        category21d:'',
        category31d:'',
    };
  },
  methods: {
    //获取三级联动id
    categoryidall(id, { k }) {
      if (k == 1) {
        this.category11d = id;
        this.category21d = "";
        this.category31d = "";
      } else if (k == 2) {
        this.category21d = id;
        this.category31d = "";
      } else {
        this.category31d = id;
        this.getdata();
      }
    },
    getdata(){

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
<!--  -->
<template>
<div class="">
 <el-row :gutter="10">
    <el-col :span="12">
       <left></left>
    </el-col>
    <el-col :span="12">
        <right></right>
    </el-col>
 </el-row>
</div>
</template>

<script>
import left from './left/index.vue'
import right from './right/index.vue'
export default {
    name:"",
    components:{
        left,
        right,
    },
    data() {
        return {

        }
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {

    }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */

</style>
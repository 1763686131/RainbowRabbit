<!--  -->
<template>
  <div class="one-list">
    <el-row :gutter="10">
        <el-col :span="6">
            <div class="grid-content bg-purple-dark">
                <el-card>
                    <list title="总销售额" number="¥ 12560">
                        <template slot="charts">
                            <span>周同比&nbsp;&nbsp;56.67%<svg t="1677822514287" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3480" width="20" height="20"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="3481"></path></svg></span>
                            <span>日同比&nbsp;&nbsp;19.16%<svg t="1677822721844" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4816" width="20" height="20"><path d="M512 597.333333l-170.666667-170.666666h341.333334l-170.666667 170.666666z" p-id="4817" fill="#d81e06"></path></svg></span>
                        </template>
                        <template slot="footer">
                            日销售额：¥ 12560
                        </template>
                    </list>
                </el-card>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-dark">
                <el-card>
                    <list title="访问量" number="88460">
                        <template slot="charts">
                            <linecharts class="charts" ref="linechars"></linecharts>
                        </template>
                         <template slot="footer">
                            日销售额：¥ 12560
                        </template>
                    </list>
                </el-card>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-dark">
                <el-card>
                    <list title="支付笔数" number="88460">
                        <template slot="charts">
                            <barcharts></barcharts>
                        </template>
                         <template slot="footer">
                           转化率：65%
                        </template>
                    </list>
                </el-card>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-dark">
                <el-card>
                    <list title="运营活动效果" number="78%">
                        <template slot="charts">
                           <el-progress :text-inside="true" stroke-linecap="square" :stroke-width="20" :percentage="78"  style="padding: 20px;"></el-progress>
                        </template>
                         <template slot="footer">
                            <span>周同比&nbsp;&nbsp;56.67%<svg t="1677822514287" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3480" width="20" height="20"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="3481"></path></svg></span>
                            <span>日同比&nbsp;&nbsp;19.16%<svg t="1677822721844" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4816" width="20" height="20"><path d="M512 597.333333l-170.666667-170.666666h341.333334l-170.666667 170.666666z" p-id="4817" fill="#d81e06"></path></svg></span>
                        </template>
                    </list>
                </el-card>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import list from "./onelist/index.vue";
import linecharts from './linecharts/index.vue'
import barcharts from './barcharts/index.vue'
export default {
  name: "one",
  components: {
    list,
    linecharts,
    barcharts,
  },
  data() {
    return {
        purple:"purple"
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getdata()
  },
  methods:{
    getdata(){
        let res=this.$refs.linechars.lineStyle=this.purple
    }
  }
};
</script>
<style lang="less" scoped>
// .charts{
//     height: 50px;
// }

/* @import url(); 引入css类 */
// .one-list {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
</style>
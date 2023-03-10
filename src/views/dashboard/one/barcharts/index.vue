<!--  -->
<template>
  <div class="">
    <div class="echarts" ref="echarts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    let ext = echarts.init(this.$refs.echarts);
    ext.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          smooth: true,//平滑
          data: [10, 22, 33, 10, 39, 1,23,54,33,19,20,46],
        
        },
      ],
      tooltip:{
            show:true
          },
      //布局样式：
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });
  },
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.echarts {
  height: 50px;
  width: 100%;
}
</style>
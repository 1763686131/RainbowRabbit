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
    return {
      //主题颜色
      lineStyle:"",
      //渐变颜色
      colorStops:{
        startcolor:'',
        endcolor:'#FFF',
      }
    };
  },
  methods: {
    
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.$nextTick(() => {
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
            type: "line",
            smooth: true, //平滑
            data: [10, 22, 33, 10, 39, 1],
            itemStyle: {
              opacity: 0,
            },
            lineStyle: {
              color:this.lineStyle,
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color:this.lineStyle, // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFF", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
        //布局样式：
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      });
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
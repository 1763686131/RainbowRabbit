<!--  -->
<template>
  <div class="ecc" ref="ecc"></div>
</template>

<script>
import * as echarts from "echarts";

import { mapState } from "vuex";
export default {
  props: ["char"],
  name: "barcharts",
  data() {
    return {
      newvalue: "销售额",
      myecharts: null,
    };
  },
  watch: {
    char: function (newvlue, oldvlue) {
      this.myecharts.setOption({
        title: {
          text: newvlue + "趋势图",
        },
        series: [
          {
            name: "销售额",
            type: "bar",
            barWidth: "60%",
            data:
              newvlue == "销售额"
                ? this.statas.orderFullYear
                : this.statas.userFullYear,
          },
        ],
      });
    },
    statas:function(){
        this.myecharts.setOption({
         title:{
            text:'销售额趋势图',
            show :true
         },
      tooltip: {
       
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
        
          name: "销售额",
          type: "bar",
          barWidth: "60%",
          data: this.statas.orderFullYear,
        },
      ],
    });
    
    }
  },
  computed: {
    ...mapState({
      statas: (state) => state.home.mochredata,
    }),
  },
  methods: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.myecharts = echarts.init(this.$refs.ecc);
    this.myecharts.setOption({
      title: {
        text: "销售额趋势图",
        show: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "销售额",
          type: "bar",
          barWidth: "60%",
          data: this.statas.orderFullYear,
        },
      ],
    });
  },
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.ecc {
  width: 100%;
  height: 300px;
}
</style>
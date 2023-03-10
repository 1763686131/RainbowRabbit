<!--  -->
<template>
  <div class="">
    <el-card>
      <div slot="header" class="header1">
        <span>销售额类占比</span>
        <div>
          <el-radio-group v-model="radio1" size="mini" style="padding: 0">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div ref="myeharts" class="myeharts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      radio1: "上海",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    let myeharts = echarts.init(this.$refs.myeharts);
    myeharts.setOption({
      tooltip: {
        trigger: "item",
      },

      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "游戏" },
            { value: 735, name: "打飞机" },
            { value: 580, name: "夜宵" },
            { value: 484, name: "抽烟" },
            { value: 300, name: "看电影" },
          ],
        },
      ],
    });
  },
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.header1 {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-size: 20px;
  }
}
.myeharts {
  height: 300px;
  width: 100%;
}
</style>
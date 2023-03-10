<!--  -->
<template>
  <div class="">
    <el-card style="margin: 10px 0">
      <div class="soncard">
        <template>
          <!-- v-model="activeName" @tab-click="handleClick" -->
          <el-tabs class="tap" v-model="activeName">
            <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
            <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
          </el-tabs>
        </template>
        <template>
          <div class="block">
            <span class="demonstration" @click="dayis()">今日</span>
            <span class="demonstration" @click="dayweek()">本周</span>
            <span class="demonstration" @click="dayisyue()">本月</span>
            <span class="demonstration" @click="setyearday()">本年</span>
            <el-date-picker
              v-model="newday"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
            >
            </el-date-picker>
          </div>
        </template>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="16">
            <echarts :char="activeName"></echarts>
          </el-col>
          <el-col :span="8">
            <span>
              <h3>门店销售排名</h3>
            </span>
            <ul class="ulli">
              <li><span>1</span><span>肯德基</span><span>12345</span></li>
              <li><span>2</span><span>肯德基</span><span>12345</span></li>
              <li><span>3</span><span>肯德基</span><span>12345</span></li>
              <li><span>4</span><span>肯德基</span><span>12345</span></li>
              <li><span>5</span><span>肯德基</span><span>12345</span></li>
              <li><span>6</span><span>肯德基</span><span>12345</span></li>
              <li><span>7</span><span>肯德基</span><span>12345</span></li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from "./barcharts/index.vue";
import dayjs from 'dayjs'
export default {
  name: "",
  components: {
    echarts,
  },
  data() {
    return {
      activeName: "销售额",
      newday:[],
    };
  },
  methods:{
    dayis(){
        const day=dayjs().format('YYYY-MM-DD')
        this.newday=[day,day]
    },
    dayweek(){
        const start=dayjs().day(1).format('YYYY-MM-DD')
        const end=dayjs().day(7).format('YYYY-MM-DD')
        this.newday=[start,end]
    },
    dayisyue(){
        const start=dayjs().startOf('month').format('YYYY-MM-DD')
        const end=dayjs().endOf('month').format('YYYY-MM-DD')
        this.newday=[start,end]
    },
    setyearday(){
         const start=dayjs().startOf('year').format('YYYY-MM-DD')
        const end=dayjs().endOf('year').format('YYYY-MM-DD')
        this.newday=[start,end]
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
.soncard {
  position: relative;
  display: flex;
  justify-content: space-between;
  .tap {
    width: 100%;
  }
  .block {
    position: absolute;
    right: 0px;
  }
}
.demonstration {
  margin-right: 5px;
  font-size: 15px;
  cursor: pointer;
}
.ulli {
  list-style: none;
  height: 300px;
  li {
    &:nth-child(-n + 3) {
      
      span:nth-child(1) {
        color: #fff;
        text-align: center;
        border-radius: 50%;
        height: 20px;
        width: 20px;
        background-color: #000;
        float: left;
      }
    }
    height: 14%;
    span:nth-child(1) {
      color: #000;
      text-align: center;
      border-radius: 50%;
      height: 20px;
      width: 20px;
    //   background-color: #000;
      float: left;
    }
    span:nth-child(2) {
      margin-left: 20px;
    }
    span:nth-child(3) {
      float: right;
    }
  }
}
</style>
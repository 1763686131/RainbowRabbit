<!--  -->
<template>
  <div class="">
    <el-card>
      <div slot="header" class="hader">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="seale">
                     <span>搜索用户数</span><svg t="1677820759577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1356" data-spm-anchor-id="a313x.7781069.0.i2" width="20" height="20"><path d="M512 896c211.2 0 384-172.8 384-384s-172.8-384-384-384-384 172.8-384 384 172.8 384 384 384z" fill="#8a8a8a" p-id="1357" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path><path d="M562.602667 330.666667a53.333333 53.333333 0 1 1-106.666667 0 53.333333 53.333333 0 0 1 106.666667 0z" fill="#FFFFFF" p-id="1358"></path><path d="M504.192 481.877333l-22.613333 3.541334a27.733333 27.733333 0 0 1-8.618667-54.784l51.285333-8.021334a36.266667 36.266667 0 0 1 40.789334 44.629334l-45.098667 180.437333 18.218667-10.410667a27.733333 27.733333 0 0 1 27.52 48.128l-57.301334 32.768a36.266667 36.266667 0 0 1-53.162666-40.277333l48.981333-196.010667z" fill="#FFFFFF" p-id="1359"></path></svg>
                </div>
                <p class="number"><span>12321</span><span>11<svg t="1677822514287" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3480" width="20" height="20"><path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="3481"></path></svg></span></p>
                <linecharts ref="linecharts"></linecharts>
            </el-col>
            <el-col :span="12">
                <div class="seale">
                     <span>人均搜索次数</span><svg t="1677820759577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1356" data-spm-anchor-id="a313x.7781069.0.i2" width="20" height="20"><path d="M512 896c211.2 0 384-172.8 384-384s-172.8-384-384-384-384 172.8-384 384 172.8 384 384 384z" fill="#8a8a8a" p-id="1357" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path><path d="M562.602667 330.666667a53.333333 53.333333 0 1 1-106.666667 0 53.333333 53.333333 0 0 1 106.666667 0z" fill="#FFFFFF" p-id="1358"></path><path d="M504.192 481.877333l-22.613333 3.541334a27.733333 27.733333 0 0 1-8.618667-54.784l51.285333-8.021334a36.266667 36.266667 0 0 1 40.789334 44.629334l-45.098667 180.437333 18.218667-10.410667a27.733333 27.733333 0 0 1 27.52 48.128l-57.301334 32.768a36.266667 36.266667 0 0 1-53.162666-40.277333l48.981333-196.010667z" fill="#FFFFFF" p-id="1359"></path></svg>
                </div>
                <p class="number"><span>12321</span><span>11<svg t="1677822721844" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4816" width="20" height="20"><path d="M512 597.333333l-170.666667-170.666666h341.333334l-170.666667 170.666666z" p-id="4817" fill="#d81e06"></path></svg></span></p>
                <linecharts ref="linecharts1"></linecharts>
            </el-col>
        </el-row>
        <template>
            <!-- @current-change="handleCurrentChange" -->
  <el-table
  border=""
    ref="singleTable"
    highlight-current-row
    style="width: 100%;margin-top:20px;">
    <el-table-column
        label="排名"
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      label="搜索关键字"
      width="">
    </el-table-column>
    <el-table-column
     sortable
      label="用户数"
      width="120">
    </el-table-column>
    <el-table-column
     sortable
      label="周涨幅"
      width="120">
    </el-table-column>
    </el-table>
    </template>
    <!-- 分页按钮 -->
    <el-pagination
    small
    layout="->,prev, pager, next"
    :total="50">
    </el-pagination>

    </el-card>
  </div>
</template>

<script>
import linecharts from '../../one/linecharts/index.vue'
export default {
components:{
    linecharts
},
  name: "",
  data() {
    return {
        //传过去的颜色
        purple:'red',
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
        let res=this.$refs.linecharts.lineStyle=this.purple
        this.$refs.linecharts1.lineStyle=this.purple
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.hader {
  display: flex;
  justify-content: space-between;
}
.linecharts{
    width: 100%;
    
}
.seale{
    color: #909399;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  span{
    margin-right: 20px;
  }
  
}
.number{
    
    span{
        margin-right: 50px;

        &:nth-child(1){
        font-size: 20px;
        }
    }
  }
</style>
<!--  -->
<template>
  <div class="onelist">
      <div class="onelist-tiele"><span>{{title}}</span><svg t="1677820759577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1356" data-spm-anchor-id="a313x.7781069.0.i2" width="16" height="16"><path d="M512 896c211.2 0 384-172.8 384-384s-172.8-384-384-384-384 172.8-384 384 172.8 384 384 384z" fill="#8a8a8a" p-id="1357" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path><path d="M562.602667 330.666667a53.333333 53.333333 0 1 1-106.666667 0 53.333333 53.333333 0 0 1 106.666667 0z" fill="#FFFFFF" p-id="1358"></path><path d="M504.192 481.877333l-22.613333 3.541334a27.733333 27.733333 0 0 1-8.618667-54.784l51.285333-8.021334a36.266667 36.266667 0 0 1 40.789334 44.629334l-45.098667 180.437333 18.218667-10.410667a27.733333 27.733333 0 0 1 27.52 48.128l-57.301334 32.768a36.266667 36.266667 0 0 1-53.162666-40.277333l48.981333-196.010667z" fill="#FFFFFF" p-id="1359"></path></svg></div>
      <div class="onelist-head">{{number}}</div>
      <div class="onelist-body">
        <slot name="charts"></slot>
      </div>
      <div class="onelist-footer">
        <slot name="footer"></slot>
      </div>
  </div>
</template>

<script>

export default {
    props:['title','number'],
  name: "",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.onelist-tiele{
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
}
.onelist-head{
    font-size: 30px;
    
}
.onelist-body{
        
        height: 50px;
        font-size: 14px;
        margin-bottom: 10px;
        
    }
.onelist-footer{
    font-size: 14px;
    height: 20px;
}
</style>
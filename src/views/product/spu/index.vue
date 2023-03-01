<!--  -->
<template>
<div class="">
    <el-card class="box-card" style="margin:20px 0">
        <category3Id @categoryidall="categoryidall" :show="!show==0"></category3Id>
         </el-card>
    <el-card class="box-card">
      <div v-show="show==0">
           <el-button type="primary" @click="addspu()" :disabled="!category31d">添加SPU</el-button>
      <el-table
        style="width: 100%; margin:20px 0;" border :data="records">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="spuName"
          label="spu名称"
          width="width">
        </el-table-column>
        <el-table-column
          prop="description"
          label="spu描述"
          width="width">
        </el-table-column>
        <el-table-column
          prop="prop"
          label="操作"
          width="width">
          <template slot-scope="{row,}">
            <el-button icon="el-icon-circle-plus-outline" type="success" size="min" title="增加项目" @click="showsku(row)"></el-button>
            <el-button icon="el-icon-edit-outline" type="warning" size="min" @click="addspu(row)" title="编辑项目"></el-button>
            <el-button icon="el-icon-warning-outline" type="info" size="min" title="项目详情" @click="skuinfoitem(row)"></el-button>
            <el-button icon="el-icon-delete" type="danger" size="min" title="删除项目" @click="centerDialogVisible = true,deleteid=row"></el-button>
            <el-dialog
                title="删除此栏目"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <span>你确定要删除此内容吗？删除是无法撤回的</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false,deleteid=''">取 消</el-button>
                  <el-button type="primary" @click="deletelanmu()">确 定</el-button>
                </span>
              </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" 
      align="center"
      :current-page="page"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total">
      </el-pagination>
      </div>
      <spufrom v-show="show==1" @changespu="changespu" ref="ok"></spufrom>
      <skufrom v-show="show==2" @skufrominfo="changespu" ref="sku"></skufrom>
    </el-card>

    <el-dialog  :title="`${spuName}的SKU列表`" :visible.sync="dialogTableVisible" :before-close="deletesum">
      <el-table border="" :data="skuifo" v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="200"></el-table-column>
        <el-table-column prop="price" label="价格" width="80"></el-table-column>
        <el-table-column prop="weight" label="重量"  width="80"></el-table-column>
        <el-table-column  label="默认图片" >
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
</div>
</template>

<script>
import spufrom from './spufrom/index.vue'
import skufrom from './skufrom/index.vue'
export default {
  name: "spu",
  components:{
    spufrom,skufrom
  },
  data() {
    return {
        //删除按钮
        centerDialogVisible: false,
        //sku or skp 管理和切换
        show:0,
        //显示或隐藏
        category11d:'',
        category21d:'',
        category31d:'',
        page:1,//当前页
        limit:5,//每页显示几条数据
        records:[],//返回的数据
        total:0,//总页数
        deleteid:{},
        skuifo:[],//获取数据的数组
        spuName:'',//返回的名字
        dialogTableVisible:false,//对话框显示和隐藏
        loading:true,
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
    handleSizeChange(val){//展示的条数
      this.limit=val
      this.getdata()
    },
    handleCurrentChange(val){//当前第几页
      this.page=val
      this.getdata()
    },
    async getdata(id){
      const {page,limit,category31d}=this
      try {
        let res=await this.$API.spu.reqgetproduct(id?id:page,limit,category31d,)
        this.records=res.data.records
        this.total=res.data.total
      } catch (error) {
        
      }
    },
    //添加｜｜修改spu按钮
    addspu(row){
      this.show=1
      if (row) {
        let res= this.$refs.ok.getinfo(row)
      }else{
        this.$refs.ok.getaddarrinfo(this.category31d)
      }
    },
    //删除按钮
    async deletelanmu(){
      this.centerDialogVisible = false
      let res=await this.$API.spu.deletespuid(this.deleteid.id)
      if (res.code==200) {
       let ss= this.records.length > 1 ? this.page :this.page-1
        this.deleteid=''
        this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        })
  
        this.getdata(ss)
      }
    },
    //自定义事件
    changespu(id){
      this.show=0
      if (id) {
        this.page=1
        this.getdata()
      }else{
        this.getdata()
      }
    },
    //sku的回调函数
    showsku(row){
      this.show=2
      const {category11d,category21d}=this
      this.$refs.sku.getdata(row,category11d,category21d)
    },
    //sku的项目详情
    async skuinfoitem(row){
      this.spuName=row.spuName
      this.dialogTableVisible = true
      let res=await this.$API.sku.reqfindBySpuId(row.id)
      if (res.code==200) {
        this.skuifo=res.data
        this.loading=false
      }
    },
    deletesum(done){
      this.loading=true
      this.skuifo=[]
      done()
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